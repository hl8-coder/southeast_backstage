<template>
  <div class="member" align="center">
    <h3>LAST 10 TRANSACTIONS</h3>
    <div class="box" style="height: 9rem;line-height: 1;">
      <el-row
        v-for="item in lastTen"
        :key="item.id"
      >
        <el-col :span="6" align="center">
          <el-link @click="showThisWithdrawal(item.id)" type="primary">{{item.order_no}}</el-link>
        </el-col>
        <el-col :span="7" align="center" v-if="item.created_at">{{lastTransaction.display_status}}</el-col>
        <el-col :span="10">{{item.created_at}}</el-col>
      </el-row>
    </div>
    <el-link type="primary" @click="allTrans(lastTransaction.user.name)">VIEW ALL TRANSACTIONS</el-link>
  </div>
</template>

<script>
export default {
  name: 'WithdrawalLastTransactions',
  props: ['lastTransaction'],
  data () {
    return {
      lastTen: this.lastTransaction.last_ten_withdrawals
    }
  },
  computed: {
    computedLastTen () {
      return this.lastTransaction.last_ten_withdrawals
    }
  },
  watch: {
    'externalRemarks.data': function (val) {
      this.lastTen = val.last_ten_withdrawals
    }
  },
  methods: {
    showThisWithdrawal (id) {
      var URL = document.URL.split('?')[0] + '?id=' + id
      window.open(URL)
    },
    allTrans (name) {
      let breadcrumb = ['payment', 'Fund Transfers', 'withdrawalHistory']
      let routeData = this.$router.resolve({
        name: 'payment_fund_transfers_withdrawal_history',
        query: {breadcrumb: JSON.stringify(breadcrumb), name: name}
      })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style scoped>

</style>
