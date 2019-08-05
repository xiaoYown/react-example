const path = require('path');
const express =	require('express');
const webpack =	require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxyMiddleware = require('http-proxy-middleware');
const config = require('../base.config');
const webpackMerge = require('./conf.dev');

var app = express();

var compiler = webpack(webpackMerge);

var devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackMerge.output.publicPath,
  stats: {
    colors: true,
    chunks: false,
    modules: false,
    version: false
  }
});
// proxy api requests
var proxyTable = config.dev.proxyTable;
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options));
});

app.use(require('connect-history-api-fallback')({
  rewrites: [
    { from: /\/home(\/|$)/, to: '/home.html' },
    { from: /\/mobile(\/|$)/, to: '/mobile.html' },
  ]
}));

app.use(devMiddleware);
app.use(webpackHotMiddleware(compiler, {
  log: false,
  path: "/__webpack_hmr",
  heartbeat: 10 * 1000
}));

setTimeout(() => {
  compiler.apply(new webpack.BannerPlugin('A new banner'));
  devMiddleware.invalidate();
}, 1000);

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./' + config.dev.assetsFileDirectory));

var pathUrl = require('../base.config/config').pathUrl;

module.exports = app.listen(config.dev.port, function (err) {
  console.log('---------------------------------------------------------------')
  if (err) {
    console.log(err);
    return
  }
  console.log(`${pathUrl}home\n`);

  // opn(pathUrl + 'm/index')
})