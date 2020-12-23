<style lang="scss">

</style>
<template>
  <div class="AccountSummary">
    <search-navs
      :user_name="formInline.user_name"
      @searchMemberCode="callbacks"
    />
    <div class="TheTotalInfo">
      <el-tag type="success">Deposit (+) {{totalInfo.deposit}}</el-tag>
      <el-tag type="danger">Withdrawal (-){{totalInfo.withdrawal}}</el-tag>
      <el-tag>Total Adjustment {{totalInfo.adjustment}}</el-tag>
      <el-tag type="warning" style="float: right;">Main Wallet Balance {{totalInfo.available_balance}}</el-tag>
    </div>
    <table-comp
      v-if="formInline.user_name"
      :table-config="tableConfig"
      :res-information="resInformation"
    />
    <table-comp
      style="margin-top: 10px"
      v-if="formInline.user_name"
      :table-config="secTableConfig"
      :res-information="secResInformation"
    />
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import {
  backstagePaymentFundTransferAccountSummaryHttp,
  backstagePaymentFundTransferAccountSummaryTotalHttp,
  backstagePaymentFundTransferAccountSummaryProductTotalHttp,
  backstageGamePlatformsBalance
} from '../../api/payment/fundTransfers/initAxiosFundTransfer'
import filter from '../../util/filter'
import SearchNavs from './FundTransfers/SearchNavs'
import TotalInfo from './FundTransfers/TotalInfo'
export default {
  name: 'AccountSummary',
  components: {TotalInfo, SearchNavs, TableComp, FormInlineComp},
  data () {
    return {
      formInline: {
        user_name: ''
      },
      tableConfig: {
        border: true,
        loading: true,
        summary: true,
        tableColumn: [
          {
            prop: 'platform_code',
            label: ''
          },
          {
            prop: 'transfer_in',
            label: 'Total Transfer in'
          },
          {
            prop: 'transfer_out',
            label: 'Total Transfer out'
          },
          {
            prop: 'profit',
            label: 'Total Win/Lose'
          },
          {
            prop: 'promotion',
            label: 'Total Promotion'
          },
          {
            prop: 'balance',
            label: 'Wallet Balance'
          }
        ]
      },
      resInformation: {},
      secTableConfig: {
        border: true,
        loading: false,
        tableColumn: [
          {
            prop: 'open_bet',
            label: 'Total Stake'
          },
          {
            prop: 'stake',
            label: 'Total Eligilble'
          },
          {
            prop: 'profit',
            label: 'Total W/L'
          },
          {
            prop: 'ratio',
            label: 'Ratio'
          }
        ]
      },
      secResInformation: {},
      totalInfo: {}
    }
  },
  methods: {
    // 提交表单与分页回调
    callbacks (value) {
      this.formInline.user_name = value
      this.initAccountSummary(this.formInline)
      this.totalData(this.formInline)
      this.totalBet(this.formInline)
    },
    // 初始化
    initAccountSummary (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstagePaymentFundTransferAccountSummaryHttp(datalist).then(res => {
        res.forEach(item => {
          if(item.platform_code !== 'Total') {
            backstageGamePlatformsBalance(item.platform_code, {user_name: this.formInline.user_name}).then(res1 => {
              item.balance = res1.balance
            })
          }
        })
        this.resInformation.data = res

        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // Total Data
    totalData (formInline) {
      var datalist = filter.formInlineFilter(formInline)
      backstagePaymentFundTransferAccountSummaryTotalHttp(datalist).then(res => {
        this.totalInfo = res
      }).catch((error) => {
        console.log(error)
      })
    },
    totalBet (formInline) {
      this.secTableConfig.loading = true
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstagePaymentFundTransferAccountSummaryProductTotalHttp(datalist).then(res => {
        this.secResInformation.data = res.data
        this.secTableConfig.loading = false
      }).catch((error) => {
        this.secTableConfig.loading = false
        console.log(error)
      })
    }
  },
  activated () {
    let name = this.$route.query.name
    if (name) {
      this.formInline.user_name = name
      this.initAccountSummary(this.formInline)
      this.totalData(this.formInline)
      this.totalBet(this.formInline)
    }
  }
}
</script>
