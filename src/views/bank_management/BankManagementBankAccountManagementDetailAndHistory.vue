<style lang="scss" scoped type="text/scss">
  .bankAccountManagementDetailAndHitory {
    overflow: hidden;
    .AddMembersProfil{
      float: right;
      margin-bottom: 5px;
      margin-top: -30px;
    }
    .nav {
      margin-bottom: 5px;
    }
    .information{
      margin-right: 40px;
      .title {
        font-size: 18px;
        margin-bottom: 10px;
        font-weight: 600;
        color: #666;
      }
      > li{
        line-height: 26px;
        min-width: 400px;
        text-align: left;
        button {
          float: right;
        }
        span {
          margin: 0 10px;
        }
        i {
          font-size: 14px;
        }
        .el-icon-info:hover {
          color: #409EFF;
          cursor: pointer;
        }
        .popWindow{
          color: #409EFF;
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
</style>
<style lang="scss" type="text/scss">
  .information {
    .el-button--small, .el-button--small.is-round{
      padding: 3px 6px;
      vertical-align: middle;
    }
  }
</style>
<template>
    <div class="bankAccountManagementDetailAndHitory">
      <div class="nav">
        <el-button @click="detailORhistory = true" :type="detailORhistory? 'warning': null">Account Info</el-button>
        <el-button @click="detailORhistory = false" :type="!detailORhistory? 'warning': null">Account History</el-button>
        <el-button type="danger" @click="$router.push({name: 'bank_management_bank_account_management', query: {breadcrumb: $route.query.breadcrumb}})">Back previous page</el-button>
      </div>
      <div v-if="detailORhistory">
        <el-button
          type="primary"
          class="AddMembersProfil"
          @click="addRemark"
        >
          Add Account Profile
        </el-button>
        <table-comp
          :tableConfig = ProfileRemarkstableConfig
          :resInformation = ProfileRemarksData
          @handleSizePageChange = handleSizePageChange
        />
        <div class="FlexRowFlexStartFlexStart">
          <ul class="information">
            <li class="title">General Info</li>
            <li>Currency: <span>{{informatin.currency}}</span></li>
            <li>Account Code: <span>{{informatin.code}}</span></li>
            <li>Bank Code: <span>{{informatin.bank_code}}</span></li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('payment_group_id')" class="el-icon-info"></i>
              Group: <span>{{informatin.payment_group_name_list}}</span>
<!--              <el-button @click="Update('payment_group_id', informatin.display_payment_group_id, 'Group')" type="danger">Update</el-button>-->
            </li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('type')" class="el-icon-info"></i>
              Type: <span>{{informatin.type}}</span>
              <el-button @click="Update('type', informatin.type, 'Type')" type="danger">Update</el-button>
            </li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('branch')" class="el-icon-info"></i>
              Branch: <span>{{informatin.branch}}</span>
              <el-button @click="Update('branch', informatin.branch, 'Branch')" type="danger">Update</el-button>
            </li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('province')" class="el-icon-info"></i>
              Province: <span>{{informatin.province}}</span>
              <el-button @click="Update('province', informatin.province, 'Province')" type="danger">Update</el-button>
            </li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('status')" class="el-icon-info"></i>
              Status: <span>{{informatin.status}}</span>
              <el-button @click="Update('status', informatin.status, 'Status')" type="danger">Update</el-button>
            </li>
          </ul>
          <ul class="information">
            <li class="title">Security Info</li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('account_name')" class="el-icon-info"></i>
              Account Holder Name: <span>{{informatin.account_name}}</span>
              <el-button @click="Update('account_name', informatin.account_name, 'Account Holder Name')" type="danger">Update</el-button>
            </li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('account_no')" class="el-icon-info"></i>
              Account Number: <span>{{informatin.account_no}}</span>
              <el-button @click="Update('account_no', informatin.account_no, 'Account Number')" type="danger">Update</el-button>
            </li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('phone')" class="el-icon-info"></i>
              Phone Number: <span>{{informatin.phone}}</span>
              <el-button @click="Update('phone', informatin.phone, 'Phone')" type="danger">Update</el-button>
            </li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('phone_asset')" class="el-icon-info"></i>
              Phone Asset: <span>{{informatin.phone_asset}}</span>
              <el-button @click="Update('phone_asset', informatin.phone_asset, 'Phone Asset')" type="danger">Update</el-button>
            </li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('user_name')" class="el-icon-info"></i>
              Username: <span>{{informatin.user_name}} <button class="copy1" data-clipboard-action="copy" :data-clipboard-text="informatin.user_name" style="margin-left: 10px" @click="copy">copy</button></span>
              <el-button @click="Update('user_name', informatin.user_name, 'Username')" type="danger">Update</el-button>
            </li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('password')" class="el-icon-info"></i>
              Password: <span>{{informatin.password}} <button class="copy1" data-clipboard-action="copy" :data-clipboard-text="informatin.password" style="margin-left: 10px" @click="copy">copy</button></span>
              <el-button @click="Update('password', informatin.password, 'Password')" type="danger">Update</el-button>
            </li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('safe_key_pass')" class="el-icon-info"></i>
              Safe Key Pass: <span>{{informatin.safe_key_pass}}</span>
              <el-button @click="Update('safe_key_pass', informatin.safe_key_pass, 'Safe Key Pass')" type="danger">Update</el-button>
            </li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('otp')" class="el-icon-info"></i>
              OTP: <span>{{informatin.display_otp}}</span>
              <el-button @click="Update('otp', informatin.display_otp, 'otp')" type="danger">Update</el-button>
            </li>
            <li>
              <i @click="backstageUsersAuditMethodHttp('app_related')" class="el-icon-info"></i>
              APP Related: <span>{{informatin.app_related}}</span>
              <el-button @click="Update('app_related', informatin.app_related, 'app_related')" type="danger">Update</el-button>
            </li>
          </ul>
          <ul class="information">
            <li class="title">Daily Limit</li>
            <li>
              Maximum Fund Out: <span>{{informatin.daily_fund_out_limit}}</span>
              <el-button @click="Update('daily_fund_out_limit', informatin.daily_fund_out_limit, 'Maximum Fund Out')" type="danger">Update</el-button>
            </li>
            <li>
              Maximum Fund In: <span>{{informatin.daily_fund_in_limit}}</span>
              <el-button @click="Update('daily_fund_in_limit', informatin.daily_fund_in_limit, 'Maximum Fund In')" type="danger">Update</el-button>
            </li>
            <li>
              Maximum Balance: <span>{{informatin.max_balance}}</span>
              <el-button @click="Update('max_balance', informatin.max_balance, 'Maximum Balance')" type="danger">Update</el-button>
            </li>
            <li>
              Minimum Balance: <span>{{informatin.min_balance}}</span>
              <el-button @click="Update('min_balance', informatin.min_balance, 'Minimum Balance')" type="danger">Update</el-button>
            </li>
            <li>
              Maximum Transaction: <span>{{informatin.daily_transaction_limit}}</span>
              <el-button @click="Update('daily_transaction_limit', informatin.daily_transaction_limit, 'Maximum Transaction')" type="danger">Update</el-button>
            </li>
            <li>
              Accumulated Fund In: <span>{{informatin.daily_fund_in}}</span>
              <el-button @click="Refresh()" type="primary">Refresh</el-button>
            </li>
            <li>
              Accumulated Fund Out: <span>{{informatin.daily_fund_out}}</span>
              <el-button @click="Refresh()" type="primary">Refresh</el-button>
            </li>
            <li>
              First Balance: <span>{{informatin.first_balance}}</span>
            </li>
            <li>
              Current Balance: <span>{{informatin.balance}}</span>
              <el-button @click="Refresh()" type="primary">Refresh</el-button>
            </li>
          </ul>
        </div>
        <el-dialog :title="bankInformatin.title" :visible.sync="bankInformatin.Visible">
          <form-inline-comp
            ref="formInlineComp"
            inline="false"
            formLabelWidth="155px"
            :formInlineConfig = bankInformatin.formConfig
            @onSubmit = Submit
          />
        </el-dialog>

        <el-dialog title="history" :visible.sync="historyVisible">
          <table-comp
            :tableConfig = historyConfig
            :resInformation = history
          />
          <div slot="footer" class="dialog-footer">
            <el-button type="cancel" @click="historyVisible = false">close</el-button>
          </div>
        </el-dialog>
      </div>
      <div v-if="!detailORhistory">
        <form-inline-comp
          :formInlineConfig = formInlineConfig
          @onSubmit = callbacks
          @downloadExcel = downloadExcel
        >
        </form-inline-comp>
        <table-comp
          :tableConfig = tableConfig
          :resInformation = resInformation
          @handleSizePageChange =  callbacks
        />
      </div>
    </div>
</template>

<script>
import {
  backstageCompanyBankAccountsDetailHttp,
  backstageCompanyBankAccountsAuditsHttp,
  backstageCompanyBankAccountTransactionsHttp,
  backstageCompanyBankAccountsRemarksHttp,
  getbackstageCompanyBankAccountsAuditsHttp,
  patchBackstageCompanyBankAccountsHttp,
  backstageCompanyBankAccountTransactionsExportHttp
} from '../../api/compony_account_management/initAxios'
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import element from '../../config/element'
export default {
  name: 'bankAccountManagementDetailAndHitory',
  data () {
    return {
      formLabelWidth: '140px',
      bankInformatin: {
        title: 'Group',
        Visible: false,
        formConfig: [
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
            type: 'input',
            label: 'remark',
            formValue: 'remark',
            placeholder: 'remark',
            value: ''
          },
          {
            type: 'Submit'
          }
        ]
      },
      historyVisible: false,
      detailORhistory: false, // 判断是详情还是历史记录
      informatin: {
        paymentGroup: {
          name: ''
        }
      },
      historyConfig: {
        border: true,
        tableColumn: [{
          prop: 'created_at',
          label: 'Date/Time',
          width: '60'
        }, {
          prop: 'name',
          label: 'Admin',
          width: '60'
        }, {
          prop: 'old_value',
          label: 'Previous Value',
          width: '80'
        }, {
          prop: 'new_value',
          label: 'New Value',
          width: '80'
        }]
      },
      history: {},
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'created_at',
          label: 'Date/ Time',
          width: '80'
        }, {
          prop: 'from_account',
          label: 'From Account',
          width: '80',
          render: (h, params) => {
            let _this = this
            return h('div', [
              h('a', {
                style: {
                  color: '#409EFF',
                  cursor: 'pointer'
                },
                on: {
                  click () {
                    _this.formInline.company_bank_account_code = params.item.from_account
                    _this.formInlineConfig[0].value = params.item.from_account
                    _this.initHttp(_this.formInline)
                  }
                }
              }, params.item.from_account)
            ])
          }
        }, {
          prop: 'to_account',
          label: 'To Account',
          width: '80',
          render: (h, params) => {
            let _this = this
            return h('div', [
              h('a', {
                style: {
                  color: '#409EFF',
                  cursor: 'pointer'
                },
                on: {
                  click () {
                    _this.formInline.company_bank_account_code = params.item.to_account
                    _this.formInlineConfig[0].value = params.item.to_account
                    _this.initHttp(_this.formInline)
                  }
                }
              }, params.item.to_account)
            ])
          }
        }, {
          prop: 'user_name',
          label: 'Member Code',
          width: '80'
        }, {
          prop: 'fee',
          label: 'Fee',
          width: '80'
        }, {
          prop: 'debit',
          label: 'Debit',
          width: '80'
        }, {
          prop: 'credit',
          label: 'Credit',
          width: '80'
        }, {
          prop: 'after_balance',
          label: 'Current Balance',
          width: '80'
        }, {
          prop: 'admin_name',
          label: 'Processor',
          width: '80'
        }, {
          prop: 'order_no',
          label: 'Transaction ID',
          width: '80'
        }, {
          prop: 'remark',
          label: 'Remark',
          width: '80'
        }]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Code',
          formValue: 'company_bank_account_code',
          disabled: true,
          placeholder: 'Balance',
          value: ''
        },
        {
          type: 'date',
          label: 'Date'
        },
        {
          type: 'search'
        },
        {
          type: 'export'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        company_bank_account_code: ''
      },
      formInlineRemark: {
        per_page: 10,
        page: 1
      },
      ProfileRemarkstableConfig: {
        border: true,
        tableColumn: [{
          prop: 'created_at',
          label: 'Date',
          width: '60'
        }, {
          prop: 'admin_name',
          label: 'Update By',
          width: '60'
        }, {
          prop: 'remark',
          label: 'Remarks',
          width: '180',
          header: {
            prop: 'remark',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'members_profile', query: {id: params.item.id}})
                    }
                  }
                }, params.item.name)
              ])
            }
          }
        }, {
          prop: 'category',
          label: 'Category',
          width: '60'
        }]
      },
      ProfileRemarksData: {
        data: []
      }
    }
  },
  components: {
    tableComp, formInlineComp
  },
  activated () {
    this.formInlineConfig[0].value = this.$route.query.company_bank_account_code
    this.formInline.company_bank_account_code = this.$route.query.company_bank_account_code
    this.init()
    this.initHttp(this.formInline)
    this.getbackstageCompanyBankAccountsAuditsHttp()
  },
  methods: {
    downloadExcel (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.per_page && !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageCompanyBankAccountTransactionsExportHttp(datalist).then(res => {
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
    },
    addRemark () {
      this.$prompt('Please enter the Remarks', 'Add Remarks', {
        inputType: 'textarea',
        confirmButtonText: 'affirm',
        cancelButtonText: 'cancel'
      }).then(({ value }) => {
        if (!value) {
          element.message({
            type: 'error',
            message: 'Remarks Can\'t be empty'
          })
          return
        }
        backstageCompanyBankAccountsRemarksHttp(this.$route.query.id, {remark: value}).then(res => {
          this.getbackstageCompanyBankAccountsAuditsHttp()
          element.message({
            type: 'success',
            message: 'Added Remarks successfully'
          })
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    Refresh  () {
      this.init()
    },
    copy () {
      let clipboard = new this.clipboard('.copy1')
      element.message({
        type: 'success',
        message: 'copy success'
      })
    },
    Submit (form) {
      delete form.surplus
      patchBackstageCompanyBankAccountsHttp(this.$route.query.id, form).then(res => {
        this.Refresh()
        this.getbackstageCompanyBankAccountsAuditsHttp()
        this.bankInformatin.Visible = false
        element.message({
          type: 'success',
          message: 'success'
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    Update (type, value, title) {
      this.bankInformatin.title = title
      this.bankInformatin.Visible = true
      if (type === 'payment_group_id') {
        this.bankInformatin.formConfig = [
          {
            type: 'input',
            label: 'Current Value',
            formValue: 'surplus',
            readonly: true,
            value: value
          },
          {
            type: 'select',
            label: 'New Value',
            formValue: type,
            placeholder: 'Select A New Value',
            clearable: true,
            value: '',
            list: JSON.parse(this.$route.query.DropList).payment_group_id
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
        ]
      } else if (type === 'type') {
        this.bankInformatin.formConfig = [
          {
            type: 'input',
            label: 'Current Value',
            formValue: 'surplus',
            readonly: true,
            value: value
          },
          {
            type: 'select',
            label: 'New Value',
            formValue: type,
            placeholder: 'Select A New Value',
            clearable: true,
            value: '',
            list: JSON.parse(this.$route.query.DropList).type
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
        ]
      } else if (type === 'status') {
        this.bankInformatin.formConfig = [
          {
            type: 'input',
            label: 'Current Value',
            formValue: 'surplus',
            readonly: true,
            value: value
          },
          {
            type: 'select',
            label: 'New Value',
            formValue: type,
            placeholder: 'Select A New Value',
            clearable: true,
            value: '',
            list: JSON.parse(this.$route.query.DropList).status
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
        ]
      } else if (type === 'otp') {
        this.bankInformatin.formConfig = [
          {
            type: 'input',
            label: 'Current Value',
            formValue: 'surplus',
            readonly: true,
            value: value
          },
          {
            type: 'select',
            label: 'New Value',
            formValue: type,
            placeholder: 'Select A New Value',
            clearable: true,
            value: '',
            list: JSON.parse(this.$route.query.DropList).otp
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
        ]
      } else if (type === 'app_related') {
        this.bankInformatin.formConfig = [
          {
            type: 'input',
            label: 'Current Value',
            formValue: 'surplus',
            readonly: true,
            value: value
          },
          {
            type: 'select',
            label: 'New Value',
            formValue: type,
            placeholder: 'Select A New Value',
            clearable: true,
            value: '',
            list: JSON.parse(this.$route.query.DropList).app_related
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
        ]
      } else {
        this.bankInformatin.formConfig = [
          {
            type: 'input',
            label: 'Current Value',
            formValue: 'surplus',
            readonly: true,
            value: value
          },
          {
            type: 'input',
            label: 'New Value',
            formValue: type,
            clearable: true,
            placeholder: 'New Value',
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
        ]
      }
    },
    init () {
      backstageCompanyBankAccountsDetailHttp(this.$route.query.id, {include: 'paymentGroup,remarks'}).then(res => {
        this.informatin = res
      }).catch((err) => {
        console.log(err)
      })
    },
    backstageUsersAuditMethodHttp (value) {
      backstageCompanyBankAccountsAuditsHttp(this.$route.query.id, {field: value}).then(res => {
        this.historyVisible = true
        this.history = res
      }).catch((err) => {
        console.log(err)
      })
    },
    affirmStatus () {

    },
    // ProfileRemarks请求
    getbackstageCompanyBankAccountsAuditsHttp () {
      getbackstageCompanyBankAccountsAuditsHttp(this.$route.query.id, this.formInlineRemark).then(res => {
        this.ProfileRemarksData = res
      }).catch(error => {
        console.log(error)
      })
    },
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
        element.message({
          type: 'error',
          message: 'There is no request'
        })
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        // formInline.include = 'user'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageCompanyBankAccountTransactionsHttp(datalist).then(res => {
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
    // 回调页码
    handleSizePageChange (value) {
      if (value.per_page) {
        this.formInlineRemark.per_page = value.per_page
      } else if (value.page) {
        this.formInlineRemark.page = value.page
      }
      this.getbackstageCompanyBankAccountsAuditsHttp()
    }
  }
}
</script>
