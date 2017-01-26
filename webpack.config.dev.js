const { resolve } = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    './src/emulator-app.js'
  ],
  output: {
    path: resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'public'),
    publicPath: '/',
  },
  resolve: {
    // Allowed implicit extensions for require/import
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CopyWebpackPlugin([
      { context: 'node_modules/@anyware/sound-assets',
        from: '**/*.wav',
        to: 'sounds',
      },
      { context: 'images',
        from: 'disk*.png',
        to: 'images'
      }]),
    new HtmlWebpackPlugin({
      inject: false, // Done by html-webpack-template
      template: require('html-webpack-template'),
      title: 'anyWare Emulator',
      appMountId: 'content',
      favicon: 'images/favicon.ico',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      // General purpose CSS loader, needed by e.g. react-bootstrap-table
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // General purpose LESS loader, needed by e.g. bootstrap and our own less stylesheets
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },

      // The following 5 rules are needed by bootstrap
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader'] },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'application/font-woff'}}] },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'application/octet-stream'}}] },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'image/svg+xml'}}] },
    ]
  }
};
