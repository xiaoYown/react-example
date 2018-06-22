require('shelljs/global'); // can replace unix shell scripts on nodejs

const path = require('path');
const config = require('../config');
const ora =	require('ora');
const webpack =	require('webpack');

if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.build.env.NODE_ENV);

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

let assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);

rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', config.dev.assetsSubDirectory + '/', path.join(assetsPath, '../'));

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
