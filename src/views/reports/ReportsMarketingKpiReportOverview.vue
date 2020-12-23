<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="ReportsMarketingKpiReportOverview">
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
import {
  backstageMembersKpiReportHttp,
  backstageMembersKpiReportExcelReportHttp
} from '../../api/report/initAxios'
import filter from '../../util/filter'
import element from "../../config/element";
export default {
  name: 'ReportsMarketingKpiReportOverview',
  data () {
    return {
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'date',
          label: 'Date'
        }, {
          prop: 'currency',
          label: 'Currency'
        }, {
          prop: 'total_withdrawal',
          label: 'Withdrawal'
        }, {
          prop: 'net_profit',
          label: 'Net Profit'
        }, {
          prop: 'total_new_members',
          label: 'New Member'
        }, {
          prop: 'total_deposit',
          label: 'Deposit'
        }, {
          prop: 'total_active_members',
          label: 'Active Users'
        }, {
          prop: 'total_deposit_members',
          label: 'Deposit Users'
        }, {
          prop: 'total_withdrawal_members',
          label: 'Withdrawal Users'
        }, {
          prop: 'total_turnover',
          label: 'Total Turnover'
        }, {
          prop: 'total_payout',
          label: 'Win/Loss'
        }, {
          prop: 'total_rebate',
          label: 'Member Rebate'
        }, {
          prop: 'total_adjustment',
          label: 'Member Adjustment'
        }, {
          prop: 'total_promotion_cost',
          label: 'Promotion Cost (Adjust)'
        }, {
          prop: 'total_promotion_cost_by_code',
          label: 'Promotion Cost (Code)'
        }, {
          prop: 'total_bank_fee',
          label: 'Bank Fees'
        }]
      },
      formInlineConfig: [
        {
          type: 'date'
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
        start_at: '',
        end_at: ''
      }
    }
  },
  created () {

    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp
  },
  methods: {
    // 列表
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageMembersKpiReportHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
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
      backstageMembersKpiReportExcelReportHttp(datalist).then(res => {
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
    },
  }
}
</script>
