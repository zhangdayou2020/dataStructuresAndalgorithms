/*
  选择排序的行为与冒泡排序相反,它每一次遍历都是找到最小的放在前面
  第一次遍历的数放到第一位
  第二次遍历的数放到第二位
  ...
  因此我们需要一个变量来保存当前遍历的最小数作为索引
*/
const orignArray = [3, 6, 4, 2, 11, 10, 5, 121, 22, 33];
// 比较方法
function swap(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
function selectSort(array) {
  let left = 0;
  let right = array.length - 1;
  let min = left; // 存储最小值的下标
  let max = left; // 存储最大值的下标
  while (left <= right) {
    min = left;
    max = left;
    // 这里只能用 <= 因为要取array[right]
    for (let i = left; i <= right; i++) {
      if (array[i] < array[min]) {
        min = i;
      }
      if (array[i] > array[min]) {
        max = i;
      }
    }
    swap(array, left, min);
    if (left === max) {
      max = min;
    }
    swap(array, right, max);
    left++;
    right--;
  }
  return array;
}
const resultArr = selectSort(orignArray);
console.log(resultArr, "resultArr");
