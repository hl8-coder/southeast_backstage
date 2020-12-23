<template>
  <div class="CrmCallLogStatus">
    <el-dialog
      title="Crm Call Logs"
      :visible.sync="dialog.status"
      width="1200px"
    >
      <table-comp
        :tableConfig = tableConfig
        :resInformation = resInformation
        @handleSizePageChange =  callbacks
      />
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../table/tableComp'
import {
  backstageCrmCallLogsHttp,
  backstageCrmResourceCallLogDetailHttp
} from '../../api/crm/initAxios'
export default {
  props: ['crmID', 'type', 'dialog'],
  name: 'CrmCallLogStatus',
  components: {TableComp},
  data () {
    return {
      id: '',
      formInline: {
        include: 'crmOrder',
        per_page: 50,
        page: 1
      },
      tableConfig: {
        loading: true,
        border: true,
        tableColumn: [
          {
            prop: 'created_at',
            label: 'Date and Time'
          },
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'crmOrder.admin_name',
            label: 'Agent',
            render: (h, params) => {
              if (params.item.hasOwnProperty('crmOrder')) {
                return h('div', [
                  h('span', {}, params.item.crmOrder.admin_name)
                ])
              } else {
                return h('div', [
                  h('span', {}, params.item.admin_name)
                ])
              }
            }
          },
          {
            prop: 'channel',
            label: 'Channel'
          },
          {
            prop: 'category',
            label: 'Category'
          },
          {
            prop: 'call_status',
            label: 'Status'
          },
          {
            prop: 'comment',
            label: 'Comment'
          },
          {
            prop: 'purpose',
            label: 'Purpose'
          },
          {
            prop: 'prefer_product',
            label: 'Prefer Product'
          },
          {
            prop: 'prefer_bank',
            label: 'Prefer Bank'
          },
          {
            prop: 'source',
            label: 'Source'
          }
        ]
      },
      resInformation: {}
    }
  },
  methods: {
    // 列表
    initHttp (formInline) {
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.include = this.formInline.include
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      if (this.type) {
        formInline.include = ''
        backstageCrmResourceCallLogDetailHttp(this.id, formInline).then(res => {
          this.resInformation = res
          this.tableConfig.loading = false
        }).catch((error) => {
          this.tableConfig.loading = false
          console.log(error)
        })
      } else {
        backstageCrmCallLogsHttp(this.id, formInline).then(res => {
          this.resInformation = res
          this.tableConfig.loading = false
        }).catch((error) => {
          this.tableConfig.loading = false
          console.log(error)
        })
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
    setDate (val) {
      this.id = val
      if (val) {
        this.initHttp(this.formInline)
      }
    }
  },
  watch: {
    'crmID' (val) {
      this.setDate(val)
    }
  },
  activated () {
    this.setDate(this.crmID)
  }
}
</script>

<style scoped>

</style>
