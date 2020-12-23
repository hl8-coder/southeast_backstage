<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div id="formInline">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <!--名称Member Code-->
      <el-form-item v-if="formInline.name === '' || formInline.name === null || formInline.name" label="Member Code">
        <el-input v-model="formInline.name" placeholder="Member Code" />
      </el-form-item>
      <!--STATEMENT ID-->
      <el-form-item v-if="formInline.StatementId === '' || formInline.StatementId === null || formInline.StatementId" label="Statement ID">
        <el-input v-model="formInline.StatementId" placeholder="Statement ID" />
      </el-form-item>
      <!--银行账号-->
      <el-form-item v-if="formInline.transaction === '' || formInline.transaction === null || formInline.transaction" label="Transaction ID">
        <el-input v-model="formInline.transaction" placeholder="Transaction ID" />
      </el-form-item>
      <!--币别-->
      <el-form-item v-if="formInline.currency === '' || formInline.currency === null ||  formInline.currency" label="Currency">
        <el-select v-model="formInline.currency" clearable placeholder="Select A Currency">
          <el-option v-for="item in DropList.currency" :label="item.value" :key="item.key" :value="item.key" />
        </el-select>
      </el-form-item>
      <!--account_no 转账账户-->
      <el-form-item v-if="formInline.account_no === '' || formInline.account_no === null || formInline.account_no" label="Account No">
        <el-input v-model="formInline.account_no" placeholder="Account No" />
      </el-form-item>
      <!--description 描述-->
      <el-form-item v-if="formInline.description === '' || formInline.description === null || formInline.description" label="Description">
        <el-input v-model="formInline.description" placeholder="Description" />
      </el-form-item>
      <!--amount 金额-->
      <el-form-item v-if="formInline.amount === '' || formInline.amount === null || formInline.amount" label="Amount">
        <el-input v-model="formInline.amount" placeholder="Amount" />
      </el-form-item>
      <!--bankAcct-->
      <el-form-item v-if="formInline.bankAcct === '' || formInline.bankAcct === null || formInline.bankAcct" label="Bank Acct">
        <el-input v-model="formInline.bankAcct" placeholder="Bank Acct" />
      </el-form-item>
      <!--bankName-->
      <!--状态-->
      <el-form-item v-if="formInline.status === '' || formInline.status === null || formInline.status" label="Status">
        <el-select v-model="formInline.status" clearable placeholder="Select A Status">
          <el-option v-for="item in DropList.status" :label="item.value" :key="item.key" :value="item.key" />
        </el-select>
      </el-form-item>
      <!--风控类别-->
      <el-form-item v-if="formInline.risk_group_id === '' || formInline.risk_group_id === null || formInline.risk_group_id" label="Risk Category">
        <el-select v-model="formInline.risk_group_id" clearable placeholder="Select A Risk Category">
          <el-option v-for="item in DropList.risk_group_id" :label="item.value" :key="item.key" :value="item.key" />
        </el-select>
      </el-form-item>
      <!--付款组-->
      <el-form-item v-if="formInline.payment_group_id === '' || formInline.payment_group_id === null || formInline.payment_group_id" label="Payment Group">
        <el-select v-model="formInline.payment_group_id" clearable placeholder="Select A Payment Group">
          <el-option v-for="item in DropList.payment_group_id" :label="item.value" :key="item.key" :value="item.key" />
        </el-select>
      </el-form-item>
      <!--bank_reference-->
      <el-form-item v-if="formInline.bank_reference === '' || formInline.bank_reference === null || formInline.bank_reference" label="Reference">
        <el-select v-model="formInline.bank_reference" clearable placeholder="Select A Reference">
          <el-option v-for="item in DropList.status" :label="item.value" :key="item.key" :value="item.key" />
        </el-select>
      </el-form-item>
      <!--邮箱-->
      <el-form-item v-if="formInline.email === '' || formInline.email === null || formInline.email" label="Email">
        <el-input v-model="formInline.email" placeholder="Email" />
      </el-form-item>
      <!--电话号码-->
      <el-form-item v-if="formInline.phone === '' || formInline.phone === null || formInline.phone" label="Contact No">
        <el-input v-model="formInline.phone" placeholder="Contact No" />
      </el-form-item>
      <!--注册地址-->
      <el-form-item v-if="formInline.register_url === '' || formInline.register_url === null || formInline.register_url" label="Register URL">
        <el-input v-model="formInline.register_url" placeholder="Register URL" />
      </el-form-item>
      <!--存款-->
      <el-form-item v-if="formInline.deposit === '' || formInline.deposit === null || formInline.deposit" label="Deposit">
        <el-input v-model="formInline.deposit" placeholder="Deposit" />
      </el-form-item>
      <!--银行账号-->
      <el-form-item v-if="formInline.BankNumber === '' || formInline.BankNumber === null || formInline.BankNumber" label="Bank account number">
        <el-input v-model="formInline.BankNumber" placeholder="Bank account number" />
      </el-form-item>
      <!--注册日期选择-->
      <el-form-item v-if="formInline.dataRange === '' || formInline.dataRange === null || formInline.dataRange" label="Registeration Date">
        <el-date-picker
          v-model="formInline.dataRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="|"
          start-placeholder="From"
          end-placeholder="To"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <!--日期选择-->
      <el-form-item v-if="formInline.dataRangeTime === '' || formInline.dataRangeTime === null || formInline.dataRangeTime" label="Date">
        <el-date-picker
          v-model="formInline.dataRangeTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="|"
          start-placeholder="From"
          end-placeholder="To"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <!--&lt;!&ndash;是否充值&ndash;&gt;-->
      <!--<el-form-item v-if="formInline.deposit === '' || formInline.deposit" label="deposit">-->
        <!--<el-switch-->
          <!--v-model="formInline.deposit"-->
          <!--active-color="#13ce66"-->
          <!--inactive-color="#ff4949"-->
          <!--active-text="Yes"-->
          <!--inactive-text="No"-->
        <!--/>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Search</el-button>
      </el-form-item>
      <el-form-item v-if="formInline.addInformatin === '' || formInline.addInformatin === null || formInline.addInformatin">
        <el-button icon="el-icon-plus" type="warning" circle @click="onAdd"></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'formInline',
  props: [
    'formInline', 'DropList'
  ],
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: 'Last week',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Last month',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'three months',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created () {
    console.log(this.DropList)
  },
  methods: {
    onSubmit () {
      if (this.formInline.dataRange) {
        this.formInline.start_at = this.formInline.dataRange ? moment(this.formInline.dataRange[0]).format('YYYY-MM-DD') : moment(this.formInline.dataRangeTime[0]).format('YYYY-MM-DD')
        this.formInline.end_at = this.formInline.dataRange ? moment(this.formInline.dataRange[1]).format('YYYY-MM-DD') : moment(this.formInline.dataRangeTime[1]).format('YYYY-MM-DD')
      } else {
        this.formInline.start_at = ''
        this.formInline.end_at = ''
      }
      this.$emit('onSubmit', this.formInline)
    },
    onAdd () {
      this.$emit('onAdd')
    }
  }
}
</script>
