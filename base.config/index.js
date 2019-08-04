const path = require('path');
const CONFIG = require('./config');

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
		favicon: path.resolve(__dirname, '../static/react/favicon.ico'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsFileDirectory: 'static', // 静态资源前端项目下目录名称
		assetsSubDirectory: 'static/react', // 打包到服务器静态资源子目录名
		assetsPublicPath: '/', // 打包到服务器静态资源根目录名
		productionSourceMap: false,
		cacheBusting: true,
		cssSourceMap: true,
		time: BUILD_TIME.time,
		timeValue: BUILD_TIME.timeValue
	},
	dev: {
		env: require('./env.dev'),
		favicon: path.resolve(__dirname, '../static/react/favicon.ico'),
		port: CONFIG.port,
		assetsFileDirectory: 'static',
		assetsSubDirectory: 'static/react',
		assetsPublicPath: '/',
		proxyTable: {
			'/api':{
				target: CONFIG.api,
				pathRewrite:{
				  '^/api': ''
				}
			}
    }
  }
}
