<template>
  <div class="DomainManagement">
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
      :title="dialog.title"
      :visible.sync="dialog.status"
    >
      <el-form
        label-width="150px"
      >
        <el-form-item
          label="Type"
        >
          <el-select
            clearable
            v-model="form.type"
            placeholder="Type"
          >
            <el-option
              v-for="item in dropList.type"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Platform"
        >
          <el-select
            clearable
            v-model="form.platform"
            placeholder="Platform"
          >
            <el-option
              v-for="item in dropList.platform"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Device"
        >
          <el-select
            clearable
            v-model="form.device"
            placeholder="Device"
          >
            <el-option
              v-for="item in dropList.device"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Currencies"
        >
          <el-select
            clearable
            v-model="form.currencies"
            multiple
            placeholder="Currencies"
          >
            <el-option
              v-for="item in dropList.currency"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Domain">
          <el-input
            v-model="form.address"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
            v-model="form.remark"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item label="Status">
          <el-switch
            v-model="form.status"
            :active-value= 1
            :inactive-value= 0
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doStoreOrUpdate">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  backstageITToolDomainManagementDropListHttp,
  backstageITToolDomainManagementIndexHttp,
  backstageITToolDomainManagementStoreHttp,
  backstageITToolDomainManagementUpdateHttp,
  backstageITToolDomainManagementDeleteHttp
} from '../../api/it_tools/initAxios'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import FormInlineComp from '../../components/form/formInlineComp'
import element from '../../config/element'
export default {
  name: 'DomainManagement',
  components: {
    FormInlineComp,
    TableComp
  },
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID',
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
                      this.form.type = params.item.type
                      this.form.status = Number(params.item.status)
                      this.form.remark = params.item.remark
                      this.form.device = params.item.device
                      this.form.address = params.item.address
                      this.form.platform = params.item.platform
                      this.form.currencies = params.item.currencies
                      this.dialog.status = true
                      this.dialog.title = 'Update'
                    }
                  }
                }, params.item.id)
              ])
            }
          },
          {
            prop: 'display_type',
            label: 'Type'
          },
          {
            prop: 'display_device',
            label: 'Device'
          },
          {
            prop: 'display_platform',
            label: 'Platform'
          },
          {
            prop: 'address',
            label: 'Domain'
          },
          {
            prop: 'remark',
            label: 'Remark'
          },
          {
            prop: 'update_by',
            label: 'Update By'
          },
          {
            prop: 'display_status',
            label: 'Status'
          },
          {
            prop: 'display_status',
            label: 'Operating',
            render: (h, params) => {
              return h('div', [
                h('el-button', {
                  props: {
                    size: 'small',
                    type: 'danger'
                  },
                  on: {
                    click: () => {
                      let id = params.item.id
                      this.$confirm('Are you sure?', 'Prompt', {
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        type: 'warning'
                      }).then(() => {
                        backstageITToolDomainManagementDeleteHttp(id).then(res => {
                          element.message({
                            type: 'success',
                            message: 'success'
                          })
                          this.initHttp(this.formInline)
                        }).catch((error) => {
                          console.log(error)
                        })
                      }).catch(() => {})
                    }
                  }
                }, 'Delete')
              ])
            }
          }
        ]
      },
      resInformation: {},
      formInline: {
        per_page: 50,
        page: 1
      },
      form: {
        type: '',
        status: 1,
        remark: '',
        device: '',
        address: '',
        platform: '',
        currencies: []
      },
      id: '',
      dialog: {
        status: false,
        title: ''
      },
      formInlineConfig: [
        {
          type: 'add'
        }
      ],
      dropList: {}
    }
  },
  methods: {
    // 初始化
    initHttp (formInline) {
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageITToolDomainManagementIndexHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 分页回调
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
    // 下拉菜单
    initDropList () {
      backstageITToolDomainManagementDropListHttp().then(res => {
        this.dropList = res
      }).catch(() => {
      })
    },
    // 添加按钮点击事件
    onAdd () {
      this.id = ''
      this.clearForm()
      this.dialog.title = 'Add'
      this.dialog.status = true
    },
    // 清空表单
    clearForm () {
      this.form = {
        type: '',
        status: 1,
        remark: '',
        device: '',
        address: '',
        platform: '',
        currencies: []
      }
    },
    // 添加或更新
    doStoreOrUpdate () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if (this.id) {
          backstageITToolDomainManagementUpdateHttp(this.id, this.form).then(res => {
            element.message({
              type: 'success',
              message: 'success'
            })
            this.dialog.status = false
            this.initHttp(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        } else {
          backstageITToolDomainManagementStoreHttp(this.form).then(res => {
            element.message({
              type: 'success',
              message: 'success'
            })
            this.dialog.status = false
            this.initHttp(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        }
      }).catch(() => {
      })
    }
  },
  created () {
    this.initHttp(this.formInline)
    this.initDropList()
  }
}
</script>

<style scoped>

</style>
