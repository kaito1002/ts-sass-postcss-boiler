# TypeScript & SASS & PostCss Personal BoilerPlate

## Instalation

``` sh
$ yarn install
$ yarn start  # start dev server and open with browser
```

## Build

``` sh
$ yarn build
```

Build files are created in `/dist` dir!

## Functions

- TypeScript => Javascript
- Sass => (PostCss) => Built Css
    - [autoprefixer](https://github.com/postcss/autoprefixer): add benderprefix automatically
    - [cssnano](https://github.com/cssnano/cssnano): minimaize css
    - [purgecss](https://github.com/FullHuman/purgecss): remove unuse css
- Live reload
