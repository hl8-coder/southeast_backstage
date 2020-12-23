<template>
  <div class="DepositHistory">
    <search-navs
      :user_name="formInline.user_name"
      @searchMemberCode="callbacks"
    />
    <form-inline-comp
      :form-inline-config="selfFormInlineConfig"
      @onSubmit = selfSearch
      @onAdd = onAdd
    />
    <div class="TheTotalInfo">
      <el-tag>{{totalInfo.transactions}} transactions</el-tag>
      <el-tag type="success">Deposit (+) {{totalInfo.amount}}</el-tag>
    </div>
    <table-comp
      v-if="formInline.user_name"
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  selfSearch
    ></table-comp>
    <deposit-ticket-dialog
      :DropListDeposit = DropListDeposit
      :ticketConfig = ticketConfig
    />
    <el-dialog
      title=""
      :visible.sync="manualDepositDialog.status"
    >
      <manual-deposit
        :userInfo = user
        @refreshDepositList = refreshDepositList
      />
    </el-dialog>
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstagePaymentFundTransferDepositHistoryHttp
} from '../../api/payment/fundTransfers/initAxiosFundTransfer'
import {
  backstageDepositDetailHttp,
  backstageDropListDepositHttp,
  backstageManualDepositCheckUsernameHttp
} from '../../api/payment/deposit/initAxios'
import SearchNavs from './FundTransfers/SearchNavs'
import DepositTicketDialog from '../../components/ticket/depositTicketDialog'
import ManualDeposit from './FundTransfers/ManualDeposit'
import moment from 'moment'

export default {
  name: 'DepositHistory',
  components: {ManualDeposit, DepositTicketDialog, SearchNavs, TableComp, FormInlineComp},
  data () {
    return {
      ticketConfig: {
        ticketVisible: false,
        data: {}
      },
      selfFormInlineConfig: [
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
          type: 'defaultMonth',
          formValue: 'date',
          value: ''
        },
        {
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      tableConfig: {
        border: true,
        loading: false,
        rowStyle: false,
        tableColumn: [
          {
            prop: 'created_at',
            label: 'DATE'
          },
          {
            prop: 'order_no',
            label: 'TRANSACTION ID',
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
          },
          {
            prop: 'fund_in_account',
            label: 'BANK'
          },
          {
            prop: 'display_payment_platform',
            label: 'CHANNEL'
          },
          {
            prop: 'amount',
            label: 'Submitted Amount'
          },
          {
            prop: 'arrival_amount',
            label: 'Received Amount'
          },
          {
            prop: 'display_status',
            label: 'STATUS'
          }
        ]
      },
      resInformation: {},
      DropListDeposit: {},
      formInline: {
        include: 'user,paymentPlatform',
        user_name: '',
        status: '',
        order_no: '',
        start_at: '',
        end_at: ''
      },
      totalInfo: {
        transactions: '',
        amount: ''
      },
      manualDepositDialog: {
        status: false
      },
      user: {}
    }
  },
  methods: {
    refresh () {
      this.initDepositHistory(this.formInline)
    },
    // 提交表单与分页回调
    callbacks (value) {
      this.formInline.user_name = value
      this.initDepositHistory(this.formInline)
    },
    selfSearch (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initDepositHistory(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initDepositHistory(this.formInline)
        return
      }
      value.user_name = this.formInline.user_name
      this.initDepositHistory(value)
    },
    // 数据初始化
    initDepositHistory (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.include = this.formInline.include
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      formInline.start_at = formInline.start_at ? moment(formInline.start_at).format('YYYY-MM-DD HH:mm:ss') : ''
      formInline.end_at = formInline.end_at ? moment(formInline.end_at).format('YYYY-MM-DD HH:mm:ss') : ''
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstagePaymentFundTransferDepositHistoryHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
        this.totalInfo = res.meta.total
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 下拉菜单
    depositHistoryDropList () {
      backstageDropListDepositHttp({}).then(res => {
        filter.formValueListFilter(this.selfFormInlineConfig, res, ['status'])
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
    // 添加手动充值
    onAdd () {
      this.checkMemberCode(this.$route.query.name)
      this.manualDepositDialog.status = true
    },
    // 检查member
    checkMemberCode (name) {
      backstageManualDepositCheckUsernameHttp({name: name, include: 'info'}).then(res => {
        this.user = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // 刷新列表 关闭弹窗
    refreshDepositList () {
      this.initDepositHistory(this.formInline)
      this.manualDepositDialog.status = false
    }
  },
  activated () {
    let name = this.$route.query.name
    if (name) {
      this.formInline.user_name = name
      this.initDepositHistory(this.formInline)
    }
    this.depositHistoryDropList()
    this.backstageDropListDepositHttp()
  }
}
</script>

<style scoped>

</style>
