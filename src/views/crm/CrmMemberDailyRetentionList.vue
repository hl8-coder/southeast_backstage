<template>
  <div class="CrmMemberDailyRetentionList">
    <crm-batch
      :ids="ids"
      :dropList="dropList"
      :formInline="formInline"
      :formInlineConfig="formInlineConfig"
      @refresh="initHttp(formInline)"
      @callbacks="callbacks"
    >
      <template v-slot:button>
        <el-button style="margin-right: 5px" type="success" @click="downloadExcel">Download Template</el-button>
        <file-upload
          :fileConfig="uploadConfig"
        ></file-upload>
      </template>
    </crm-batch>
    <member-status/>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
      @handleSelectionChange = handleSelectionChange
    />
    <crm-call-log
      :dropList="dropList"
      :dialog="dialog"
      @refresh="initHttp(formInline)"
      :order="order"
      :item = false
    />
    <crm-call-log-status
      :crmID = id
      :type = false
      :dialog = dialogDetail
    />
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import FileUpload from '../../components/file/fileUpload'
import {
  backstageCrmListHttp,
  backstageCrmDropListHttp,
  crmOrdersImportTemplatetHttp
} from '../../api/crm/initAxios'
import CrmCallLog from '../../components/crm/CrmCallLog'
import CrmBatch from '../../components/crm/CrmBatch'
import CrmCallLogStatus from '../../components/crm/CrmCallLogStatus'
import colorFilter from '../../config/colorFilter'
import memberStatus from '../../components/Member/memberStatus'
import resourcesList from '../../util/static'
export default {
  name: 'CrmMemberDailyRetentionList',
  components: {CrmCallLogStatus, CrmBatch, CrmCallLog, TableComp, memberStatus, FileUpload},
  data () {
    return {
      formLabelWidth: '150px',
      formInlineConfig: [
        {
          type: 'input',
          formValue: 'name',
          label: 'Member Code',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'input',
          formValue: 'full_name',
          label: 'Full Name',
          placeholder: 'Full Name',
          value: ''
        },
        {
          type: 'input',
          formValue: 'register_ip',
          label: 'Register Ip',
          placeholder: 'Register Ip',
          value: ''
        },
        {
          type: 'select',
          label: 'Member Status',
          formValue: 'user_status',
          placeholder: 'Select A Member Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Currency',
          formValue: 'currency',
          placeholder: 'Select A Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Risk Group',
          formValue: 'risk_group_id',
          placeholder: 'Select A Risk Group',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Payment Group',
          formValue: 'payment_group_id',
          placeholder: 'Select A Payment Group',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          formValue: 'affiliated_code',
          placeholder: 'AFF Code',
          label: 'AFF Code',
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
          type: 'select',
          label: 'Call Status',
          formValue: 'call_status',
          placeholder: 'Select A Call Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          formValue: 'admin_name',
          placeholder: 'BO User',
          label: 'BO User',
          value: ''
        },
        {
          type: 'input',
          formValue: 'tag_admin_name',
          placeholder: 'Tag Admin',
          label: 'Tag Admin',
          value: ''
        },
        {
          type: 'dateTime',
          label: 'Reg Date',
          formValue: 'date',
          formKey1: 'register_start',
          formKey2: 'register_end',
          value: ''
        },
        {
          type: 'dateTime',
          label: 'Last Login Date',
          formValue: 'date',
          formKey1: 'last_login_start',
          formKey2: 'last_login_end',
          value: ''
        },
        {
          type: 'dateTime',
          label: 'Last Deposit Date',
          formValue: 'date',
          formKey1: 'last_deposit_start',
          formKey2: 'last_deposit_end',
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
          type: 'search'
        }
      ],
      uploadConfig: {
        url: '/api/backstage/crm_orders',
        name: 'excel',
        limit: 1,
        data: {type: 2},
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        type: 'Games',
        button: 'Upload File'
      },
      formInline: {
        type: 2,
        name: '',
        full_name: '',
        currency: '',
        register_ip: '',
        user_status: '',
        risk_group_id: '',
        payment_group_id: '',
        affiliated_code: '',
        admin_name: '',
        tag_admin_name: '',
        register_start: '',
        register_end: '',
        last_login_start: '',
        last_login_end: '',
        last_deposit_start: '',
        last_deposit_end: '',
        tag_start: '',
        tag_end: '',
        last_save_start: '',
        last_save_end: '',
        status: '',
        phone: '',
        email: '',
        call_status: '',
        per_page: 50,
        page: 1
      },
      tableConfig: {
        border: true,
        loading: true,
        selection: true,
        tableColumn: [
          {
            prop: '',
            label: '',
            fixWidth: '41px',
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
                      this.dialog.status = true
                    }
                  }
                })
              ])
            }
          },
          {
            prop: '',
            label: 'Member Code',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'members_profile', query: {id: params.item.user.id}})
                    }
                  }
                }, params.item.user.name)
              ])
            }
          },
          {
            prop: 'userInfo.full_name',
            fixWidth: '75px',
            label: 'Name'
          },
          {
            prop: 'user.currency',
            fixWidth: '70px',
            label: 'Currency'
          },
          {
            // prop: 'user.display_status',
            fixWidth: '57px',
            label: 'Status',
            render(h, params) {
              const status = params.item.user.status;
              const bgColor = colorFilter.membersStatusList.filter(item => status === item.key)[0].color;
              return h('div', [
                h('el-button', {
                  props: {
                    icon: "el-icon-star-off",
                    size: "medium",
                    disabled: true,
                    circle: true
                  },
                  style: {
                    backgroundColor: bgColor,
                    color: '#fff'
                  }
                })
              ])
            }
          },
          {
            prop: 'userInfo.register_ip',
            label: 'Register IP'
          },
          {
            prop: 'userInfo.phone',
            label: 'Phone'
          },
          {
            prop: 'userInfo.email',
            label: 'Email'
          },
          {
            prop: 'user.display_risk_group_id',
            fixWidth: '50px',
            label: 'Risk'
          },
          {
            prop: 'user.display_payment_group_id',
            fixWidth: '70px',
            label: 'Payment'
          },
          {
            prop: 'user.affiliated_code',
            label: 'AFF'
          },
          {
            prop: 'user.created_at',
            fixWidth: '85px',
            label: 'Sign In'
          },
          {
            prop: 'user.created_at',
            fixWidth: '85px',
            label: 'Login'
          },
          {
            prop: 'last_deposit_amount',
            fixWidth: '70px',
            label: 'LTD Amt'
          },
          {
            prop: 'last_deposit_date',
            fixWidth: '138px',
            label: 'LTD Time'
          },
          {
            prop: 'call_status',
            fixWidth: '78px',
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
            prop: 'tag_admin_name',
            fixWidth: '67px',
            label: 'Tag user'
          },
          {
            prop: 'tag_at',
            fixWidth: '85px',
            label: 'Tag time'
          },
          {
            prop: 'admin_name',
            fixWidth: '70px',
            label: 'BO user'
          },
          {
            prop: 'last_save_case_admin_name',
            fixWidth: '75px',
            label: 'Last Save'
          },
          {
            prop: 'last_save_case_at',
            fixWidth: '85px',
            label: 'LS Time'
          }
        ]
      },
      resInformation: {},
      dropList: {},
      order: {},
      dialog: {
        status: false
      },
      ids: [],
      dialogDetail: {
        status: false
      },
      id: ''
    }
  },
  methods: {
    downloadExcel () {
      var datalist = filter.formInlineFilterByEcho(this.formInline, [], ['per_page', 'page', 'type'])
      crmOrdersImportTemplatetHttp(datalist).then(res => {
        filter.downloadExcel(res)
      })
    },
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
      backstageCrmListHttp(datalist).then(res => {
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
      backstageCrmDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['user_status', 'currency', 'risk_group_id', 'payment_group_id', 'status', 'call_status'])
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
    // table List 选中事件
    handleSelectionChange (value, row) {
      if (value.page.length) {
        let ids = []
        for (var i = 0; i < value.page.length; i++) {
          ids.push(value.page[i].id)
        }
        this.ids = ids
      }
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
