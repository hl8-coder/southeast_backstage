<template>
  <div class="AffiliatePayoutReport">
    <sub-nav
      :navs="navs"
    ></sub-nav>
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="danger" @click="downloadReport(formInline)">Download</el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
    ></table-comp>
  </div>
</template>

<script>
import SubNav from '../../components/nav/SubNav'
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import {
  backstageAffiliateReportPayoutDownloadHttp,
  backstageAffiliatesCommissionsPayoutHttp,
  backstageAffiliateListingCommissionsDropListHttp
} from '../../api/affiliate/initAxios'
import filter from '../../util/filter'
import element from '../../config/element'
export default {
  name: 'AffiliatePayoutReport',
  components: {TableComp, FormInlineComp, SubNav},
  data () {
    return {
      navs: [
        {
          name: 'affiliate Release Commission',
          routeName: 'affiliate_affiliate_report'
        },
        {
          name: 'affiliate Payout report',
          routeName: 'affiliate_payout_report'
        }
      ],
      formInlineConfig: [
        {
          type: 'input',
          label: 'affiliate ID',
          formValue: 'user_name',
          placeholder: 'affiliate ID',
          value: ''
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
          type: 'oneDate',
          label: 'Month',
          formValue: 'month',
          placeholder: 'Month',
          pickerType: 'month',
          value: ''
        },
        {
          type: 'select',
          label: 'Monthly',
          formValue: 'monthly',
          placeholder: 'Monthly',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Status',
          formValue: 'status',
          placeholder: 'Select A Status',
          clearable: true,
          value: '',
          list: ''
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
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'user_name',
            label: 'affiliate ID'
          },
          {
            prop: 'full_name',
            label: 'Full Name'
          },
          {
            prop: 'payout_commission',
            label: 'Payout Comm'
          },
          {
            prop: 'account_name',
            label: 'Account Name'
          },
          {
            prop: 'account_no',
            label: 'Bank account'
          },
          {
            prop: 'bank_name',
            label: 'Bank Name'
          },
          {
            prop: 'branch',
            label: 'Bank brand'
          },
          {
            prop: 'address',
            label: 'Bank Address'
          },
          {
            prop: 'display_status',
            label: 'Status'
          },
          {
            prop: 'net_loss',
            label: 'NET/LOSS'
          }
        ]
      },
      resInformation: {},
      formInline: {
        per_page: 50,
        page: 1,
        month: '',
        monthly: '',
        currency: '',
        status: ''
      }
    }
  },
  methods: {
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initAffiliatePayoutReport(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initAffiliatePayoutReport(this.formInline)
        return
      }
      this.initAffiliatePayoutReport(value)
    },
    // 数据初始化
    initAffiliatePayoutReport (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      if (this.formInline.month) {
        var datalist = filter.formInlineFilter(formInline)
        backstageAffiliatesCommissionsPayoutHttp(datalist).then(res => {
          this.resInformation = res
          this.tableConfig.loading = false
        }).catch((error) => {
          this.tableConfig.loading = false
          console.log(error)
        })
      } else {
        element.message({
          type: 'error',
          message: 'Please select month'
        })
        this.tableConfig.loading = false
      }
    },
    // 下拉菜单
    theDropList () {
      backstageAffiliateListingCommissionsDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'status'])
        this.dropList = res
      }).catch(() => {
      })
    },
    // 下载报表
    downloadReport (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageAffiliateReportPayoutDownloadHttp(datalist).then(res => {
        filter.downloadExcel(res)
      }).catch(() => {
      })
    }
  },
  activated () {
    this.initAffiliatePayoutReport(this.formInline)
    this.theDropList()
  }
}
</script>

<style scoped>

</style>
