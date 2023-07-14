const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const {TARGET_ENV} = process.env;

module.exports = {
  entry: `${path.resolve(__dirname, "../src")}/index.tsx`,
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new Dotenv({
      path: path.resolve(__dirname, "../env", `.env.${TARGET_ENV}`),
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
