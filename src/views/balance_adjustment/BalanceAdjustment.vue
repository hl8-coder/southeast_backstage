<style lang="scss" scoped type="text/scss">
  .PrivateMessage{
    .radio{
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <div class="BalanceAdjustment">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'BalanceAdjustment'
}
</script>
