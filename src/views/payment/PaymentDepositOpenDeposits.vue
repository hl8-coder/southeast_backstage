<style lang="scss" scoped type="text/scss">
  .OpenDeposits{
    .Legend{
      margin-top: 30px;
      >div {
        width: 30%;
        ul{
          li{padding-left: 10px}
        }
        .HOLD{
          background: #2c97d5;
          color: white;
        }
        .REJECT{
          background: #e41c9b;
          color: white;
        }
      }
    }
  }
</style>

<template>
  <div class="OpenDeposits">
    <form-inline-comp
      :form-inline-config="formInlineConfig"
      @onSubmit = callbacks
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="success" @click="downloadExcel">Download</el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange = callbacks
    />
    <deposit-ticket-dialog
      :DropListDeposit = DropListDeposit
      :ticketConfig = ticketConfig
    />
    <el-dialog
      :title="'Deposit Log (' + depositTransID + ')'"
      :visible.sync="logStatus"
    >
      <table-comp
        :tableConfig = logTableConfig
        :resInformation = logResInformation
      />
    </el-dialog>
  </div>
</template>

<script>
import tableComp from '../../components/table/tableComp'
import colorFilter from '../../config/colorFilter'
import childrenNav from '../../components/nav/childrenNav'
import depositTicketDialog from '../../components/ticket/depositTicketDialog'
import filter from '../../util/filter'
import {
  backstageDepositsOpenDepositHttp,
  backstageDropListDepositHttp,
  backstageDepositDetailHttp,
  backstageDepositLogsHttp,
  backstageExportDepositLogsHttp
} from '../../api/payment/deposit/initAxios'
import FormInlineComp from '../../components/form/formInlineComp'
import {mapGetters} from 'vuex'
export default {
  name: 'OpenDeposits',
  data () {
    return {
      ticketConfig: {
        ticketVisible: false,
        data: {}
      },
      DropListDeposit: {},
      formInline: {
        include: 'user',
        currency: '',
        per_page: 50,
        page: 1
      },
      formInlineConfig: [
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
          type: 'search'
        }
      ],
      depositTransID: '',
      resInformation: {},
      tableConfig: {
        stripe: false,
        border: false,
        tableColumn: [{
          prop: 'order_no',
          label: 'Transaction ID',
          fixWidth: '200',
          render: (h, params) => {
            let _this = this
            let routeData = _this.$router.resolve({
              name: 'DepositTicket',
              params: {id: params.item.id}
            })
            return h('div', [
              h('a', {
                style: {
                  color: '#409EFF'
                },
                domProps: {
                  href: routeData.href,
                  target: '_blank'
                },
                on: {
                  click (event) {
                    if (!(event.ctrlKey || event.metaKey)) {
                      event.returnValue = false
                      _this.backstageDepositDetailHttp(params.item.id)
                    }
                  }
                }
              }, params.item.order_no)
            ])
          }
        }, {
          prop: '',
          label: 'Logs',
          render: (h, params) => {
            let self = this
            return h('div', [
              h('el-button', {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                on: {
                  click () {
                    self.getDepositLogs(params.item.id)
                    self.depositTransID = params.item.order_no
                    self.logStatus = true
                  }
                }
              }, 'Logs')
            ])
          }
        }, {
          prop: 'user.currency',
          label: 'Currency',
          width: '40'
        }, {
          prop: 'user.name',
          label: 'Member Code',
          width: '60'
        }, {
          prop: 'created_at',
          label: 'Transaction Date',
          fixWidth: '200'
        }, {
          prop: 'display_payment_platform',
          label: 'Channel',
          fixWidth: '200'
        }, {
          prop: 'card_type',
          label: 'Network',
          fixWidth: '200'
        }, {
          prop: 'fund_in_account',
          label: 'Fund In Account',
          width: '60'
        }, {
          prop: 'user_bank_account_no',
          label: 'Bank Account No.',
          fixWidth: '200'
        }, {
          prop: 'amount',
          label: 'Amount',
          width: '60'
        }, {
          prop: 'Status',
          label: 'Status',
          width: '60',
          render: (h, params) => {
            if (params.item.hold_reason === 0) {
              return h('div', {
                style: {
                  width: '80%',
                  height: '20px',
                  lineHeight: '20px',
                  textAlign: 'center',
                  background: params.item.need_second_approve ? colorFilter.depositStatusListPSFColorFiter('value', params.item.display_status).color : 'none'
                }
              }, params.item.display_status)
            } else {
              return h('div', {
                style: {
                  width: '80%',
                  height: '20px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }
              }, 'HD:' + params.item.hold_reason)
            }
          }
        }, {
          prop: 'last_access',
          label: 'Last Access',
          width: '60'
        }, {
          prop: 'receipt_img_created_at',
          label: 'Last Upload',
          width: '120'
        }]
      },
      logResInformation: {},
      logTableConfig: {
        loading: false,
        border: false,
        tableColumn: [
          {
            prop: 'admin_name',
            label: 'Update By'
          },
          {
            prop: 'created_at',
            label: 'Update At'
          },
          {
            prop: 'interval',
            label: 'Interval'
          },
          {
            prop: 'type',
            label: 'Type'
          }
        ]
      },
      LegendConfig: {
        stripe: true,
        border: true,
        tableColumn: [{
          prop: 'LEGEND',
          label: 'LEGEND',
          width: '60',
          render: (h, params) => {
            return h('div', {
              style: {
                background: params.item.backgroundColor,
                width: '80%',
                height: '30px'
              }
            })
          }
        }, {
          prop: 'value',
          label: '',
          width: '60'
        }]
      },
      LegendInformation: {
        data: colorFilter.depositStatusList
      },
      timer: '',
      logStatus: false
    }
  },
  created () {
    this.backstageDropListDepositHttp()
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  activated () {
    filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
    this.initTicket()
    this.initHttp(this.formInline)
    this.timer = setInterval(() => { this.initHttp(this.formInline) }, 3000)
  },
  deactivated () {
    clearInterval(this.timer)
  },
  components: {
    FormInlineComp,
    tableComp, childrenNav, depositTicketDialog
  },
  methods: {
    refresh () {
      this.initHttp(this.formInline)
    },
    backstageDepositDetailHttp (id) {
      backstageDepositDetailHttp(id, {include: 'user,accessLogs,operationLogs,userBank,userAccount,userDeposits,bankTransaction,images,userInfo'}).then(res => {
        this.ticketConfig = {
          ticketVisible: true,
          data: res
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    backstageDropListDepositHttp () {
      backstageDropListDepositHttp({}).then(res => {
        this.DropListDeposit = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    callbacks (value) {

      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        clearInterval(this.timer)
        this.timer = setInterval(() => { this.initHttp(this.formInline) }, 3000)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        clearInterval(this.timer)
        this.timer = setInterval(() => { this.initHttp(this.formInline) }, 3000)
        return
      }
      clearInterval(this.timer)
      this.timer = setInterval(() => { this.initHttp(value) }, 3000)
    },
    // Bank Transactions 请求
    initHttp (formInline) {
      this.tableConfig.loading = true
      if (!formInline.include || !formInline.per_page && !formInline.page) {
        formInline.include = 'user'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageDepositsOpenDepositHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    initTicket () {
      if (filter.getQueryString('id')) {
        this.backstageDepositDetailHttp(filter.getQueryString('id'))
      }
    },
    // 获取充值单的日志
    getDepositLogs (id) {
      backstageDepositLogsHttp(id).then(res => {
        this.logResInformation = res
        this.logTableConfig.loading = false
      }).catch((error) => {
        this.logTableConfig.loading = false
        console.log(error)
      })
    },
    downloadExcel () {
      backstageExportDepositLogsHttp().then((res) => {
        filter.downloadExcel(res)
      })
    }
  }
}
</script>
