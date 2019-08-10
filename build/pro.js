require('shelljs/global'); // can replace unix shell scripts on nodejs

const path = require('path');
const CONFIG_DEV = require('../config.pro');
const ora =	require('ora');
const webpack =	require('webpack');

let webpackMerge = require('./conf.pro');

// console.log(
// `
// Tip:\
// Built files are meant to be served over an HTTP server.\
// Opening index.html over file:// won\'t work.\n
// `
// );

let spinner = ora('building for production...');
spinner.start();

let assetsPath = path.join(CONFIG_DEV.assetsRoot, CONFIG_DEV.assetsFileDirectory);

rm('-rf', CONFIG_DEV.assetsRoot);
mkdir('-p', assetsPath);
cp('-R', CONFIG_DEV.assetsFileDirectory + '/', path.join(assetsPath, '../'));

webpack(webpackMerge, function (err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
});
