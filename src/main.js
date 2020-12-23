// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import clipboard from 'clipboard'
Vue.prototype.clipboard = clipboard
Vue.use(VueQuillEditor)
// import {mapActions} from 'vuex'
import './assets/css&&scss/common.css'// 全局css文件
import './assets/css&&scss/vivify.min.css'// 全局css文件
import './Axios'
// import storejs from 'storejs'
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 } // Element全局配置
// Vue.use(Element)// 使用Element
Vue.config.productionTip = false
import './Element/Element'// 导入Element
// 全局过滤和方法
import './filter/index.js'
// Vue.use(filter)
// import {backstagDropListGlobalHttp} from './api/initAxios'
// 尽可能兼容
// Promise.polyfill()
/* eslint-disable no-new */
Vue.directive('loaded-callback', {
  inserted: function (el, binding, vnode) {
    binding.value(el, binding, vnode)
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // this.backstagDropListGlobalHttp()
  },
  methods: {
    // ...mapActions([
    //   'SetGlobalDropList'
    // ]),
    // backstagDropListGlobalHttp () {
    //   var token = storejs.get('access_token')
    //   if (token && router.currentRoute.name !== 'Login') {
    //     backstagDropListGlobalHttp().then(res => {
    //       this.SetGlobalDropList(res)
    //     }).catch((error) => {
    //       console.log(error)
    //     })
    //   }
    // }
  }
})
