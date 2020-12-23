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
      <li v-for="item in navs" :key="item.name">
        <el-button
          :type="$route.name===item.routeName ? 'success': null"
          @click="$router.push({name: item.routeName, query:{id: $route.query.id, breadcrumb: $route.query.breadcrumb}})">
          {{ item.name }}
        </el-button>
      </li>
      <li>
        <el-button
          type="danger"
          @click="$router.push({name: 'affiliate_affiliate_listing', query: {breadcrumb: $route.query.breadcrumb}})">
          Back previous page
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SubNav',
  props: ['navs']
}
</script>
