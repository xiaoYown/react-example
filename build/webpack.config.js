const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
// const utils = require('./utils');
const config = require('../base.config');

let isPro = process.env.NODE_ENV == 'production';

function getEntries(folder) {
  let views = fs.readdirSync(folder);
  let entries = {};
  views.forEach(view => {
    entries[view] = [`${folder}/${view}/index.jsx`];
  });
  return entries;
}
let entries = getEntries('./src/pages'); // 获得入口js文件

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
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url',
      //   query: {
      //     limit: 10000,
      //     name: utils.assetsPath('images/[name].[ext]'),
      //   }
      // },
      { // eslint 检查
        test: /\.js[x]?$/,
        loader: 'eslint-loader',
        include: [
          path.join(__dirname, '../src')
        ],
        exclude: /(node_modules)|(assets\/js)/
      },
      {
        test: /\.scss$/,
        use: [{
          loader: !isPro ? 'style-loader' : MiniCssExtractPlugin.loader,
          options: {
            sourceMap: true
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.jsx', '.scss']
  }
};
