<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="MemberDataQuery">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
      @sortChange="sortChange"
    />
    <el-dialog
      title="Member Code"
      width="1200px"
      :visible.sync="dialogStatus"
    >
      <table-comp
        :tableConfig = memberTableConfig
        :resInformation = memberResInformation
      />
      <table-comp
        style="margin-top: 10px;"
        :tableConfig = memberByMonthTableConfig
        :resInformation = memberByMonthResInformation
      />
    </el-dialog>
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import {
  backstageRMMemberDataQueryHttp,
  backstageRMMemberDataQueryAccountSummaryHttp,
  backstageRMMemberDataQueryAccountSummaryByMonthHttp
} from '../../api/rm_tool/initAxios'
import filter from '../../util/filter'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'MemberDataQuery',
  data () {
    return {
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'name',
            label: 'Member Code',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.accountSummary(params.item.id)
                      this.accountSummaryByMonth(params.item.id)
                      this.dialogStatus = true
                    }
                  }
                }, params.item.name)
              ])
            }
          },
          {
            prop: 'currency',
            label: 'Currency',
            fixWidth: '75px'
          },
          {
            prop: 'info.full_name',
            label: 'Full Name'
          },
          {
            prop: 'info.phone',
            label: 'Phone Number'
          },
          {
            prop: 'info.birth_at',
            label: 'Date of Birth'
          },
          {
            prop: 'info.email',
            label: 'Email'
          },
          {
            prop: 'created_at',
            label: 'Registration Date',
            sortable: 'custom'
          },
          {
            prop: 'info.register_ip',
            label: 'Registered IP'
          },
          {
            prop: 'info.last_login_ip',
            label: 'Last Login IP'
          },
          {
            prop: 'total_deposit',
            label: 'Total Deposit'
          },
          {
            prop: 'total_withdrawal',
            label: 'Total Withdrawal'
          },
          {
            prop: 'total_wallet_balance',
            label: 'Total Wallet Balance'
          },
          {
            prop: 'display_status',
            label: 'Status'
          }
        ]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code 1',
          formValue: 'name_1',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'input',
          label: 'Member Code 2',
          formValue: 'name_2',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'input',
          label: 'Member Code 3',
          formValue: 'name_3',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'input',
          label: 'Full Name',
          formValue: 'full_name',
          placeholder: 'Full Name',
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
          label: 'Date',
          type: 'date'
        },
        {
          type: 'Submit'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        include: 'info',
        name_3: '',
        name_2: '',
        name_1: '',
        end_at: '',
        currency: '',
        full_name: '',
        order: '',
        start_at: ''
      },
      dialogStatus: false,
      memberTableConfig: {
        loading: true,
        border: true,
        tableColumn: [
          {
            prop: 'date',
            label: 'Date',
            fixWidth: '85px'
          },
          {
            prop: 'deposit',
            label: 'Total DP',
            fixWidth: '70px'
          },
          {
            prop: 'withdrawal',
            label: 'Total WD',
            fixWidth: '70px'
          },
          {
            prop: 'stake_of_sport',
            label: 'Total Stake Sports',
            fixWidth: '120px'
          },
          {
            prop: 'open_bet',
            label: 'Open Stake Sports',
            fixWidth: '125px'
          },
          {
            prop: 'stake_of_other',
            label: 'Stake Amount Others',
            fixWidth: '140px'
          },
          {
            prop: 'effective_bet',
            label: 'Real Bet Amount',
            fixWidth: '112px'
          },
          {
            prop: 'stake_return',
            label: 'WinLoss',
            fixWidth: '95px'
          },
          {
            prop: 'adjustment',
            label: 'Total Adjustment',
            fixWidth: '111px'
          },
          {
            prop: 'bonus',
            label: 'Turnover Amount Added'
          }
        ]
      },
      memberResInformation: {},
      memberByMonthTableConfig: {
        loading: true,
        border: true,
        tableColumn: [
          {
            prop: 'date',
            label: 'Date',
            fixWidth: '85px'
          },
          {
            prop: 'deposit',
            label: 'Total DP',
            fixWidth: '70px'
          },
          {
            prop: 'withdrawal',
            label: 'Total WD',
            fixWidth: '70px'
          },
          {
            prop: 'stake_of_sport',
            label: 'Total Stake Sports',
            fixWidth: '120px'
          },
          {
            prop: 'open_bet',
            label: 'Open Stake Sports',
            fixWidth: '125px'
          },
          {
            prop: 'stake_of_other',
            label: 'Stake Amount Others',
            fixWidth: '140px'
          },
          {
            prop: 'effective_bet',
            label: 'Real Bet Amount',
            fixWidth: '112px'
          },
          {
            prop: 'stake_return',
            label: 'WinLoss',
            fixWidth: '95px'
          },
          {
            prop: 'adjustment',
            label: 'Total Adjustment',
            fixWidth: '111px'
          },
          {
            prop: 'bonus',
            label: 'Turnover Amount Added'
          }
        ]
      },
      memberByMonthResInformation: {}
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  created () {
    filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp
  },
  methods: {
    // 会员信息请求
    initHttp (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
        formInline.include = this.formInline.include
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilterByEcho(formInline, ['end_at', 'currency', 'full_name', 'start_at'])
      backstageRMMemberDataQueryHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
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
    // 下拉菜单
    initDropList () {},
    // 排序
    sortChange () {
      this.formInline.order = this.formInline.order === 'created_at_desc' ? 'created_at_asc' : 'created_at_desc'
      this.initHttp(this.formInline)
    },
    // account summary
    accountSummary (id) {
      this.memberTableConfig.loading = true
      backstageRMMemberDataQueryAccountSummaryHttp({user_id: id}).then(res => {
        this.memberResInformation.data = res
        this.memberTableConfig.loading = false
        console.log(this.memberResInformation)
      }).catch((error) => {
        this.memberTableConfig.loading = false
        console.log(error)
      })
    },
    // account summary
    accountSummaryByMonth (id) {
      this.memberByMonthTableConfig.loading = true
      backstageRMMemberDataQueryAccountSummaryByMonthHttp({user_id: id}).then(res => {
        this.memberByMonthResInformation.data = res
        this.memberByMonthTableConfig.loading = false
        console.log(this.memberResInformation)
      }).catch((error) => {
        this.memberByMonthTableConfig.loading = false
        console.log(error)
      })
    }
  }
}
</script>
