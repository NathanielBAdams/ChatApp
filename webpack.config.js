const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = ['./src/client/index.js'];

const output = {
  path: path.resolve(__dirname, 'build'),
  publicPath: '/',
  // publicPath: '/build/',
  filename: 'bundle.js',
};

module.exports = {
  entry,
  output,
  devtool: 'eval-source-map',
  devServer: {
    // host: 'localhost',
    host: '0.0.0.0',
    port: 8080,
    publicPath: '/build/',
    hot: true,
    inline: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api/*': {
        // '/': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/auth/*': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        // test: /\.s[ac]ss$/i,
        test: /\.css/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
        // 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  performance: { hints: false },
};
