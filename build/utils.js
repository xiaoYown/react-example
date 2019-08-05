const path = require('path');
const CONFIG = require('../base.config');

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? CONFIG.build.assetsSubDirectory
    : CONFIG.dev.assetsFileDirectory
  return path.posix.join(assetsSubDirectory, _path)
};
