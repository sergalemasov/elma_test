var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
        })
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'app'),
        loaders: [
          {
            loader: 'to-string-loader'
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});