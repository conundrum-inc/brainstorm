var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client/public');
var APP_DIR = path.resolve(__dirname, 'client/app');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module : {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader',
      }
    ]
  }
};

module.exports = config;
