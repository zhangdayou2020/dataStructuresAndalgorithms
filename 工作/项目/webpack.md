# 优化构建速度

## 优化搜索文件

### 缩小文件搜索到范围

#### 合理使用 resolve 功能

    1. 别名 alias
    2. extensions
    3. modules

#### 配置 loader 时候

    使用test
    exclude
    includes 来缩小搜索范围

### 对匹配的稳健 进行分析转化

使用 module.noParse 告诉 webpack 不必要解析那些文件

## 通过使用 DllPlugin 和 DllReferencePlugin 避免重复编译第三方库

### DllPlugin

      创建一个dll-only-bundle 生成一个manifest.json文件用于让DllReferencePlugin
      能够映射到相应地依赖上
      把第三方库单独打包在一个文件中,这个文件就是一个单纯的依赖库,这个依赖库不会跟着我们
      的业务代码一起重新打包 只有当自身发生版本变化的时候才会重新打包

## 使用 HappyPack 开启多进程 Loader 转换

Loader 对文件的转换太消耗时间了,JS 是单线程模型 只能一个一个对文件进行处理
需要通过 HappyPack 将任务分解给多个子进程
最后将结果发给主进程,并行处理

# 优化开发体验

## 开启模块热替换 HMR

    模块热替换不刷新整个网页只编译发生变化的模块
    并且使用新模块 替换旧模块 所以预览反应更快 等待时间更少了
