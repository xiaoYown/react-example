const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const utils = require('./utils');
const config = require('../config');
const custom = require('../package.json').name

var isPro = process.env.NODE_ENV == 'production';

function getEntry(globPath) {
  var entries = {}, basename;
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    entries[basename] = [];
    // entries[basename].push(entry);
    entries[basename].push(entry);
  });
  return entries;
}
var entries = getEntry("./src/views/*/*.jsx"); // 获得入口js文件

module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    // [name] 替换成chunk名称， [hash] 替换成对应chunk 的 hash 值, 解决hash的方式: 静态资源引入采用 import 方式
    filename: '[name].js', // 使用chunkhash : '[name]-[hash].js'
    publicPath: isPro ? config.build.assetsPublicPath : config.dev.assetsPublicPath // 文件引入路径
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory',
        options: {
          presets: [['es2015', 'stage-2']]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[ext]'),
        }
      },
      { // eslint 检查
        test: /\.js[x]?$/,
        loader: 'eslint-loader',
        include: [
          path.join(__dirname, '../src')
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'config': path.resolve(__dirname, '../config')
    },
    extensions: ['.js', '.jsx', '.scss']
  }
};
