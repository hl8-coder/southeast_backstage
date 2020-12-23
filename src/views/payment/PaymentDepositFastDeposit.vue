<style lang="scss" scoped type="text/scss">
  .FastDeposit{
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
  <div class="FastDeposit">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @changeEvent = changeEvent
      @downloadExcel = downloadExcel
    >
    </form-inline-comp>
    <div style="text-align: right;margin: 3px 0;position: relative;right: 0;">
      <el-tag>Total: {{resInformation.meta.total}}</el-tag>
      <el-tag>Total Txnl: {{resInformation.meta.total_txn}}</el-tag>
      <el-tag>Unique Member: {{resInformation.meta.unique_member}}</el-tag>
    </div>
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
import formInlineComp from '../../components/form/formInlineComp'
import filter from '../../util/filter'
import colorFilter from '../../config/colorFilter'
import depositTicketDialog from '../../components/ticket/depositTicketDialog'
import {
  backstageDropListFastDepositHttp,
  backstageExportDepositLogsHttp,
  backstageDropListDepositHttp,
  backstageDepositDetailHttp,
  backstageDepositLogsHttp
} from '../../api/payment/deposit/initAxios'
import {backstagePaymentWithdrawalExportLogsHttp} from "../../api/payment/withdraw/initAxiosWithdrawal";
import element from "../../config/element";
export default {
  name: 'FastDeposit',
  data () {
    return {
      ticketConfig: {
        ticketVisible: false,
        data: {}
      },
      depositTransID: '',
      DropListDeposit: {},
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
          width: '60'
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
          prop: 'fund_in_account',
          label: 'Fund In Account',
          width: '60',
        }, {
          prop: 'user_bank_account_no',
          label: 'Bank Account No.',
          fixWidth: '200'
        }, {
          prop: 'card_type',
          label: 'Network',
          fixWidth: '200'
        }, {
          prop: 'amount',
          label: 'Submitted Amount',
          width: '60'
        }, {
          prop: 'arrival_amount',
          label: 'Received Amount',
          width: '60'
        }, {
          prop: 'Status',
          label: 'Status',
          width: '60',
          render: (h, params) => {
            if (params.item.status === 2) {
              return h('div', {
                style: {
                  width: '80%',
                  height: '20px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }
              }, 'HD:' + params.item.hold_reason)
            } else {
              return h('div', {
                style: {
                  width: '80%',
                  height: '20px',
                  lineHeight: '20px',
                  textAlign: 'center',
                  background: params.item.need_second_approve ? colorFilter.depositStatusListPSFColorFiter('value', params.item.display_status).color : 'none'
                }
              }, params.item.display_status)
            }
          }
        }, {
          prop: 'last_access',
          label: 'Last Access',
          width: '60'
        }, {
          prop: 'receipt_img_created_at',
          label: 'Last Upload',
          width: '60'
        }]
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
      formInlineConfig: [
        {
          type: 'select',
          label: 'Status',
          formValue: 'status',
          multiple: true,
          collapseTags: true,
          placeholder: 'Select A Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Currency',
          formValue: 'currency',
          multiple: true,
          collapseTags: true,
          placeholder: 'Select A Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Deposit Channel',
          formValue: 'online_banking_channel',
          multiple: true,
          collapseTags: true,
          placeholder: 'Select A Deposit Channel',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Fund In Account',
          multiple: true,
          collapseTags: true,
          formValue: 'fund_in_account',
          placeholder: 'Select A Account',
          clearable: true,
          value: '',
          list: []
        },
        {
          type: 'select',
          label: 'Auto Refresh',
          formValue: 'auto_refresh',
          placeholder: 'Select A Auto Refresh',
          change: true,
          clearable: true,
          value: '',
          list: []
        },
        {
          type: 'input',
          label: 'Reference',
          formValue: 'reference',
          placeholder: 'Reference',
          clearable: true,
          value: ''
        },
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          placeholder: 'Member Code',
          clearable: true,
          value: ''
        },
        {
          type: 'input',
          label: 'Transaction ID',
          formValue: 'order_no',
          placeholder: 'Transaction ID',
          clearable: true,
          value: ''
        },
        {
          label: 'Date',
          type: 'date',
          value: 0,
          formValue: 'reference',
        },
        {
          type: 'search'
        },
        {
          type: 'export',
          buttonName: 'Download'
        }
      ],
      formInline: {
        include: 'user',
        per_page: 50,
        page: 1,
        status: '',
        currency: '',
        fund_in_account: '',
        reference: '',
        user_name: '',
        order_no: '',
        start_at: '',
        online_banking_channel: '',
        end_at: ''
      },
      timer: '',
      auto_refresh: null,
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
      logStatus: false
    }
  },
  created () {
    this.backstageDropListDepositHttp()
    this.initHttp(this.formInline)
  },
  activated () {
    this.initTicket()
    if (this.auto_refresh) {
      this.timer = setInterval(() => { this.initHttp(this.formInline) }, this.auto_refresh * 1000)
    }
  },
  deactivated () {
    clearInterval(this.timer)
  },
  components: {
    tableComp, formInlineComp, depositTicketDialog
  },
  methods: {
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
    changeEvent (value) {
      if (!value.value) {
        clearInterval(this.timer)
        return
      }
      this.auto_refresh = value.value
      clearInterval(this.timer)
      this.timer = setInterval(() => { this.initHttp(this.formInline) }, value.value * 1000)
    },
    backstageDropListDepositHttp () {
      backstageDropListDepositHttp({}).then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['auto_refresh', 'currency', 'status', 'fund_in_account', 'online_banking_channel'])
        this.DropListDeposit = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
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
    // Bank Transactions 请求
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.include = 'user'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      delete formInline.auto_refresh
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageDropListFastDepositHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    refresh () {
      this.initHttp(this.formInline)
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
    downloadExcel (form) {
      var datalist = filter.formInlineFilterByEcho(form, [], ['per_page', 'page'])
      datalist['filter[include]'] = null
      backstageExportDepositLogsHttp(datalist).then((res) => {
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
