<style lang="scss" scoped type="text/scss">
  lable {
    width: 100px;
    display: inline-block;
  }
</style>

<template>
    <div class="SystemActionManagement">
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
      <el-dialog :title="matchMenuRoutes.title" @close="clear" width="1200px" :visible.sync="matchMenuRoutes.visible">
        <div class="FlexRowSpaceBetweenFlexStart">
          <div style="width: 500px">
            <div class="FlexRowSpaceBetweenCenter">
              Menu ID :
              <el-input v-model="menu_id" style="width: 300px"/>
              <el-button @click="matchMenu" type="primary">match</el-button>
            </div>
            <ul style="margin-top: 30px;padding-left: 20px">
              <li><lable>ID:</lable>{{menuData.id || 'none'}}</li>
              <li><lable>Name:</lable>{{menuData.name || 'none'}}</li>
              <li><lable>Is Show:</lable>{{menuData.is_show || 'none'}}</li>
              <li><lable>Parent Id:</lable>{{menuData.parent_id || 'none'}}</li>
              <li><lable>Path:</lable>{{menuData.path || 'none'}}</li>
              <li><lable>Sort:</lable>{{menuData.sort || 'none'}}</li>
              <li><lable>Description:</lable>{{menuData.description || 'none'}}</li>
            </ul>
          </div>
          <div style="width: 600px">
            <div class="FlexRowSpaceBetweenCenter">
              routes ID :
              <el-input v-model="routes_id" style="width: 300px"/>
              <el-button @click="matchRoutes" type="primary">match</el-button>
            </div>
            <ul style="margin-top: 30px;padding-left: 20px">
              <li><lable>ID:</lable>{{routesData.id || 'none'}}</li>
              <li><lable>Name:</lable>{{routesData.name || 'none'}}</li>
              <li><lable>Action:</lable>{{routesData.action || 'none'}}</li>
              <li><lable>Location:</lable>{{routesData.location || 'none'}}</li>
              <li><lable>Method:</lable>{{routesData.method || 'none'}}</li>
              <li><lable>Remark:</lable>{{routesData.remark || 'none'}}</li>
              <li><lable>Url:</lable>{{routesData.url || 'none'}}</li>
              <li><lable>Version:</lable>{{routesData.version || 'none'}}</li>
            </ul>
          </div>
        </div>

        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button type="primary" @click="matchSubmit">Submit</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import {backstageActionsHttp, postBackstageActionsHttp, actionsMenuRouteHttp, patchtBackstageActionsHttp, dropListActionHttp, apiBackstageMenuHttp, backstageRoutesIdHttp, deleteBackstageActionsHttp} from '../../api/system/initAxios'
import filter from '../../util/filter'
export default {
  name: 'SystemActionManagement',
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        id: '',
        tableColumn: [{
          prop: 'id',
          label: 'ID',
          width: '60'
        }, {
          prop: 'menu.name',
          label: 'Menu Name',
          width: '120'
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
                  this.id = params.item.id
                  this.dialogConfig = {
                    visible: true,
                    title: 'Update',
                    formConfig: [
                      {
                        type: 'select',
                        label: 'Menu Name',
                        formValue: 'menu_id',
                        placeholder: 'Select A Menu Name',
                        disabled: true,
                        value: params.item.menu_id,
                        list: this.dropList.menu_id
                      },
                      {
                        type: 'select',
                        label: 'Method',
                        formValue: 'method',
                        disabled: true,
                        placeholder: 'Select A Method',
                        value: params.item.method,
                        list: this.dropList.method
                      },
                      {
                        type: 'input',
                        label: 'Name',
                        formValue: 'name',
                        placeholder: 'Name',
                        value: params.item.name
                      },
                      {
                        type: 'input',
                        label: 'Action',
                        formValue: 'action',
                        disabled: true,
                        placeholder: 'Action',
                        value: params.item.action
                      },
                      {
                        type: 'input',
                        label: 'Sort',
                        formValue: 'sort',
                        placeholder: 'Sort',
                        value: params.item.sort
                      },
                      {
                        type: 'input',
                        label: 'URL',
                        formValue: 'url',
                        disabled: true,
                        placeholder: 'URL',
                        value: params.item.url
                      },
                      {
                        type: 'input',
                        label: 'DropList URL',
                        formValue: 'drop_list_url',
                        placeholder: 'DropList URL',
                        disabled: true,
                        value: params.item.drop_list_url
                      },
                      {
                        type: 'textarea',
                        label: 'Remark',
                        formValue: 'remark',
                        placeholder: 'remark',
                        value: params.item.remark
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
          prop: 'method',
          label: 'Method',
          width: '80'
        }, {
          prop: 'action',
          label: 'Action',
          width: '150'
        }, {
          prop: 'sort',
          label: 'Sort',
          width: '60'
        }, {
          prop: 'remark',
          label: 'Remark',
          width: '200'
        }, {
          prop: 'url',
          label: 'URL',
          width: '200'
        }, {
          prop: 'drop_list_url',
          label: 'DropList URL',
          width: '200'
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
                      deleteBackstageActionsHttp(params.item.id).then(res => {
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
        {
          type: 'select',
          label: 'Method',
          formValue: 'method',
          placeholder: 'Select A Method',
          clearable: true,
          value: '',
          list: []
        },
        {
          type: 'select',
          label: 'Menu Name',
          formValue: 'menu_id',
          placeholder: 'Select A Menu Name',
          clearable: true,
          value: '',
          list: []
        },
        {
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      menu_id: '',
      menuData: {},
      routes_id: '',
      routesData: {},
      formInline: {
        include: 'menu',
        per_page: 50,
        page: 1,
        method: '',
        name: '',
        menu_id: ''
      },
      matchMenuRoutes: {
        title: 'Add Routes And Menu',
        visible: false
      },
      dialogConfig: {
        visible: false,
        title: '',
        formConfig: [
          {
            type: 'select',
            label: 'Menu Name',
            formValue: 'menu_id',
            placeholder: 'Select A Menu Name',
            clearable: true,
            value: '',
            list: []
          },
          {
            type: 'select',
            label: 'Method',
            formValue: 'method',
            placeholder: 'Select A Method',
            clearable: true,
            value: '',
            list: []
          },
          {
            type: 'input',
            label: 'Name',
            formValue: 'name',
            placeholder: 'Name',
            value: ''
          },
          {
            type: 'input',
            label: 'Action',
            formValue: 'action',
            placeholder: 'Action',
            value: ''
          },
          {
            type: 'input',
            label: 'Sort',
            formValue: 'sort',
            placeholder: 'Sort',
            value: ''
          },
          {
            type: 'input',
            label: 'URL',
            formValue: 'url',
            placeholder: 'URL',
            value: ''
          },
          {
            type: 'input',
            label: 'DropList URL',
            formValue: 'drop_list_url',
            placeholder: 'DropList URL',
            value: ''
          },
          {
            type: 'textarea',
            label: 'Remark',
            formValue: 'remark',
            placeholder: 'remark',
            value: ''
          },
          {
            type: 'Submit'
          }
        ]
      }
    }
  },
  components: {
    tableComp, formInlineComp
  },
  created () {
    this.dropListActionHttp()
    this.initHttp(this.formInline)
  },
  methods: {
    dropListActionHttp () {
      dropListActionHttp().then(res => {
        this.dropList = res
        filter.formValueListFilter(this.formInlineConfig, res, ['menu_id', 'method'])
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
      this.matchMenuRoutes.visible = true
    },
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
        formInline.include = 'menu'
      }
      this.formInline = formInline
      this.tableConfig.loading = true
      var datalist = filter.formInlineFilter(formInline)
      backstageActionsHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    Submit (form) {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        type: 'warning'
      }).then(() => {
        if (this.dialogConfig.title === 'Update') {
          patchtBackstageActionsHttp(this.id, form).then(res => {
            this.initHttp(this.formInline)
            this.dialogConfig.visible = false
          })
        } else {
          postBackstageActionsHttp(form).then(res => {
            this.initHttp(this.formInline)
            this.dialogConfig.visible = false
          })
        }
      })
    },
    matchSubmit () {
      actionsMenuRouteHttp({include: 'menu', menu_id: this.menu_id, route_id: this.routes_id}).then(res => {
        this.matchMenuRoutes.visible = false
        this.initHttp(this.formInline)
      })
    },
    clear () {
      this.menu_id = ''
      this.menuData = {}
      this.routes_id = ''
      this.routesData = {}
    },
    matchMenu () {
      if (this.menu_id) {
        apiBackstageMenuHttp(this.menu_id, {}).then(res => {
          this.menuData = res
        })
      }
    },
    matchRoutes () {
      if (this.routes_id) {
        backstageRoutesIdHttp(this.routes_id, {}).then(res => {
          this.routesData = res
        })
      }
    }
  }
}
</script>
