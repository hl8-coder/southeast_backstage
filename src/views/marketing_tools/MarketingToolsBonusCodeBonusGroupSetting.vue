<style lang="scss" scoped type="text/scss">
  .group{
    margin-bottom: 10px;
  }
</style>

<template>
  <div class="BonusGroupSetting">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog title="Add Bonus Group" width="400px" :visible.sync="Visible">
      <div>
        <div class="group">Please enter the bonus group name</div>
        <el-input v-model="groupName"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="Visible = false">Cancel</el-button>
        <el-popover
          placement="top"
          width="160"
          v-model="popoverVisible">
          <p>Are you sure？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="popoverVisible = false">No</el-button>
            <el-button type="primary" size="mini" @click="onSubmit">yes</el-button>
          </div>
          <el-button slot="reference" type="primary" >Submit</el-button>
        </el-popover>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  backstageBonusGroupsHttp,
  addBackstageBonusGroupsHttp
} from '../../api/marketing_tools/initAxios'
import filter from '../../util/filter'
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import element from '../../config/element'
export default {
  name: 'BonusGroupSetting',
  data () {
    return {
      groupName: '',
      Visible: false,
      popoverVisible: false,
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'id',
          label: 'Operation ID',
          width: '60'
        }, {
          prop: 'name',
          label: 'Group Name',
          width: '60'
        }, {
          prop: 'created_at',
          label: 'Create Date/Time',
          width: '80'
        }, {
          prop: 'admin_name',
          label: 'Create By',
          width: '80'
        }]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Group Name',
          formValue: 'name',
          placeholder: 'Group Name',
          value: ''
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
        name: '',
        start_at: '',
        end_at: ''
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
          label: 'Display',
          formValue: 'display',
          placeholder: 'Select A Display',
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
          type: 'input',
          label: 'Name',
          formValue: 'name',
          placeholder: 'Name',
          value: ''
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
          label: 'EN',
          formValue: 'EN',
          placeholder: 'EN',
          value: ''
        },
        {
          type: 'input',
          label: 'VND',
          formValue: 'VND',
          placeholder: 'VND',
          value: ''
        },
        {
          type: 'input',
          label: 'THB',
          formValue: 'THB',
          placeholder: 'THB',
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
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp
  },
  methods: {
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.per_page && !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageBonusGroupsHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
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
      this.groupName = null
    },
    onSubmit () {
      this.popoverVisible = false
      if (!this.groupName) {
        element.message({
          type: 'error',
          message: 'bonus group name Can\'t be empty'
        })
        return
      }
      addBackstageBonusGroupsHttp({name: this.groupName}).then(res => {
        this.Visible = false
        this.initHttp(this.formInline)
        element.message({
          type: 'success',
          message: 'Added bonus group successfully'
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
