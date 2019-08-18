const path = require('path');
const utils = require('./build/utils');

const IP = utils.getIPAdress()
const PORT = 8012;

const CONFIG = {
  url: `http://${IP}:${PORT}/react/home`,
  port: PORT,
  // favicon: path.resolve(__dirname, './static/react/favicon.ico'),
  templateSuffix: 'ejs',
  templateFileSuffix: 'html',
  templatePath: path.resolve(__dirname, `./src/htmls`),
  assetsFileDirectory: path.join(__dirname, './static'), // 文件系统所在路径
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsPublicPath: 'static', // 服务静态文件路径
  rewrites: [
    { from: /\/react\/home(\/|$)/, to: '/home.html' },
    { from: /\/react\/login(\/|$)/, to: '/login.html' },
    { from: /\/react\/mobile(\/|$)/, to: '/mobile.html' },
  ],
  proxyTable: { // 请求代理 -
    // '/api':{
    //   target: domain,
    //   pathRewrite:{
    //     '^/api': ''
    //   }
    // }
  }
}

module.exports = CONFIG;
