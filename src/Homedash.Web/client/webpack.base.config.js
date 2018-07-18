module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './index.js'
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
      }
    ]
  }
};