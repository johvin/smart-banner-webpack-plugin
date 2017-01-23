# smart-banner-webpack-plugin

[![Version npm][version]](http://browsenpm.org/package/smart-banner-webpack-plugin) [![NPM Download][download]](https://www.npmjs.com/package/smart-banner-webpack-plugin) [![Dependencies][david]](https://david-dm.org/johvin/smart-banner-webpack-plugin)

[version]: http://img.shields.io/npm/v/smart-banner-webpack-plugin.svg?style=flat
[download]: https://img.shields.io/npm/dt/smart-banner-webpack-plugin.svg?style=flat
[david]: https://img.shields.io/david/johvin/smart-banner-webpack-plugin.svg?style=flat

> This is a smart banner webpack plugin which has the same function and usage as webpack.BannerPlugin and supports [filename] syntax in banner string

**Note:** _This is a clone of [webpack.BannerPlugin](https://github.com/webpack/webpack/blob/master/lib/BannerPlugin.js) with the only difference that it supports variable [filename] in banner string which will be replaced by the chunk filename_

## Usage

The use of smart-banner-webpack-plugin 2.0.0 and 3.0.0 has a little difference which is illustrated in the following examples.

```js
// webpack 1
import SmartBannerPlugin from 'smart-banner-webpack-plugin';

// part of webpack.config.js
{
  ...
  plugins: [
    new SmartBannerPlugin(
      `[filename] v1.0.0\n\nAuthor: johvin\nDate: ${new Date().toLocaleString()}\n`,
      { raw: false, entryOnly: true })
  ],
  ...
}

```

```js
// webpack 2
import SmartBannerPlugin from 'smart-banner-webpack-plugin';

// part of webpack.config.js
{
  ...
  plugins: [
    new SmartBannerPlugin({
      banner: `[filename] v1.0.0\n\nAuthor: johvin\nDate: ${new Date().toLocaleString()}\n`,
      raw: false,
      entryOnly: true
    })
  ],
  ...
}

```

_[filename] is replaced by the chunk filename in the process of compilation, e.g. the code below is a processed banner_

```
/*!
 * server.js v1.0.0
 *
 * Author: johvin
 * Date: 2016-08-04 09:37:05
 *
 */
```

## Change log

[CHANGE LOG](./CHANGELOG.md)