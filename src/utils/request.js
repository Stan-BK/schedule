import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      if (res.code == 403) {
        Message({
          message: "登录过期，请重新登录" || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (res.code == 404) {
        Message({
          message: "资源丢失" || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (res.code == 400) {
        Message({
          message: res.data.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (res.code == 1001) {
        Message({
          message: res.data.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (res.code == undefined) {
        console.log(res) // 如axios请求中设置了responseType: 'blob', 则axios拦截器会将响应内容处理为blob对象
        // var blob = new Blob([res], {                     // 如响应内容为二进制流，需手动转换为blob对象
        //   type: 'application/msexcel;charset=utf-8'
        // })
        var downloadELement = document.createElement('a') //  创建a标签以提供点击下载资源
        var href = window.URL.createObjectURL(res) // 创建一个指代File对象或Blob对象的URL
        var name = Date.now()
        downloadELement.href = href // 将URL挂载到a标签
        downloadELement.download = `${name}.xls` // 使用a标签的download属性可以使a标签点击行为触发下载
        document.body.appendChild(downloadELement)
        downloadELement.click()
        document.removeChild(downloadELement)
        window.URL.revokeObjectURL(href)
        return
      } else {
        Message({
          message: "服务器错误" || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.data.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
