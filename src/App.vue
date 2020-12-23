<template>
  <div id="app">
    <router-view class="Header" name="Header" />
    <keep-alive>
      <router-view id="bodyContain" style="padding: 105px 20px 20px 20px;overflow-y: scroll"/>
    </keep-alive>
    <back-top></back-top>
  </div>
</template>

<script>
import backTop from './components/function/backTop'
import storejs from 'storejs'
import {mapActions} from 'vuex'
import router from './router'
import routerFilter from './util/routerFilter'
import {backstagedminsMenuHttp} from './api/initAxios'

export default {
  name: 'App',
  components: {
    backTop
  },
  mounted () {
    if (storejs.get('headerMenu') && !(this.$route.path === '/login' || this.$route.path === '/')) {
      backstagedminsMenuHttp().then(res => {
        this.SetHeaderMenu(res)
        router.addRoutes(routerFilter.addRouterMethod(res).concat([{ // 这里调用addRoutes方法，动态添加符合条件的路由
          path: '*',
          redirect: '/404' // 所有不匹配路径(*)都重定向到404，为什么写在这里而不放到静态路由表里可以查看“前端路上”的文章
        }]))
      })
    }
  },
  methods: {
    ...mapActions([
      'SetHeaderMenu'
    ])
  }
}
</script>
<style lang="scss" scoped type="text/scss">
  #app {
    min-width: $Min-Full-Screen;
  }
</style>
