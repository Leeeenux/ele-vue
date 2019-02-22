require('es6-promise').polyfill() // 引入一次就行
import axios from 'axios'

// 创建 axios 实例
// 这里 export  的原因是方便组件外使用 axios
export const Axios = axios.create({
  baseURL: 'xxx', 
  timeout: 5000,
})

// 将 Axios 实例添加到Vue的原型对象上
export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}