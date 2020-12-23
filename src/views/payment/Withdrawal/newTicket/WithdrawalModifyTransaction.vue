<template>
  <div class="WithdrawalModifyTransaction">
    <el-dialog
      append-to-body
      title="Add Amount Fee FundOut"
      :visible.sync="modifyTransaction.statusFormVisible">
      <el-form label-position="right" label-width="80px" :model="modifyTrans">
        <el-form-item label="Amount">
          <el-input v-model="modifyTrans.amount"></el-input>
        </el-form-item>
        <el-form-item label="Fee">
          <el-input v-model="modifyTrans.fee"></el-input>
        </el-form-item>
        <el-form-item label="Fund Out">
          <el-select v-model="modifyTrans.company_bank_account_code" placeholder="Fund Out">
            <el-option
              v-for="item in dropList.company_bank_account_code"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modifyTransactionForm">submit</el-button>
          <el-button @click="modifyTransaction.statusFormVisible = false">cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'WithdrawalModifyTransaction',
  props: ['modifyTransaction', 'dropList'],
  data () {
    return {
      modifyTrans: {
        key: this.modifyTransaction.data.key,
        amount: this.modifyTransaction.data.amount,
        fee: this.modifyTransaction.data.fee,
        company_bank_account_code: this.modifyTransaction.data.company_bank_account_code
      }
    }
  },
  // 利用computed 和 watch 将props的值赋给data中的变量
  computed: {
    computedModifyTrans () {
      let transactionComputed = {
        key: this.modifyAmountFeeFundOut.data.key,
        amount: this.modifyAmountFeeFundOut.data.amount,
        fee: this.modifyAmountFeeFundOut.data.fee,
        company_bank_account_code: this.modifyAmountFeeFundOut.data.company_bank_account_code
      }
      return transactionComputed
    }
  },
  watch: {
    'modifyTransaction.data': function (val) {
      this.modifyTrans = {
        key: val.key,
        amount: val.amount,
        fee: val.fee,
        company_bank_account_code: val.company_bank_account_code
      }
    }
  },
  methods: {
    modifyTransactionForm () {
      if (this.modifyTrans.amount) {
        if (this.modifyTrans.company_bank_account_code) {
          this.modifyTransaction.statusFormVisible = false
          this.$emit('modifyFeeFundOutList', this.modifyTrans)
        } else {
          this.$message.error('Fund Out field is required')
        }
      } else {
        this.$message.error('Amount field is required')
      }
    }
  }
}
</script>

<style scoped>

</style>
