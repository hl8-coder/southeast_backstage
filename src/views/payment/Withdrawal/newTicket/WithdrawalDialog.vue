<style lang="scss">
  .WithdrawalDialog {
    line-height: 1.4;
    .el-dialog{
      margin-top: 0 !important;
      padding: 0;
    }
    .el-dialog__header {
      padding: 0 20px 0 !important;
    }
    .el-dialog__headerbtn {
      top: 5px;
    }
    .el-dialog__body {
      padding: 0 0 10px !important;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
  }
</style>
<template>
  <div class="WithdrawalDialog">
    <el-dialog
      :visible.sync="withdrawalDetail.formStatus"
      width="1200px"
    >
      <Withdrawal-ticket
        :withdrawalDetail = withdrawalDetail
        :dropList="dropList"
        @refreshOpenWithdrawal = refreshOpenWithdrawal
        @backstagePaymentWithdrawalInfoHttp = backstagePaymentWithdrawalInfoHttp
      />
    </el-dialog>
  </div>
</template>

<script>
import WithdrawalTicket from '../../Withdrawal/Ticket/WithdrawalTicket'
export default {
  name: 'WithdrawalDialog',
  props: ['withdrawalDetail', 'dropList'],
  data () {
    return {
    }
  },
  components: {
    WithdrawalTicket
  },
  methods: {
    backstagePaymentWithdrawalInfoHttp (id) {
      this.$parent.backstagePaymentWithdrawalInfoHttp(id)
    },
    // 更新数据
    refreshOpenWithdrawal () {
      this.withdrawalDetail.formStatus = false
      this.$emit('refreshOpenWithdrawal')
    }
  }
}
</script>
