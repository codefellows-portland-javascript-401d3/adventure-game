const webpackConfig = require('./webpack.config');

webpackConfig.entry = {};

module.exports = function (config) {
  config.set({

    //base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    //frameworks to use
    //available frameworks:
    frameworks: ['mocha', 'chai'],

    //list of files / patterns to load in the browser
    files: [
      './app/src/app.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './test/**/*.js'
    ],
    webpack: webpackConfig,

    preprocessors: {
      './app/src/app.js': ['webpack'],
      './test/**/*.js': ['babel']
    },

    browsers: ['Chrome', 'Safari'],

    reporters: ['spec'],

    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: true,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: false
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false,

    concurrency: Infinity
  });
};
