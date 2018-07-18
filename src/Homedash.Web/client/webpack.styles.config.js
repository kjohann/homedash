const postcssPresetEnv = require('postcss-preset-env');
const browserreporter = require('postcss-browser-reporter');
const reporter = require('postcss-reporter');
const cssnano = require('cssnano');

module.exports = (prod) => {
  let postcssPlugins = [];
  if (!prod) {
    postcssPlugins = [browserreporter(), reporter({ clearReportedMessages: true })];
  } else {
    postcssPlugins = [cssnano({ preset: 'default' })]
  }
  return [
    {
      loader: 'css-loader',
      options: {
        convertValues: false,
        autoprefixer: false,
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        plugins: () => [
          postcssPresetEnv({
            stage: 0,
            browsers: [
              ">= 1%",
              "last 2 versions",
              "Firefox ESR",
              "IE >= 9",
              "Safari >= 8",
              "iOS >= 8",
              "Edge >= 12"
            ]
          }),
          ...postcssPlugins
        ]
      }
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: true,
        lint: !prod
      }
    }
  ];
};