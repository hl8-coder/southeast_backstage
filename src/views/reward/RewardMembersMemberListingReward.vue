<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="MemberListingReward">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    >
      <!--<template v-slot:content>-->
      <!--sss-->
      <!--</template>-->
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog title="New Annoucement" :visible.sync="Visible">
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
  name: 'MemberListingReward',
  data () {
    return {
      Visible: false,
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'OprationID',
          label: 'Opration ID',
          width: '80'
        }, {
          prop: 'MemberCode',
          label: 'Member Code',
          width: '80'
        }, {
          prop: 'Full Name',
          label: 'Full Name',
          width: '80'
        }, {
          prop: 'Currency',
          label: 'Currency',
          width: '80'
        }, {
          prop: 'Status',
          label: 'Status',
          width: '100'
        }, {
          prop: 'BeforeBal',
          label: 'Before Bal',
          width: '100'
        }, {
          prop: 'AfterBal',
          label: 'After Bal',
          width: '100'
        }, {
          prop: 'ExpirationPoints',
          label: 'Expiration Points',
          width: '100'
        }, {
          prop: 'PointsBal',
          label: 'Points Bal',
          width: '100'
        }]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'name',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'search'
        },
        {
          type: 'add'
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
          type: 'input',
          label: 'Operator Id',
          formValue: 'OperatorId',
          placeholder: 'Operator Id',
          value: ''
        },
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'MemberCode',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'select',
          label: 'Selected members',
          formValue: 'SelectedMembers',
          placeholder: 'Select A Selected members',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Member Status',
          formValue: 'MemberStatus',
          placeholder: 'Select A Member Status',
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
          label: 'Country',
          formValue: 'country',
          placeholder: 'Select A Country',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Languagues',
          formValue: 'languagues',
          placeholder: 'Select A Languagues',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Category',
          formValue: 'category',
          placeholder: 'Select A Category',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'textarea',
          label: 'Private Message',
          formValue: 'PrivateMessage',
          placeholder: 'Private Message',
          value: ''
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
      for (var i = 0; i < 20; i++) {
        list.push({
          OprationID: 'OprationID' + i,
          CreatedDate: 'CreatedDate' + i,
          Currency: 'Currency' + i,
          Category: 'Category' + i,
          MessageDetails: 'MessageDetails' + i,
          LastUpdatedBy: 'LastUpdatedBy' + i,
          Status: 'Status' + i
        })
      }
      this.resInformation.data = list
      this.resInformation.meta = {
        pagination: {
          per_page: 50,
          total: 20
        }
      }
      this.tableConfig.loading = false
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
