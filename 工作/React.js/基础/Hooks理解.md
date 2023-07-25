# 解决了什么问题

## 组件之间的状态和逻辑复用

## 复杂的组件变得难以理解

    组件期初很简单,但是逐渐会被状态逻辑和副作用充斥,每个生命周期中常常包含一些不相关
    的逻辑。比如说 组件常常在componentDidMount 和 componentDidUpdate
    中获取数据, 但是同一个componenDidMount 中常常包含其他逻辑,比如说设置事件的监听
    之后又需要在componentWillUnmount中清除,相互关联且彼此对照修改代码拆分
    而完全不相同的代码却在同一个方法中组合在一起

## 难以理解的 class

经常需要手动去绑定 this
