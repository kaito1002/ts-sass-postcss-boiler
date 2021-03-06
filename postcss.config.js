const IN_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  sourceMap: true,
  plugins: [
    require('autoprefixer')({
      grid: "autoplace"
    }),
    require('postcss-flexbugs-fixes')({}),
    require('cssnano')({ preset: 'default' }),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/html/*.html'],
      css: [
        './src/styles/**/*.scss',
      ],
      whitelistPatternsChildren: [/js-/],  // 参考: https://purgecss.com/whitelisting.html#specific-selectors
    })
  ]
}
