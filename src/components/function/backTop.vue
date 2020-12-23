<style lang="scss" scoped type="text/scss">
  .BackTop {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
</style>

<template>
    <div class="BackTop">
      <el-button circle v-if="isActive" @click="backTop" icon="el-icon-caret-top">Back Top</el-button>
    </div>
</template>

<script>
export default {
  name: 'BackTop',
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    backTop () {
      window.scrollTo(0, 0)
    },
    handleScroll () {
      // 获取滚动距顶部的距离，显示
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 200) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
