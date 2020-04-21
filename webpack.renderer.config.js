const rules = require('./webpack.rules');
const path = require('path');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
}, {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    'file-loader',
  ],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  output: {
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '3d-tools': path.resolve(__dirname, 'src/renderer/3d-tools'),
      'utils': path.resolve(__dirname, 'src/renderer/utils'),
      'consts': path.resolve(__dirname, 'src/renderer/consts'),
      'assets': path.resolve(__dirname, 'src/renderer/components/Arena/assets'),
    }
  }
};
