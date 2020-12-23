<template>
  <div class="WithdrawalHistory">
    <search-navs
      :user_name="formInline.user_name"
      @searchMemberCode="callbacks"
    />
    <form-inline-comp
      :form-inline-config="selfFormInlineConfig"
      @onSubmit = selfSearch
    />
    <div class="TheTotalInfo">
      <el-tag>{{totalInfo.transactions}} transactions</el-tag>
      <el-tag type="danger">Withdrawal (-) {{totalInfo.amount}}</el-tag>
    </div>
    <table-comp
      v-if="formInline.user_name"
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  selfSearch
    ></table-comp>
    <WithdrawalDialog
      :withdrawalDetail = withdrawalTicketForm
      :dropList="dropList"
      @refreshOpenWithdrawal="initWithdrawalHistory(formInline)"
    />
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstagePaymentFundTransferWithdrawalHistoryHttp
} from '../../api/payment/fundTransfers/initAxiosFundTransfer'
import {
  backstagePaymebtWithdrawalDropListHttp,
  backstagePaymentWithdrawalInfoHttp
} from '../../api/payment/withdraw/initAxiosWithdrawal'
import SearchNavs from './FundTransfers/SearchNavs'
import WithdrawalDialog from './Withdrawal/newTicket/WithdrawalDialog'
export default {
  name: 'WithdrawalHistory',
  components: {WithdrawalDialog, SearchNavs, TableComp, FormInlineComp},
  data () {
    return {
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
            prop: 'bank.name',
            label: 'BANK'
          },
          {
            prop: 'amount',
            label: 'AMOUNT'
          },
          {
            prop: 'status',
            label: 'STATUS'
          }
        ]
      },
      resInformation: {},
      formInline: {
        include: 'user,bank',
        per_page: 50,
        page: 1,
        user_name: ''
      },
      dropList: {},
      withdrawalTicketForm: {
        formStatus: false,
        data: ''
      },
      totalInfo: {
        transactions: '',
        amount: ''
      }
    }
  },
  methods: {
    // 提交表单与分页回调
    callbacks (value) {
      this.formInline.user_name = value
      this.initWithdrawalHistory(this.formInline)
    },
    selfSearch (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initWithdrawalHistory(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initWithdrawalHistory(this.formInline)
        return
      }
      value.user_name = this.formInline.user_name
      this.initWithdrawalHistory(value)
    },
    // 数据初始化
    initWithdrawalHistory (formInline) {
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
      backstagePaymentFundTransferWithdrawalHistoryHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
        this.totalInfo = res.meta.total
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 下拉菜单
    withdrawalHistoryDropList () {
      backstagePaymebtWithdrawalDropListHttp().then(res => {
        filter.formValueListFilter(this.selfFormInlineConfig, res, ['status'])
        this.dropList = res
      }).catch(() => {
      })
    },
    withdrawalDropList () {
      backstagePaymebtWithdrawalDropListHttp().then(res => {
        this.dropList = res
      }).catch(() => {
      })
    },
    // 提现Ticket
    backstagePaymentWithdrawalInfoHttp (id) {
      backstagePaymentWithdrawalInfoHttp(id, {include: 'bank,user.info,user.account,images,userWithdrawals'}).then(res => {
        this.withdrawalTicketForm = {
          formStatus: true,
          data: res
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  activated () {
    let name = this.$route.query.name
    if (name) {
      this.formInline.user_name = name
      this.initWithdrawalHistory(this.formInline)
    }
    this.withdrawalHistoryDropList()
    this.withdrawalDropList()
  }
}
</script>

<style scoped>

</style>
