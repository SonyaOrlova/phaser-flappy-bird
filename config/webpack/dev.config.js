const path = require('path');

const { merge } = require('webpack-merge');

module.exports = merge(
  require('./base.config.js'),
  {
    name: 'dev',
    mode: 'development',
    devServer: {
      host: '0.0.0.0',
      port: 8080,
      historyApiFallback: true,
      hot: true,
    },
  },
);
