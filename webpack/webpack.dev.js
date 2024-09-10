const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3003,
    host: "127.0.0.1",
    hot: false,
    inline: false,
    liveReload: false,
    compress: true,
    https: false,
    historyApiFallback: true,
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

