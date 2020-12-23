<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="AdvanceCredit">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @changeEvent = changeEvent
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange = callbacks
    />
    <deposit-ticket-dialog
      :DropListDeposit = DropListDeposit
      :ticketConfig = ticketConfig
    />
  </div>
</template>

<script>
import tableComp from '../../components/table/tableComp'
import formInlineComp from '../../components/form/formInlineComp'
import filter from '../../util/filter'
import depositTicketDialog from '../../components/ticket/depositTicketDialog'
import element from '../../config/element'
import {
  backstageDepositAdvanceCreditHttp,
  backstageDropListDepositHttp,
  backstageDepositDetailHttp,
  loseHttp
} from '../../api/payment/deposit/initAxios'
export default {
  name: 'AdvanceCredit',
  data () {
    return {
      ticketConfig: {
        ticketVisible: false,
        data: {}
      },
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
              h('el-link', {
                props: {
                  circle: true,
                  type: 'primary',
                  icon: 'el-icon-s-order',
                  disabled: !((params.item.tag === 1) && (params.item.status = 3))
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.$prompt('', 'Remark', {
                      confirmButtonText: 'affirm',
                      cancelButtonText: 'cancel',
                      inputType: 'textarea',
                      inputValue: params.item.remark
                    }).then(({ value }) => {
                      loseHttp(params.item.id, {remark: value}).then(res => {
                        params.item.remark = value
                        element.message({
                          type: 'success',
                          message: 'success remarked'
                        })
                      }).catch(error => {
                        console.log(error)
                      })
                    }).catch(() => {
                    })
                  }
                }
              }),
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
          prop: 'user.currency',
          label: 'Currency',
          width: '60'
        }, {
          prop: 'user.name',
          label: 'Member Code',
          width: '60'
        }, {
          prop: 'deposit_at',
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
          prop: 'amount',
          label: 'Amount',
          width: '60'
        }, {
          prop: 'last_access',
          label: 'Last Access',
          width: '60'
        }, {
          prop: 'display_tag',
          label: 'Status',
          width: '60'
        }]
      },
      formInlineConfig: [
        {
          type: 'select',
          label: 'Status',
          formValue: 'tag',
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
          type: 'date',
          label: 'Transaction Date',
          value: ''
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        include: 'user,paymentPlatform',
        per_page: 50,
        page: 1,
        tag: '',
        currency: '',
        reference: '',
        start_at: '',
        user_name: '',
        order_no: '',
        end_at: ''
      },
      timer: '',
      auto_refresh: null
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
    refresh () {
      this.initHttp(this.formInline)
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
        filter.formValueListFilter(this.formInlineConfig, res, ['auto_refresh', 'currency', 'tag', 'fund_in_account'])
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
        formInline.include = 'user,paymentPlatform'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      delete formInline.auto_refresh
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageDepositAdvanceCreditHttp(datalist).then(res => {
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
    }
  }
}
</script>
