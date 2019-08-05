const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../base.config');
const baseWebpack = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const package = require('../package.json');

const BANNER =
`[name].js v ${package.version}
Date: ${config.build.time}
Author: ${package.author}`;


var plugins = [
  new webpack.BannerPlugin({
    banner: BANNER
  }),
  new webpack.DefinePlugin({
    'process.env': config.build.env
  }),
  new MiniCssExtractPlugin({
    filename: utils.assetsPath(`css/[name].css?t=${config.build.time}`),
    chunkFilename: utils.assetsPath(`css/[id].css?t=${config.build.time}`)
  }),
  new BundleAnalyzerPlugin()
];
Object.keys(baseWebpack.entry).forEach(function(name){
  var plugin = new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, `../dist/${name}.html`),
    template: path.resolve(__dirname, `../src/htmls/${name}.ejs`),
    favicon: config.build.favicon,
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
    path: config.build.assetsRoot,
    filename: utils.assetsPath(`js/[name].js?t=${config.build.time}`),
    chunkFilename: utils.assetsPath(`js/chunks/[name].js?t=${config.build.time}`),
    publicPath: config.build.assetsPublicPath
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
        default: {
          test: /node_modules/,
          minChunks: 2,
        }
      },
    }
  },
});

module.exports = newWebpack;