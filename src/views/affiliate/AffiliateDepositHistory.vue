<template>
  <div class="AffiliateDepositHistory">
    <affiliate-fund-transfer-nav
      :user_name="formInline.user_name"
      @searchMemberCode = searchMemberCode
    />
    <form-inline-comp
      :form-inline-config="formInlineConfig"
      @onSubmit = callbacks
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
      @handleSizePageChange =  callbacks
    />
    <deposit-ticket-dialog
      :DropListDeposit = dropList
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
import AffiliateFundTransferNav from '../../components/nav/AffiliateFundTransferNav'
import filter from '../../util/filter'
import {
  backstagePaymentFundTransferDepositHistoryHttp
} from '../../api/payment/fundTransfers/initAxiosFundTransfer'
import {
  backstageDepositDetailHttp,
  backstageDropListDepositHttp,
  backstageManualDepositCheckUsernameHttp
} from '../../api/payment/deposit/initAxios'
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import DepositTicketDialog from '../../components/ticket/depositTicketDialog'
import ManualDeposit from '../payment/FundTransfers/ManualDeposit'
export default {
  name: 'AffiliateDepositHistory',
  components: {
    ManualDeposit,
    DepositTicketDialog,
    TableComp,
    FormInlineComp,
    AffiliateFundTransferNav},
  data () {
    return {
      formInline: {
        include: 'user,paymentPlatform',
        user_name: '',
        is_agent: 1,
        status: '',
        order_no: '',
        start_at: '',
        end_at: ''
      },
      formInlineConfig: [
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
      totalInfo: {
        transactions: 0,
        amount: '0.00'
      },
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
            label: 'AMOUNT'
          },
          {
            prop: 'display_status',
            label: 'STATUS'
          }
        ]
      },
      resInformation: {},
      dropList: {},
      ticketConfig: {
        ticketVisible: false,
        data: {}
      },
      manualDepositDialog: {
        status: false
      },
      user: {}
    }
  },
  methods: {
    // 顶部搜索
    searchMemberCode (val) {
      this.formInline.user_name = val
      this.initHttp(this.formInline)
    },
    // 获取列表
    initHttp (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.include = this.formInline.include
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
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
    // 搜索 & 分页 回调
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
      value.user_name = this.formInline.user_name
      value.is_agent = this.formInline.is_agent
      this.initHttp(value)
    },
    // 添加手动充值
    onAdd () {
      this.checkMemberCode(this.$route.query.name)
      this.manualDepositDialog.status = true
    },
    // 检查member
    checkMemberCode (name) {
      backstageManualDepositCheckUsernameHttp({name: name, include: 'info', is_agent: true}).then(res => {
        this.user = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // 下拉菜单
    dropListHttp () {
      backstageDropListDepositHttp({}).then(res => {
        this.dropList = res
        filter.formValueListFilter(this.formInlineConfig, res, ['status'])
      }).catch((error) => {
        console.log(error)
      })
    },
    // 获取充值单详情
    backstageDepositDetailHttp (id) {
      backstageDepositDetailHttp(id, {include: 'user,accessLogs,operationLogs,userBank,userAccount,userDeposits,bankTransaction,images'}).then(res => {
        this.ticketConfig = {
          ticketVisible: true,
          data: res
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 刷新列表 关闭弹窗
    refreshDepositList () {
      this.initHttp(this.formInline)
      this.manualDepositDialog.status = false
    },
    refresh () {
      this.initHttp(this.formInline)
    }
  },
  activated () {
    let name = this.$route.query.name
    if (name) {
      this.formInline.user_name = name
      this.initHttp(this.formInline)
    }
    this.dropListHttp()
  }
}
</script>

<style scoped>

</style>
