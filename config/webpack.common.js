const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { TARGET_ENV } = process.env;

dotenv.config({
  path: path.resolve(__dirname, '../env', `.env.${TARGET_ENV}`),
});

module.exports = {
  entry: `${path.resolve(__dirname, '../src')}/index.tsx`,
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        ...process.env,
      }),
    }),
    // @babel/preset-react runtime 설정으로 대체. babel8부터 default
    // new webpack.ProvidePlugin({
    //   React: 'react',
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
