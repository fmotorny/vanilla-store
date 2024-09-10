const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3003,
    host: "127.0.0.1",
    compress: true,
    https: false,
    historyApiFallback: true,
    webSocketServer: false,
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    devMiddleware: {
      index: true,
      publicPath: '/',
      writeToDisk: false
    },
    client: {
      logging: 'log',
    },
    allowedHosts: "all"
  }
});

