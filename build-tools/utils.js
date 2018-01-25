const path = require('path')

const rootPathTo = function(toPath) {
  const ROOT_PATH = path.resolve(__dirname, '../')
  return path.resolve(ROOT_PATH, toPath)
}

const getPackageInfo = function() {
  return require(rootPathTo('./package.json'))
}

module.exports = {
  rootPathTo,
  getPackageInfo
}
