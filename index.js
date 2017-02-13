/**
 * Smart Banner Webpack Plugin supports webpack 2
 *
 * Author: johvin
 * Date: 2017/02/13
 */
'use strict';

const ConcatSource = require('webpack-sources').ConcatSource;
const ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');

function wrapComment(str) {
  if(!str.includes('\n')) return `/*! ${str} */`;
  return `/*!\n * ${str.split('\n').join('\n * ')}\n */`;
}

class BannerPlugin {
  constructor(options) {
    if(arguments.length > 1)
      throw new Error('BannerPlugin only takes one argument (pass an options object)');
    if(typeof options === 'string')
      options = {
        banner: options
      };
    this.options = options || {};
    this.banner = this.options.raw ? options.banner : wrapComment(options.banner);
  }

  apply(compiler) {
    let options = this.options;
    let banner = this.banner;

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        chunks.forEach((chunk) => {
          if (
            options.entryOnly
            && 'isInitial' in chunk
            && !chunk.isInitial()
          ) return;

          chunk.files
            .filter(ModuleFilenameHelpers.matchObject.bind(undefined, options))
            .forEach((file) =>
              compilation.assets[file] = new ConcatSource(
                banner.replace(/\[filename\]/g, file), '\n', compilation.assets[file]
              )
            );
        });
        callback();
      });
    });
  }
}

module.exports = BannerPlugin;
