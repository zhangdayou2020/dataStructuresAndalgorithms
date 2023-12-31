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

# Hooks 的规则

只能在函数组件的最外层调用 Hooks。
这个规则的含义是指在函数组件的顶层作用域下调用 Hooks，不能在条件语句、循环、嵌套函数或任何 JavaScript 的内置函数中调用 Hooks。React 依赖于 Hooks 调用顺序来跟踪组件状态，如果违反这个规则，React 无法正确追踪组件状态的更新，从而可能导致出现不可预料的问题。

## 保持调用的一致性

内部是基于调用顺序来确定每个 Hook 的含义
如果在不同的渲染流程中以不同的顺序调用 Hook 那么就 React 就无法判断那个 Hook 对应
那个状态,这可能导致整个组件状态错乱,难以理解和维护

## 让 React 可以正确地跟踪 Hook 的状态：

React 在内部使用一个数组来存储当前组件的 Hook 状态。当组件重新渲染时，它会根据数组的顺序找到相应的 Hook 状态。如果 Hook 调用的顺序发生变化，React 就会认为某个 Hook 对应之前的状态，这将导致不一致的状态更新，从而导致应用程序的错误行为。

## 确保 Hook 能够正常工作：

Hooks 的设计依赖于 React 对其调用顺序的期望。如果你在不允许的地方调用 Hook，可能会导致 Hook 的内部状态出现问题，影响组件的正确运行。

# useState

## 每一次渲染都独立的闭包

每一次渲染它都有自己的 props 和 state
每一次渲染它都有自己的事件处理函数
当点击更新状态的时候 函数组件都会重新被调用,那么每一次渲染都是互相独立,
取到的值不会受后面操作的影响

## 性能优化

### 减少渲染次数

默认情况下 只要父组件状态变了(不管子组件依不依赖该状态),子组件也会重新渲染
一般的优化
1 类组件 使用 pureComponent
2 函数组件 使用 React.memo
将函数组件传递给 memo 之后,就会返回一个新的组件
新组件的功能: 如果接收到属性不变,则不会重新渲染函数
但是每一次的 useState 都是生成一个新的状态 所以这个直接 React.memo 是不行的
应该是使用 useMemo

#### useCallback

接收一个回调函数和一个依赖项数组（子组件依赖父组件的状态，即子组件会使用到父组件的值）
useCallback 会返回该回调函数 memoized 版本,该回调函数仅在某个
依赖项改变时才会更新

### useMemo

这个我在内核那边根据数组返回使用过
将创建函数和依赖项数组作为参数传入 useMemo,它仅会在某个依赖项改变时候
才会重新计算 memoized 值 这样有助于避免每次渲染时候进行高开销计算

# useRef && useImperativeHandle

## useRef

    类组件元素使用 React.createRef 函数组件使用useRef
    useRef 返回一个可变的ref对象 其中current属性被初始化传入为参数initialValue

useRef 返回的 ref 对象在整个组件生命周期内保持不变
也就是说每一次重新渲染函数组件时候 返回的 ref 对象都是同一个

forwardRef
因为函数组件没有实例 所以函数组件无法像类组件一样可以接收 ref 属性
forward 可以在父组件中操作子组件的 ref 对象
forwardRef 可以将父组件中的 ref 对象转发到子组件的 dom 元素伤
子组件接受 props 和 ref 作为参数
