<style lang="scss" scoped type="text/scss">
  .title{
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 10px;
    > button {
      margin-left: 10px;
    }
  }
</style>

<template>
  <div class="BankAccess">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    >
    </form-inline-comp>
    <div class="title FlexRowCenterCenter">BANK OFFLINE IN BO   <el-button icon="el-icon-plus" type="warning" circle @click="onAdd"></el-button></div>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <div class="title FlexRowCenterCenter">ACCOUNT SUSPENSION <el-button icon="el-icon-plus" type="warning" circle @click="onAdd"></el-button></div>
    <table-comp
      :tableConfig = tableConfig1
      :resInformation = resInformation1
      @handleSizePageChange =  callbacks
    />
    <el-dialog title="INACTIVE" :visible.sync="Visible">
      <form-inline-comp
        inline="false"
        formLabelWidth="140px"
        :formInlineConfig = formConfig
        @Submit = Submit
      />
    </el-dialog>
  </div>
</template>

<script>
// import {
//   backstageUsersHttp,
//   backstageUsersDropListHttp
// } from '../../api/initAxios'
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
export default {
  name: 'BankAccess',
  data () {
    return {
      Visible: false,
      resInformation: {},
      resInformation1: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'Currency',
          label: 'Currency',
          width: '80'
        }, {
          prop: 'BANKACCT',
          label: 'BANK ACCT',
          width: '80'
        }, {
          prop: 'INACTIVE',
          label: 'INACTIVE',
          width: '80'
        }, {
          prop: 'BY',
          label: 'BY',
          width: '80'
        }, {
          prop: 'REASON',
          label: 'REASON',
          width: '100'
        }, {
          prop: 'ACTIVE',
          label: 'ACTIVE',
          width: '100'
        }, {
          prop: 'BY1',
          label: 'BY1',
          width: '100'
        }]
      },
      tableConfig1: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'Currency',
          label: 'Currency',
          width: '80'
        }, {
          prop: 'BANKACCT',
          label: 'BANK ACCT',
          width: '80'
        }, {
          prop: 'DEACTIVATE',
          label: 'DEACTIVATE',
          width: '80'
        }, {
          prop: 'BY',
          label: 'BY',
          width: '80'
        }, {
          prop: 'ACTIVATE',
          label: 'ACTIVATE',
          width: '100'
        }, {
          prop: 'BY1',
          label: 'BY1',
          width: '100'
        }, {
          prop: 'REASON',
          label: 'REASON',
          width: '100'
        }]
      },
      formInlineConfig: [
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
          label: 'Bank Name',
          formValue: 'BankName',
          placeholder: 'Select A Bank Name',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Bank Account',
          formValue: 'BankAccount',
          placeholder: 'Bank Account',
          value: ''
        },
        {
          type: 'date'
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        category: '',
        status: '',
        currency: '',
        OperationID: ''
      },
      formConfig: [
        {
          type: 'select',
          label: 'Currency',
          formValue: 'currency',
          placeholder: 'Select A Selected Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Bank Name',
          formValue: 'BankName',
          placeholder: 'Select A Bank Name',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Fund In Account',
          formValue: 'FundInAccount',
          placeholder: 'Select A Fund In Account',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Reason',
          formValue: 'Reason:',
          placeholder: 'Select A Reason',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'date'
        },
        {
          type: 'Submit'
        }
      ]
    }
  },
  created () {
    this.DropListHttp()
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

      let list = []
      for (var i = 0; i < 10; i++) {
        list.push({
          BY: 'BY' + i,
          INACTIVE: 'INACTIVE' + i,
          Currency: 'Currency' + i,
          BANKACCT: 'BANKACCT' + i,
          DEACTIVATE: 'DEACTIVATE' + i,
          BY1: 'BY1' + i,
          ACTIVE: 'ACTIVE' + i,
          ACTIVATE: 'ACTIVATE' + i,
          REASON: 'REASON' + i
        })
      }
      this.resInformation.data = list
      this.resInformation1.data = list
      this.resInformation.meta = {
        pagination: {
          per_page: 50,
          total: 10
        }
      }
      this.resInformation1.meta = {
        pagination: {
          per_page: 50,
          total: 10
        }
      }
      this.tableConfig.loading = false
      this.tableConfig1.loading = false
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
      this.Visible = true
    },
    Submit () {

    },
    DropListHttp () {
      // backstageUsersDropListHttp().then(res => {
      //   filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'status', 'risk_group_id', 'payment_group_id'])
      // }).catch(() => {
      // })
    }
  }
}
</script>
