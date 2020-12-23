<template>
  <div class="AffiliateTopUp">
    <affiliate-fund-transfer-nav
      :user_name="formInline.user_name"
      @searchMemberCode = searchMemberCode
    />
    <form-inline-comp
      :form-inline-config="formInlineConfig"
      @onSubmit = callbacks
    />
    <div class="TheTotalInfo">
      <el-tag>{{totalInfo.transactions}} transactions</el-tag>
      <el-tag type="success">Deposit (+) {{totalInfo.amount}}</el-tag>
    </div>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
    />
  </div>
</template>

<script>
import AffiliateFundTransferNav from '../../components/nav/AffiliateFundTransferNav'
import {
  backstageAffiliateTopUpHttp,
  backstageAffiliateTopUpDropListHttp
} from '../../api/affiliate/initAxios'
import filter from '../../util/filter'
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
export default {
  name: 'AffiliateTopUp',
  components: {TableComp, FormInlineComp, AffiliateFundTransferNav},
  data () {
    return {
      formInline: {
        page: 1,
        per_page: 50,
        start_at: '',
        is_agent: true,
        end_at: '',
        status: '',
        to_user_name: '',
        order_no: ''
      },
      totalInfo: {
        transactions: 0,
        amount: '0.00'
      },
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'created_at',
            label: 'DATE'
          },
          {
            prop: 'order_no',
            label: 'TRANSACTION ID'
          },
          {
            prop: 'user_name',
            label: 'FROM'
          },
          {
            prop: 'amount',
            label: 'AMOUNT'
          },
          {
            prop: 'display_status',
            label: 'STATUS'
          }
        ]
      },
      resInformation: {},
      formInlineConfig: [
        {
          type: 'defaultMonth',
          formValue: 'date',
          value: ''
        },
        {
          type: 'defaultSelect',
          label: 'Status',
          formValue: 'status',
          placeholder: 'Select A Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Transaction ID',
          formValue: 'order_no',
          placeholder: 'Transaction ID',
          value: ''
        },
        {
          type: 'search'
        }
      ]
    }
  },
  methods: {
    // 顶部搜索
    searchMemberCode (val) {
      this.formInline.to_user_name = val
      this.initHttp(this.formInline)
    },
    // 列表数据
    initHttp (formInline) {
      this.tableConfig.loading = false
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.include = this.formInline.include
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilterByEcho(formInline, [], ['page', 'per_page', 'is_agent'])
      backstageAffiliateTopUpHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
        this.totalInfo = res.meta.total
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 分页
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initHttp(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initHttp(this.formInline)
        return
      }
      value.to_user_name = this.formInline.to_user_name
      value.is_agent = this.formInline.is_agent
      this.initHttp(value)
    },
    // 下拉菜单
    initDropListHttp () {
      backstageAffiliateTopUpDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['status'])
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  activated () {
    let name = this.$route.query.name
    if (name) {
      this.formInline.to_user_name = name
      this.initHttp(this.formInline)
    }
    this.initDropListHttp()
  }
}
</script>

<style scoped>

</style>
