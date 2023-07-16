/*
  冒泡排序是一种简单 直观的排序算法
  其取名源于自然界中水泡在上升过程中不断变大的过程

  冒泡排序的行为类似 一个双重循环
  外循环决定内循环的次数
  内循环用于找到最大的数
*/
const orignArray = [3,6,4,2,11,10,5,121,22,33]

// 比较方法
function swap(array, a, b){
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp
}
function bubbleSort(orignArray){
  let sortArray = orignArray
  let num = sortArray.length;
  for(let i = 1; i<num;i++){
    for(let j =0; j < num -i;j++){
      // i 增大 内存循环比较次数 num-i
      if(sortArray[j] >sortArray[j+1]){
        swap(sortArray, j,j+1)
      }
    }
  }
  return sortArray
}
/*
    如果原先的数组就是有序的
    比如说 [1,2,3,4] 那么我们在内部循环中可以引入访问标志位
    这的的标志位就是为了记录
    在一次外循环中 若满足比较条件则进行交换,并更改标志位,如果在一次外循环中标志位
    没有改动,说明原本该子数组是有序的 无需交换,那么下轮外循环就不需要进行
  */
function optimizeBubble(orignArray){
  let sortArray = orignArray
  let num = sortArray.length;
  for(let i = 1; i<num;i++){
    // 标志位
    let hasSort = true;
    for(let j =0; j < num -i;j++){
      // i 增大 内存循环比较次数 num-i
      if(sortArray[j] >sortArray[j+1]){
        swap(sortArray, j,j+1)
        hasSort = false;
      }
    }
    if(hasSort){
      break;
    }
  }
  return sortArray

}

// 鸡尾酒排序
/*
  双向冒泡排序,称之为鸡尾酒排序
  是一种冒泡排序的变形
*/

function cocktailSort(orignArray){
  let sortArray = orignArray
  // 定义变量

  let left, right, index, i;
  left = 0;// 数组起始的索引
  right = sortArray.length -1;// 数组索引的最大值
  index = left;// 临时变量
  // 判断数组种是否有多个元素
  while(right > left){
    // 标志位
    let isSorted = false;
    // 每一次进入while 循环 都会找出相应范围内最大最小的元素,并放在相应的位置上
    // 大的排在后面
    for(i = left; i<right; i++){
      // 从左到右扫描
      if(sortArray[i]>sortArray[i+1]){
        // 交换位置
        swap(sortArray,i,i+1)
        index  = i;// 记录当前的索引
        isSorted = true;
      }
    }
    right = index; //记录最后一个交换的位置
    // 小的放到前面
    for(i = right; i>left;i--){
      // 从最后一个交换位置从右向左扫描
      if(sortArray[i]<sortArray[i-1]){
        swap(sortArray,i,i-1)
        index  = i;// 记录当前的索引
        isSorted = true;
      }
    }
    left = index;// 记录最后一个交换的位置
    if(!isSorted){
      break;
    }
  }
  return sortArray;

}
const resultArray = cocktailSort(orignArray)
console.log(resultArray,'resultArray')