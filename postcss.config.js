const IN_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  sourceMap: true,
  plugins: [
    require('autoprefixer')({
      grid: "autoplace"
    }),
    require('cssnano')({ preset: 'default' }),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/*.html'],
      css: ['./dist/*.css'],
      whitelistPatternsChildren: [/js-/],  // 参考: https://purgecss.com/whitelisting.html#specific-selectors
    })
  ]
}
