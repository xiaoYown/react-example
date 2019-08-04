const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../base.config');
const baseWebpack = require('./webpack.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const package = require('../package.json');

const banner =
`[name].js v ${package.version}
Date: ${config.build.time}`;


var plugins = [
  new ExtractTextPlugin(utils.assetsPath('css/[name].css?v=[chunkhash]')), 	//单独使用style标签加载css并设置其路径
  new webpack.BannerPlugin({
    banner: banner
  }),
  new webpack.DefinePlugin({
    'process.env': config.build.env
  }),
  // new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false
  //   }
  // }),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   minChunks: function(module){
  //     return module.context && module.context.includes('node_modules');
  //   }
  // }),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'manifest',
  //   minChunks: Infinity
  // })
  // new BundleAnalyzerPlugin()
];
Object.keys(baseWebpack.entry).forEach(function(name){
  var plugin = new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, `../dist/${name}.html`),
    template: path.resolve(__dirname, `../src/htmls/${name}.ejs`),
    favicon: config.build.favicon,
    inject: true,
    chunks: ['manifest', 'vendor', name], 		// 多文件打包引入
    chunksSortMode: 'dependency',
    // chunksSortMode: 'auto'
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  });
  plugins.push(plugin);
});
var newWebpack = merge(baseWebpack, {
  mode: 'production',
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(`js/[name].js?t=${config.build.time}`),
    chunkFilename: utils.assetsPath(`js/chunks/[name].js?t=${config.build.time}`),
    publicPath: config.build.assetsPublicPath
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  plugins: plugins,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: false
        }
      })
    ],
    // runtimeChunk: {
    //   name: entrypoint => `runtime~${entrypoint.name}`
    // },
    // splitChunks: {
    //   vendor (chunk) {
    //     return /node_modules/.test(chunk.name);
    //   }
    // }
  },
});

module.exports = newWebpack;