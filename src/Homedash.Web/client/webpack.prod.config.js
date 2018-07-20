
const webpack = require('webpack');
const path = require('path');
const stylesConfig = require('./webpack.styles.config');
const base = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'production',
  entry: base.entry,
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('static'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.less'],
    enforceExtension: false,
    alias: {
      ie: 'component-ie'
    }
  },
  output: {
    path: path.resolve('../wwwroot'),
    filename: '[name]-bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index-template.html',
      filename: '../wwwroot/index.html',
      hash: false,
      devMode: true,
      inject: true
    })
  ],
  module: {
    rules: [
      ...base.module.rules,
      {
        test: /\.jsx?$/,
        include: [
          path.resolve('src'),
          path.resolve('index.js')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['transform-object-assign', 'babel-plugin-transform-react-jsx-source', 'react-hot-loader/babel']
          }
        }
      },
      {
        test: /\.(less|css)$/,
        use: ['style-loader', ...stylesConfig(false)]
      }
    ]
  }
};

module.exports = config;
