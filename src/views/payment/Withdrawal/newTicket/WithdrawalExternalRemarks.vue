<template>
  <div class="member">
    <h3 style="text-align: left">EXTERNAL REMARKS</h3>
    <el-form>
      <el-form-item>
        <el-input :rows="4" type="textarea" v-model="remark.remark"></el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button class="buttonRight" type="primary" @click="withdrawalAddRemark">Modify</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {backstagePaymentWithdrawalRemarkHttp} from '../../../../api/payment/withdraw/initAxiosWithdrawal'

export default {
  name: 'WithdrawalExternalRemarks',
  props: ['externalRemarks'],
  data () {
    return {
      remark: {
        remark: ''
      }
    }
  },
  watch: {
    'externalRemarks': function (val) {
      this.remark.remark = val.remark
    }
  },
  mounted () {
    this.remark.remark = this.externalRemarks.remark
  },
  methods: {
    // 添加备注
    withdrawalAddRemark () {
      if (this.remark.remark) {
        backstagePaymentWithdrawalRemarkHttp(
          this.externalRemarks.id,
          this.remark
        ).then(res => {
          this.$message.success('success!')
          this.$emit('closeWithdrawalTicket')
          this.externalRemarks.formStatus = false
        }).catch((error) => {
          this.externalRemarks.formStatus = false
          console.log(error)
        })
      } else {
        this.$message.error('Please input remark!')
      }
    }
  }
}
</script>

<style scoped>

</style>
