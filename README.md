# webpack5-react-typescript 스타터킷

## 종속성 설치
1. yarn add react react-dom
2. yarn add -D webpack webpack-bundle-analyzer webpack-cli webpack-dev-server webpack-merge
3. yarn add -D @babel/cli @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader
4. yarn add -D core-js css-loader css-minimizer-webpack-plugin html-webpack-plugin mini-css-extract-plugin style-loader sass sass-loader terser-webpack-plugin
5. yarn add -D @types/react @types/react-dom typescript
-------------------

## 프로젝트 구조
```
project 
  ├─ config
  │   ├─webpack.common.js
  │   ├─webpack.dev.js
  │   └─webpack.prod.js
  ├─ node_modules 
  ├─ public
  │   └─index.html
  ├─ src 
  │   ├─App.tsx
  │   └─index.tsx
  ├─ .babelrc
  ├─ package.json
  ├─ tsconfig.json
  └─ yarn.lock
```
-------------------

## 설정
* webpack.common.js
```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// BundleAnalyzer는 Bundle 최적화 용도로 보통 사용합니다.

module.exports = {
  entry: `${path.resolve(__dirname, "../src")}/index.tsx`,
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
    }), // 모듈이 자동으로 로드되어 import React from 'react' 생략 가능
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
```
<br/>

- webpack.dev.js
```javascript
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    open: false,
    hot: true,
    compress: true,
    port: 8081,
    historyApiFallback: true,
    liveReload: true,
  },
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});
```
<br/>

- webpack.prod.js
```javascript
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "./",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
```

> typescript 변환을 위해 과거에는 ts-loader를 사용했지만 babel 7버전 이후부터는 필요없습니다.  
> (성능도 babel-loader가 우위) 

<br />

- .babelrc
```
{
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ],
    "@babel/preset-typescript"
  ]
}
```
<br/>

- tsconfig.json
```
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "es5",
    "module": "esnext",
    "jsx": "react-jsx",
    "noImplicitAny": true,
    "allowSyntheticDefaultImports": true,
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```
