// npm install的插件和js直接不需要路径就能导入
import qs from 'qs'
import axios from 'axios'
import spark from 'spark-md5'

// 后端接口的服务器基础地址
const SERVER_BASE_URL = 'https://huhuiyu.top/teach_project_service'
// 本地存储token的名称
const SERVER_TOKEN_KEY = 'huhuiyu.teach.token'

// 保存服务器token信息
function saveToken(data) {
  if (data && data.token) {
    localStorage.setItem(SERVER_TOKEN_KEY, data.token)
  }
}

// 加载本地存储的token信息
function loadToken() {
  let token = localStorage.getItem(SERVER_TOKEN_KEY)
  return token ? token : ''
}

// 这里面的js按照es6的module规范编写即可
let tools = {
  info: '通用工具类',
  test() {
    // console.log('js导入测试', qs, axios, spark)
  },
  // md5加密方法
  md5(info) {
    if (info && info.trim() != '') {
      return spark.hash(info)
    }
    return ''
  }, // ajax请求对象
  // ajax的要素：1：后端api的path，2：请求的参数
  // 3：应答结果的处理回调function，4：请求的方式（可选，默认为post）
  ajax(path, params, cb, method) {
    // 完整的请求路径
    let url = SERVER_BASE_URL + path
    // 请求参数的处理（需要qs）
    let data = qs.stringify(params, { allowDots: true })
    // method的默认处理
    method = method ? method : 'post'
    if (method == 'get') {
      url = url + '?' + data
      data = ''
    }
    console.log('请求的参数信息', url, data, method)
    // 通过axios发起ajax请求
    let promise = axios({
      url: url,
      data: data,
      method: method,
      // token需要通过头信息传递
      headers: {
        token: loadToken(),
      },
    })
    // 应答结果的处理
    promise
      .then((resp) => {
        console.log('ajax请求结果：', resp)
        // 保存token
        saveToken(resp.data)
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

  // ajax文件上传
  // 参数1：上传的文件
  // 参数2：请求的参数
  // 参数3：请求的回调处理function
  upload(file, params, cb) {
    if (!file) {
      cb({ code: 500, success: false, message: '请选择文件' })
      return
    }
    if (file.size >= 2 * 1024 * 1024) {
      cb({ code: 500, success: false, message: '文件太大' })
      return
    }
    // ajax文件上传必须使用FormData处理
    let data = new FormData()
    data.append('file', file)
    // 处理请求参数
    for (let key in params) {
      data.append(key, params[key])
    }
    // 发起请求
    let promise = axios({
      url: SERVER_BASE_URL + '/user/file/upload',
      data: data,
      method: 'post',
      headers: {
        token: loadToken(),
        'Content-Type': 'multipart/form-data',
      },
    })

    // 应答结果的处理
    promise
      .then((resp) => {
        // console.log('ajax请求结果：', resp)
        // 保存token
        saveToken(resp.data)
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
  // 获取fid对应的文件下载链接地址
  getDownloadUrl(fid) {
    return SERVER_BASE_URL + '/user/file/download?fid=' + fid
  },
  // 获取开发者密钥
  getAccessKey() {
    return '42c7dba5-a802-46c4-b9e9-5c1fb250b0ef'
  },
  // 合并任意数量的json对象
  concatJson() {
    // 不定数量参数
    // console.log('参数数组' + arguments)
    let result = {}
    for (let i = 0; i < arguments.length; i++) {
      // 参数循环，逐个获取json参数
      let info = JSON.parse(JSON.stringify(arguments[i]))
      // json循环
      for (let key in info) {
        result[key] = info[key]
      }
    }
    return result
  },
}

export default tools
