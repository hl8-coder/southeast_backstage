<template>
    <div>
      <form-inline-comp
        :formInlineConfig = formInlineConfig
        @onSubmit = callbacks
        @onAdd = onAdd
        @downloadExcel = downloadExcel
      >
        <template v-slot:content>
          <el-button type="primary" @click="upload" >Upload</el-button>
        </template>
      </form-inline-comp>
      <table-comp
        :tableConfig = tableConfig
        :resInformation = resInformation
        @handleSizePageChange =  callbacks
      ></table-comp>
      <el-dialog
        width="600px"
        :title="dialog.title"
        :visible.sync="dialog.status"
      >
        <el-form
          label-width="100px"
        >
          <el-form-item
            label="Risk Group"
          >
            <el-input
              v-model="form.name"
              style="max-width: 220px"
            />
          </el-form-item>
          <el-form-item
            label="Description"
          >
            <el-input
              type="textarea"
              v-model="form.description"
              style="max-width: 400px"
            />
          </el-form-item>
          <el-checkbox-group
            v-model="form.rules">
            <el-checkbox v-for="item in RiskGroupRulesDroplist.rules" :label="item.key" :key="item.key">{{item.value}}</el-checkbox>
          </el-checkbox-group>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="doUpdate">Submit</el-button>
        </div>
      </el-dialog>
      <el-dialog
        width="600px"
        :title="dialogFile.title"
        :visible.sync="dialogFile.status"
      >
        <el-form
          label-width="100px"
        >
          <el-form-item
            label="Choose file"
          >
            <file-upload
              ref="fileUpload"
              :fileConfig="uploadConfig"
            ></file-upload>
          </el-form-item>
          <el-form-item
            label="Risk group"
          >
            <el-select clearable v-model="uploadConfig.data.risk_group_id" placeholder="select">
              <el-option
                v-for="item in RiskGroupDroplist.risk_group"
                :key="item.value.name"
                :label="item.value.name"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitFile">Submit</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import {backstageRiskGroupAudisHttp, backstageRiskGroupTemplateHttp, patchackstageRiskGroupsHttp, postBackstageRiskGroupsHttp, getBackstageRiskGroupsHttp, backstageRiskGroupRulesDropListHttp, backstageRiskGroupDropListHttp} from '../../api/rm_tool/initAxios'
import element from '../../config/element'
import filter from '../../util/filter'
import resourcesList from '../../util/static'
import FileUpload from '../../components/file/fileUpload'
export default {
  name: 'ComplianceToolsRiskGroup',
  components: {FormInlineComp, TableComp, FileUpload},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'add'
        },
        {
          type: 'export',
          buttonName: 'Download'
        }
      ],
      pagination: {
        per_page: 50,
        total: 20,
        page: 1
      },
      formInline: {
        per_page: 50,
        page: 1
      },
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'name',
            label: 'Risk Group',
            fixWidth: '205px',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.form = {
                        name: params.item.name,
                        description: params.item.description,
                        rules: params.item.rules
                      }
                      this.id = params.item.id
                      this.dialog = {
                        title: 'Updated Risk Group',
                        status: true,
                      }

                    }
                  }
                }, params.item.name)
              ])
            }
          },
          {
            prop: 'rules',
            label: 'Rules',
            fixWidth: '405px',
            render: (h, params) => {
              if (!this.RiskGroupRulesDroplist.rules) {
                return
              }
              return params.item.rules.map(item => {
                let value = ''
                this.RiskGroupRulesDroplist.rules.map(item1 => {
                  if (item1.key === item) {
                    value = item1.value
                  }
                })
                return h('div', {
                }, value)
              })
            }
          },
          {
            prop: 'description',
            label: 'Description'
          },
          {
            prop: 'admin',
            label: 'Last edited',
            fixWidth: '155px',
            render: (h, params) => {
              if (params.item.number === 0) {
                return h('div', [
                  h('span', {
                  }, params.item.number)
                ])
              }
              var self = this
              return h('el-popover', {
                props: {
                  placement: 'left',
                  width: '600',
                  trigger: 'click'
                }
              }, [
                h('el-table', {
                  props: {
                    data: self.gridData
                  }
                }, [
                  h('el-table-column', {
                    props: {
                      width: '160',
                      property: 'created_at',
                      label: 'Date/Time'
                    }
                  }),
                  h('el-table-column', {
                    props: {
                      width: '80',
                      property: 'name',
                      label: 'Admin'
                    }
                  }),
                  h('el-table-column', {
                    props: {
                      width: '120',
                      property: 'old_value',
                      label: 'Previous Value'
                    }
                  }),
                  h('el-table-column', {
                    props: {
                      width: '120',
                      property: 'new_value',
                      label: 'New Value'
                    }
                  })
                ]),
                h('el-pagination', {
                  props: {
                    layout: 'prev, pager, next',
                    total: self.pagination.total,
                    'page-size': self.pagination.per_page,
                    'current-page': self.pagination.page
                  },
                  on: {
                    'current-change': (val) => {
                      self.pagination.page = val
                      backstageRiskGroupAudisHttp(params.item.id, {page: val, per_page: self.pagination.per_page}).then(res => {
                        self.gridData = res.data
                        self.pagination.total = res.meta.pagination.total
                      }).catch((error) => {
                        console.log(error)
                      })
                    }
                  }
                }, params.item.number),
                h('el-link', {
                  slot: 'reference',
                  props: {
                    type: 'primary',
                    icon: 'el-icon-view'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      self.pagination.page = 1
                      backstageRiskGroupAudisHttp(params.item.id, {page: self.pagination.page, per_page: self.pagination.per_page}).then(res => {
                        self.gridData = res.data
                        self.pagination.total = res.meta.pagination.total
                      }).catch((error) => {
                        console.log(error)
                      })
                    }
                  }
                }, params.item.admin)
              ])
            }
          }
        ]
      },
      gridData: [],
      resInformation: {},
      RiskGroupRulesDroplist: {},
      RiskGroupDroplist: {},
      dialog: {
        title: 'Add Risk Group',
        status: false
      },
      form: {
        name: '',
        description: '',
        rules: []
      },
      id: '',
      dialogFile: {
        title: 'Batch assign',
        status: false
      },
      uploadConfig: {
        url: '/api/backstage/user_risk_group',
        name: 'excel',
        data: {risk_group_id: ''},
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        type: 'Games',
        limit: 1,
        autoUpload: false
      }
    }
  },
  created () {
    this.initHttp(this.formInline)
    this.droplistHttp()
  },
  methods: {
    droplistHttp () {
      backstageRiskGroupRulesDropListHttp().then(res => {
        this.RiskGroupRulesDroplist = res
      })
      backstageRiskGroupDropListHttp().then(res => {
        this.RiskGroupDroplist = res
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
    initHttp () {
      getBackstageRiskGroupsHttp().then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    upload () {
      this.dialogFile.status = true
      this.uploadConfig.data.risk_group_id = ''
    },
    doUpdate () {
      if (this.dialog.title === 'Add Risk Group') {
        postBackstageRiskGroupsHttp(this.form).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.dialog.status = false
          this.initHttp(this.formInline)
        })
      } else {
        if (this.form.rules.length === 0) {
          this.form.rules = ['']
        }
        patchackstageRiskGroupsHttp(this.id, this.form).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.dialog.status = false
          this.initHttp(this.formInline)
        })
      }
    },
    onAdd () {
      this.form = {
        name: '',
        description: '',
        rules: []
      }
      this.id = ''
      this.dialog = {
        title: 'Add Risk Group',
        status: true
      }
    },
    downloadExcel () {
      backstageRiskGroupTemplateHttp().then(res => {
        filter.downloadExcel(res)
      })
    },
    submitFile () {
      this.$refs.fileUpload.uploadSubmit()
    },
    handleWebSuccess (res) {
      console.log(res)
    }
  }
}
</script>

<style scoped>

</style>
