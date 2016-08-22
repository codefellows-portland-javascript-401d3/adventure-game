const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/main.js',
  output: {
    path: '../server/public',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })],
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        cacheDirectory: true
      }
    },
    {
      test: /\.css$/,
      loader: 'style!css?sourceMap'
    },
    {
      test: /\.html$/,
      loader: 'html'
    }
    ]
  }
};
