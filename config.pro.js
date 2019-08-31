const path = require('path');

function timeformat(time) {
  return {
		time: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}(${time.getHours()}:${time.getMinutes()})`,
		timeValue: time.valueOf()
	}
}

const BUILD_TIME = timeformat(new Date());

const CONFIG = {
  name: 'example-js',
  version: '0.0.1',
  author: 'xiaoYown',
  timeStamp: BUILD_TIME.time,

  templateSuffix: 'ejs',
  templateFileSuffix: 'html',
  templatePath: path.resolve(__dirname, `./src/htmls`),
  assetsRoot: path.resolve(__dirname, './dist'),
  assetsFileDirectory: 'static/react', // 文件生成到 dist 下的路径
  assetsPublicPath: '/', // 打包后路径资源前缀

  // 打包成功后江 dist 下文件拷贝到对应文件夹下
  takeToProject: false, // 是否将 dist 的文件拷贝到项目下
  viewsFolder: '/xiaoyown/web/blog-koa/views/react',
  staticFolder: '/xiaoyown/web/blog-koa/static',

  CDN: '/static/react/js/libs',
  externals: {
    home: ['react', 'react-dom', 'react-router-dom', 'redux'],
    login: ['react', 'react-dom', 'react-router-dom'],
    mobile: ['react', 'react-dom', 'react-router-dom'],
  }
}

module.exports = CONFIG;
