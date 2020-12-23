<template>
  <div class="CrmBatch" style="display: contents;">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      :formLabelWidth = formLabelWidth
      @onSubmit = callbacks
    >

      <template v-slot:content>
        <el-button style="margin-right: 5px" type="success" @click="downloadExcel(1)">Crm Orders Download</el-button>
        <el-button style="margin-right: 5px" type="warning" @click="downloadExcel(2)">Call Logs Download</el-button>
        <el-button style="margin-right: 5px" type="info" @click="updateOrCancel(1)">batch assign</el-button>
        <el-button style="margin-right: 5px" type="danger" @click="updateOrCancel(0)">batch cancel</el-button>
        <slot name="button"></slot>
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
  </div>
</template>

<script>
import element from '../../config/element'
import {
  backstageCrmDropListHttp,
  backstageCrmExcelExportHttp,
  backstageCrmMemberUpdateCallLogsHttp
} from '../../api/crm/initAxios'
import filter from '../../util/filter'
import FormInlineComp from '../form/formInlineComp'
export default {
  components: {FormInlineComp},
  props: ['ids', 'dropList', 'formInline', 'formInlineConfig'],
  name: 'CrmBatch',
  data () {
    return {
      // formInlineConfig: [
      //   {
      //     type: 'input',
      //     formValue: 'name',
      //     label: 'Member Code',
      //     placeholder: 'Member Code',
      //     value: ''
      //   },
      //   {
      //     type: 'input',
      //     formValue: 'full_name',
      //     label: 'Full Name',
      //     placeholder: 'Full Name',
      //     value: ''
      //   },
      //   {
      //     type: 'input',
      //     formValue: 'phone',
      //     label: 'Phone',
      //     placeholder: 'Phone',
      //     value: ''
      //   },
      //   {
      //     type: 'input',
      //     formValue: 'email',
      //     label: 'Email',
      //     placeholder: 'Email',
      //     value: ''
      //   },
      //   {
      //     type: 'input',
      //     formValue: 'register_ip',
      //     label: 'Register Ip',
      //     placeholder: 'Register Ip',
      //     value: ''
      //   },
      //   {
      //     type: 'select',
      //     label: 'Member Status',
      //     formValue: 'user_status',
      //     placeholder: 'Select A Member Status',
      //     clearable: true,
      //     value: '',
      //     list: ''
      //   },
      //   {
      //     type: 'select',
      //     label: 'Currency',
      //     formValue: 'currency',
      //     placeholder: 'Select A Currency',
      //     clearable: true,
      //     value: '',
      //     list: ''
      //   },
      //   {
      //     type: 'select',
      //     label: 'Risk Group',
      //     formValue: 'risk_group_id',
      //     placeholder: 'Select A Risk Group',
      //     clearable: true,
      //     value: '',
      //     list: ''
      //   },
      //   {
      //     type: 'select',
      //     label: 'Payment Group',
      //     formValue: 'payment_group_id',
      //     placeholder: 'Select A Payment Group',
      //     clearable: true,
      //     value: '',
      //     list: ''
      //   },
      //   {
      //     type: 'input',
      //     formValue: 'affiliated_code',
      //     placeholder: 'AFF Code',
      //     label: 'AFF Code',
      //     value: ''
      //   },
      //   {
      //     type: 'select',
      //     label: 'Status',
      //     formValue: 'status',
      //     placeholder: 'Select A Status',
      //     clearable: true,
      //     value: '',
      //     list: ''
      //   },
      //   {
      //     type: 'select',
      //     label: 'Call Status',
      //     formValue: 'call_status',
      //     placeholder: 'Select A Call Status',
      //     clearable: true,
      //     value: '',
      //     list: ''
      //   },
      //   {
      //     type: 'dateTime',
      //     label: 'Reg Date',
      //     formValue: 'date',
      //     formKey1: 'register_start',
      //     formKey2: 'register_end',
      //     value: ''
      //   },
      //   {
      //     type: 'dateTime',
      //     label: 'Last Login Date',
      //     formValue: 'date',
      //     formKey1: 'last_login_start',
      //     formKey2: 'last_login_end',
      //     value: ''
      //   },
      //   {
      //     type: 'dateTime',
      //     label: 'Tag Date',
      //     formValue: 'date',
      //     formKey1: 'tag_start',
      //     formKey2: 'tag_end',
      //     value: ''
      //   },
      //   {
      //     type: 'dateTime',
      //     label: 'Last Save Date',
      //     formValue: 'date',
      //     formKey1: 'last_save_start',
      //     formKey2: 'last_save_end',
      //     value: ''
      //   },
      //   {
      //     type: 'search'
      //   }
      // ],
      formLabelWidth: '150px',
      data: {
        crm_order_ids: [],
        admin_id: '',
        distribute: ''
      },
      dialog: {
        title: '',
        status: false,
      }
    }
  },
  watch: {
    'ids' (val) {
      this.setData(val)
    }
  },
  methods: {
    // 更新
    updateOrCancel (val) {
      this.data.distribute = val
      if (!this.data.crm_order_ids.length) {
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
    toDo () {
      let data = filter.removeTheNullValue(this.data)
      backstageCrmMemberUpdateCallLogsHttp(data).then(res => {
        this.dialog.status = false
        element.message({
          type: 'success',
          message: 'success'
        })
        this.$emit('refresh')
      }).catch((err) => {
        console.log(err)
      })
    },
    // 下载报表
    downloadExcel (type) {
      var datalist = filter.formInlineFilterByEcho(this.formInline, [], ['per_page', 'page'])
      backstageCrmExcelExportHttp(datalist, type).then(res => {
        filter.downloadExcel(res)
      }).catch(() => {
      })
    },
    // 下拉菜单
    initDropListHttp () {
      backstageCrmDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['user_status', 'currency', 'risk_group_id', 'payment_group_id', 'status', 'call_status', 'deposit'])
      }).catch(() => {
      })
    },
    callbacks (val) {
      this.$emit('callbacks', val)
    },
    setData (ids) {
      this.data.crm_order_ids = ids
    }
  },
  mounted () {
    this.setData(this.ids)
    this.initDropListHttp()
  }
}
</script>

<style scoped>

</style>
