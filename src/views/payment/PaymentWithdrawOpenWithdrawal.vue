<style lang="scss" scoped type="text/scss">
</style>

<template>
  <div class="OpenWithdrawal">
    <form-inline-comp
      :form-inline-config="formInlineConfig"
      @onSubmit = callbacks
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="success" @click="downloadExcel" :loading="downloadLoading">Download</el-button>
      </template>
    </form-inline-comp>
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
  </div>
</template>

<script>
import tableComp from '../../components/table/tableComp'
import {mapGetters} from 'vuex'
import WithdrawalDialog from './Withdrawal/newTicket/WithdrawalDialog'
import {
  backstagePaymebtWithdrawalDropListHttp,
  backstagePaymentWithdrawalInfoHttp,
  backstagePaymentWithdrawalOpenWithdrawalHttp,
  backstagePaymentWithdrawalLogsHttp,
  backstagePaymentWithdrawalExportLogsHttp
} from '../../api/payment/withdraw/initAxiosWithdrawal'
import filter from '../../util/filter'
import FormInlineComp from '../../components/form/formInlineComp'
export default {
  name: 'OpenWithdrawal',
  data () {
    return {
      resInformation: {},
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
              if (!params.item.is_open_detail) {
                return h('div', {}, params.item.order_no)
              }
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
            prop: 'display_status',
            label: 'TransactionType'
          },
          {
            prop: 'user.name',
            label: 'Member Code'
          },
          {
            prop: 'account_no',
            label: 'Account'
          },
          {
            prop: 'account_name',
            label: 'Name'
          },
          {
            prop: 'bank.name',
            label: 'Bank Name'
          },
          {
            prop: 'user.currency',
            label: 'Currency'
          },
          {
            prop: 'amount',
            label: 'Amount'
          },
          {
            prop: 'created_at',
            label: 'Transaction Date'
          },
          {
            prop: 'city',
            label: 'Location'
          },
          {
            prop: 'last_access_name',
            label: 'Last Access'
          }
        ]
      },
      formInline: {
        include: 'user,user.info,user.account,user.gamePlatformUsers,user.vip,user.reward,bank',
        per_page: 50,
        page: 1,
        currency: ''
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
      withdrawalTicketForm: {
        formStatus: false,
        data: ''
      },
      dropList: {},
      timer: 0,
      timers: '',
      cellClickStatus: true,
      downloadLoading: false
    }
  },
  components: {
    FormInlineComp,
    WithdrawalDialog,
    tableComp
  },
  computed: {
    ...mapGetters([
      'PaymentWithdrawNav',
      'globalDropList',
    ])
  },
  activated () {
    filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
    this.initOpenWithdrawal(this.formInline)
    this.timers = setInterval(() => { this.initOpenWithdrawal(this.formInline) }, 3000)
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
        formInline.include = 'user,user.info,user.account,user.gamePlatformUsers,user.vip,user.reward,bank'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstagePaymentWithdrawalOpenWithdrawalHttp(datalist).then(res => {
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
        clearInterval(this.timers)
        this.timers = setInterval(() => { this.initOpenWithdrawal(this.formInline) }, 3000)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        clearInterval(this.timers)
        this.timers = setInterval(() => { this.initOpenWithdrawal(this.formInline) }, 3000)
        return
      }
      clearInterval(this.timers)
      this.timers = setInterval(() => { this.initOpenWithdrawal(value) }, 3000)
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
    downloadExcel () {
      this.downloadLoading = true
      backstagePaymentWithdrawalExportLogsHttp().then((res) => {
        filter.downloadExcel(res)
        this.downloadLoading = false
      })
    }
  }
}
</script>
