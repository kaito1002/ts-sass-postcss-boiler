const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const { merge } = require('webpack-merge');

const buildDir = "dist";

const entries = {}
for (const fileName of require('fs').readdirSync(path.resolve(__dirname, 'src', 'entries'))) {
  entries[fileName.split('.')[0]] = `./src/entries/${fileName}`
}

const baseConfig = {
  entry: entries,
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, buildDir),
    filename: "js/[name].[contenthash].bundle.js",
    pathinfo: false
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      })
    ]
  },
  devtool: "inline-source-map",
  optimization: {
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        vendors: {
          name: "vendor",
          test: /node_modules/,
          enforce: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: false
            }
          },
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(s?)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers')
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].bundle.css"
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: "./src/html/index.html",
      inject: false,
      chunks:['vendor', 'index']
    }),
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 75
        }
      }],
      overrideExtension: false
    }),
    new ESLintPlugin({
      overrideConfigFile: path.resolve(__dirname, '.eslintrc.js'),
      cache: false,
      fix: false
    }),
    new StyleLintPlugin({
      files: ['./src/styles/**/*.scss'],
      syntax: 'scss',
      fix: false
    })
  ]
};

const devConfig = merge(baseConfig, {
  devtool: "eval-source-map",
  devServer: {
    contentBase: [
      path.resolve(__dirname, "dist"),
      path.join(__dirname, "src"),
    ],
    watchContentBase: true,
    index: 'index.html',
    overlay: true,
    port: 8000
  }
})

const productConfig = merge(baseConfig, {
  devtool: false,
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"]
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "[path][name].[ext]" },
        { from: "src/assets", to: "assets" }
      ]
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        terserOptions: {
          compress: { drop_console: true }
        }
      })
    ]
  }
})

module.exports = (env, options) => {
  const production = options.mode === "production";
  const config = production
    ? productConfig
    : devConfig

  return config;
};
