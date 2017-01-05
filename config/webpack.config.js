var webpack =	require('webpack'),
	path 	=	require('path'),
	glob 	=	require('glob'),
	utils	=	require('./utils'),
// 帮助生成 HTML 文件，在 body 元素中，使用 script 来包含所有你的 webpack bundles，只需要在你的 webpack 配置文件中如下配置：
	HtmlWebpackPlugin = require('html-webpack-plugin'),
// 搭配html-webapck-plugin使用,将css作为chunk追加到对应html中
	ExtractTextPlugin = require('extract-text-webpack-plugin');

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
var entries = getEntry("./src/views/*/*.js"); // 获得入口js文件

module.exports = {
	entry: entries,
	output: {
		path: isPro ? __dirname + '/dist' : '/',
		// [name] 替换成chunk名称， [hash] 替换成对应chunk 的 hash 值, 解决hash的方式: 静态资源引入采用 import 方式
		filename: '[name].js', // 使用chunkhash : '[name]-[hash].js'
		publicPath: isPro ? './' : '/' // 文件引入路径
	},
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				exclude:  /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react']
				},
			},
			{
				test: /\.json$/,
				loader: 'json',
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: utils.assetsPath('images/[name].[ext]'),
				}
			}
		]
	},
	resolve: {
		alias: {
			'src'		: path.resolve(__dirname, '../src'),
			'config'	: path.resolve(__dirname, '../config'),
			'js'		: path.resolve(__dirname, '../src/assets/js'),
			'sass'		: path.resolve(__dirname, '../src/assets/sass'),
			'components': path.resolve(__dirname, '../src/components'),
			'ui'		: path.resolve(__dirname, '../src/components/ui'),
			'plugin'	: path.resolve(__dirname, '../src/plugin'),
			'Views'		: path.resolve(__dirname, '../src/views'),
			'utils'		: path.resolve(__dirname, '../src/utils'),
			'tools'		: path.resolve(__dirname, '../src/tools'),
			'dist'		: path.resolve(__dirname, '../dist')
		}
	},
	postcss: [ require('autoprefixer') ],
		node: {
		fs: 'empty'
	}
	/*,
	externals: {
		"$":"$"
	}*/
};

/*if( isPro ){
  // module.exports.devtool = '#source-map'; // 生成对应打包的.map文件，表示当前文件位置
  module.exports.plugins = [
    new HtmlWebpackPlugin({
      // favicon:'./src/img/favicon.ico',       //favicon路径
      filename: __dirname + '/dist/index.html',             //生成的html存放路径，相对于 path
      template: __dirname + '/index.html',                  //html模板路径
      inject:true,                                          //允许插件修改哪些内容，包括head与body
      hash:true,                                            //为静态资源生成hash值
      minify:{                                              //压缩HTML文件
          removeComments:true,                              //移除HTML中的注释
          collapseWhitespace:false                          //删除空白符与换行符
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
    ,
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("css/[name].css")                 //单独使用style标签加载css并设置其路径
  ];
  module.exports.module.loaders.push({
    test: /\.scss$/,
    // loader: 'style!css!sass'       // 样式与html不分离
    // or loaders: ['style', 'css', 'sass']
    loader: ExtractTextPlugin.extract('style', 'css!sass')
  });
}*/
