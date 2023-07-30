/*
  封装axios
  1.网络请求发生错误活着catch捕获到错误的时候 reject返回code:-1,message
  2.网络请求正常的话,且结果正常返回 resolve 返回data.t
  3.网络请求正常 但是没有正常返回结果 抛出异常
  方便在外层调用中进行容错逻辑处理
*/
import axios, { AxiosRequestConfig, AxiosError } from "axios";
interface ResponseData<T> {
  code: number;
  message: string;
  t: T;
}

export default function request<T>(options: AxiosRequestConfig) {
  const { data, method = "GET" } = options;
}
