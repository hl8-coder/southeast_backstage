<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="MemberTagRemark">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import {
  backstageRMRiskPlayerWinnerDropListHttp,
  backstageRMRiskMembersTagRemarkHttp
} from '../../api/rm_tool/initAxios'
import filter from '../../util/filter'
export default {
  name: 'MemberTagRemark',
  data () {
    return {
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'No',
            fixWidth: '50px'
          },
          {
            prop: 'name',
            label: 'Member Code'
          },
          {
            prop: 'info.full_name',
            label: 'Full Name'
          },
          {
            prop: 'currency',
            label: 'Currency',
            fixWidth: '70px'
          },
          {
            prop: 'info.email',
            label: 'Email'
          },
          {
            prop: 'info.register_ip',
            label: 'Register IP'
          },
          {
            prop: 'created_at',
            label: 'Registration Date'
          },
          {
            prop: 'transaction_summary.total_deposit',
            label: 'Total Deposit Amt'
          },
          {
            prop: 'transaction_summary.total_withdrawal',
            label: 'Total Withdrawal Amt'
          },
          {
            prop: 'bet_summary.total_bonus',
            label: 'Bonus'
          },
          {
            prop: 'bet_summary.total_stake',
            label: 'Total Eligible Stake Amt'
          },
          {
            prop: 'bet_summary.total_profit',
            label: 'Win/ Loss Amt'
          },
          {
            prop: 'bet_summary.total_bet_num',
            label: 'Total Wagers'
          },
          {
            prop: 'percent',
            label: 'Win/Lose %',
            render: (h, params) => {
              return h('div', [
                h('span', {}, params.item.percent + '%')
              ])
            }
          },
          {
            prop: 'bet_summary.per_bet',
            label: 'Ave Bet'
          }
        ]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'name',
          clearable: true,
          placeholder: 'Member Code',
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
          type: 'input',
          label: 'Full Name',
          formValue: 'full_name',
          clearable: true,
          placeholder: 'Full Name',
          value: ''
        },
        {
          type: 'input',
          label: 'Email',
          formValue: 'email',
          clearable: true,
          placeholder: 'Email',
          value: ''
        },
        {
          type: 'input',
          label: 'Contact No',
          formValue: 'phone',
          clearable: true,
          placeholder: 'Contact No',
          value: ''
        },
        {
          type: 'select',
          label: 'Deposit',
          formValue: 'deposit',
          placeholder: 'Select A Deposit',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Risk Category',
          formValue: 'risk_group_id',
          placeholder: 'Select A Risk Category',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'payment Group',
          formValue: 'payment_group_id',
          placeholder: 'Select A payment Group',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Registeration IP',
          formValue: 'register_ip',
          clearable: true,
          placeholder: 'Registeration IP',
          value: ''
        },
        {
          type: 'input',
          label: 'Register URL',
          formValue: 'register_url',
          clearable: true,
          placeholder: 'Register URL',
          value: ''
        },
        {
          type: 'date',
          label: 'Date'
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        include: 'vip,info',
        per_page: 50,
        page: 1,
        name: '',
        currency: '',
        risk_group_id: '',
        payment_group_id: '',
        full_name: '',
        email: '',
        phone: '',
        register_url: '',
        register_ip: '',
        deposit: ''
      }
    }
  },
  created () {
    this.dropListHttp()
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
      if (!formInline.per_page && !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilterByEcho(formInline, [], ['per_page', 'page', 'include'])
      backstageRMRiskMembersTagRemarkHttp(datalist).then(res => {
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
    dropListHttp () {
      backstageRMRiskPlayerWinnerDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['product_code', 'currency'])
        this.dropList = res
      }).catch(() => {
      })
    },
    // resetFilter
    resetFilter () {
      this.formInlineConfig.forEach((item) => {
        item.value = ''
      })
    }
  }
}
</script>
