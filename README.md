# smart-banner-webpack-plugin

> This is a smart banner webpack plugin which has the same function and usage as webpack.BannerPlugin and supports [filename] syntax in banner string

**Note:** _This is a clone of [webpack.BannerPlugin](https://github.com/webpack/webpack/blob/master/lib/BannerPlugin.js) with the only difference that it supports variable [filename] in banner string which will be replaced by the chunk filename_

## Usage

```
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

