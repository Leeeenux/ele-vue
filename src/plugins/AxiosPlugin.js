require('es6-promise').polyfill() // 引入一次就行
import axios from 'axios'
import QS from 'qs';
import router from '@/router'

// 创建 axios 实例
// 这里 export  的原因是方便组件外使用 axios
export const Axios = axios.create({
  timeout: 5000,
  baseURL: 'http://127.0.0.1',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'token': localStorage.getItem("token")
  },
  withCredentials: true

})
// export function post(url, params) {
//   return new Promise((resolve, reject) => {
//     axios.post(url, QS.stringify(params))
//       .then(res => {
//         console.log(res.data);
//       })
//       .catch(err => {
//         console.log(err.data)
//       })
//   });
// }

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  if (response.data.code == 401) {
    router.push({path:'/login'})
  }
  // 对响应数据做点什么

  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 将 Axios 实例添加到Vue的原型对象上
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}