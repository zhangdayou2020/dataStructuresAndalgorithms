/*
  参看后盾人向军的课程
*/
class HD {
  // 由于状态值是固定的 所以声明为静态属性
  static PENDING = "pending";
  static FUFILLED = "fulfiled";
  static REJECTED = "rejected";
  // 执行者
  constructor(executor) {
    this.status = HD.PENDING; // 默认是准备状态的
    this.value = null;
    this.callbacks = []; // 以后要执行的函数
    try {
      // 需要专门绑定当前this
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  //解决
  resolve(value) {
    //状态不可逆的  只能从准备到解决或者拒绝
    if ((this.status = HD.PENDING)) {
      this.status = HD.FUFILLED;
      this.value = value;
      // 从回调中寻找成功执行的方法
      this.callbacks.map((callback) => {
        callback.onFulfilled(value);
      });
    }
  }
  //拒绝;
  reject(reason) {
    if ((this.status = HD.PENDING)) {
      this.status = HD.REJECTED;
      this.value = reason;
    }
    this.callbacks.map((callback) => {
      callback.onRejected(reason);
    });
  }
  then(onFulfilled, onRejected) {
    /*
      错误的情况进行处理
    */
    if (typeof onFulfilled !== "function") {
      onFulfilled = () => {};
    }
    if (typeof onRejected !== "function") {
      onRejected = () => {};
    }
    console.log(this, "查看一下this");
    // 处理一下准备的状态
    if ((this.status = HD.PENDING)) {
      console.log("能走到这个状态码");
      this.callbacks.push({
        onFulfilled: (value) => {
          try {
            onFulfilled(value);
          } catch (error) {
            onRejected(error);
          }
        },
        onRejected: (value) => {
          try {
            onRejected(value);
          } catch (error) {
            onRejected(error);
          }
        },
      });
    }
    if ((this.status = HD.FUFILLED)) {
      // 需要异步执行 使用定时器
      setTimeout(() => {
        try {
          onFulfilled(this.value);
        } catch (error) {
          onRejected(error);
        }
      });
    }
    if ((this.status = HD.REJECTED)) {
      setTimeout(() => {
        try {
          onRejected(this.value);
        } catch (error) {
          onRejected(error);
        }
      });
    }
  }
}
