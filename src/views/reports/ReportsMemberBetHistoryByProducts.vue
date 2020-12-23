<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="PromotionClaimReports">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
      @downloadExcel = downloadExcel
    />
    <el-tag
      style="margin: 0 2px"
      v-for="item in info"
      :key="item.key"
    >{{ item.key }}: {{ item.value }}</el-tag>
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
import {
  backstageReportsMemberBetHistoryByProductsDropListHttp,
  backstageReportsMemberBetHistoryByProductsHttp,
  backstageReportsMemberBetHistoryByProductsExcelHttp
} from '../../api/report/initAxios'
import filter from '../../util/filter'
import element from '../../config/element'
export default {
  name: 'PromotionClaimReports',
  data () {
    return {
      Visible: false,
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        autoNum: true,
        tableColumn: [{
          prop: 'order_id',
          label: 'Bet ID',
          fixWidth: '325px'
        }, {
          prop: 'user_name',
          label: 'Member Code'
        }, {
          prop: 'product_code',
          label: 'Product Code'
        }, {
          prop: 'game_name',
          label: 'Game Name'
        }, {
          prop: 'bet_at',
          label: 'Bet Date',
          fixWidth: '138px'
        }, {
          prop: 'payout_at',
          label: 'Payout Date',
          fixWidth: '138px'
        }, {
          prop: 'odds',
          label: 'Odds'
        }, {
          prop: 'user_stake',
          label: 'Stake'
        }, {
          prop: 'bet',
          label: 'Real Bet'
        }, {
          prop: 'display_platform_status',
          label: 'Status'
        }, {
          prop: 'user_profit',
          label: 'Won Lose Amt'
        }, {
          prop: 'ticket_status',
          label: 'Ticket Status'
        }, {
          prop: 'display_status',
          label: 'IT Status'
        }]
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
          label: 'Game Name',
          formValue: 'game_name',
          placeholder: 'Game Name',
          value: ''
        },
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
          label: 'IT Status',
          formValue: 'status',
          placeholder: 'Select A Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Status',
          formValue: 'platform_status',
          placeholder: 'Select A Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Currency',
          formValue: 'user_currency',
          placeholder: 'Select A Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'dateTime',
          label: 'Bet Date',
          formValue: 'date',
          value: ''
        },
        {
          type: 'dateTime',
          label: 'Payout Date',
          formValue: 'date',
          formKey1: 'payout_start_at',
          formKey2: 'payout_end_at',
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
        game_name: '',
        product_code: '',
        user_currency: '',
        user_name: '',
        status: '',
        start_at: '',
        end_at: ''
      },
      info: []
    }
  },
  created () {
    this.DropListHttp()
    this.tableConfig.loading = false
    // this.initHttp(this.formInline)
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
      backstageReportsMemberBetHistoryByProductsHttp(datalist).then(res => {
        this.resInformation = res
        this.info = res.meta.info
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    Submit (form) {
      console.log(form)
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
    onAdd () {
      this.Visible = true
    },
    formcallbacks () {

    },
    affirmStatus () {

    },
    // 下载报表
    downloadExcel (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.per_page && !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageReportsMemberBetHistoryByProductsExcelHttp(datalist).then(res => {
        filter.downloadExcel(res)
      }).catch((error) => {
        var enc = new TextDecoder('utf-8')
        var res = JSON.parse(enc.decode(new Uint8Array(error.response.data)))
        element.message({
          message: res.message,
          type: 'error'
        })
        console.log(error.response)
      })
    },
    DropListHttp () {
      backstageReportsMemberBetHistoryByProductsDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['user_currency', 'product_code', 'status', 'platform_status'])
      }).catch(() => {
      })
    }
  }
}
</script>
