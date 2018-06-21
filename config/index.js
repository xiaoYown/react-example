const path = require('path');
function timeformat(time) {
  return [time.getFullYear(), time.getMonth() + 1, time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes()].join('-')
}

module.exports = {
  build: {
		env: require('./env.pro'),
		favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		productionSourceMap: false,
		cacheBusting: true,
		cssSourceMap: true,
		time: timeformat(new Date())
	},
	dev: {
		env: require('./env.dev'),
		favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
		port: require('./config').port,
		assetsSubDirectory: 'static',
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
