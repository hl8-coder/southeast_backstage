<template>
  <div class="CrmMemberCrmTaggingSetting">
<!--    <el-form-->
<!--      label-width="320px"-->
<!--      inline-->
<!--    >-->
<!--      <el-form-item-->
<!--        v-for="i in disableInput"-->
<!--        :key="i.id"-->
<!--        :label="i.name + ':'"-->
<!--      >-->
<!--        <el-input-->
<!--          v-model="i.value"-->
<!--          style="max-width: 200px"-->
<!--          disabled-->
<!--        />-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--    <el-checkbox-->
<!--      v-for="item in tagSetting"-->
<!--      :key="item.id"-->
<!--      v-model="item.value"-->
<!--      :true-label=1-->
<!--      :false-label=0-->
<!--      :name="item.code"-->
<!--      @change="tagSettingChange(item.code, item.value)"-->
<!--    >{{item.name}}</el-checkbox>-->
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="success" @click="historyLogs(logFormInline)">History Logs</el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.status"
      width="600px"
    >
      <el-form
        label-width="150px"
      >
        <el-form-item
          label="Name"
        >
          <el-input
            v-model="form.admin_name"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Status"
        >
          <el-select
            v-model="form.status"
            placeholder="Status"
          >
            <el-option
              v-for="item in dropList.status"
              :label="item.value"
              :key="item.key"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="On Duty"
        >
          <el-select
            v-model="form.on_duty"
            placeholder="On Duty"
          >
            <el-option
              v-for="item in dropList.on_duty"
              :label="item.value"
              :key="item.key"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Start Worked At"
        >
          <el-time-picker
            v-model="form.start_worked_at"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            placeholder="Start Worked At"
          />
        </el-form-item>
        <el-form-item
          label="End Worked At"
        >
          <el-time-picker
            v-model="form.end_worked_at"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            placeholder="End Worked At"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doStoreOrUpdate(form)">submit</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="History Logs"
      :visible.sync="dialog.logStatus"
      width="1200px"
    >
      <table-comp
        :tableConfig = logTableConfig
        :resInformation = logResInformation
        @handleSizePageChange =  logCallbacks
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  backstageCrmBoAdminAuditsHttp,
  backstageCrmTagSettingHttp,
  backstageCrmTagSettingPatchHttp
} from '../../api/crm/initAxios'
import moment from 'moment'
import element from '../../config/element'
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import {
  backstageCrmBoAdminsHttp,
  deleteBackstageCrmBoAdminsHttp,
  dropListCrmAdminHttp,
  patchBackstageCrmBoAdminsHttp,
  postBackstageCrmBoAdminsHttp
} from '../../api/system/initAxios'
import filter from '../../util/filter'

export default {
  name: 'CrmMemberCrmTaggingSetting',
  components: {TableComp, FormInlineComp},
  data () {
    return {
      tagSetting: [],
      disableInput: [],
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'admin_id',
            label: 'Admin ID'
          },
          {
            prop: 'admin_name',
            label: 'Admin Name',
            render: (h, params) => {
              let self = this
              return h('el-link', {
                style: {
                  color: '#409EFF'
                },
                on: {
                  click: () => {
                    self.form.id = params.item.id
                    self.form.admin_name = params.item.admin_name
                    self.form.status = params.item.status
                    self.form.on_duty = params.item.on_duty
                    self.form.start_worked_at = ''
                    self.form.end_worked_at = ''
                    self.dialog.title = 'Update'
                    self.dialog.status = true
                  }
                }
              }, params.item.admin_name)
            }
          },
          {
            prop: 'display_status',
            label: 'Status'
          },
          {
            prop: 'display_on_duty',
            label: 'Start Worked At'
          },
          {
            prop: 'start_worked_at',
            label: 'Start Worked At'
          },
          {
            prop: 'end_worked_at',
            label: 'End Worked At'
          },
          {
            prop: 'created_at',
            label: 'Created At'
          },
          {
            prop: '',
            label: 'Delete',
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
                        deleteBackstageCrmBoAdminsHttp(params.item.id).then(res => {
                          this.initHttp(this.formInline)
                        })
                      }).catch(() => {
                      })
                    }
                  }
                })
              ])
            }
          }
        ]
      },
      resInformation: {},
      formInlineConfig: [
        {
          type: 'input',
          label: 'Name',
          formValue: 'admin_name',
          placeholder: 'Name',
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
        admin_name: ''
      },
      dropList: {},
      dialog: {
        status: false,
        title: '',
        logStatus: false
      },
      form: {
        id: '',
        admin_name: '',
        on_duty: '',
        status: '',
        sort: '',
        start_worked_at: '',
        end_worked_at: ''
      },
      logTableConfig: {
        loading: true,
        border: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'action',
            label: 'Action'
          },
          {
            prop: 'name',
            label: 'Name'
          },
          {
            prop: 'old_value',
            label: 'Old Val'
          },
          {
            prop: 'new_value',
            label: 'New Val'
          },
          {
            prop: 'created_at',
            label: 'Created At'
          }
        ]
      },
      logResInformation: {},
      logFormInline: {
        per_page: 50,
        page: 1
      }
    }
  },
  methods: {
    // get CRM tag setting
    getCrmTagSetting () {
      backstageCrmTagSettingHttp().then(res => {
        this.tagSetting = res.data
        this.disableInput = res.meta
      }).catch(() => {
      })
    },
    // tagSettingChange
    tagSettingChange (key, val) {
      let data = {}
      this.$set(data, key, val)
      backstageCrmTagSettingPatchHttp(data).then(res => {
        element.message({
          type: 'success',
          message: 'success'
        })
        this.getCrmTagSetting()
      }).catch((err) => {
        val = 0
        console.log(err)
      })
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
      backstageCrmBoAdminsHttp(datalist).then(res => {
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
    dropListCrmAdminHttp () {
      dropListCrmAdminHttp().then(res => {
        this.dropList = res
      })
    },
    onAdd () {
      this.cleanForm()
      this.dialog.title = 'Add'
      this.dialog.status = true
    },
    cleanForm () {
      this.form = {
        admin_id: '',
        admin_name: '',
        on_duty: '',
        status: '',
        sort: '',
        start_worked_at: '',
        end_worked_at: ''
      }
    },
    doStoreOrUpdate (form) {
      if (form.start_worked_at) {
        form.start_worked_at = moment(form.start_worked_at).format('HH:mm:ss')
      }
      if (form.end_worked_at) {
        form.end_worked_at = moment(form.end_worked_at).format('HH:mm:ss')
      }
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        type: 'warning'
      }).then(() => {
        let data = filter.removeTheNullValue(form)
        if (form.id) {
          patchBackstageCrmBoAdminsHttp(form.id, data).then(res => {
            element.message({
              message: 'success',
              type: 'success'
            })
            this.initHttp(this.formInline)
            this.dialog.status = false
          })
        } else {
          postBackstageCrmBoAdminsHttp(form).then(res => {
            element.message({
              message: 'success',
              type: 'success'
            })
            this.initHttp(this.formInline)
            this.dialog.status = false
          })
        }
      })
    },
    logCallbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.logFormInline.page = value.page
        this.historyLogs(this.logFormInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.logFormInline.per_page = value.per_page
        this.historyLogs(this.logFormInline)
        return
      }
      this.historyLogs(value)
    },
    // 会员修改记录
    historyLogs (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      backstageCrmBoAdminAuditsHttp(formInline).then(res => {
        this.logResInformation = res
        this.logTableConfig.loading = false
      })
      this.dialog.logStatus = true
    }
  },
  activated () {
    this.getCrmTagSetting()
    this.dropListCrmAdminHttp()
    this.initHttp(this.formInline)
  }
}
</script>

<style scoped>

</style>
