// npm install的插件和js直接不需要路径就能导入
import qs from 'qs'
import axios from 'axios'
// import spark from 'spark-md5'

// 获取api的基础地址
const SERVER_BASE_URL = 'https://restapi.amap.com/v3'

// 本地储存token(token是用来做访问权限控制的（没有token，不能去那些需要token才能访问的页面），调用哪些需要授权的api接口，多个地方都要使用，所以要找个地方统一存放
//token直接存放在本地存储，拿出来不太方便，要先从本地存储取出，再放到vue实例的data函数中，还有它不是响应式的，也就是本地存储里面的内容发生改变，页面不会发生改变

// const SERVER_TOKEN_KEY = 'liuzhen.token'

// 保存服务器token信息
// function saveToken(data) {
//   if (data && data.token) {
//     localStorage.setItem(SERVER_TOKEN_KEY, data.token)
//   }
// }

// 加载本地储存信息的token信息
// function loadToken() {
//   let token = localStorage.getItem(SERVER_TOKEN_KEY)
//   return token ? token : ''
// }

let serve = {
  ajax(path, params, cb, method) {
    method = 'get'
    let promise = axios({
      url: SERVER_BASE_URL + path,
      data: qs.stringify(params, { allowDots: true }),
      method: method,
    })
    promise
      .then((resp) => {
        console.log('ajax请求结果：', resp)
        // 保存token
        // 回调只需要应答的服务器端数据，不需要完整的resp信息
        cb(resp.data)
      })
      // es6的箭头函数
      .catch((error) => {
        console.error('请求异常：', error)
        // 定制错误请求信息
        cb({ code: 500, success: false, message: '请求异常' })
      })
  },
}
export default serve
