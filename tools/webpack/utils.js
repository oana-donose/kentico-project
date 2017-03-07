const path              = require('path');
const config            = require('./config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
};

exports.cssLoaders = function (options = {}) {
  //options = options || {}

  //var cssLoader = {
  //  loader: 'css-loader',
  //  options: {
  //    minimize: process.env.NODE_ENV === 'production',
  //    sourceMap: options.sourceMap
  //  }
  //}

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [
      {loader: 'css-loader', options: {sourceMap: true}},
      //{loader: 'webfonts-loader'},
      {loader: 'postcss-loader'},
      {loader: 'sass-loader', options: {sourceMap: true}},
    ]

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders
      })
    } else {
      return [{loader: 'style-loader'}].concat(loaders)
    }
  }

  return {
    css : generateLoaders(),
    scss: generateLoaders('sass')
  }
}

exports.styleLoaders = function (options) {
  var output  = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    // console.log(extension)
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use : loader
    })
  }
  return output
}
