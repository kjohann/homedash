
const webpack = require('webpack');
const path = require('path');
const { environment } = require('webpack-config');
const stylesConfig = require('./webpack.styles.config');
const base = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const server = require('./webpack.server');

const port = environment.getOrDefault('port', 3000);

const config = {
  mode: 'development',
  entry: base.entry,
  devtool: 'cheap-module-source-map',
  devServer: {
    port,
    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' }
  },
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
    path: path.resolve('dist'),
    filename: '[name]-bundle.js',
    publicPath: `http://localhost:${port}/static/`
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: 'true'
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
      template: 'index-template.html',
      filename: '../../wwwroot/index.html',
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

server(config);

module.exports = config;
