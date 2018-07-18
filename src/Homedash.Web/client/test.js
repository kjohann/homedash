
const webpack = require('webpack');
const path = require('path');
const Config = require('webpack-config').default;
const { environment } = require('webpack-config');
const stylesConfig = require('./webpack.styles.config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const server = require('./webpack.server');

const port = environment.getOrDefault('port', 3000);

const config = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './index.js'
  ],
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
      {
        test: /images.*\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              hash: 'sha512',
              digest: 'hex',
              name: '[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
      {
        test: /icons.*\.svg$/,
        use: [
          {
            loader: 'svg-inline-loader',
            options: {
              removeTags: true,
              removeSVGTagAttrs: false,
              removingTagAttrs: ['id']
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { addAttributesToSVGElement: { attributes: [{ focusable: false }] } }
              ]
            }
          }
        ]
      },      
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

// console.log(JSON.stringify(config))

server(config);

module.exports = config;
