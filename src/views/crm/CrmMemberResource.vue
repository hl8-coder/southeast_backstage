<template>
  <div class="CrmMemberResource">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="success" @click="downloadExcel">Download</el-button>
        <el-upload
          style="display: contents;"
          class="upload-demo"
          :action="uploadConfig.url"
          :limit="1"
          :name="uploadConfig.name"
          :headers="uploadConfig.fileHeaders"
          :show-file-list = false
          :on-success="uploadSuccess"
        >
          <el-button size="small" type="primary">Update</el-button>
        </el-upload>
        <el-button style="margin-right: 5px" type="info" @click="updateOrCancel(1)">batch assign</el-button>
        <el-button style="margin-right: 5px" type="danger" @click="updateOrCancel(0)">batch cancel</el-button>
        <el-dialog
          :title="dialog.title"
          :visible.sync="dialog.status"
        >
          <el-form>
            <el-form-item
              label="Admin"
            >
              <el-select
                v-model="data.admin_id"
                placeholder="Admin"
              >
                <el-option
                  v-for="item in dropList.bo_admin"
                  :key="item.key"
                  :label="item.value.admin_name"
                  :value="item.value.admin_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialog.status = false">cancel</el-button>
            <el-button type="primary" @click="toDo">submit</el-button>
          </div>
        </el-dialog>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange = callbacks
      @handleSelectionChange = handleSelectionChange
    />
    <crm-call-log
      :dropList="dropList"
      :dialog="dialogStatus"
      @refresh="initHttp(formInline)"
      :order="order"
      :item = true
      :api = true
    />
    <crm-call-log-status
      :crmID = id
      :type = true
      :dialog = dialogDetail
    />
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstageCrmResourceHttp,
  backstageCrmResourceDropListHttp,
  backstageCrmResourcePatchHttp,
  backstageCrmResourceExcelTemplateHttp
} from '../../api/crm/initAxios'
import FileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
import element from '../../config/element'
import CrmCallLog from '../../components/crm/CrmCallLog'
import CrmCallLogStatus from '../../components/crm/CrmCallLogStatus'
export default {
  name: 'CrmMemberResource',
  components: {CrmCallLogStatus, CrmCallLog, FileUpload, TableComp, FormInlineComp},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'input',
          label: 'Full Name',
          formValue: 'full_name',
          placeholder: 'Full Name',
          value: ''
        },
        {
          type: 'input',
          label: 'Phone',
          formValue: 'phone',
          placeholder: 'Phone',
          value: ''
        },
        {
          type: 'input',
          label: 'Country Code',
          formValue: 'country_code',
          placeholder: 'country_code',
          value: ''
        },
        {
          type: 'input',
          label: 'BO Name',
          formValue: 'admin_name',
          placeholder: 'BO Name',
          value: ''
        },
        {
          type: 'input',
          label: 'Tag Admin Name',
          formValue: 'tag_admin_name',
          placeholder: 'Tag Admin Name',
          value: ''
        },
        {
          type: 'input',
          label: 'Last Save Case Admin Name',
          formValue: 'last_save_case_admin_name',
          placeholder: 'Last Save Case Admin Name',
          value: ''
        },
        {
          type: 'dateTime',
          label: 'Tag Date',
          formValue: 'date',
          formKey1: 'tag_start',
          formKey2: 'tag_end',
          value: ''
        },
        {
          type: 'dateTime',
          label: 'Last Save Date',
          formValue: 'date',
          formKey1: 'last_save_start',
          formKey2: 'last_save_end',
          value: ''
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
          type: 'select',
          label: 'Call Status',
          formValue: 'call_status',
          placeholder: 'Call Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'search'
        }
      ],
      tableConfig: {
        border: true,
        loading: true,
        selection: true,
        tableColumn: [
          {
            prop: '',
            label: '',
            fixWidth: '101px',
            render: (h, params) => {
              let color = '#25b1b3'
              if (params.item.call_status) {
                color = '#70D6D8'
              }
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
                    background: color,
                    color: '#fff',
                    border: 'none'
                  },
                  on: {
                    click: () => {
                      this.order = params.item
                      this.dialogStatus.status = true
                    }
                  }
                })
              ])
            }
          },
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'full_name',
            label: 'Full Name'
          },
          {
            prop: 'phone',
            label: 'Phone Number'
          },
          {
            prop: 'country_code',
            label: 'Country Code'
          },
          {
            prop: 'status',
            label: 'Status'
          },
          {
            prop: 'call_status',
            fixWidth: '110px',
            label: 'Call status',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.id = params.item.id
                      this.dialogDetail.status = true
                    }
                  }
                }, params.item.call_status)
              ])
            }
          },
          {
            prop: 'register',
            label: 'Register'
          },
          {
            prop: 'tag_admin_name',
            label: 'Tag Admin'
          },
          {
            prop: 'tag_at',
            label: 'Tag Time'
          },
          {
            prop: 'admin_name',
            label: 'Bo User'
          },
          {
            prop: 'last_save_case_admin_name',
            label: 'Last Save Case'
          },
          {
            prop: 'last_save_case_at',
            label: 'Last Save Case Date'
          },
          {
            prop: 'created_at',
            label: 'Created At'
          }
        ]
      },
      dialogStatus: {
        status: false
      },
      resInformation: {},
      order: {},
      formInline: {
        per_page: 50,
        page: 1,
        full_name: '',
        phone: '',
        country_code: '',
        status: '',
        call_status: '',
        tag_admin_name: '',
        last_save_case_admin_name: '',
        tag_start: '',
        tag_end: '',
        last_save_start: '',
        last_save_end: '',
        admin_name: ''
      },
      dropList: {},
      uploadConfig: {
        url: '/api/backstage/crm_resources',
        name: 'excel',
        fileHeaders: resourcesList.fileHeaders,
        limit: 1,
        type: 'Games'
      },
      data: {
        crm_resource_ids: [],
        admin_id: '',
        distribute: ''
      },
      dialog: {
        title: '',
        status: false
      },
      dialogDetail: {
        status: false
      },
      id: ''
    }
  },
  methods: {
    // 列表
    initHttp (formInline) {
      this.tableConfig.loading = true
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageCrmResourceHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
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
    initDropList () {
      backstageCrmResourceDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['status', 'call_status'])
        this.dropList = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 下载模板
    downloadExcel () {
      backstageCrmResourceExcelTemplateHttp().then(res => {
        filter.downloadExcel(res)
      }).catch(() => {
      })
    },
    uploadSuccess () {
      element.message({
        type: 'success',
        message: 'Success'
      })
      this.initHttp(this.formInline)
    },
    // 更新
    updateOrCancel (val) {
      this.data.distribute = val
      if (!this.data.crm_resource_ids.length) {
        element.message({
          message: 'Please select member',
          type: 'error'
        })
        return false
      }
      if (val) {
        this.dialog.title = 'assign'
        this.dialog.status = true
      } else {
        this.toDo()
      }
    },
    // table List 选中事件
    handleSelectionChange (value, row) {
      if (value.page.length) {
        let ids = []
        for (var i = 0; i < value.page.length; i++) {
          ids.push(value.page[i].id)
        }
        this.data.crm_resource_ids = ids
      }
    },
    toDo () {
      let data = filter.removeTheNullValue(this.data)
      backstageCrmResourcePatchHttp(data).then(res => {
        this.dialog.status = false
        element.message({
          type: 'success',
          message: 'success'
        })
        this.initHttp(this.formInline)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  activated () {
    this.initHttp(this.formInline)
    this.initDropList()
  }
}
</script>

<style>

</style>
