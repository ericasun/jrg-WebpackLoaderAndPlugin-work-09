# 09实现一个Webpack Plugin——HtmlWebpackPlugin
功能：实现一个HtmlWebpackPlugin，根据配置自动生成 HTML 文件，而无需手动创建或维护一个静态 HTML 文件，能动态改标题，自定义模板等等

## 代码路径
plugins/my-HtmlWebpackPlugin.js

## 安装依赖
npm install marked

# Project setup
```
npm install
```

# 编译
```
npm run  build
```

# 展示
```
cd dist

http-server -c-l
```
http://127.0.0.1:8080/my.html


# 自动部署
```
sh ./deploy.sh
```

# 预留问题
会影响到css和js文件的加载