const serve = require('webpack-serve');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.WEBPACK_SERVE = 'development';

process.on('unhandledRejection', (err) => {
  throw err;
});

module.exports = (config) => {
  serve({}, {
    config,
    port: config.devServer.port,
    clipboard: false,
    devMiddleware: {
      publicPath: config.output.publicPath,
      headers: config.devServer.headers
    }
  }).then((server) => {
    server.on('build-started', () => {
      console.log('webpack-serve: build-started');
    });
    server.on('build-finished', () => {
      console.log('webpack-serve: build-finished');
    });
    server.on('compiler-error', () => {
      console.log('webpack-serve: compiler-error');
    });
    server.on('compiler-warning', () => {
      console.log('webpack-serve: compiler-warning');
    });
    server.on('listening', () => {
      console.log('webpack-serve: listening');
    });
  });
};