# zhulogic-share-home
```
采用react框架搭建的微信端、APP开发环境
```

## 技术栈
react + react-dom + react-router + ES6/ES7 + webpack + sass + nodejs

## 项目运行
 1. node v8.1.2
 2. npm 5.0.3
 3. react 15.4.2
 4. react-dom 15.4.2
 5. react-router 3.0.0
```
克隆，或者直接下载
git clone https://github.com/smalleast/zhulogic-share-home.git

进入文件夹
cd zhulogic-share-home

安装依赖
npm install
```

### 编译环境
```
开启本地服务器
npm run dev    开发
npm run test   测试
npm run build  生产
```

## 说明
```
>  如有问题或者遇到坑请直接在 Issues 中提，或者可以加我的QQ 382026180

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

```

## 项目布局
```
|-- build      // webpack的配置目录
|   |-- site.config.js      // 模块入口的路径配置文件
|   |-- webpack.base.js      // webpack编译文件的配置文件
|   |-- webpack.config.js      // webpack的服务配置文件
|   |-- webpack.dev.conf.js      // 开发使用的编译文件 npm run dev
|   |-- webpack.test.conf.js      // 开发使用的编译文件 npm run test
|   |-- webpack.prod.conf.js      // 打包生产编译包的文件 npm run build
|-- src      // 静态源码目录
|   |-- components      // 组件
|       |-- scripts      // 公共的组件js
|       |-- services      // 所有跟服务器交互的js文件
|       |-- styles      // 全局公共样式
|   |-- assets      // 公共静态文件、图片
|   |-- modules      //	所有的页面
|   |-- vendor      // 引用的公共插件
|-- .babelrc      // ES6语法编译配置
|-- .editorconfig      // 代码编写规格
|-- .gitignore      // git忽略的文件
|-- .npmrc      // npm配置管理及设置代理
|-- index.html      // 入口html文件
|-- package.json      // 项目及工具的依赖配置文件
|-- webpack.config.js      // webpack 配置文件
|-- README.md      // 说明
```