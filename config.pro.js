const path = require('path');

function timeformat(time) {
  return {
		time: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}(${time.getHours()}:${time.getMinutes()})`,
		timeValue: time.valueOf()
	}
}

const BUILD_TIME = timeformat(new Date());

const CONFIG = {
  timesStamp: BUILD_TIME,
  assetsRoot: path.resolve(__dirname, './dist'),
  assetsFileDirectory: 'static/react', // 静态资源前端项目下目录名称
  assetsPublicPath: '/', // 打包到服务器静态资源根目录名
}

module.exports = CONFIG;
