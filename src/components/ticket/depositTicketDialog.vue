<style lang="scss" scoped type="text/scss">

</style>
<style lang="scss" type="text/scss">
  .depositTicketDialog .el-dialog{
    margin-top: 0 !important;
  }
  .depositTicketDialog .el-dialog__body{
    padding: 0 0 10px !important;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }
  .depositTicketDialog .el-dialog__header {
    padding: 3px 20px 10px;
  }
  .depositTicketDialog .el-dialog__headerbtn{
    top: 10px
  }
</style>
<template>
  <div class="depositTicketDialog" v-if="ticketConfig.ticketVisible">
    <el-dialog @close="refresh" :title="ticketConfig.data.display_status + ' Ticket'" width="1200px" :visible.sync="ticketConfig.ticketVisible">
      <deposit-ticket
        :ticketConfig = ticketConfig.data
        :DropListDeposit = DropListDeposit
        @refresh = refresh
      />
    </el-dialog>
  </div>
</template>

<script>
import depositTicket from './depositTicket'
export default {
  name: 'depositTicketDialog',
  props: ['ticketConfig', 'DropListDeposit'],
  components: {
    depositTicket
  },
  methods: {
    refresh () {
      this.ticketConfig.ticketVisible = false
      this.$parent.refresh()
    }
  }
}
</script>
