<template>
  <div class="UserProductDailyReports">
    <form-inline-comp
      :form-inline-config="formInlineConfig"
      @onSubmit = callbacks
    />
    <div>
      <el-tag>Stake: {{resInformation.meta.stake}}</el-tag>
      <el-tag>Effective Bet: {{resInformation.meta.effective_bet}}</el-tag>
      <el-tag>Close Bonus Bet: {{resInformation.meta.close_bonus_bet}}</el-tag>
      <el-tag>Close Cash Back Bet: {{resInformation.meta.close_cash_back_bet}}</el-tag>
      <el-tag>Close Adjustment Bet: {{resInformation.meta.close_adjustment_bet}}</el-tag>
      <el-tag>Close Deposit Bet: {{resInformation.meta.close_deposit_bet}}</el-tag>
      <el-tag>Calculate Rebate Bet: {{resInformation.meta.calculate_rebate_bet}}</el-tag>
      <el-tag>Calculate Reward Bet: {{resInformation.meta.calculate_reward_bet}}</el-tag>
      <el-tag>Profit: {{resInformation.meta.profit}}</el-tag>
      <el-tag>Effective Profit: {{resInformation.meta.effective_profit}}</el-tag>
      <el-tag>Calculate Cash Back Profit: {{resInformation.meta.calculate_cash_back_profit}}</el-tag>
      <el-tag>Rebate: {{resInformation.meta.rebate}}</el-tag>
      <el-tag>Bonus: {{resInformation.meta.bonus}}</el-tag>
      <el-tag>Cash Back: {{resInformation.meta.cash_back}}</el-tag>
      <el-tag>Proxy Bonus: {{resInformation.meta.proxy_bonus}}</el-tag>
    </div>
    <table-comp
      :table-config="tableConfig"
      :res-information="resInformation"
      @handleSizePageChange = callbacks
      @sortChange="sortChange"
    />
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstageITToolUserProductDailyReportHttp,
  backstageITToolUserProductDailyReportDropListHttp
} from '../../api/it_tools/initAxios'
import {mapGetters} from 'vuex'
import FormInlineComp from '../../components/form/formInlineComp'
export default {
  name: 'UserProductDailyReports',
  components: {FormInlineComp, TableComp},
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'user_id',
            label: 'Member ID'
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'user_name',
            label: 'Member Code'
          },
          {
            prop: 'platform_code',
            label: 'Platform Code'
          },
          {
            prop: 'product_code',
            label: 'Product Code'
          },
          {
            prop: 'date',
            label: 'Date'
          },
          {
            prop: 'stake',
            label: 'Stake',
          },
          {
            prop: 'effective_bet',
            label: 'Effective Bet'
          },
          {
            prop: 'close_bonus_bet',
            label: 'Close Bonus Bet'
          },
          {
            prop: 'close_cash_back_bet',
            label: 'Close Cash Back Bet'
          },
          {
            prop: 'close_adjustment_bet',
            label: 'Close Adjustment Bet'
          },
          {
            prop: 'close_deposit_bet',
            label: 'Close Deposit Bet'
          },
          {
            prop: 'calculate_rebate_bet',
            label: 'Calculate Rebate Bet',
          },
          {
            prop: 'calculate_reward_bet',
            label: 'Calculate reward Bet',
            sortable: 'custom'
          },
          {
            prop: 'profit',
            label: 'Profit',
            sortable: 'custom'
          },
          {
            prop: 'effective_profit',
            label: 'Effective Profit',
            sortable: 'custom'
          },
          {
            prop: 'calculate_cash_back_profit',
            label: 'Calculate Cash Back Profit',
            sortable: 'custom'
          },
          {
            prop: 'rebate',
            label: 'Rebate',
            sortable: 'custom'
          },
          {
            prop: 'bonus',
            label: 'Bonus'
          },
          {
            prop: 'cash_back',
            label: 'Cash Back'
          },
          {
            prop: 'proxy_bonus',
            label: 'Proxy Bonus'
          }
        ]
      },
      resInformation: {},
      formInline: {
        per_page: 50,
        page: 1,
        product_code: '',
        user_name: '',
        date: '',
        currency: ''
      },
      dropList: {},
      formInlineConfig: [
        {
          type: 'select',
          label: 'Product Code',
          formValue: 'product_code',
          placeholder: 'Select A Product Code',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Currency',
          formValue: 'currency',
          placeholder: 'Select A Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'oneDate',
          label: 'Date',
          formValue: 'date',
          placeholder: 'Date',
          pickerType: 'date',
          value: ''
        },
        {
          type: 'search'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  methods: {
    // 分页，搜索
    callbacks (value) {
      console.log('sdsd')
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initUserProductDailyReports(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initUserProductDailyReports(this.formInline)
        return
      }
      this.initUserProductDailyReports(value)
    },
    // 数据初始化
    initUserProductDailyReports (formInline) {
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
      backstageITToolUserProductDailyReportHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 下拉
    userProductDailyReportsDropListHttp () {
      filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
      backstageITToolUserProductDailyReportDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['product_code'])
        this.dropList = res
      }).catch(() => {
      })
    },
    sortChange (obj) {
      this.initUserProductDailyReports(Object.assign(this.formInline, obj))
    }
  },
  created () {
    this.initUserProductDailyReports(this.formInline)
    this.userProductDailyReportsDropListHttp()
  }
}
</script>

<style scoped>

</style>
