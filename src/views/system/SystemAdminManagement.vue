<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="SystemAdminManagement">
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
    <el-dialog :title="dialogConfig.title" width="700px" :visible.sync="dialogConfig.visible">
      <el-form
        label-width="150px"
      >
        <el-form-item
          label="Name"
        >
          <el-input
            v-model="dialogConfig.form.name"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Nick Name"
        >
          <el-input
            v-model="dialogConfig.form.nick_name"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Password"
        >
          <el-input
            v-model="dialogConfig.form.password"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Operate Password"
        >
          <el-input
            v-model="dialogConfig.form.operate_password"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Language"
        >
          <el-select
            v-model="dialogConfig.form.language"
            clearable>
            <el-option
              v-for="item1 in dropList.language"
              :label="item1.value"
              :key="item1.key"
              :value="item1.key" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Admin Role"
        >
          <el-select
            v-model="dialogConfig.form.admin_role_ids"
            multiple
            collapse-tags
            clearable>
            <el-option
              v-for="item1 in dropList.admin_role"
              :label="item1.value"
              :key="item1.key"
              :value="item1.key" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Sort"
        >
          <el-input
            v-model="dialogConfig.form.sort"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Status"
        >
          <el-select
            v-model="dialogConfig.form.status"
            clearable>
            <el-option
              v-for="item1 in dropList.status"
              :label="item1.value"
              :key="item1.key"
              :value="item1.key" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Description"
        >
          <el-input
            type="textarea"
            v-model="dialogConfig.form.description"
            style="max-width: 220px"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Submit">Submit</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="dialogChangeRoles.title" width="700px" :visible.sync="dialogChangeRoles.visible">
      <el-form
        label-width="150px"
      >
        <el-form-item
          label="Admin Role"
        >
          <el-select
            v-model="dialogChangeRoles.form.admin_role_ids"
            multiple
            collapse-tags
            clearable>
            <el-option
              v-for="item1 in dropList.admin_role"
              :label="item1.value"
              :key="item1.key"
              :value="item1.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeRoles">Submit</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="dialogChangePassword.title" width="700px" :visible.sync="dialogChangePassword.visible">
      <el-form
        label-width="200px"
      >
        <el-form-item
          label="Password"
        >
          <el-input
            v-model="dialogChangePassword.form.password"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Password Confirmation"
        >
          <el-input
            v-model="dialogChangePassword.form.password_confirmation"
            style="max-width: 220px"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changePassword">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import {backstageAdminsHttp, dropListAdminHttp, postBackstageAdminsHttp, backstageAdminsRolesHttp, deleteBackstageAdminsHttp, backstageAdminsChangePassordHttp} from '../../api/system/initAxios'
import filter from '../../util/filter'
import element from '../../config/element'
export default {
  name: 'SystemAdminManagement',
  data () {
    return {
      tableConfig: {
        dropList: '',
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'id',
          label: 'ID',
          width: '60',
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
                    this.dialogChangePassword = {
                      visible: true,
                      id: params.item.id,
                      title: 'Update Password',
                      form: {
                        password: '',
                        password_confirmation: ''
                      }
                    }
                  }
                }
              }),
              h('span', {
              }, params.item.id),
            ])
          }
        }, {
          prop: 'avatar',
          label: 'Avatar',
          width: '80'
        }, {
          prop: 'name',
          label: 'Name',
          width: '80',
          render: (h, params) => {
            return h('el-link', {
              style: {
                color: '#409EFF'
              },
              on: {
                click: () => {
                  let array = []
                  params.item.roles.data.forEach(item => {
                    array.push(item.id)
                  })
                  this.dialogChangeRoles = {
                    visible: true,
                    id: params.item.id,
                    title: 'Update Admin Role',
                    form: {
                      admin_role_ids: array,
                      include: 'roles'
                    }
                  }
                }
              }
            }, params.item.name)
          }
        }, {
          prop: 'nick_name',
          label: 'Nick Name',
          width: '150'
        }, {
          prop: 'language',
          label: 'Language',
          width: '80'
        }, {
          prop: 'status',
          label: 'Status',
          width: '60'
        }, {
          prop: 'sort',
          label: 'Sort',
          width: '200'
        }, {
          prop: 'description',
          label: 'Description',
          width: '200'
        }, {
          prop: 'created_at',
          label: 'Created At',
          width: '160'
        }, {
          prop: 'updated_at',
          label: 'Updated At',
          width: '160'
        }, {
          prop: 'roles',
          label: 'Roles',
          width: '300',
          render: (h, params) => {
            return params.item.roles.data.map(item => {
              return h('span', {
                style: {
                  color: '#12a531'
                }
              }, item.name)
            })
          }
        }, {
          prop: 'delect',
          label: 'Delect',
          width: '60',
          render: (h, params) => {
            return h('div', [
              h('el-button', {
                props: {
                  size: 'small',
                  circle: true,
                  icon: 'el-icon-delete'
                },
                style: {
                  marginRight: '5px',
                  background: '#409EFF',
                  color: '#fff',
                  border: 'none'
                },
                on: {
                  click: () => {
                    this.$confirm('Are you sure you want to delete?', 'Prompt', {
                      confirmButtonText: 'Yes',
                      cancelButtonText: 'Cancel',
                      type: 'warning'
                    }).then(() => {
                      deleteBackstageAdminsHttp(params.item.id).then(res => {
                        this.initHttp(this.formInline)
                      })
                    }).catch(() => {
                    })
                  }
                }
              })
            ])
          }
        }]
      },
      resInformation: {},
      formInlineConfig: [
        {
          type: 'input',
          label: 'Name',
          formValue: 'name',
          placeholder: 'Name',
          value: ''
        },
        // {
        //   type: 'select',
        //   label: 'Method',
        //   formValue: 'method',
        //   placeholder: 'Select A Method',
        //   clearable: true,
        //   value: '',
        //   list: []
        // },
        // {
        //   type: 'select',
        //   label: 'Menu Name',
        //   formValue: 'menu_id',
        //   placeholder: 'Select A Menu Name',
        //   clearable: true,
        //   value: '',
        //   list: []
        // },
        {
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      formInline: {
        include: 'roles',
        per_page: 50,
        page: 1,
        // method: '',
        name: '',
        // menu_id: ''
      },
      dialogConfig: {
        visible: false,
        title: '',
        form: {
          name: '',
          nick_name: '',
          password: '',
          operate_password: '',
          description: '',
          language: '',
          sort: '',
          status: '',
          include: 'roles',
          admin_role_ids: []
        }
      },
      dialogChangeRoles: {
        visible: false,
        id: '',
        title: 'Update Admin Role',
        form: {
          admin_role_ids: [],
          include: 'roles'
        }
      },
      dialogChangePassword: {
        visible: false,
        id: '',
        title: 'Update Password',
        form: {
          password: '',
          password_confirmation: ''
        }
      },
      dropList: {}
    }
  },
  components: {
    tableComp, formInlineComp
  },
  created () {
    this.dropListAdminHttp()
    this.initHttp(this.formInline)
  },
  methods: {
    dropListAdminHttp () {
      dropListAdminHttp().then(res => {
        this.dropList = res
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
    // memberDropList下拉菜单
    onAdd () {
      this.dialogConfig = {
        visible: true,
        title: 'Create',
        form: {
          name: '',
          nick_name: '',
          password: '',
          operate_password: '',
          description: '',
          language: '',
          sort: '',
          status: '',
          include: 'roles',
          admin_role_ids: []
        }
      }
    },
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      this.tableConfig.loading = true
      var datalist = filter.formInlineFilter(formInline)
      backstageAdminsHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    Submit () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        type: 'warning'
      }).then(() => {
        postBackstageAdminsHttp(this.dialogConfig.form).then(res => {
          this.initHttp(this.formInline)
          this.dialogConfig.visible = false
        })
      })
    },
    changeRoles () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        type: 'warning'
      }).then(() => {
        backstageAdminsRolesHttp(this.dialogChangeRoles.id, this.dialogChangeRoles.form).then(res => {
          this.initHttp(this.formInline)
          this.dialogChangeRoles.visible = false
        })
      })
    },
    changePassword () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        type: 'warning'
      }).then(() => {
        backstageAdminsChangePassordHttp(this.dialogChangePassword.id, this.dialogChangePassword.form).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.dialogChangePassword.visible = false
        })
      })
    }
  }
}
</script>
