const path =	require('path');
const webpack =	require('webpack');
const merge =	require('webpack-merge');
const HtmlWebpackPlugin =	require('html-webpack-plugin');
const baseWebpack =	require('./webpack.config');
const CONFIG_DEV = require('../config.dev');
const DashboardPlugin = require("webpack-dashboard/plugin");
const ExternalsPlugin = require('./xv-webpack-externals-plugin');

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

var plugins = [
  new webpack.DefinePlugin({
    'process.env': 'development'
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new DashboardPlugin()
];

Object.keys(baseWebpack.entry).forEach(function(name){
  baseWebpack.entry[name].push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true');

  let plugin = new HtmlWebpackPlugin({
    filename: name + `.${CONFIG_DEV.templateFileSuffix}`,
    template: path.join(CONFIG_DEV.templatePath, `${name}.${CONFIG_DEV.templateSuffix}`), // page entries
    inject: true,
    chunks: [name],
    templateParameters: {
      CDN: CONFIG_DEV.CDN,
      externals: CONFIG_DEV.externals[name]
    }
  });
  plugins.push(plugin);
});

// plugins.push(new ExternalsPlugin({
//   cdn: '/static/react/js/libs',
//   externals: {
//     home: ['test'],
//   }
// }));

var newWebpack = merge(baseWebpack, {
  mode: 'development',
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  // devtool: '#source-map',
  plugins: plugins
});

module.exports = newWebpack;
