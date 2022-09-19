import Vue from 'vue'
Vue.filter('timer', function (value, format) {
  if (!value) {
    return ''
  }
  format = format ? format : 'yyyy-MM-dd hh:mm:ss'
  let data = new Date()
  data.setTime(value)
  let year = data.getFullYear()
  let M = data.getMonth() + 1
  let d = data.getDate()
  let h = data.getHours()
  let m = data.getMinutes()
  let s = data.getSeconds()
  let result = format.replace(/yyyy/g, year)
  result = result.replace(/MM/g, M)
  result = result.replace(/dd/g, d)
  result = result.replace(/hh/g, h)
  result = result.replace(/mm/g, m)
  result = result.replace(/ss/g, s)
  return result
})
