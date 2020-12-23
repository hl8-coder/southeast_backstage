<template>
  <div class="CrmMemberExclude">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange = callbacks
    />
    <el-dialog
      :visible.sync="dialog.status"
      :title="dialog.title"
      @close="clearForm"
    >
      <el-form
        label-width="150px"
      >
        <el-form-item
          label="Member Code"
        >
          <el-input
            v-model="form.user_name"
            placeholder="Member Code"
            :disabled="dialog.title === 'Update'"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Is AFF"
        >
          <el-select
            :disabled="dialog.title === 'Update'"
            v-model="form.is_affiliate"
            placeholder="Is AFF">
            <el-option
              v-for="item in dropList.is_affiliate"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Status"
        >
          <el-select
            v-if="dialog.title === 'Update'"
            v-model="form.status"
            placeholder="Status">
            <el-option
              label="active"
              :value="1">
            </el-option>
            <el-option
              label="inactive"
              :value="0">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doStoreOrUpdate">submit</el-button>
        <el-button type="danger" @click="dialog.status = false">close</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstageCrmExcludeUserIndexHttp,
  backstageCrmExcludeUsersDropListHttp,
  backstageCrmExcludeUserStoreHttp,
  backstageCrmExcludeUserDeleteHttp,
  backstageCrmExcludeUserUpdateHttp
} from '../../api/crm/initAxios'
import FormInlineComp from '../../components/form/formInlineComp'
import element from '../../config/element'
export default {
  name: 'CrmMemberExclude',
  components: {FormInlineComp, TableComp},
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
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
                      this.crmExcludeUserID = params.item.id
                      this.form.user_name = params.item.user_name
                      this.form.is_affiliate = Number(params.item.is_affiliate)
                      this.form.status = Number(params.item.status)
                      this.dialog.status = true
                      this.dialog.title = 'Update'
                    }
                  }
                }),
                h('el-button', {
                  props: {
                    size: 'small',
                    type: 'danger',
                    icon: 'el-icon-delete',
                    circle: true
                  },
                  style: {
                    marginRight: '5px',
                    color: '#fff',
                    border: 'none'
                  },
                  on: {
                    click: () => {
                      this.$confirm('Are you sure?', 'Prompt', {
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        type: 'warning'
                      }).then(() => {
                        backstageCrmExcludeUserDeleteHttp(params.item.id).then(res => {
                          element.message({
                            message: 'success',
                            type: 'success'
                          })
                          this.initHttp(this.formInline)
                        }).catch((error) => {
                          console.log(error)
                        })
                      }).catch(() => {})
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
            prop: 'user_name',
            label: 'Name'
          },
          {
            prop: 'display_is_affiliate',
            label: 'Is Affiliate'
          },
          {
            prop: 'affilited_code',
            label: 'Affiliated Code'
          },
          {
            prop: 'action_admin_name',
            label: 'Add By Admin'
          },
          {
            prop: 'created_at',
            label: 'Add At Date'
          },
          {
            prop: 'review_by',
            label: 'Review By'
          },
          {
            prop: 'review_at',
            label: 'Review At Date'
          },
          {
            prop: 'display_status',
            label: 'Status'
          }
        ]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Admin',
          formValue: 'admin_name',
          placeholder: 'Admin',
          value: ''
        },
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'input',
          label: 'Review By',
          formValue: 'review_by',
          placeholder: 'Review By',
          value: ''
        },
        {
          type: 'select',
          label: 'Is Aff',
          formValue: 'is_affiliate',
          placeholder: 'Is Aff',
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
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      resInformation: {},
      dialog: {
        status: false,
        title: ''
      },
      formInline: {
        admin_name: '',
        user_name: '',
        review_by: '',
        is_affiliate: '',
        status: '',
        per_page: 50,
        page: 1
      },
      crmExcludeUserID: '',
      form: {
        user_name: '',
        status: '',
        is_affiliate: ''
      },
      dropList: {}
    }
  },
  methods: {
    // 获取列表
    initHttp (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilterByEcho(formInline, [], ['per_page', 'page'])
      this.tableConfig.loading = true
      backstageCrmExcludeUserIndexHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
        this.totalInfo = res.meta.total
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 下拉菜单
    initDropListHttp () {
      backstageCrmExcludeUsersDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['is_affiliate', 'status'])
        this.dropList = res
      }).catch(() => {
      })
    },
    // 搜索与分页
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
      value.type = this.formInline.type
      this.initHttp(value)
    },
    onAdd () {
      this.clearForm()
      this.dialog.status = true
      this.dialog.title = 'Add'
    },
    clearForm () {
      this.form = {
        user_name: '',
        status: '',
        is_affiliate: ''
      }
      this.crmExcludeUserID = ''
    },
    doStoreOrUpdate () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if (this.crmExcludeUserID) {
          backstageCrmExcludeUserUpdateHttp(this.crmExcludeUserID, this.form).then(res => {
            element.message({
              message: 'success',
              type: 'success'
            })
            this.dialog.status = false
            this.initHttp(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        } else {
          backstageCrmExcludeUserStoreHttp(this.form).then(res => {
            element.message({
              message: 'success',
              type: 'success'
            })
            this.dialog.status = false
            this.initHttp(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        }
      }).catch(() => {})
    }
  },
  activated () {
    this.initHttp(this.formInline)
    this.initDropListHttp()
  }
}
</script>

<style scoped>

</style>
