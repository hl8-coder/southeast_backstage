<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div id="AffiliateReport">
    <sub-nav
      :navs="navs"
    ></sub-nav>
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="danger" @click="downloadReport(formInline)">Download</el-button>
        <el-button style="margin-right: 5px" type="info" @click="releaseThisComm">Release</el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSelectionChange = handleSelectionChange
      @handleSizePageChange =  callbacks
    ></table-comp>
  </div>
</template>

<script>
import SubNav from '../../components/nav/SubNav'
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstageAffiliateReportPendingDownloadHttp,
  backstageAffiliatesCommissionsPendingHttp,
  backstageGameManagementGamePlatformsDropListHttp,
  backstageAffiliatesReleaseCommissionsHttp
} from '../../api/affiliate/initAxios'
import element from '../../config/element'
export default {
  name: 'AffiliateReport',
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
          type: 'input',
          label: 'UAP',
          formValue: 'active_count',
          placeholder: 'UAP',
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
          placeholder: 'Select A Monthly',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'search'
        }
      ],
      tableConfig: {
        selection: true,
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'currency',
            label: 'Currency',
            fixWidth: '75px'
          },
          {
            prop: 'user_name',
            label: 'affiliate ID',
            fixWidth: '100px',
            render: (h, params) => {
              if (params.item.is_top_agent) {
                return h('div', [
                  h('span', {
                    style: {
                      color: '#000'
                    }
                  }, params.item.user_name)
                ])
              } else {
                return h('div', [
                  h('span', {
                    style: {
                      color: '#3444ff'
                    }
                  }, params.item.user_name)
                ])
              }
            }
          },
          {
            prop: 'active_count',
            label: 'UAP',
            fixWidth: '60px'
          },
          {
            prop: 'total_member',
            label: 'Total Member',
            fixWidth: '60px'
          },
          {
            prop: 'new_sign_count',
            label: 'New Registration',
            fixWidth: '60px'
          },

          {
            prop: 'deposit',
            label: 'Total deposit',
            fixWidth: '91px'
          },
          {
            prop: 'withdrawal',
            label: 'Total Withdrawal',
            fixWidth: '110px'
          },
          {
            prop: 'rake',
            label: 'Total Rake amount',
            fixWidth: '125px'
          },
          {
            prop: 'affiliate_adjustment',
            label: 'Adjustment',
            fixWidth: '100px'
          },
          {
            prop: 'stake',
            label: 'Total Stake',
            fixWidth: '100px'
          },
          {
            prop: 'profit',
            label: 'Win/Loss',
            fixWidth: '100px'
          },
          {
            prop: 'rebate',
            label: 'Rebate',
            fixWidth: '60px'
          },
          {
            prop: 'promotion',
            label: 'Promotion',
            fixWidth: '80px'
          },
          {
            prop: 'transaction_cost',
            label: 'Transaction Cost',
            fixWidth: '115px'
          },
          {
            prop: 'net_loss',
            label: 'Net Loss',
            fixWidth: '115px'
          },
          {
            prop: 'commission_percent',
            label: 'Commission Rate',
            fixWidth: '120px',
            render: (h, params) => {
              return h('div', [
                h('span', {}, params.item.commission_percent + '%')
              ])
            }
          },
          {
            prop: 'previous_remain_commission',
            label: 'Previous Balance',
            fixWidth: '120px'
          },
          {
            prop: 'payout_commission',
            label: 'Payout Comm'
          },
          {
            prop: 'sub_commission_percent',
            label: 'Sub Aff Payout %',
            render: (h, params) => {
              return h('div', [
                h('span', {}, params.item.sub_commission_percent + '%')
              ])
            }
          },
          {
            prop: 'sub_commission',
            label: 'Sub Aff Payout Amount'
          },
          {
            prop: 'remain_commission',
            label: 'B/F'
          }
        ]
      },
      resInformation: {},
      formInline: {
        per_page: 50,
        page: 1,
        month: '',
        monthly: '',
        currency: ''
      },
      dropList: {},
      ids: []
    }
  },
  methods: {
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initAffiliateReport(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initAffiliateReport(this.formInline)
        return
      }
      this.initAffiliateReport(value)
    },
    // 数据初始化
    initAffiliateReport (formInline) {
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
      backstageAffiliatesCommissionsPendingHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 下拉菜单
    theDropList () {
      backstageGameManagementGamePlatformsDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currency'])
        this.dropList = res
      }).catch(() => {
      })
    },
    // 下载报表
    downloadReport (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageAffiliateReportPendingDownloadHttp(datalist).then(res => {
        filter.downloadExcel(res)
      }).catch(() => {
      })
    },
    filterList (formInline) {
      this.formInline.active_player_count = 5
      if (!formInline) {
        return
      }
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      if (this.formInline.month) {
        var datalist = filter.formInlineFilter(formInline)
        backstageAffiliatesCommissionsReleaseHttp(datalist).then(res => {
          this.resInformation = res
          this.tableConfig.loading = false
        }).catch((error) => {
          this.tableConfig.loading = false
          console.log(error)
        })
      } else {
        this.tableConfig.loading = false
      }
      this.formInline.active_player_count = ''
    },
    // 选择需要结算的代理
    handleSelectionChange (value, row) {
      let ids = ''
      let list = value.page
      for (let i = 0; i < list.length; i++) {
        ids += list[i].id
        ids += ','
      }
      this.ids = ids
    },
    // 派发分红
    releaseThisComm () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if (!this.ids) {
          element.message({
            type: 'error',
            message: 'Please select'
          })
          return false
        }
        backstageAffiliatesReleaseCommissionsHttp({ids: this.ids}).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.initAffiliateReport(this.formInline)
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.initAffiliateReport(this.formInline)
    this.theDropList()
  }
}
</script>
