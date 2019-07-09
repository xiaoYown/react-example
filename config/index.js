const path = require('path');

function timeformat(time) {
  return {
		time: [time.getFullYear(), time.getMonth() + 1, time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes()].join('-'),
		timeValue: time.valueOf()
	}
}

const BUILD_TIME = timeformat(new Date());

module.exports = {
  build: {
		env: require('./env.pro'),
		favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsFileDirectory: 'static', // 静态资源前端项目下目录名称
		assetsSubDirectory: 'm/static', // 打包到服务器静态资源子目录名
		assetsPublicPath: '/', // 打包到服务器静态资源根目录名
		productionSourceMap: false,
		cacheBusting: true,
		cssSourceMap: true,
		time: BUILD_TIME.time,
		timeValue: BUILD_TIME.timeValue
	},
	dev: {
		env: require('./env.dev'),
		favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
		port: require('./config').port,
		assetsFileDirectory: 'static',
		assetsSubDirectory: 'm/static',
		assetsPublicPath: '/',
		proxyTable: {
			'/api':{
				target: require('./config').api,
				pathRewrite:{
				  '^/api': ''
				}
			}
    }
  }
}
