require('shelljs/global'); // can replace unix shell scripts on nodejs

const path = require('path');
const CONFIG_PRO = require('../config.pro');
const ora =	require('ora');
const webpack =	require('webpack');
const entries = require('./entries');

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

let assetsPath = path.join(CONFIG_PRO.assetsRoot, CONFIG_PRO.assetsFileDirectory);

rm('-rf', CONFIG_PRO.assetsRoot);
mkdir('-p', assetsPath);
cp('-R', CONFIG_PRO.assetsFileDirectory + '/', path.join(assetsPath, '../'));

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
  if (CONFIG_PRO.takeToProject) {
    mkdir(CONFIG_PRO.viewsFolder);
    // copy template
    Object.keys(entries).forEach(page => {
      let fileName = `${page}.${CONFIG_PRO.templateFileSuffix}`;
      let viewPath = path.join(CONFIG_PRO.assetsRoot, fileName);
      cp('-R', viewPath, path.join(CONFIG_PRO.viewsFolder, fileName))
    });
    // copy static source
    cp('-R', path.join(CONFIG_PRO.assetsRoot, CONFIG_PRO.assetsFileDirectory), CONFIG_PRO.staticFolder);
  }
});
