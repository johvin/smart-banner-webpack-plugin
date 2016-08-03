/**
 * Smart Banner Webpack Plugin
 *
 * This is a clone of [webpack BannerPlugin](https://github.com/webpack/webpack/blob/master/lib/BannerPlugin.js)
 * with the only difference that it supports variable [name] in banner string
 * which will be replaced by the chunk filename
 *
 * Version: 1.0.0
 *
 * Author: johvin
 *
 * Date: 2016/08/03
 *
 */
var ConcatSource = require("webpack-core/lib/ConcatSource");
var ModuleFilenameHelpers = require("webpack/lib/ModuleFilenameHelpers");

function wrapComment(str) {
  if(str.indexOf("\n") < 0) return "/*! " + str + " */";
  return "/*!\n * " + str.split("\n").join("\n * ") + "\n */";
}

function BannerPlugin(banner, options) {
  this.options = options || {};
  this.banner = this.options.raw ? banner : wrapComment(banner);
}
module.exports = BannerPlugin;

BannerPlugin.prototype.apply = function(compiler) {
  var options = this.options;
  var banner = this.banner;

  compiler.plugin("compilation", function(compilation) {
    compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
      chunks.forEach(function(chunk) {
        if(options.entryOnly && !chunk.initial) return;
        chunk.files.filter(ModuleFilenameHelpers.matchObject.bind(undefined, options)).forEach(function(file) {
          compilation.assets[file] = new ConcatSource(banner.replace(/\[name\]/g, file), "\n", compilation.assets[file]);
        });
      });
      callback();
    });
  });
};