const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
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
      exclude: /node_modules/,
      query: {
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
    }]
  }
};
