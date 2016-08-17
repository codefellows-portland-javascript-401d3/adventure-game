const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/src/main.js',
  output: {
    path: './app/dist',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/src/index.html'
    })
  ],
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.css$/,
      loader: 'style!css?sourceMap'
    }, {
      test: /\.html$/,
      loader: 'html'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015'] //,
        //cacheDirectory: true,
        //plugins: ['transform-runtime']
      }
    }]
  }
};
