<style scoped>
  .el-dialog {
    margin-top: 10rem !important;
  }
</style>
<template>
  <div class="WithdrawalAddTransactions">
    <el-dialog
      append-to-body
      class="Remarks"
      title="Add Amount Fee FundOut"
      :visible.sync="addTransactionsForm.statusFormVisible">
      <el-form label-position="right" label-width="80px" :model="transactions">
        <el-form-item label="Amount">
          <el-input @blur="addPoint(transactions.amount)" v-model="transactions.amount"></el-input>
        </el-form-item>
        <el-form-item label="Fee">
          <el-input @blur="addPoint(transactions.fee)" v-model="transactions.fee"></el-input>
        </el-form-item>
        <el-form-item label="Fund Out">
          <el-select v-model="transactions.company_bank_account_code" placeholder="Fund Out">
            <el-option
              v-for="item in dropList.company_bank_account_code"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addAmountFeeFundOutForm">submit</el-button>
          <el-button @click="addTransactionsForm.statusFormVisible = false">cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import numeral from 'numeral'
import filter from '../../../../util/filter'
import element from '../../../../config/element'
export default {
  name: 'WithdrawalAddTransactions',
  props: ['addTransactionsForm', 'dropList'],
  data () {
    return {
      transactions: {
        amount: '',
        fee: '',
        company_bank_account_code: ''
      },
      list: {
        totalAmount: 0,
        totalFee: 0,
        data: this.addTransactionsForm.transactions ? this.addTransactionsForm.transactions : []
      }
    }
  },
  watch: {
    'transactions.amount' (newValue, oldValue) {
      this.transactions.amount = filter.numeralChange(newValue, oldValue)
    },
    'transactions.fee' (newValue, oldValue) {
      this.transactions.fee = filter.numeralChange(newValue, oldValue)
    }
  },
  methods: {
    addAmountFeeFundOutForm () {
      if (this.transactions.amount) {
        if (this.transactions.company_bank_account_code) {
          let temp = {
            amount: numeral(this.transactions.amount).value(),
            fee: numeral(this.transactions.fee).value(),
            company_bank_account_code: this.transactions.company_bank_account_code
          }
          this.list.totalAmount += Number(temp.amount)
          this.list.totalFee += Number(temp.fee)
          this.list.data.push(temp)
          this.transactions = {
            amount: '',
            fee: '',
            company_bank_account_code: ''
          }
          this.addTransactionsForm.statusFormVisible = false
          console.log(this.list)
          this.$emit('amountFeeFundOutList', this.list)
        } else {
          element.message({
            type: 'error',
            message: 'Fund Out field is required'
          })
        }
      } else {
        element.message({
          type: 'error',
          message: 'Amount field is required'
        })
      }
    },
    // 数字标准化
    addPoint (value) {
      console.log(value)
    }
  }
}
</script>
