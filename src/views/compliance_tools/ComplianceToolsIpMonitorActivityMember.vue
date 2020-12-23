<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="ComplianceToolsMember">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    ></form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    ></table-comp>
    <el-dialog
      title="User"
      :visible.sync="status"
    >
      <table-comp
        :tableConfig = subTableConfig
        :resInformation = subResInformation
        @handleSizePageChange =  subCallbacks
      ></table-comp>
    </el-dialog>
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import {
  mapGetters
} from 'vuex'
import {
  backstageRMIPMonitorActivityMemberHttp,
  backstageRMIPMonitorActivityMemberByIpHttp
} from '../../api/rm_tool/initAxios'
import filter from '../../util/filter'
export default {
  name: 'ComplianceToolsMember',
  components: {TableComp, FormInlineComp},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'input',
          label: 'MemberCode',
          formValue: 'user_name',
          placeholder: 'MemberCode',
          value: ''
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
          type: 'input',
          label: 'affiliate Code',
          formValue: 'affiliated_code',
          placeholder: 'affiliate Code',
          value: ''
        },
        {
          type: 'input',
          label: 'IP Address ',
          formValue: 'ip',
          placeholder: 'IP Address ',
          value: ''
        },
        {
          type: 'date',
          label: 'Date',
          formValue: 'date',
          value: ''
        },
        {
          type: 'search'
        }
      ],
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'parent_name',
            label: 'affiliate Code'
          },
          {
            prop: 'user_name',
            label: 'Member Code'
          },
          {
            prop: 'user.currency',
            label: 'Currency'
          },
          {
            prop: 'user.display_risk_group_id',
            label: 'Risk ID'
          },
          {
            prop: 'user.info.register_url',
            label: 'Register URL',
            fixWidth: '180px'
          },
          {
            prop: 'ip',
            label: 'IP'
          },
          {
            prop: 'uuc',
            label: 'Unique user Count',
            render: (h, params) => {
              if (!params.item.uuc) {
                return params.item.uuc
              }
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.subFormInline.ip = params.item.ip
                      this.getInfoByIp(this.subFormInline)
                      this.status = true
                    }
                  }
                }, params.item.uuc)
              ])
            }
          },
          {
            prop: 'country',
            label: 'Country'
          },
          {
            prop: 'city',
            label: 'City'
          },
          {
            prop: 'created_at',
            label: 'Login Time'
          },
          {
            prop: 'browser',
            label: 'Browser'
          },
          {
            prop: 'display_device',
            label: 'Mode'
          },
          {
            prop: 'equipment',
            label: 'Device'
          }
        ]
      },
      resInformation: {},
      formInline: {
        include: 'user.info',
        per_page: 50,
        page: 1,
        user_name: '',
        affiliated_code: '',
        currency: '',
        ip: '',
        start_at: '',
        end_at: ''
      },
      status: false,
      subTableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'user_name',
            label: 'Member Code'
          },
          {
            prop: 'created_at',
            label: 'Date'
          },
          {
            prop: 'ip',
            label: 'IP Address'
          },
          {
            prop: 'country',
            label: 'Country'
          },
          {
            prop: 'city',
            label: 'City'
          },
          {
            prop: 'uuc',
            label: 'Total Used Count'
          }
        ]
      },
      subFormInline: {
        include: 'user.info',
        per_page: 50,
        page: 1,
        ip: ''
      },
      subResInformation: {},
      ip: ''
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  methods: {
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initComplianceToolsMember(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initComplianceToolsMember(this.formInline)
        return
      }
      this.initComplianceToolsMember(value)
    },
    // 数据初始化
    initComplianceToolsMember (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
        formInline.include = this.formInline.include
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageRMIPMonitorActivityMemberHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 弹出层回调
    subCallbacks  (value) {
      if (value.hasOwnProperty('page')) {
        this.subFormInline.page = value.page
        this.getInfoByIp(this.subFormInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.subFormInline.per_page = value.per_page
        this.getInfoByIp(this.subFormInline)
        return
      }
      value.ip = this.subFormInline.ip
      this.getInfoByIp(value)
    },
    // 获取详情
    getInfoByIp (subFormInline) {
      this.subTableConfig.loading = true
      backstageRMIPMonitorActivityMemberByIpHttp(subFormInline).then(res => {
        this.subResInformation = res
        this.subTableConfig.loading = false
      }).catch((error) => {
        this.subTableConfig.loading = false
        console.log(error)
      })
    }
  },
  created () {
    this.initComplianceToolsMember(this.formInline)
    filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
  }
}
</script>
