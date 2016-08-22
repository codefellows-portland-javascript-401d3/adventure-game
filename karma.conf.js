const webpackConfig = require('./webpack.config');
// over writes the entry parameter from the webpack config file, SUPER IMPORTANT
webpackConfig.entry = {};

module.exports = function(config) {
  config.set({
    // basepath will resolve all patterns (eg. files, excludes)
    basepath : '',
    // frameworks defines which testing frameworks we'll be using
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks : ['mocha', 'chai'],
    // list of files and patterns to load in the browser
    files : [
      './src/app.js', /* once app is split from main!!! */
      './node_modules/angular-mocks/angular-mocks.js',
      './test/**/*.js'
    ],
    // points to the webpack config settings so that karma is aware of how it's set up for each individual app
    webpack : webpackConfig,
    // preprocess matching files with defined preprocessor before sending to browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors : {
      './src/app.js' : ['webpack'], /*  */
      './test/**/*.js' : ['babel']
    },
    // which browsers are we going to test the app in? Must be on your computer so no Edge or IE on a Mac...
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers : ['Chrome', 'Safari', 'Firefox'],
    // which visual reporter are we going to see displaying the output
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters : ['progress'],
    // web server port
    port : 9876,
    // enable / disable colors in output (reporters and logs)
    colors : true,
    // sets level of error information
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel : config.LOG_INFO,
    // enable disable watching file whenever there are changes
    autoWatch : true,
    // turns this to be compatible with CI apps
    singleRun : false,
    // how many browsers should be started simultaneously
    concurrency : Infinity
  });
};
