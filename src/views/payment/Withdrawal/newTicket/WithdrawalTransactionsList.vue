<template>
  <div>
    <div class="member">
      <el-row>
        <el-col :span="20" align="center">
          <h3>
            Total Amount : {{transactions.totalAmount}}
            &nbsp;&nbsp;&nbsp;
            Total Fees : {{transactions.totalFee}}
            &nbsp;&nbsp;&nbsp;
            Remain Amount :
            <span v-if="transactions.balance !== 0" style="color: #f00">{{transactions.balance}}</span>
            <span v-else>{{transactions.balance}}</span>
          </h3>
        </el-col>
        <el-col :span="4" align="center">
          <el-button
            size="small"
            v-if="transactionsList.add_transactions_btn_is_show"
            class="button--small"
            @click="addRecord"
            type="primary">Add</el-button>
        </el-col>
      </el-row>
      <el-row
        v-for="(item, key) in transactions.records"
        :key="key"
      >
        <el-col :span="6" align="center">Amount: {{item.amount | AllFilter('numeral')}}</el-col>
        <el-col :span="6" align="center">Fee: {{item.fee | AllFilter('numeral')}}</el-col>
        <el-col :span="6" align="center">Fund Out: {{item.company_bank_account_code}}</el-col>
        <el-col :span="6">
          <el-button
            size="small"
            v-if="transactionsList.add_transactions_btn_is_show"
            @click="modifyTrans(key)"
            class="button--small"
            type="success">Modify</el-button>
          <el-button
            size="small"
            v-if="transactionsList.add_transactions_btn_is_show"
            @click="deleteTrans(key)"
            class="button--small"
            type="danger">Delete</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      append-to-body
      class="Remarks"
      :title="transactionsForm.title"
      :visible.sync="transactionsForm.status"
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="transactions">
        <el-form-item
          label="Amount"
        >
          <el-input
            v-model="recordForm.amount"
          />
        </el-form-item>
        <el-form-item
          label="Fee"
        >
          <el-input
            v-model="recordForm.fee"
          />
        </el-form-item>
        <el-form-item
          label="Fund Out">
          <el-select
            v-model="recordForm.company_bank_account_code"
            placeholder="Fund Out"
          >
            <el-option
              v-for="item in dropList.company_bank_account_code"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="recordFormSubmit">Submit</el-button>
          <el-button @click="transactionsForm.status = false">cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import WithdrawalAddTransactions from './WithdrawalAddTransactions'
import WithdrawalModifyTransaction from './WithdrawalModifyTransaction'
import filter from '../../../../util/filter'
import numeral from 'numeral'
import element from '../../../../config/element'
import {backstagePaymentWithdrawalAddRecords} from '../../../../api/payment/withdraw/initAxiosWithdrawal'
export default {
  name: 'WithdrawalTransactionsList',
  components: {WithdrawalModifyTransaction, WithdrawalAddTransactions},
  props: ['transactionsList', 'dropList'],
  data () {
    return {
      transactions: {
        totalAmount: '',
        totalFee: '',
        balance: '',
        records: []
      },
      addTransactionsForm: {
        statusFormVisible: false,
        transactions: this.transactionsList.records
      },
      theDropList: {},
      modifyAmountFeeFundOut: {
        statusFormVisible: false,
        data: {}
      },
      transactionsForm: {
        title: '',
        status: false
      },
      recordForm: {
        amount: '',
        fee: '',
        company_bank_account_code: ''
      },
      recordsKey: ''
    }
  },
  watch: {
    'transactionsList': function (val) {
      this.transactions.totalAmount = numeral(val.paid_amount).format('0,0.00')
      this.transactions.totalFee = numeral(val.paid_fee).format('0,0.00')
      this.transactions.balance = numeral(Number(numeral(val.amount).value()) - Number(val.paid_amount)).format('0,0.00')
      let records = val.records
      if (records === null) {
        records = []
      }
      this.transactions.records = records
    },
    'recordForm.amount' (newValue, oldValue) {
      this.recordForm.amount = filter.numeralChange(newValue, oldValue)
    },
    'recordForm.fee' (newValue, oldValue) {
      this.recordForm.fee = filter.numeralChange(newValue, oldValue)
    }
  },
  methods: {
    // 初始化数据
    initRecordValue () {
      this.transactions.totalAmount = numeral(this.transactionsList.paid_amount).format('0,0.00')
      this.transactions.totalFee = numeral(this.transactionsList.paid_fee).format('0,0.00')
      this.transactions.balance = numeral(Number(numeral(this.transactionsList.amount).value()) - Number(this.transactionsList.paid_amount)).format('0,0.00')
      let records = this.transactionsList.records
      if (records === null) {
        records = []
      }
      this.transactions.records = records
    },
    // 更改转账记录
    modifyTrans (key) {
      this.recordsKey = key
      this.transactionsForm.status = true
      this.transactionsForm.title = 'Update Record'
      this.recordForm = {
        amount: this.transactions.records[key].amount,
        fee: this.transactions.records[key].fee,
        company_bank_account_code: this.transactions.records[key].company_bank_account_code
      }
    },
    // 删除转账记录
    deleteTrans (key) {
      this.transactions.records.splice(key, 1)
      this.countTrans()
    },
    // 计算trans
    countTrans () {
      let data = this.transactions.records
      let totalAm = 0
      let totalFee = 0
      for (var i = 0; i < data.length; i++) {
        totalAm = totalAm + Number(data[i].amount)
        totalFee = totalFee + Number(data[i].fee)
      }
      this.transactions.totalAmount = numeral(totalAm).format('0,0.00')
      this.transactions.totalFee = numeral(totalFee).format('0,0.00')
      this.transactions.balance = numeral(Number(numeral(this.transactionsList.amount).value()) - totalAm).format('0,0.00')
    },
    // 添加Record
    addRecord () {
      this.transactionsForm.status = true
      this.transactionsForm.title = 'Add Record'
      this.recordForm = {
        amount: '',
        fee: '',
        company_bank_account_code: ''
      }
    },
    // 添加或更新 Record
    recordFormSubmit () {
      if (!this.recordForm.amount) {
        element.message({
          type: 'error',
          message: 'Amount field is required'
        })
        return false
      }
      if (!this.recordForm.company_bank_account_code) {
        element.message({
          type: 'error',
          message: 'Fund Out field is required'
        })
        return false
      }
      if (this.recordsKey !== '') {
        this.transactions.records[this.recordsKey] = {
          amount: numeral(this.recordForm.amount).value(),
          fee: numeral(this.recordForm.fee).value(),
          company_bank_account_code: this.recordForm.company_bank_account_code
        }
      } else {
        let temp = {
          amount: numeral(this.recordForm.amount).value(),
          fee: numeral(this.recordForm.fee).value(),
          company_bank_account_code: this.recordForm.company_bank_account_code
        }
        this.transactions.totalAmount += Number(temp.amount)
        this.transactions.totalFee += Number(temp.fee)
        this.transactions.records.push(temp)
      }
      this.countTrans()
      if (numeral(this.transactions.fee).value() > 20) {
        element.message({
          type: 'error',
          message: 'The fee can\'t exceed 20!'
        })
        return false
      }
      backstagePaymentWithdrawalAddRecords(this.transactionsList.id, this.transactions).then(res => {
        element.message({
          type: 'success',
          message: 'success!'
        })
        this.transactionsForm.status = false
        this.$emit('closeWithdrawalTicket', false)
      }).catch((error) => {
        this.transactionsForm.status = false
        this.$emit('closeWithdrawalTicket', false)
        console.log(error)
      })
    }
  },
  mounted () {
    this.initRecordValue()
  }
}
</script>

<style scoped>
  .el-button--small, .el-button--small.is-round {
    padding: 2px 5px;
  }
</style>
