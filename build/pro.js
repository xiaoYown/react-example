require('shelljs/global'); // can replace unix shell scripts on nodejs

const path = require('path');
const CONFIG = require('../base.config');
const ora =	require('ora');
const webpack =	require('webpack');

if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(CONFIG.build.env.NODE_ENV);

let webpackMerge = require('./conf.pro');

console.log(
`
Tip:\
Built files are meant to be served over an HTTP server.\
Opening index.html over file:// won\'t work.\n
`
);

let spinner = ora('building for production...');
spinner.start();

let assetsPath = path.join(CONFIG.build.assetsRoot, CONFIG.build.assetsSubDirectory);

rm('-rf', CONFIG.build.assetsRoot);
mkdir('-p', assetsPath);
cp('-R', CONFIG.dev.assetsFileDirectory + '/', path.join(assetsPath, '../'));

webpack(webpackMerge, function (err, stats) {
  spinner.stop()
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
});
