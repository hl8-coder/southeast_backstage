import axios from 'axios'
// import {ERROR_OK} from '../api/config'
import router from '../router'
// import {
//   Message
// } from 'element-ui'
import storejs from 'storejs'
// import {Message} from 'element-ui'
import element from '../config/element'
axios.defaults.headers = {
  'Content-Type': `application/x-www-form-urlencoded; charset=UTF-8`,
  'Accept': 'application/json, text/plain, */*',
  'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 10000
axios.defaults.retry = 0
axios.defaults.retryDelay = 1000
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做某事
  var token = storejs.get('access_token')
  if (token && router.currentRoute.name !== 'Login') {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, error => {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 添加响应拦截
axios.interceptors.response.use(response => {
  // 对响应数据做些事
  return response.data
}, err => {
  var config = err.config
  // If config does not exist or the retry option is not set, reject
  // if (!config || !config.retry) return Promise.reject(err)
  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0
  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    var statusCode = err.response.data.status_code
    var message = err.response.data.message
    if (statusCode === 401) {
      router.push({name: 'Login'})
    }
    console.log(err.response)
    if (statusCode !== 415) {
      if (message) {
        element.message({
          type: 'error',
          message: message
        })
      }
    }
    return Promise.reject(err)
  }
  // Increase the retry count
  config.__retryCount += 1
  // Create new promise to handle exponential backoff
  var backoff = new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, config.retryDelay || 1)
  })
  // Return the promise in which recalls axios to retry the request
  return backoff.then(() => {
    return axios(config)
  })
})
