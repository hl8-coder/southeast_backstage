<style lang="scss" scoped type="text/scss">

</style>
<style lang="scss" type="text/scss">
  .bankAccountManagement {
    .form_inline_comp{
      overflow: hidden;
      .el-form-item {
        width: 50%;
        float: left;
      }
    }
  }
</style>
<template>
  <div class="bankAccountManagement">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    >
      <template v-slot:content>
        <el-button @click="VisibleMethod('AdjustVisible')" type="warning">Adjust Balance</el-button>
        <el-button @click="VisibleMethod('InternalVisible')" type="warning">Internal Transfer</el-button>
<!--        <el-button @click="VisibleMethod('BufferVisible')" type="warning">Buffer Transfer</el-button>-->
      </template>
    </form-inline-comp>
    <el-tag
      style="margin: 0 2px"
      v-for="(item,index) in resInformation.meta.info"
      :key="item.key"
    >{{ index }} : {{ item }}</el-tag>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
      @sortChange="sortChange"
    />
    <el-dialog title="Add New Account" width="1000px" :visible.sync="AddVisible">
      <form-inline-comp
        class="form_inline_comp"
        ref="formInlineComp"
        inline="false"
        formLabelWidth="155px"
        :formInlineConfig = formConfig
        @onSubmit = onSubmit
      />
    </el-dialog>
    <el-dialog title="Adjust Balance" width="1000px" :visible.sync="AdjustVisible">
      <form-inline-comp
        ref="formInlineComp"
        inline="false"
        formLabelWidth="155px"
        :formInlineConfig = AdjustformConfig
        @onSubmit = AdjustonSubmit
        @changeEvent = AdjustChangeEvent
      />
    </el-dialog>
    <el-dialog title="Internal Transfer" width="1000px" :visible.sync="InternalVisible">
      <form-inline-comp
        ref="formInlineComp"
        inline="false"
        formLabelWidth="155px"
        :formInlineConfig = InternalformConfig
        @onSubmit = InternalonSubmit
        @changeEvent = changeEvent
      />
    </el-dialog>
    <el-dialog title="Buffer Transfer" width="1000px" :visible.sync="BufferVisible">
      <form-inline-comp
        ref="formInlineComp"
        inline="false"
        formLabelWidth="155px"
        :formInlineConfig = BufferformConfig
        @onSubmit = BufferonSubmit
        @changeEvent = BufferChangeEvent
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  backstageCompanyBankAccountsHttp,
  backstageDropListCompanyBankAccountHttp,
  postBackstageCompanyBankAccountsHttp,
  backstageCompanyBankAccountAdjustHttp,
  backstageCompanyBankAccountBufferTransferHttp,
  backstageCompanyBankAccountInternalTransferHttp,
  backstageCompanyBankAccountsDetailHttp
} from '../../api/compony_account_management/initAxios'
import element from '../../config/element'
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {mapGetters} from 'vuex'
export default {
  name: 'bankAccountManagement',
  data () {
    return {
      BufferVisible: false,
      InternalVisible: false,
      AdjustVisible: false,
      AddVisible: false,
      formLabelWidth: '140px',
      RiskIdRequist: {
        category: '',
        remark: ''
      },
      Visible: false,
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: '',
          label: 'Account Code',
          width: '80',
          render: (h, params) => {
            let _this = this
            // let routeData = _this.$router.resolve({
            //   name: 'bankAccountManagementDetailAndHitory',
            //   query: {breadcrumb: _this.$route.query.breadcrumb, account_name: params.item.account_name}
            // })
            let routeData = _this.$router.resolve({
              name: 'bank_management_bank_account_management_detail_and_history',
              query: {
                id: params.item.id,
                company_bank_account_code: params.item.code,
                breadcrumb: _this.$route.query.breadcrumb,
                DropList: JSON.stringify(_this.DropList)
              }
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
                      window.open(routeData.href)
                    }
                  }
                }
              }, params.item.code)
            ])
          }
        }, {
          prop: 'currency',
          label: 'Currency',
          width: '80',
        }, {
          prop: 'payment_group_name_list',
          label: 'Group',
          width: '80'
        }, {
          prop: 'type',
          label: 'Type',
          width: '80'
        }, {
          prop: 'bank_code',
          label: 'Bank Code',
          width: '80'
        }, {
          prop: 'balance',
          label: 'Current Balance',
          width: '80',
          sortable: 'custom'
        }, {
          prop: 'daily_fund_in',
          label: 'Deposit',
          width: '80',
          sortable: 'custom'
        }, {
          prop: 'fee',
          label: 'Fee',
          width: '80',
          sortable: 'custom'
        }, {
          prop: 'daily_fund_out',
          label: 'Withdrawal',
          width: '80',
          sortable: 'custom'
        }, {
          prop: 'status',
          label: 'Status',
          width: '80'
        }, {
          prop: 'app_related',
          label: 'APP Related',
          width: '80'
        }]
      },
      formInlineConfig: [
        {
          type: 'select',
          label: 'Group',
          formValue: 'payment_group_id',
          placeholder: 'Select A Group',
          clearable: true,
          value: '',
          list: ''
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
          label: 'Bank Code',
          formValue: 'bank_code',
          placeholder: 'Bank Code',
          value: ''
        },
        {
          type: 'select',
          label: 'Type',
          formValue: 'type',
          placeholder: 'Select A Type',
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
          type: 'add'
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        payment_group_id: '',
        status: '',
        type: '',
        bank_code: ''
      },
      formConfig: [
        {
          type: 'input',
          label: 'Holder Name',
          formValue: 'account_name',
          placeholder: 'Holder Name',
          value: ''
        },
        {
          type: 'input',
          label: 'Account Number',
          formValue: 'account_no',
          placeholder: 'Account Number',
          value: ''
        },
        {
          type: 'select',
          label: 'Group',
          formValue: 'payment_group_id',
          placeholder: 'Select A Group',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Type',
          formValue: 'type',
          placeholder: 'Select A Type',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Bank Code',
          formValue: 'bank_id',
          placeholder: 'Select A Bank Code',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Branch',
          formValue: 'branch',
          placeholder: 'Branch',
          value: ''
        },
        {
          type: 'input',
          label: 'Province',
          formValue: 'province',
          placeholder: 'Province',
          value: ''
        },
        {
          type: 'input',
          label: 'Username',
          formValue: 'user_name',
          placeholder: 'Username',
          value: ''
        },
        {
          type: 'input',
          label: 'Password',
          formValue: 'password',
          placeholder: 'Password',
          value: ''
        },
        {
          type: 'input',
          label: 'First Balance',
          formValue: 'first_balance',
          placeholder: 'First Balance',
          value: ''
        },
        {
          type: 'input',
          label: 'Current Balance',
          formValue: 'balance',
          placeholder: 'Current Balance',
          value: ''
        },
        {
          type: 'input',
          label: 'Min Balance',
          formValue: 'min_balance',
          placeholder: 'Min Balance',
          value: ''
        },
        {
          type: 'input',
          label: 'Max Balance',
          formValue: 'max_balance',
          placeholder: 'Max Balance',
          value: ''
        },
        {
          type: 'input',
          label: 'Daily Fund in Limit',
          formValue: 'daily_fund_in_limit',
          placeholder: 'Daily Fund in Limit',
          value: ''
        },
        {
          type: 'input',
          label: 'Daily Fund Out Limit',
          formValue: 'daily_fund_out_limit',
          placeholder: 'Daily Fund Out Limit',
          value: ''
        },
        {
          type: 'input',
          label: 'Daily Transaction Limit',
          formValue: 'daily_transaction_limit',
          placeholder: 'Daily Transaction Limit',
          value: ''
        },
        {
          type: 'input',
          label: 'Safe Key Pass',
          formValue: 'safe_key_pass',
          placeholder: 'Safe Key Pass',
          value: ''
        },
        {
          type: 'select',
          label: 'OTP',
          formValue: 'otp',
          placeholder: 'Select OTP',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'APP Related',
          formValue: 'app_related',
          placeholder: 'Select APP Related',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'Submit'
        }
      ],
      AdjustformConfig: [
        {
          type: 'select',
          label: 'Account Code',
          formValue: 'account_id',
          change: true,
          placeholder: 'Select A Account Code',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Balance',
          formValue: 'balance',
          readonly: true,
          placeholder: 'Balance',
          value: ''
        },
        {
          type: 'select',
          label: 'Credit/Debit',
          formValue: 'is_income',
          placeholder: 'Select A Credit/Debit',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Amount',
          formValue: 'amount',
          placeholder: 'Amount',
          value: ''
        },
        {
          type: 'input',
          label: 'Fee',
          formValue: 'fee',
          placeholder: 'Fee',
          value: ''
        },
        {
          type: 'select',
          label: 'Reason',
          formValue: 'reason',
          placeholder: 'Select A Reason',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'textarea',
          label: 'Remark',
          formValue: 'remark',
          placeholder: 'Please enter content',
          value: ''
        },
        {
          type: 'Submit'
        }
      ],
      InternalformConfig: [
        {
          type: 'select',
          label: 'From',
          formValue: 'from_account_id',
          placeholder: 'Select A From',
          change: true,
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'From\' Balance',
          formValue: 'balance1',
          readonly: true,
          placeholder: 'Balance',
          value: ''
        },
        {
          type: 'select',
          label: 'To',
          change: true,
          formValue: 'to_account_id',
          placeholder: 'Select A To',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'To\' Balance',
          readonly: true,
          formValue: 'balance2',
          placeholder: 'Balance',
          value: ''
        },
        {
          type: 'input',
          label: 'Amount',
          formValue: 'amount',
          placeholder: 'Amount',
          value: ''
        },
        {
          type: 'input',
          label: 'Fee',
          formValue: 'fee',
          placeholder: 'Fee',
          value: ''
        },
        {
          type: 'textarea',
          label: 'Remark',
          formValue: 'remark',
          placeholder: 'Please enter content',
          value: ''
        },
        {
          type: 'Submit'
        }
      ],
      BufferformConfig: [
        {
          type: 'select',
          label: 'Account Code',
          formValue: 'account_id',
          placeholder: 'Select A Account Code',
          change: true,
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Balance',
          formValue: 'balance',
          readonly: true,
          placeholder: 'Balance',
          value: ''
        },
        {
          type: 'select',
          label: 'Credit/Debit',
          formValue: 'is_income',
          placeholder: 'Select A Credit/Debit',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'amount',
          formValue: 'amount',
          placeholder: 'amount',
          value: ''
        },
        {
          type: 'textarea',
          label: 'remark',
          formValue: 'remark',
          placeholder: 'remark',
          value: ''
        },
        {
          type: 'Submit'
        }
      ],
      DropList: {}
    }
  },
  created () {
    this.DropListHttp()
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  methods: {
    VisibleMethod (value) {
      if (value === 'AdjustVisible') {
        this.AdjustVisible = true
        this.AdjustformConfig.forEach(item => {
          item.value = ''
        })
      } else if (value === 'InternalVisible') {
        this.InternalVisible = true
        this.InternalformConfig.forEach(item => {
          item.value = ''
        })
      } else if (value === 'BufferVisible') {
        this.BufferVisible = true
        this.BufferformConfig.forEach(item => {
          item.value = ''
        })
      }
    },
    DropListHttp () {
      filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
      backstageDropListCompanyBankAccountHttp().then(res => {
        this.DropList = res
        filter.formValueListFilter(this.formInlineConfig, res, ['payment_group_id', 'status', 'type'])
        filter.formValueListFilter(this.formConfig, res, ['payment_group_id', 'type', 'bank_id', 'otp', 'app_related'])
        filter.formValueListFilter(this.AdjustformConfig, res, ['is_income', 'account_id', 'reason'])
        filter.formValueListFilter(this.BufferformConfig, res, ['is_income', 'account_id'])
        this.InternalformConfig[0].list = res.account_id
        this.InternalformConfig[2].list = res.account_id
      }).catch(() => {
      })
    },
    AdjustChangeEvent (value) {
      if (value.value) {
        backstageCompanyBankAccountsDetailHttp(value.value).then(res => {
          this.AdjustformConfig[1].value = res.balance
        }).catch(() => {
        })
      } else {
        this.AdjustformConfig[1].value = ''
      }
    },
    BufferChangeEvent (value) {
      if (value.value) {
        backstageCompanyBankAccountsDetailHttp(value.value).then(res => {
          this.BufferformConfig[1].value = res.balance
        }).catch(() => {
        })
      } else {
        this.BufferformConfig[1].value = ''
      }
    },
    changeEvent (value) {
      if (value.value) {
        backstageCompanyBankAccountsDetailHttp(value.value).then(res => {
          if (value.formValue === 'from_account_id') {
            this.InternalformConfig[1].value = res.balance
          } else {
            this.InternalformConfig[3].value = res.balance
          }
          console.log()
        }).catch(() => {
        })
      } else {
        if (value.formValue === 'from_account_id') {
          this.InternalformConfig[1].value = ''
        } else {
          this.InternalformConfig[3].value = ''
        }
      }
    },
    AdjustonSubmit (form) {
      delete form.balance
      backstageCompanyBankAccountAdjustHttp(form).then(res => {
        this.AdjustVisible = false
        element.message({
          type: 'success',
          message: 'Adjust success'
        })
        this.initHttp(this.formInline)
      }).catch(() => {
      })
    },
    InternalonSubmit (form) {
      var datalist = {}
      datalist.from_account_id = form.from_account_id
      datalist.to_account_id = form.to_account_id
      datalist.amount = form.amount
      datalist.remark = form.remark
      datalist.fee = form.fee
      backstageCompanyBankAccountInternalTransferHttp(datalist).then(res => {
        this.InternalVisible = false
        element.message({
          type: 'success',
          message: 'Internal success'
        })
        this.initHttp(this.formInline)
      }).catch(() => {
      })
    },
    BufferonSubmit (form) {
      delete form.balance
      backstageCompanyBankAccountBufferTransferHttp(form).then(res => {
        this.BufferVisible = false
        element.message({
          type: 'success',
          message: 'Buffer success'
        })
        this.initHttp(this.formInline)
      }).catch(() => {
      })
    },
    onSubmit (form) {
      postBackstageCompanyBankAccountsHttp(form).then(res => {
        this.AddVisible = false
        element.message({
          type: 'success',
          message: 'add success'
        })
        this.initHttp(this.formInline)
      }).catch(() => {
      })
    },
    Submit () {

    },
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
        element.message({
          type: 'error',
          message: 'There is no request'
        })
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        // formInline.include = 'user'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageCompanyBankAccountsHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
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
    // memberDropList下拉菜单
    onAdd () {
      this.AddVisible = true
      this.formConfig.forEach(item => {
        item.value = ''
      })
    },
    sortChange (obj) {
      this.initHttp(Object.assign(this.formInline, obj))
    }
  }
}
</script>
