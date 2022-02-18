const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { PATH } = require('./vars');

module.exports = {
  entry: {
    app: path.resolve(PATH.PROJECT, 'src/app.js'),
  },
  output: {
    path: path.resolve(PATH.PROJECT, PATH.PUBLIC),
    filename: '[name].[contenthash:16].js',
  },
  resolve: {
    modules: [path.resolve(PATH.PROJECT, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                sourceMap: true,
                includePaths: [path.resolve('src')],
              },
            },
          },
        ],
      },
      {
        test: /\.(webp|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[contenthash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(PATH.PROJECT, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      chunks: ['app', 'vendor'],
      scriptLoading: 'blocking',
    }),
    new webpack.ProvidePlugin({
      Phaser: 'phaser',
    }),
  ],
};
