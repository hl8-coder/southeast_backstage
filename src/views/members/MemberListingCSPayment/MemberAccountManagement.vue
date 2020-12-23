<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="MemberAccountManagement">
    <children-nav
      :Nav = csPaymentNav
    />
    <form-inline
      :formInline = formInline
      @onSubmit = onSubmit
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
    />
  </div>
</template>

<script>
import formInline from '../../../components/form/formInline'
import tableComp from '../../../components/table/tableComp'
import childrenNav from '../../../components/nav/childrenNav'
import { mapGetters } from 'vuex'
import {backstageUsersUserBankAccountsHttp} from '../../../api/members/initAxios'
export default {
  name: 'MemberAccountManagement',
  data () {
    return {
      resInformation: {
        data: [{
          Username: 'sdsdsdsd',
          BankName: '1',
          BranchName: '1',
          City: '1',
          AccountNumber: '1',
          AccountName: '1',
          LastUpdated: '1',
          Status: '1'
        }, {
          Username: 'sdsdsdsd',
          BankName: '1',
          BranchName: '1',
          City: '1',
          AccountNumber: '1',
          AccountName: '1',
          LastUpdated: '1',
          Status: '1'
        }, {
          Username: 'sdsdsdsd',
          BankName: '1',
          BranchName: '1',
          City: '1',
          AccountNumber: '1',
          AccountName: '1',
          LastUpdated: '1',
          Status: '1'
        }]
      },
      formInline: {
        name: '', // 名称
        account_no: '',
        per_page: 50,
        page: 1
      },
      tableConfig: {
        border: true,
        tableColumn: [{
          prop: 'Username',
          label: 'Username',
          width: '160'
        }, {
          prop: 'BankName',
          label: 'Bank Name',
          width: '60'
        }, {
          prop: 'BranchName',
          label: 'Branch Name',
          width: '80'
        }, {
          prop: 'City',
          label: 'City',
          width: '80'
        }, {
          prop: 'AccountNumber',
          label: 'Account Number',
          width: '100'
        }, {
          prop: 'AccountName',
          label: 'Account Name',
          width: '150'
        }, {
          prop: 'LastUpdated',
          label: 'Last Updated',
          width: '80'
        }, {
          prop: 'Status',
          label: 'Status',
          width: '80'
        }, {
          prop: 'Action',
          label: 'Action',
          width: '80',
          render: (h, params) => {
            return h('div', [
              h('el-button', {
                props: {
                  size: 'small',
                  type: 'primary'
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
              }, 'Update')
            ])
          }
        }]
      }
    }
  },
  components: {
    formInline, tableComp, childrenNav
  },
  created () {
    this.backstageUsersUserBankAccountsHttp(this.formInline)
  },
  computed: {
    ...mapGetters([
      'csPaymentNav'
    ])
  },
  methods: {
    // 提现列表请求
    backstageUsersUserBankAccountsHttp (formInline) {
      // backstageUsersUserBankAccountsHttp(formInline).then(res => {
      //   console.log(res)
      // }).catch((error) => {
      //   console.log(error)
      // })
    },
    // 表单提交
    onSubmit (formInline) {
      this.formInline = formInline
    },
    // 分页回调
    handleSizePageChange (value) {
      if (value.per_page) {
        this.formInline.per_page = value.per_page
      } else if (value.page) {
        this.formInline.page = value.page
      }
      this.backstageUsersUserBankAccountsHttp(this.formInline)
    }
  }
}
</script>
