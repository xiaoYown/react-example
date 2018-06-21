const path = require('path');
const utils =	require('./utils');
const webpack =	require('webpack');
const merge =	require('webpack-merge');
const config = require('../config');
const baseWebpack =	require('./webpack.config.js');
const ExtractTextPlugin =	require('extract-text-webpack-plugin');
const HtmlWebpackPlugin =	require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const package = require('../package.json');

const banner =
`[name].js v ${package.version}
(c)2018 ${package.author}
Released under the ${package.license} License' + '\nDate: ' + ${config.build.time}`;


var plugins = [	
  new ExtractTextPlugin(utils.assetsPath('css/[name].css?v=[chunkhash]')), 	//单独使用style标签加载css并设置其路径
  new webpack.BannerPlugin({
    banner: banner
    // include: new RegExp(bundleConfig.bannerFiles.join('|'))
  })
];
var pages = {
  index: ['react', 'index', 'vendor']
};
Object.keys(baseWebpack.entry).forEach(function(name){
  var plugin = new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, `../dist/${name}.html`),
    template: path.resolve(__dirname, `../src/pages/${name}.html`),
    favicon: config.build.favicon,
    inject: true,
    chunks: pages[name], 		// 多文件打包引入
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    // chunksSortMode: 'dependency'
    chunksSortMode: 'auto'
  });
  plugins.push(plugin);
});
var newWebpack = merge(baseWebpack, {
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js?t=' + config.build.time),
    chunkFilename: utils.assetsPath('js/chunks/[name].js?t=' + config.build.time),
    publicPath: config.build.assetsPublicPath
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  plugins: plugins
});

module.exports = newWebpack;