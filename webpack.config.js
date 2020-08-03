const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

const buildDir = "dist";
const isBundleCss = true;

/*
  - CSSを`.css`ファイルにバンドルするか(しない場合は, JSにバンドルされる)
  - しない場合, HTMLからlinkタグを取り除く
*/

const baseConfig = {
  entry: { main: "./src/index.ts" },
  output: {
    path: path.resolve(__dirname, buildDir),
    filename: "[name].bundle.js",
    pathinfo: false
  },
  devtool: "inline-source-map",
  optimization: {
    splitChunks: {
      // 参考: https://qiita.com/soarflat/items/1b5aa7163c087a91877d
      cacheGroups: {
        vendors: {
          name: "vendor",
          test: /node_modules/,
          chunks: "initial",
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: []
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
          {
            loader: "eslint-loader",
            options: {
              enforce: 'pre',
              configFile: path.resolve(__dirname, '.eslintrc.js'),
              cache: true,
              fix: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(s?)css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          'postcss-loader',
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
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "index.html"
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
    new StyleLintPlugin({
      files: ['./src/styles/**/*.scss'],
      syntax: 'scss',
      fix: true
    })
  ]
};

// CSS Bundle Config
if (isBundleCss) {
  baseConfig.module.rules[1].use.splice(1, 0, MiniCssExtractPlugin.loader);
  baseConfig.plugins.unshift(new MiniCssExtractPlugin({
    filename: "[name].bundle.css"
  }));
}

const devConfig = Object.assign({}, baseConfig, {
  devtool: "eval-sourcemap",
  devServer: {
    contentBase: [
      path.join(__dirname, "src")
    ],
    watchContentBase: true,
    overlay: true
  }
})

const productConfig = Object.assign({}, baseConfig, {
  devtool: false,
  plugins: [
    // 1. 既存のファイルを削除
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"]
    }),
    // 2. ビルド
    ...baseConfig.plugins,
    // 3. static files のコピー
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "[path][name].[ext]" },
        { from: "src/assets", to: "assets" }
      ]
    })
  ]
})

productConfig.optimization.minimizer.push(
  new TerserPlugin({
    terserOptions: {
      extractComments: 'all',
      compress: { drop_console: true }
    }
  })
)

module.exports = (env, options) => {
  const production = options.mode === "production";
  const config = production
    ? productConfig
    : devConfig

  return config;
};
