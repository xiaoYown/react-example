const path =	require('path');
const config = 	require('../base.config');
const webpack =	require('webpack');
const merge =	require('webpack-merge');
const HtmlWebpackPlugin =	require('html-webpack-plugin');
const utils =	require('./utils');
const baseWebpack =	require('./webpack.config');

if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);

var plugins = [
  new webpack.DefinePlugin({
    'process.env': config.dev.env
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.HotModuleReplacementPlugin()
];

Object.keys(baseWebpack.entry).forEach(function(name){
  baseWebpack.entry[name].push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true');

  let plugin = new HtmlWebpackPlugin({
    filename: name + '.html',
    template: path.resolve(__dirname, `../src/htmls/${name}.ejs`), // page entries
    favicon: config.dev.favicon,
    inject: true,
    chunks: [name]
  });
  plugins.push(plugin);
});

var newWebpack = merge(baseWebpack, {
  mode: 'development',
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: config.dev.assetsPublicPath
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      usePostCSS: false
    })
  },
  devtool: 'cheap-module-eval-source-map',
  // devtool: '#source-map',
  plugins: plugins
});

module.exports = newWebpack;

