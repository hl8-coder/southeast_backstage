<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="CaseHistory">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    >
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog title="New Annoucement" :visible.sync="Visible">
      <form-inline-comp
        inline="false"
        formLabelWidth="120px"
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CaseHistory',
  data () {
    return {
      Visible: false,
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'Date',
          label: 'Date',
          width: '160'
        }, {
          prop: 'CaseID',
          label: 'Case ID',
          width: '60'
        }, {
          prop: 'Username',
          label: 'Username',
          width: '80'
        }, {
          prop: 'Source',
          label: 'Source',
          width: '80'
        }, {
          prop: 'Category',
          label: 'Category',
          width: '80'
        }, {
          prop: 'Dateupdated',
          label: 'Date updated',
          width: '80'
        }, {
          prop: 'Status',
          label: 'Status',
          width: '80'
        }, {
          prop: 'Assignee',
          label: 'Assignee',
          width: '80'
        }, {
          prop: 'Action',
          label: 'Action',
          width: '80'
        }]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'MemberCode',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'input',
          label: 'Source',
          formValue: 'Source',
          placeholder: 'Source',
          value: ''
        },
        {
          type: 'input',
          label: 'Admin',
          formValue: 'Admin',
          placeholder: 'Admin',
          value: ''
        },
        {
          type: 'select',
          label: 'Group Name:',
          formValue: 'GroupName:',
          placeholder: 'Group Name:',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'date'
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
        status: ''
      },
      form: {
        Display: '',
        Category: '',
        Name: '',
        date: '',
        Status: '',
        EN: '',
        VND: '',
        THB: ''
      },
      formConfig: [
        {
          type: 'select',
          label: 'Source',
          formValue: 'Source',
          placeholder: 'Select A Source',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Category',
          formValue: 'gategory',
          placeholder: 'Select A Category',
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
          label: 'Assignee',
          formValue: 'Assignee',
          placeholder: 'Assignee',
          value: ''
        },
        {
          type: 'textarea',
          label: 'Content',
          formValue: 'Content',
          placeholder: 'Content',
          value: ''
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
      for (var i = 0; i < 20; i++) {
        list.push({
          CaseID: 'CaseID' + i,
          Username: 'Username' + i,
          Source: 'Source ' + i,
          Date: 'Date' + i
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
    Submit (form) {
      console.log(form)
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
    onAdd () {
      this.Visible = true
    },
    formcallbacks () {

    },
    affirmStatus () {

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
