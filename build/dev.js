const express =	require('express');
const webpack =	require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxyMiddleware = require('http-proxy-middleware');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const webpackMerge = require('./conf.dev');
const CONFIG_DEV = require('../config.dev');
const smp = new SpeedMeasurePlugin(); // 构建打点

var app = express();

var compiler = webpack(smp.wrap(webpackMerge));

compiler.plugin("done", params => {
  console.log(`open your browser: ${CONFIG_DEV.url}\n`);
});

var devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/',
  stats: 'minimal'
});
// proxy api requests
Object.keys(CONFIG_DEV.proxyTable).forEach(function (context) {
  var options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(context, options));
});

app.use(require('connect-history-api-fallback')({
  rewrites: CONFIG_DEV.rewrites
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

app.use('/' + CONFIG_DEV.assetsPublicPath, express.static(CONFIG_DEV.assetsFileDirectory));

module.exports = app.listen(CONFIG_DEV.port);
