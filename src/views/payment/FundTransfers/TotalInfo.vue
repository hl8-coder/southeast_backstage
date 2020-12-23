<template>
  <div class="TotalInfo">
    <el-tag>{{totalTransactions}} transactions</el-tag>
    <el-tag type="success">Deposit (+) {{totalDeposit}}</el-tag>
    <el-tag type="danger">Withdrawal (-) {{totalWithdrawal}}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'TotalInfo',
  props: ['list'],
  data () {
    return {}
  }
}
</script>

<style scoped>
.TotalInfo {
  margin: 5px;
}
</style>
