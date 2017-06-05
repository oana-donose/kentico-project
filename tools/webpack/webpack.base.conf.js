const path    = require('path');
const utils   = require('./utils');
const config  = require('./config');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, '../..', dir)
}

module.exports = {
  entry  : {
    'sitename.min': './source/js/sitename/sitename.js'
  },
  output : {
    path      : config.build.assetsRoot,
    filename  : '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json', '.scss', '.css'],
    modules   : [
      resolve('node_modules')
    ],
    alias     : {
      jquery: "jquery/src/jquery"
    }
  },
  plugins: [
    // makes jQuery available to every script file.
    new webpack.ProvidePlugin({
      $     : "jquery",
      jQuery: "jquery"
    })
  ],
  module : {
    rules: [
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        include: [resolve('source')]
      },
      {
        test  : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query : {
          limit: 10000,
          name : utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test  : /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query : {
          limit: 10000,
          name : utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  }
};
