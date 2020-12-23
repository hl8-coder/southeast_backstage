<style lang="scss" type="text/scss">
  .custom-tree-node {
    height: auto;
  }
  .system-admin-role-management .el-tree-node__content {
    height: auto;
  }
</style>

<template>
    <div class="system-admin-role-management">
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
      <el-dialog :title="dialogConfig.title" width="1200px" :visible.sync="dialogConfig.visible">

        <form-inline-comp
          inline="false"
          formLabelWidth="140px"
          :formInlineConfig = dialogConfig.formConfig
          @onSubmit = Submit
        />
      </el-dialog>
      <el-dialog title="action" width="1200px" :visible.sync="visible">
        <el-tree
          :data="data"
          node-key="code"
          default-expand-all
          :expand-on-click-node="false"
          isLeaf
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.name }}</span>
            <el-checkbox-group v-model="action_ids">
              <ul style="margin-left: 20px" v-if="data.actions.length !== 0">
                <li v-for="item in data.actions"><el-checkbox :checked="item.valid" :label=item.id>{{item.name}}</el-checkbox></li>
              </ul>
            </el-checkbox-group>
          </span>
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="putBackstageAdminsRolesHttp">Submit</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import { getBackstageAdminsRolesHttp, putBackstageAdminsRolesHttp, backstageActionListHttp, postBackstageAdminsRolesHttp, deleteBackstageAdminsRolesHttp, patchBackstageAdminsRolesHttp } from '../../api/system/initAxios'
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
export default {
  name: 'SystemAdminRoleManagement',
  data () {
    return {
      visible: false,
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'id',
          label: 'ID',
          width: '60'
        }, {
          prop: 'name',
          label: 'Name',
          width: '60',
          render: (h, params) => {
            return h('el-link', {
              style: {
                color: '#409EFF'
              },
              on: {
                click: () => {
                  this.id = params.item.id
                  this.dialogConfig = {
                    visible: true,
                    title: 'Update Roles',
                    formConfig: [
                      {
                        type: 'input',
                        label: 'Name',
                        formValue: 'name',
                        placeholder: 'Name',
                        value: params.item.name
                      },
                      {
                        type: 'select',
                        label: 'Status',
                        formValue: 'status',
                        placeholder: 'Select A Status',
                        clearable: true,
                        value: Number(params.item.status),
                        list: [{
                          key: 1, value: 'active'
                        }, {
                          key: 0, value: 'inactive'
                        }]
                      },
                      {
                        type: 'input',
                        label: 'Sort',
                        formValue: 'sort',
                        placeholder: 'Sort',
                        value: params.item.sort
                      },
                      {
                        type: 'textarea',
                        label: 'Description',
                        formValue: 'description',
                        placeholder: 'Description',
                        value: params.item.description
                      },
                      {
                        type: 'Submit'
                      }
                    ]
                  }
                }
              }
            }, params.item.name)
          }
        }, {
          prop: 'sort',
          label: 'Sort',
          width: '60'
        }, {
          prop: 'status',
          label: 'Status',
          width: '60'
        }, {
          prop: 'description',
          label: 'Description',
          width: '160'
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
                      deleteBackstageAdminsRolesHttp(params.item.id).then(res => {
                        this.initHttp(this.formInline)
                      })
                    }).catch(() => {
                    })
                  }
                }
              })
            ])
          }
        }, {
          prop: 'update',
          label: 'Update Action',
          width: '60',
          render: (h, params) => {
            return h('div', [
              h('el-button', {
                props: {
                },
                style: {
                  marginRight: '5px',
                  background: '#409EFF',
                  color: '#fff',
                  border: 'none'
                },
                on: {
                  click: () => {
                    this.visible = true
                    this.id = params.item.id
                    backstageActionListHttp(params.item.id).then(res => {
                      this.data = JSON.parse(JSON.stringify(res))
                    })
                  }
                }
              }, 'Update')
            ])
          }
        }]
      },
      resInformation: {},
      formInlineConfig: [
        {
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1
      },
      dialogConfig: {
        visible: false,
        title: '',
        formConfig: [
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
            list: [{
              key: 1, value: true
            }, {
              key: 0, value: false
            }]
          },
          {
            type: 'input',
            label: 'Sort',
            formValue: 'sort',
            placeholder: 'Sort',
            value: ''
          },
          {
            type: 'textarea',
            label: 'Description',
            formValue: 'description',
            placeholder: 'Description',
            value: ''
          },
          {
            type: 'Submit'
          }
        ]
      },
      data: [],
      action_ids: [],
      id: ''
    }
  },
  components: {
    tableComp, formInlineComp
  },
  created () {
    this.initHttp(this.formInline)
  },
  methods: {
    putBackstageAdminsRolesHttp () {
      putBackstageAdminsRolesHttp(this.id, {action_ids: this.action_ids}).then(res => {
        this.initHttp(this.formInline)
        this.visible = false
      })
    },
    onAdd () {
      this.dialogConfig = {
        visible: true,
        title: 'Creat Roles',
        formConfig: [
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
            list: [{
              key: 1, value: 'active'
            }, {
              key: 0, value: 'inactive'
            }]
          },
          {
            type: 'input',
            label: 'Sort',
            formValue: 'sort',
            placeholder: 'Sort',
            value: ''
          },
          {
            type: 'textarea',
            label: 'Description',
            formValue: 'description',
            placeholder: 'Description',
            value: ''
          },
          {
            type: 'Submit'
          }
        ]
      }
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
      getBackstageAdminsRolesHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    Submit (form) {
      if (this.dialogConfig.title === 'Update Roles') {
        patchBackstageAdminsRolesHttp(this.id, form).then(res => {
          this.initHttp(this.formInline)
          this.dialogConfig.visible = false
        })
      } else {
        this.$confirm('Are you sure?', 'Prompt', {
          confirmButtonText: 'YES',
          cancelButtonText: 'NO',
          type: 'warning'
        }).then(() => {
          postBackstageAdminsRolesHttp(form).then(res => {
            this.initHttp(this.formInline)
            this.dialogConfig.visible = false
          })
        })
      }


    }
  }
}
</script>
