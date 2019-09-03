var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');

function generator (cdn, templateName, externalName) {
  return `<script src=${cdn.replace(/\/$/, '')}/${externalName}.js>`
}

function ExternalsPlugin (options) {
  // Configure your plugin with options...
  // {
  //   cdn, // not must (default: /)
  //   generator: (externalName) => `${externalName}.js`, // not must (default: )
  //   externals: {
  //     htmls: externals: [], // not must (default: all externals)
  //   }
  // }
  this.cdn = options.cdn || '/';
  this.generator = options.generator || generator;
}
 
ExternalsPlugin.prototype.apply = function (compiler) {
  // compiler.plugin('compilation', (compilation) => {
  //   console.log('The compiler is starting inject externals');
  // });
  const self = this;
  if (compiler.hooks) {
    // webpack 4 support
    compiler.hooks.compilation.tap('html-webpack-plugin-external', (compilation) => {
      if (compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration) {
        compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('html-webpack-plugin-external', (htmlPluginData, callback) => {
          self.injectExternals(compilation, htmlPluginData.plugin.options, htmlPluginData, callback);
        });
      } else {
        // HtmlWebPackPlugin 4.x
        var HtmlWebpackPlugin = require('html-webpack-plugin');
        var hooks = HtmlWebpackPlugin.getHooks(compilation);
        console.log(hooks.afterEmit)
        hooks.afterEmit.tapAsync('html-webpack-plugin-external', (htmlPluginData, callback) => {
          self.injectExternals(compilation, htmlPluginData.plugin.options, htmlPluginData, callback);
        });
      }
    });
  } else {
    // webpack 3 support
    compilation.plugin('html-webpack-plugin-after-emit', (htmlPluginData, callback) => {
      htmlPluginData.html = self.injectExternals(compilation, htmlPluginData.plugin.options, htmlPluginData, callback);
    });
  }
};

ExternalsPlugin.prototype.injectExternals = function (compilation, options, htmlData, callback) {
  let { webpackHtmlFilename } = htmlData;
  console.log(webpackHtmlFilename)
  let html = options.externals[webpackHtmlFilename] ?
    this.replaceBody(webpackHtmlFilename, options.externals[webpackHtmlFilename], htmlData.html)
    : htmlData.html;
  htmlData.html = html;
  // Prepare the folder
  var fullPath = path.resolve(compilation.compiler.outputPath, webpackHtmlFilename);
  var directory = path.dirname(fullPath);
  mkdirp(directory, function (err) {
    if (err) {
      return callback(err);
    }
    // Write to disk
    fs.writeFile(fullPath, compilation.assets[webpackHtmlFilename].source(), function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, htmlData);
    });
  });
}

ExternalsPlugin.prototype.replaceBody = function (name, externals, html) {

  let scripts = externals.map(externalName => {
    return this.generator(this.cdn, name, externalName);
  }).join('\n');

  html = htmlPluginData.html.replace(/<\/body>/,
`
  ${scripts}
  <\/body>`);
  return html;
}
 
module.exports = ExternalsPlugin;
