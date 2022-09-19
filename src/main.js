import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入饿了么ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入过滤器      @符号表示src目录
import '@/filters/myfilters'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
