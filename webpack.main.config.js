const rules = require('./webpack.rules');
var webpack = require('webpack');
var path = require('path');
var ignore = new webpack.IgnorePlugin(new RegExp("/(node_modules|ckeditor)/"))

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.node'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ],
  },
  plugins: [
  ]
};
