<template>
  <div class="PaymentWithdrawFastWithdrawal">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @downloadExcel = downloadExcel
    >
<!--      <template v-slot:content>-->
<!--        <el-button style="margin-right: 5px" type="success" @click="downloadExcel" :loading="downloadLoading">Download</el-button>-->
<!--      </template>-->
    </form-inline-comp>
    <el-tag
      style="margin: 0 2px"
      v-for="item in resInformation.meta.info"
      :key="item.key"
    >{{ item.key }} : {{ item.value }}</el-tag>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <WithdrawalDialog
      :withdrawalDetail = withdrawalTicketForm
      :dropList="dropList"
      @refreshOpenWithdrawal="initOpenWithdrawal(formInline)"
    ></WithdrawalDialog>
    <el-dialog
      title="Withdrawal Log"
      :visible.sync="logStatus"
    >
      <table-comp
        :tableConfig = logTableConfig
        :resInformation = logResInformation
      />
    </el-dialog>
    <el-dialog
      :title="recordsTitle"
      :visible.sync="recordsStatus"
    >
      <table-comp
        :tableConfig = recordsTableConfig
        :resInformation = records
      />
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import WithdrawalDialog from './Withdrawal/newTicket/WithdrawalDialog'
import {
  backstagePaymebtWithdrawalDropListHttp,
  backstagePaymentWithdrawalInfoHttp,
  backstagePaymentFastWithdrawalHttp,
  backstagePaymentWithdrawalLogsHttp,
  backstagePaymentWithdrawalExportLogsHttp
} from '../../api/payment/withdraw/initAxiosWithdrawal'
import filter from '../../util/filter'
import FormInlineComp from '../../components/form/formInlineComp'
import element from "../../config/element";
export default {
  name: 'PaymentWithdrawFastWithdrawal',
  components: {FormInlineComp, WithdrawalDialog, TableComp},
  data () {
    return {
      resInformation: {
        meta: {
          info: ''
        }
      },
      logResInformation: {},
      logStatus: false,
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
            prop: 'action',
            label: 'Action'
          }
        ]
      },
      recordsTitle: "",
      recordsStatus: false,
      records: {},
      recordsTableConfig: {
        loading: false,
        border: false,
        tableColumn: [
          {
            prop: 'fee',
            label: 'Fee'
          },
          {
            prop: 'amount',
            label: 'Amount'
          },
          {
            prop: 'company_bank_account_code',
            label: 'Fund Out'
          }
        ]
      },
      tableConfig: {
        border: true,
        loading: true,
        autoNum: false,
        tableColumn: [
          {
            prop: 'user.affiliated_code',
            label: 'Affiliated Code',
            render: (h, params) => {
              return h("div", {}, params.item.user.affiliated_code || "-")
            }
          },
          {
            prop: 'id',
            label: 'TransactionID',
            render: (h, params) => {
              let _this = this
              let routeData = _this.$router.resolve({
                name: 'WithdrawalTicket',
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
                      /**
                       * ------------------------------------------------------------------
                       * @type {number}  不要删，删了有BUG Start
                       * ------------------------------------------------------------------
                       */
                      _this.timer = new Date().getTime()
                      /**
                       * ------------------------------------------------------------------
                       * @type {number}  不要删，删了有BUG  End
                       * ------------------------------------------------------------------
                       */
                      if (!(event.ctrlKey || event.metaKey)) {
                        event.returnValue = false
                        _this.backstagePaymentWithdrawalInfoHttp(params.item.id)
                      }
                    }
                  }
                }, params.item.order_no)
              ])
            }
          },
          {
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
                      self.getLogs(params.item.id)
                      self.logStatus = true
                    }
                  }
                }, 'Logs')
              ])
            }
          },
          {
            prop: '',
            label: 'Fee',
            render: (h, params) => {
              if (params.item.records) {
                if (params.item.records.length === 1) {
                  return h("div", {}, params.item.records[0].fee);
                } else {
                  return h('el-button', {
                    props: {
                      size: 'small',
                      type: 'danger'
                    },
                    on: {
                      click: () => {
                        this.recordsTitle = 'Details (' + params.item.order_no + ')';
                        this.records = { data: params.item.records};
                        this.recordsStatus = true;
                      }
                    }
                  }, 'List');
                }
              } else {
                return h("div", {}, "-");
              }
            }
          },
          {
            prop: '',
            label: 'Fund Out',
            render: (h, params) => {
              if (params.item.records) {
                if (params.item.records.length === 1) {
                  return h("div", {}, params.item.records[0].company_bank_account_code)
                } else {
                  return h('el-button', {
                    props: {
                      size: 'small',
                      type: 'danger'
                    },
                    on: {
                      click: () => {
                        this.recordsTitle = 'Details (' + params.item.order_no + ')';
                        this.records = { data: params.item.records};
                        this.recordsStatus = true;
                      }
                    }
                  }, 'List');
                }
              } else {
                return h("div", {}, "-");
              }
            }
          },
          {
            prop: 'user.currency',
            label: 'Currency'
          },
          {
            prop: 'user.name',
            label: 'Member Code'
          },
          {
            prop: 'created_at',
            label: 'Transaction Date'
          },
          {
            prop: 'account_no',
            label: 'Account'
          },
          {
            prop: 'bank.name',
            label: 'Bank Name'
          },
          {
            prop: 'amount',
            label: 'Amount'
          },
          {
            prop: 'display_status',
            label: 'Status'
          },
          {
            prop: 'last_access_name',
            label: 'Last Access'
          }
        ]
      },
      formInline: {
        include: 'user,bank',
        per_page: 50,
        page: 1,
        user_name: '',
        order_no: '',
        currency: '',
        start_at: '',
        end_at: '',
        status: ''
      },
      withdrawalTicketForm: {
        formStatus: false,
        data: ''
      },
      dropList: {},
      timer: 0,
      timers: '',
      cellClickStatus: true,
      downloadLoading: false,
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
          label: 'Transaction ID',
          formValue: 'order_no',
          placeholder: 'Transaction ID',
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
          type: 'select',
          label: 'Status',
          formValue: 'status',
          placeholder: 'Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'dateTime',
          label: 'Date'
        },
        {
          type: 'search'
        },
        {
          type: 'export',
          buttonName: 'Download'
        }
      ]
    }
  },
  activated () {
    this.initOpenWithdrawal(this.formInline)
    this.withdrawalDropList()
    this.initTicket()
  },
  deactivated () {
    clearInterval(this.timers)
  },
  methods: {
    // OPEN WITHDRAWAL 初始化
    initOpenWithdrawal (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
        formInline.include = this.formInline.include
      }
      this.formInline = formInline
      console.log(this.formInline)
      var datalist = filter.formInlineFilter(formInline)
      backstagePaymentFastWithdrawalHttp(datalist).then(res => {
        res.data.forEach((item) => {
          item.location = item.province + item.city
        })
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initOpenWithdrawal(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initOpenWithdrawal(this.formInline)
        return
      }
      this.initOpenWithdrawal(value)
    },
    backstagePaymentWithdrawalInfoHttp (id) {
      backstagePaymentWithdrawalInfoHttp(id, {include: 'bank,user.info,user.account,images,userWithdrawals'}).then(res => {
        this.withdrawalTicketForm = {
          formStatus: true,
          data: res
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    withdrawalDropList () {
      backstagePaymebtWithdrawalDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['status', 'currency'])
        this.dropList = res
      }).catch(() => {
      })
    },
    initTicket () {
      if (filter.getQueryString('id')) {
        this.backstagePaymentWithdrawalInfoHttp(filter.getQueryString('id'))
      }
    },
    // 获取提现单的日志
    getLogs (id) {
      backstagePaymentWithdrawalLogsHttp(id).then(res => {
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
      backstagePaymentWithdrawalExportLogsHttp(datalist).then((res) => {
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

<style scoped>

</style>
