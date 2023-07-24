# webpack5-react-typescript 스타터킷

## 종속성 설치
1. yarn add react react-dom
2. yarn add -D webpack webpack-bundle-analyzer webpack-cli webpack-dev-server webpack-merge
3. yarn add -D @babel/cli @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader
4. yarn add -D core-js css-loader css-minimizer-webpack-plugin html-webpack-plugin mini-css-extract-plugin style-loader sass sass-loader terser-webpack-plugin
5. yarn add -D @types/react @types/react-dom typescript
6. yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks
7. yarn add -D prettier eslint-plugin-prettier eslint-config-prettier
-------------------

## 프로젝트 구조
```
project
  ├─ config
  │   ├─ webpack.common.js
  │   ├─ webpack.dev.js
  │   └─ webpack.prod.js
  ├─ env
  │   ├─ .env.development
  │   └─ .env.production
  ├─ node_modules 
  ├─ public
  │   └─ index.html
  ├─ src 
  │   ├─ app
  │   │   └─ App.tsx
  │   ├─ language
  │   │   ├─ en.json
  │   │   ├─ ja.json
  │   │   └─ ko.json
  │   ├─ components
  │   │   └─ ...Common Component
  │   ├─ pages
  │   │   └─ ...Page Unit
  │   ├─ hooks
  │   │   └─ ...Custom hook
  │   ├─ modules
  │   │   └─ ...Modules
  │   └─index.tsx
  ├─ .babelrc
  ├─ .eslintrc.json
  ├─ .prettierrc.json
  ├─ package.json
  ├─ tsconfig.json
  ├─ README.md
  ├─ .gitignore
  └─ yarn.lock
```
-------------------  

## 설정 & 선택한 이유
- ["@babel/preset-react", { "runtime": "automatic" }]
  - import React from 'react'; 생략
   - react17 부터 생략이 가능하다고 하지만 react자체에 추가된 것이 아니라 빌드 시점에 '무언가' 처리 해주기 때문이다.
   - CRA 프로젝트에는 문제 없지만 직접 구성하는 경우 두가지 해결 방법이 존재한다.
     - Provide Plugin 으로 React 식별자를 만나면 react 모듈을 로드시키는 방법
     - @babel/preset-react의 runtime 속성을 `automatic`으로 설정 [babel](https://babeljs.io/blog/2020/03/16/7.9.0#a-new-jsx-transform-11154)   
  ```
   위 두가지에는 차이점이 존재하는데 첫번째 방법(Provide)은 기존 JSX Transform 된 코드에 React 모듈을 주입하는 거고
   두번째 방법은 JSX Transform 방식을 변경하여 기존 React.createElement()가 아닌 다른 문법을 사용하게 된다.  
  ```  
- typescript 트랜스파일러로 babel-loader 선택
  - 대표적인 장점: ts-loader보다 성능 우위 (타입을 제거해나가는 방식으로 진행 됨)
  - 대표적인 단점: 빌드 시점에 타입체크 불가
  - 보완: 현재는`@typescript-eslint/parser`로 코딩할때 어느정도 보완
- "@babel/preset-env": { modules: false }
  - ES 모듈을 그대로 보존하기 위함이다.
  - 트리쉐이킹 조건
- webpack resolve.alias: { '@': path.resolve(__dirname, '../src/') }
  - 모듈 import 시 절대경로로 통일하기 위함. 상대경로는 위치파악 및 폴더 뎁스 깊어질 경우 복잡
    - ex) import module from '../../../../../../../../module';
  - alias 설정 시  tsconfig의 paths도 설정 필수
