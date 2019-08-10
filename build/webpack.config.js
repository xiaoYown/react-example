const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

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
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [{
          loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
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
      },
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
