<template>
  <div class="AffiliatesTopUp">
    <search-navs
      :user_name="formInline.to_user_name"
      @searchMemberCode="callbacks"
    />
    <form-inline-comp
      :form-inline-config="selfFormInlineConfig"
      @onSubmit = selfSearch
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
import SearchNavs from './FundTransfers/SearchNavs'
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstagePaymentFundTransferAffiliateTopUpHttp,
  backstagePaymentFundTransferAffiliateTopUpDropListHttp
} from '../../api/payment/fundTransfers/initAxiosFundTransfer'
export default {
  name: 'AffiliatesTopUp',
  components: {TableComp, FormInlineComp, SearchNavs},
  data () {
    return {
      formInline: {
        start_at: '',
        end_at: '',
        status: '',
        to_user_name: '',
        order_no: ''
      },
      selfFormInlineConfig: [
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
      ],
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
      totalInfo: {
        transactions: '',
        amount: ''
      }
    }
  },
  methods: {
    callbacks (value) {
      this.formInline.to_user_name = value
      this.initAffiliatesTopUp(this.formInline)
    },
    selfSearch (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initAffiliatesTopUp(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initAffiliatesTopUp(this.formInline)
        return
      }
      value.to_user_name = this.formInline.to_user_name
      this.initAffiliatesTopUp(value)
    },
    initAffiliatesTopUp (formInline) {
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
      backstagePaymentFundTransferAffiliateTopUpHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
        this.totalInfo = res.meta.total
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    initDropList () {
      backstagePaymentFundTransferAffiliateTopUpDropListHttp().then(res => {
        filter.formValueListFilter(this.selfFormInlineConfig, res, ['status'])
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  activated () {
    let name = this.$route.query.name
    if (name) {
      console.log(name)
      this.formInline.to_user_name = name
      this.initAffiliatesTopUp(this.formInline)
    }
    this.initDropList()
  }
}
</script>

<style scoped>

</style>
