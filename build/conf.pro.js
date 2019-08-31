const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CONFIG_PRO = require('../config.pro');
const baseWebpack = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';

const BANNER =
`[name].js v ${CONFIG_PRO.version}
Date: ${CONFIG_PRO.timeStamp}
Author: ${CONFIG_PRO.author}`;


var plugins = [
  new webpack.BannerPlugin({
    banner: BANNER
  }),
  // new webpack.DefinePlugin({
  //   'process.env': 'production'
  // }),
  new MiniCssExtractPlugin({
    filename: utils.assetsPath(`css/[name].css?t=${CONFIG_PRO.timeStamp}`),
    chunkFilename: utils.assetsPath(`css/[id].css?t=${CONFIG_PRO.timeStamp}`)
  }),
  // new BundleAnalyzerPlugin()
];
Object.keys(baseWebpack.entry).forEach(name => {
  let plugin = new HtmlWebpackPlugin({
    filename: path.resolve(CONFIG_PRO.assetsRoot, `${name}.${CONFIG_PRO.templateFileSuffix}`),
    template: path.resolve(__dirname, `../src/htmls/${name}.${CONFIG_PRO.templateSuffix}`),
    inject: true,
    chunks: ['vendor', name], 		// 多文件打包引入
    chunksSortMode: 'dependency',
    // chunksSortMode: 'auto'
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    templateParameters: {
      CDN: CONFIG_PRO.CDN,
      externals: CONFIG_PRO.externals[name]
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
    // minimizer: [
    //   new UglifyJsPlugin({
    //     uglifyOptions: {
    //       compress: false
    //     }
    //   })
    // ],
    // splitChunks: { // TODO: 该分离方式影响异步模块加载, 暂时移除
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|react-router)[\\/]/,
    //       name: 'react',
    //       chunks: 'all',
    //     },
    //     antd: {
    //       test: /[\\/]node_modules[\\/](antd)[\\/]/,
    //       name: 'antd',
    //       chunks: 'all',
    //     },
    //   },
    // }
  },
});

module.exports = newWebpack;