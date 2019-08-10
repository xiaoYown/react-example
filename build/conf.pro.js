const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CONFIG_PRO = require('../config.pro');
const CONFIG_APP = require('../config.app');
const baseWebpack = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';

const BANNER =
`[name].js v ${CONFIG_APP.version}
Date: ${CONFIG_APP.time}
Author: ${CONFIG_APP.author}`;


var plugins = [
  new webpack.BannerPlugin({
    banner: BANNER
  }),
  new webpack.DefinePlugin({
    'process.env': 'production'
  }),
  new MiniCssExtractPlugin({
    filename: utils.assetsPath(`css/[name].css?t=${CONFIG_PRO.timeStamp}`),
    chunkFilename: utils.assetsPath(`css/[id].css?t=${CONFIG_PRO.timeStamp}`)
  }),
  // new BundleAnalyzerPlugin()
];
Object.keys(baseWebpack.entry).forEach(name => {
  var plugin = new HtmlWebpackPlugin({
    filename: path.resolve(CONFIG_PRO.assetsRoot, `${name}.html`),
    template: path.resolve(__dirname, `../src/htmls/${name}.${CONFIG_PRO.templateSuffix}`),
    inject: true,
    chunks: ['vendor', name], 		// 多文件打包引入
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
    path: CONFIG_PRO.assetsRoot,
    filename: utils.assetsPath(`js/[name].js?t=${CONFIG_PRO.timeStamp}`),
    chunkFilename: utils.assetsPath(`js/chunks/[name].js?t=${CONFIG_PRO.timeStamp}`),
    publicPath: CONFIG_PRO.assetsPublicPath
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
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|react-router)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    }
  },
});

module.exports = newWebpack;