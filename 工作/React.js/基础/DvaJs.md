# 数据的流向

数据的改变发生通常是通过用户交互行为或者浏览器的行为(比如说路由跳转)触发的
当此类行为会改变数据的时候 可以通过 dispatch 触发一个 action
如果是同步的行为 直接通过 reducer 来改变 state
如果是异步行为 会先触发 effects 然后流向到 reducers 最终改变 state

## 状态 state

State 表示 model 的状态数据
操作的时候 每次都要当做不可改变的对象来对待
以保证每次都是全新的对象 没有引用关系
这样子才能保证 State 的独立性

## 行为 action

Action 是一个普通的 js 对象
它是改变 State 的唯一途径 无论是 UI 事件 网络回调
最终都通过一个 Dispatch 函数触发一个 action
从而改变对应的数据 action 必须带有 type 属性执行具体的行为
如果发起的时候 必须要带上 disptch 函数

## dispatch 函数

dispatching function 是一个用于触发 action 的函数
action 是改变 State 的唯一途径 但是它只描述了一个行为
dispatch 可以看做触发这个行为的方式 而 Reducer 则是描述
如何改变数据的

## Reducer

Reducer 函数接受两个参数 之前已经累计的结果 和当前要被累积的值
返回一个累积后的结果  
 参考 数组的 Reduce 归并

## effect

## 订阅 subscriptions
