---
order: 0
title: 介绍
---

## 介绍

## 安装

## 开发

### 目录结构

```
│   .eslintrc
│   .gitignore
│   .prettierrc
│   index.js
│   
├───build-tools
│       babel.config.js
│       build.js
│       gen.js
│       utils.js
│       webpack.base.config.js
│       webpack.dev.config.js
│       webpack.prod.config.js
│       
├───dist
│               
├───site
│   │   bisheng.config.js
│   │       
│   └───theme
│                   
├───src
│   │   index.js
│   │   
│   ├───helloworld
│   │   │   index.jsx
│   │   │           
│   │   ├───doc
│   │   │   │   
│   │   │   └───demo
│   │   │           
│   │   ├───style
│   │   │       
│   │   └───test
│   │           
│   └───timer
│       │   index.jsx
│       │   
│       ├───doc
│       │   │   readme.md
│       │   │   
│       │   └───demo
│       │           basic.md
│       │           
│       ├───style
│       │       index.scss
│       │       
│       └───test
│               index.test.js
│               
└───_site
        index.html
```

### Dev Server

```bash
$ npm install
$ npm start
```

