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
      <el-button type="danger" @click="$router.push({name: 'bank_management_pg_account_management', query: {breadcrumb: $route.query.breadcrumb}})">Back previous page</el-button>
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
          <li class="title">Security Info</li>
          <li>
            <!--<i @click="backstageUsersAuditMethodHttp('user_name')" class="el-icon-info"></i>-->
            Merchant ID: <span>{{informatin.customer_id}}</span>
            <el-button @click="Update('customer_id', informatin.customer_id, 'Merchant ID')" type="danger">Update</el-button>
          </li>
          <li>
            <!--<i @click="backstageUsersAuditMethodHttp('user_name')" class="el-icon-info"></i>-->
            Username: <span>{{informatin.username}}</span>
            <el-button @click="Update('username', informatin.username, 'Username')" type="danger">Update</el-button>
          </li>
          <li>
            <!--<i @click="backstageUsersAuditMethodHttp('user_name')" class="el-icon-info"></i>-->
            Password: <span>{{informatin.password}}</span>
            <el-button @click="Update('password', informatin.password, 'Password')" type="danger">Update</el-button>
          </li>
          <li>
            <!--<i @click="backstageUsersAuditMethodHttp('user_name')" class="el-icon-info"></i>-->
            Email: <span>{{informatin.email}}</span>
            <el-button @click="Update('email', informatin.email, 'Email')" type="danger">Update</el-button>
          </li>
          <li>
            <!--<i @click="backstageUsersAuditMethodHttp('user_name')" class="el-icon-info"></i>-->
            Email password: <span>{{informatin.email_password}}</span>
            <el-button @click="Update('email_password', informatin.email_password, 'Email password')" type="danger">Update</el-button>
          </li>
          <li>
            <!--<i @click="backstageUsersAuditMethodHttp('user_name')" class="el-icon-info"></i>-->
            OTP: <span>{{informatin.display_otp}}</span>
            <el-button @click="Update('otp', informatin.otp, 'OTP')" type="danger">Update</el-button>
          </li>
          <li>
            <!--<i @click="backstageUsersAuditMethodHttp('password')" class="el-icon-info"></i>-->
            Code: <span>{{informatin.code}}</span>
            <!--<el-button @click="Update('password', informatin.password, 'Password')" type="danger">Update</el-button>-->
          </li>
          <li>
            <!--<i @click="backstageUsersAuditMethodHttp('safe_key_pass')" class="el-icon-info"></i>-->
            Balance: <span>{{informatin.balance}}</span>
            <!--<el-button @click="Update('safe_key_pass', informatin.safe_key_pass, 'Safe Key Pass')" type="danger">Update</el-button>-->
          </li>
          <li>
            <!--<i @click="backstageUsersAuditMethodHttp('safe_key_pass')" class="el-icon-info"></i>-->
            Currencies: <span>{{informatin.currencies}}</span>
            <!--<el-button @click="Update('safe_key_pass', informatin.safe_key_pass, 'Safe Key Pass')" type="danger">Update</el-button>-->
          </li>
          <li>
            <!--<i @click="backstageUsersAuditMethodHttp('otp')" class="el-icon-info"></i>-->
            Customer_id: <span>{{informatin.customer_id}}</span>
            <!--<el-button @click="Update('otp', informatin.display_otp, 'otp')" type="danger">Update</el-button>-->
          </li>
          <li>
            <!--<i @click="backstageUsersAuditMethodHttp('app_related')" class="el-icon-info"></i>-->
            Customer Key: <span>{{informatin.customer_key}}</span>
            <!--<el-button @click="Update('app_related', informatin.app_related, 'app_related')" type="danger">Update</el-button>-->
          </li>
          <li>
            <!--<i @click="backstageUsersAuditMethodHttp('app_related')" class="el-icon-info"></i>-->
            Related Name: <span>{{informatin.related_name}}</span>
            <!--<el-button @click="Update('app_related', informatin.app_related, 'app_related')" type="danger">Update</el-button>-->
          </li>
          <li>
            <!--<i @click="backstageUsersAuditMethodHttp('app_related')" class="el-icon-info"></i>-->
            Display Is Fee: <span>{{informatin.display_is_fee}}</span>
            <!--<el-button @click="Update('app_related', informatin.app_related, 'app_related')" type="danger">Update</el-button>-->
          </li>
        </ul>
        <ul class="information">
          <li class="title">Daily Limit</li>
          <li>
            Fee Rebate: <span>{{informatin.fee_rebate}}</span>
            <!--<el-button @click="Update('daily_fund_out_limit', informatin.daily_fund_out_limit, 'Maximum Fund Out')" type="danger">Update</el-button>-->
          </li>
          <li>
            Max Deposit: <span>{{informatin.max_deposit}}</span>
            <!--<el-button @click="Update('daily_fund_in_limit', informatin.daily_fund_in_limit, 'Maximum Fund In')" type="danger">Update</el-button>-->
          </li>
          <li>
            Min Deposit: <span>{{informatin.min_deposit}}</span>
            <!--<el-button @click="Update('max_balance', informatin.max_balance, 'Maximum Balance')" type="danger">Update</el-button>-->
          </li>
          <li>
            Max Fee: <span>{{informatin.max_fee}}</span>
            <!--<el-button @click="Update('min_balance', informatin.min_balance, 'Minimum Balance')" type="danger">Update</el-button>-->
          </li>
          <li>
            Min Fee: <span>{{informatin.min_fee}}</span>
            <!--<el-button @click="Update('daily_transaction_limit', informatin.daily_transaction_limit, 'Maximum Transaction')" type="danger">Update</el-button>-->
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
    backstagePgAccountTransactionsHttp,
    backstagePgAccountManagementDetailHttp,
    backstageCompanyBankAccountsAuditsHttp,
    postBackstagePgAccountManagementRemarkHttp,
    patchBackstagePgAccountManagementDetailHttp,
    backstagePgAccountManagementRemarkHttp,
    patchBackstageCompanyBankAccountsHttp,
    backstagePgAccountTransactionsExportHttp
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
            width: '80'
          }, {
            prop: 'to_account',
            label: 'To Account',
            width: '80'
          }, {
            prop: 'user_name',
            label: 'Member Code',
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
            prop: 'fee',
            label: 'Fee',
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
            prop: 'id',
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
            formValue: 'payment_platform_code',
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
          payment_platform_code: '',
          start_at: '',
          end_at: '',
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
      this.formInline.company_bank_account_code = this.$route.query.company_bank_account_code
      this.init()

      this.getbackstageCompanyBankAccountsAuditsHttp()
    },
    methods: {
      // 下载报表
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
        backstagePgAccountTransactionsExportHttp(datalist).then(res => {
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
          postBackstagePgAccountManagementRemarkHttp(this.$route.query.id, {remark: value}).then(res => {
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
      Submit (form) {
        delete form.surplus
        patchBackstagePgAccountManagementDetailHttp(this.$route.query.id, form).then(res => {
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
        backstagePgAccountManagementDetailHttp(this.$route.query.id).then(res => {
          this.informatin = res
          this.formInlineConfig[0].value = res.code
          this.formInline.payment_platform_code = res.code
          this.initHttp(this.formInline)
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
        backstagePgAccountManagementRemarkHttp(this.$route.query.id, this.formInlineRemark).then(res => {
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
        backstagePgAccountTransactionsHttp(datalist).then(res => {
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
