var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './app.js',
  devtool: 'source-map',

  output: {
    path: __dirname + '/public',
    filename: 'build.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: __dirname + '/public',
    port: 8000,
    inline: true,
    hot: true
  }
};