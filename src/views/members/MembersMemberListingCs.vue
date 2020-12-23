<style lang="scss" scoped type="text/scss">

</style>

<template>
    <div id="MemberListingCS">
      <form-inline-comp
        formLabelWidth="150px"
        :formInlineConfig = formInlineConfig
        @onSubmit = callbacks
      />
      <member-status/>
      <table-comp
        :tableConfig = tableConfig
        :resInformation = resInformation
        @handleSizePageChange =  callbacks
        @sortChange="sortChange"
      />
      <el-dialog title="Account status" :visible.sync="StatusFormVisible">
        <el-form :model="form">
          <el-form-item label="Username" :label-width="formLabelWidth">
            <el-input v-model="form.name" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Status" :label-width="formLabelWidth">
            <el-select v-model="Status" placeholder="Select A Status">
              <el-option v-for="item in membersDropList.status" :label="item.value" :key="item.key" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="Remark" :label-width="formLabelWidth">
            <el-input v-model="remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="StatusFormVisible = false">cancel</el-button>
          <el-button type="primary" @click="affirmStatus">Submit</el-button>
        </div>
      </el-dialog>
      <el-dialog title="Reset password" :visible.sync="PasswordFormVisible">
        <el-form :model="form">
          <el-form-item label="New Password" :label-width="formLabelWidth">
            <el-input v-model="new_password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="PasswordFormVisible = false">cancel</el-button>
          <el-button type="primary" @click="affirmPassword('manual')">Manual update</el-button>
          <el-button type="primary" @click="affirmPassword('auto')">Auto update</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import {
  backstageUsersHttp,
  backstageUsersStatusHttp,
  backstageUsersResetPasswordHttp,
  backstageGamePlatformUsersHttp,
  backstageUsersDropListHttp
} from '../../api/members/initAxios'
import filter from '../../util/filter'
import colorFilter from '../../config/colorFilter'
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import memberStatus from '../../components/Member/memberStatus'
import element from '../../config/element'
export default {
  name: 'MemberListingCS',
  data () {
    return {
      membersDropList: {},
      new_password: '',
      remark: '',
      form: {},
      Status: '',
      formLabelWidth: '120px',
      StatusFormVisible: false,
      PasswordFormVisible: false,
      ProfileRemarksVisible: false,
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'reset password / Account status',
          label: 'reset password / Acc status',
          fixWidth: '180px',
          render: (h, params) => {
            return h('div', [
              h('el-button', {
                props: {
                  size: 'small',
                  type: 'primary',
                  icon: 'el-icon-edit',
                  circle: true
                },
                style: {
                  marginRight: '5px',
                  background: '#25b1b3',
                  color: '#fff',
                  border: 'none'
                },
                on: {
                  click: () => {
                    this.PasswordFormVisible = true
                    this.form = params.item
                  }
                }
              }),
              h('el-button', {
                props: {
                  size: 'small',
                  circle: true,
                  icon: 'el-icon-star-off'
                },
                style: {
                  marginRight: '5px',
                  background: colorFilter.membersStatusListColorFiter(params.item.status, 'key'),
                  color: '#fff',
                  border: 'none'
                },
                on: {
                  click: () => {
                    this.StatusFormVisible = true
                    this.form = params.item
                    this.Status = params.item.status
                  }
                }
              })
            ])
          }
        }, {
          prop: 'name',
          label: 'Member Code',
          width: '160',
          sortable: 'custom',
          render: (h, params) => {
            return h('div', [
              h('el-Link', {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                on: {
                  click: () => {
                    this.$router.push({name: 'members_profile', query: {id: params.item.id, breadcrumb: this.$route.query.breadcrumb}})
                  }
                }
              }, params.item.name)
            ])
          }
        }, {
          prop: 'affiliated_code',
          label: 'AFF Code',
          fixWidth: '110px'
        }, {
          prop: 'info.full_name',
          label: 'Full Name',
          width: '160'
        }, {
          prop: 'currency',
          label: 'Curr',
          fixWidth: '60px'
        }, {
          prop: 'language',
          label: 'Language',
          width: '80'
        }, {
          prop: 'display_status',
          label: 'Status',
          width: '80',
          statusColor: 'statusColor'
        }, {
          prop: 'display_risk_group_id',
          label: 'Risk Category',
          width: '100'
        }, {
          prop: 'display_payment_group_id',
          label: 'payment Group',
          width: '150'
        }, {
          prop: 'account.available_balance',
          label: 'Balance',
          width: '80'
        }, {
          prop: 'info.register_ip',
          label: 'Register IP',
          width: '150'
        }, {
          prop: 'created_at',
          label: 'Register Time',
          width: '150'
        }, {
          prop: 'info.last_login_at',
          label: 'Last login time',
          fixWidth: '150'
        }, {
          prop: 'AvailableWallet',
          label: 'Available Wallet',
          fixWidth: '340',
          render: (h, params) => {
            if (!params.item.gamePlatformUsers) {
              return
            }
            return h('div', [
              params.item.gamePlatformUsers.data.map((item) => {
                return h('el-checkbox', {
                  props: {
                    size: 'small',
                    type: 'primary',
                    icon: 'el-icon-edit',
                    circle: true,
                    checked: item.balance_status,
                    label: item.platform_code
                  },
                  style: {
                  },
                  on: {
                    change: (value) => {
                      this.backstageUsersBalanceStatusHttp(value, item.id)
                    }
                  }
                }, item.platform_code)
              })
            ])
          }
        }]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Register URL',
          formValue: 'register_url',
          placeholder: 'Register URL',
          value: ''
        },
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'name',
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
          type: 'select',
          label: 'Status',
          formValue: 'status',
          placeholder: 'Select A Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Email',
          formValue: 'email',
          placeholder: 'Email',
          value: ''
        },
        {
          type: 'input',
          label: 'Contact No',
          formValue: 'phone',
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
          list: [
            {key: 0, value: 'Non Deposit'},
            {key: 1, value: 'Deposited'}
          ]
        },
        {
          type: 'select',
          label: 'Risk Category',
          formValue: 'risk_group_id',
          placeholder: 'Select A Risk Category',
          clearable: true,
          value: '',
          list: []
        },
        {
          type: 'select',
          label: 'payment Group',
          formValue: 'payment_group_id',
          placeholder: 'Select A payment Group',
          clearable: true,
          value: '',
          list: []
        },
        {
          type: 'dateTime',
          label: 'Register Date',
          formValue: 'date',
          value: ''
        },
        {
          type: 'dateTime',
          label: 'Last Login Time',
          formValue: 'last_login_time',
          value: ''
        },
        {
          type: 'input',
          label: 'Affiliated Code',
          formValue: 'affiliated_code',
          placeholder: 'Affiliated Code',
          value: ''
        },
        {
          type: 'search',
          class: 'search-center'
        }
      ],
      formInline: {
        include: 'info,account,gamePlatformUsers,vip,reward',
        per_page: 50,
        page: 1,
        name: '',
        status: '',
        currency: '',
        deposit: '',
        phone: '',
        email: '',
        affiliated_code: '',
        end_at: '',
        start_at: '',
        payment_group_id: '',
        register_url: '',
        risk_group_id: '',
        order: 'created_at_desc'
      }
    }
  },
  created () {
    this.backstageUsersDropListHttp()
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, memberStatus, formInlineComp
  },
  methods: {
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page || formInline.order) {
        formInline.include = 'info,account,gamePlatformUsers'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
        formInline.order = this.formInline.order
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageUsersHttp(datalist).then(res => {
        res.data.forEach((item, key) => {
          if (item.status) {
            item.statusColor = colorFilter.membersStatusListColorFiter('value', item.display_status)
          }
        })
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
    // memberDropList下拉菜单
    backstageUsersDropListHttp () {
      backstageUsersDropListHttp().then(res => {
        this.membersDropList = res
        filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'status', 'risk_group_id', 'payment_group_id'])
      }).catch(() => {
      })
    },
    // 修改第三方钱包状态请求
    backstageUsersBalanceStatusHttp (value, id) {
      backstageGamePlatformUsersHttp(id, {status: filter.BooleFilter(value)}).then(res => {
        element.message({
          type: 'success',
          message: 'Your Available Wallet was Update successfully'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    // 修改密码请求
    affirmPassword (type) {
      if (type === 'manual') {
        if (!this.new_password) {
          element.message({
            type: 'error',
            message: 'The New password cannot be empty'
          })
          return
        }
        if (this.new_password.length < 6) {
          element.message({
            type: 'error',
            message: 'The New password cannot be less than 6 digits'
          })
          return
        }
      }
      var datalist = {
        type: type,
        new_password: this.new_password
      }
      backstageUsersResetPasswordHttp(this.form.id, datalist).then(res => {
        this.PasswordFormVisible = false
        this.new_password = ''
        element.message({
          type: 'success',
          message: 'Your password was modified successfully'
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    // 修改会员状态请求
    affirmStatus () {
      if (!this.remark) {
        element.message({
          type: 'error',
          message: 'The remark field is required'
        })
        return
      }
      var datalist = {
        status: this.Status,
        remark: this.remark
      }
      backstageUsersStatusHttp(this.form.id, datalist).then(res => {
        this.form.status = res.status
        this.remark = ''
        this.StatusFormVisible = false
        element.message({
          type: 'success',
          message: 'Your status was modified successfully'
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    sortChange (obj) {
      if (obj.order === 'name_desc') {
        obj.order = 'created_at_desc'
      } else {
        obj.order = 'created_at_asc'
      }
      this.initHttp(Object.assign(this.formInline, obj))
    }
  }
}
</script>
