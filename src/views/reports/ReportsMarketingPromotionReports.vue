<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="PromotionReports">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @downloadExcel = downloadExcel
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstageReportsMarketingPromotionReportsHttp,
  backstageReportsMarketingPromotionReportsDropListHttp,
  backstageUserBonusPrizesExportHttp
} from '../../api/report/initAxios'
import {backstagePaymentWithdrawalExportLogsHttp} from "../../api/payment/withdraw/initAxiosWithdrawal";
import element from "../../config/element";
export default {
  name: 'PromotionReports',
  data () {
    return {
      Visible: false,
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'user_name',
            label: 'Member Code',
            width: '60'
          },
          {
            prop: 'currency',
            label: 'Currency',
            width: '80'
          },
          {
            prop: 'registered_at',
            label: 'Register Date',
            width: '80'
          },
          {
            prop: 'display_category',
            label: 'Bonus Type',
            width: '80'
          },
          {
            prop: 'bonus_code',
            label: 'Promo Code',
            width: '80'
          },
          {
            prop: 'product_code',
            label: 'Products',
            width: '80'
          },
          {
            prop: 'prize',
            label: 'Bonus Amount',
            width: '80'
          },
          {
            prop: 'deposit_amount',
            label: 'Transfer Amount',
            width: '80'
          },
          {
            prop: 'total_deposit',
            label: 'Total Deposit Amount',
            width: '80'
          }
        ]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'input',
          label: 'Promo Code',
          formValue: 'bonus_code',
          placeholder: 'Promo Code',
          value: ''
        },
        {
          type: 'select',
          label: 'Currency',
          formValue: 'currency',
          placeholder: 'Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Products',
          formValue: 'product_code',
          placeholder: 'Products',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'date',
          label: 'Date',
          formValue: 'date',
          value: ''
        },
        {
          type: 'search'
        },
        {
          type: 'export'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        currency: '',
        user_name: '',
        bonus_code: '',
        product_code: '',
        start_at: '',
        end_at: ''
      },
      dropList: {}
    }
  },
  created () {
    this.DropListHttp()
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp
  },
  methods: {
    // 会员信息请求
    initHttp (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.per_page && !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageReportsMarketingPromotionReportsHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 提交表单与分页回调
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
      this.initHttp(value)
    },
    DropListHttp () {
      backstageReportsMarketingPromotionReportsDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'product_code'])
        this.dropList = res
      }).catch(() => {
      })
    },
    downloadExcel (form) {
      var datalist = filter.formInlineFilterByEcho(form, [], ['per_page', 'page'])
      datalist['filter[include]'] = null
      backstageUserBonusPrizesExportHttp(datalist).then((res) => {
        filter.downloadExcel(res)
      }).catch((error) => {
        const reader = new FileReader()

        reader.addEventListener('loadend', function () { //
          let res = JSON.parse(reader.result) // 返回的数据
          element.message({
            message: res.message,
            type: 'error'
          })
        })
        reader.readAsText(error.response.data, 'utf-8')
      })
    }
  }
}
</script>
