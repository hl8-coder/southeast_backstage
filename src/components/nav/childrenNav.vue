<style lang="scss" scoped type="text/scss">
  .childrenNav{
    margin-bottom: 10px;
    .childrenNav{
      li{
        margin-right: 10px;
      }
    }
  }
</style>

<template>
    <div class="childrenNav">
        <ul class="FlexRowFlexStartFlexStart childrenNav">
          <li v-for="item in Nav" :key="item.name">
            <el-button :type="$route.name===item.code? 'warning': null" @click="$router.push({name: item.code})">{{item.name}}</el-button>
          </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'csPaymentNav',
  data () {
    return {}
  },
  props: ['Nav']
}
</script>
