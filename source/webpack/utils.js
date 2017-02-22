var path = require('path')
var config = require('./config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    loaders = [
      {loader: 'css-loader', options: {sourceMap: true}},
      { loader: 'postcss-loader' },
      {loader: 'sass-loader', options: {sourceMap: true}}
    ]

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders
      })
    } else {
      return [ {loader: 'style-loader'} ].concat(loaders)
    }
  }

  return {
    // style: generateLoaders(),
    css: generateLoaders(),
    // postcss: generateLoaders(),
    // less: generateLoaders('less'),
    // sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass')
    // stylus: generateLoaders('stylus'),
    // styl: generateLoaders('stylus')
  }
}

exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    // console.log(extension)
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      // test: '/\\.' + extension + '$/',
      use: loader
    })
  }
  console.log(JSON.stringify(output))
  return output
  // return [{
  //   test: /\.s?css$/,
  //   loader: ExtractTextPlugin.extract({
  //     fallbackLoader: 'style-loader',
  //     loader: [
  //           { loader: 'css-loader' },
  //           { loader: 'postcss-loader' },
  //           { loader: 'sass-loader', options: {} }
  //     ]
  //   })
  // }]
  // return [
  //   {
  //     test: /\.s?css$/,
  //     use: [
  //       'style-loader',
  //       'css-loader?importLoaders=1',
  //       {
  //         loader: 'postcss-loader',
  //         options: {
  //           plugins: function () {
  //             return [
  //               // require('precss'),
  //               require('autoprefixer')
  //             ]
  //           }
  //         }
  //       },
  //       'sass-loader'
  //     ]
  //   }
  // ]
}
