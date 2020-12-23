<template>
  <div class="ReportsMemberCrmReport">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    ></form-inline-comp>
    <table-comp
      :table-config="tableConfig"
      :resInformation="resInformation"
    ></table-comp>
    <el-dialog
      :visible.sync="popInfo"
    >
      <table-comp
        :table-config="popInfoTable"
        :resInformation="popInfoTableData"
      ></table-comp>
    </el-dialog>
    <el-dialog
      :visible.sync="popInfoDeposit"
    >
      <table-comp
        :table-config="popInfoDepositTable"
        :resInformation="popInfoDepositTableData"
      ></table-comp>
    </el-dialog>
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstageReportsMemberCRMReportHttp,
  backstageReportsMemberCRMReportUserInfoHttp
} from '../../api/report/initAxios'
export default {
  name: 'ReportsMemberCrmReport',
  components: {TableComp, FormInlineComp},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'select',
          label: 'Country',
          formValue: 'country',
          placeholder: 'Select A Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Call Type',
          formValue: 'type',
          placeholder: 'Select A Call Type',
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
          label: 'Agents',
          formValue: 'admin_id',
          placeholder: 'Agents',
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
      formInline: {
        admin_id: '',
        country: '',
        type: '',
        call_status: '',
        start_at: '',
        end_at: ''
      },
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'week',
            label: 'Week'
          },
          {
            prop: 'group_date',
            label: 'Date'
          },
          {
            prop: 'country_code',
            label: 'Country'
          },
          {
            prop: 'type',
            label: 'Call Type'
          },
          {
            prop: 'call_status',
            label: 'Call Status'
          },
          {
            prop: 'total_call',
            label: 'Total Call',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.popInfo = true
                      let info = {
                        user_ids: params.item.all_user_id,
                        is_include_deposit: 0,
                        start_at: this.formInline.start_at,
                        end_at: this.formInline.end_at
                      }
                      this.getUserInfo(info, true)
                    }
                  }
                }, params.item.total_call)
              ])
            }
          },
          {
            prop: 'total_success_call',
            label: 'Total Successful Call',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.popInfo = true
                      let info = {
                        user_ids: params.item.all_user_id,
                        is_include_deposit: 0,
                        start_at: this.formInline.start_at,
                        end_at: this.formInline.end_at
                      }
                      this.getUserInfo(info, true)
                    }
                  }
                }, params.item.total_success_call)
              ])
            }
          },
          {
            prop: 'total_no_of_deposit',
            label: 'Total No Of Deposit',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.popInfoDeposit = true
                      let info = {
                        user_ids: params.item.all_user_id,
                        is_include_deposit: 1,
                        start_at: this.formInline.start_at,
                        end_at: this.formInline.end_at
                      }
                      this.getUserInfo(info, false)
                    }
                  }
                }, params.item.total_no_of_deposit)
              ])
            }
          },
          {
            prop: 'total_dep_amt',
            label: 'Total Dep Amt',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.popInfoDeposit = true
                      let info = {
                        user_ids: params.item.all_user_id,
                        is_include_deposit: 1,
                        start_at: this.formInline.start_at,
                        end_at: this.formInline.end_at
                      }
                      this.getUserInfo(info, false)
                    }
                  }
                }, params.item.total_dep_amt)
              ])
            }
          },
          {
            prop: 'all_user_id',
            label: 'Agents',
            fixWidth: '300px'
          }
        ]
      },
      resInformation: {},
      popInfo: false,
      popInfoTable: {
        border: true,
        loading: false,
        tableColumn: [
          {
            prop: 'name',
            label: 'Member Code'
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'status',
            label: 'Status'
          },
          {
            prop: 'created_at',
            label: 'Register Date'
          }
        ]
      },
      popInfoTableData: {},
      popInfoDeposit: false,
      popInfoDepositTable: {
        border: true,
        loading: false,
        tableColumn: [
          {
            prop: 'member_code',
            label: 'Member Code'
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'status',
            label: 'Status'
          },
          {
            prop: 'register_date',
            label: 'Register Date'
          },
          {
            prop: 'deposit_date',
            label: 'Deposit Date'
          },
          {
            prop: 'deposit_txn_id',
            label: 'Deposit Txn ID'
          },
          {
            prop: 'amount',
            label: 'Amount'
          }
        ]
      },
      popInfoDepositTableData: {}
    }
  },
  methods: {
    // 初始化数据
    initReportsMemberCrmReport (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageReportsMemberCRMReportHttp(datalist).then(res => {
        this.resInformation.data = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 获取用户资料
    getUserInfo (value, type) {
      this.popInfoTable.loading = true
      this.popInfoDepositTable.loading = true
      backstageReportsMemberCRMReportUserInfoHttp(value).then(res => {
        if (type) {
          this.popInfoTableData.data = res
          console.log(this.popInfoTableData)
          this.popInfoTable.loading = false
        } else {
          this.popInfoDepositTableData.data = res
          this.popInfoDepositTable.loading = false
        }
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initReportsMemberCrmReport(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initReportsMemberCrmReport(this.formInline)
        return
      }
      this.initReportsMemberCrmReport(value)
    }
  },
  created () {
    this.initReportsMemberCrmReport(this.formInline)
  }
}
</script>

<style scoped>

</style>
