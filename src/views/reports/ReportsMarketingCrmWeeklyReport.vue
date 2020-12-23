<template>
  <div class="ReportsMarketingCrmWeeklyReport">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="danger" @click="exportExcel(formInline)">Export</el-button>
      </template>
    </form-inline-comp>
    <el-tag
      style="margin: 0 2px"
      v-for="item in resInformation.meta.info"
      :key="item.key"
    >{{ item.key }} : {{ item.value }}</el-tag>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange = callbacks
    />
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import {
  backstageCrmReportWeeklyHttp,
  backstageCrmReportDropListHttp,
  backstageCrmReportWeeklyExportExcelHttp
} from '../../api/report/initAxios'
import filter from '../../util/filter'
export default {
  name: 'ReportsMarketingCrmWeeklyReport',
  components: {TableComp, FormInlineComp},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'input',
          label: 'Week',
          formValue: 'week',
          placeholder: 'Week',
          value: ''
        },
        {
          type: 'input',
          label: 'Admin Name',
          formValue: 'admin_name',
          placeholder: 'Admin Name',
          value: ''
        },
        {
          type: 'select',
          label: 'Type',
          formValue: 'type',
          placeholder: 'Type',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        week: '',
        admin_name: '',
        type: ''
      },
      tableConfig: {
        loading: false,
        border: true,
        tableColumn: [
          {
            prop: 'week',
            label: 'Week'
          },
          {
            prop: 'date',
            label: 'Date'
          },
          {
            prop: 'type',
            label: 'Type'
          },
          {
            prop: 'person_total_type_orders',
            label: 'Total assigned'
          },
          {
            prop: 'person_total_type_calls',
            label: 'Total called'
          },
          {
            prop: 'type_successful',
            label: 'Successful'
          },
          {
            prop: 'type_fail',
            label: 'Fail'
          },
          {
            prop: 'voice_mail',
            label: 'Voice Mail'
          },
          {
            prop: 'hand_up',
            label: 'Hung Up'
          },
          {
            prop: 'no_pick_up',
            label: 'No Pick Up'
          },
          {
            prop: 'invalid_number',
            label: 'Invalid Number'
          },
          {
            prop: 'not_own_number',
            label: 'Not Own Number'
          },
          {
            prop: 'call_back',
            label: 'Call Back'
          },
          {
            prop: 'not_answer',
            label: 'Not Answer'
          },
          {
            prop: 'not_interested_in',
            label: 'Not Interested In'
          },
          {
            prop: 'success',
            label: 'Successful call'
          },
          {
            prop: 'register',
            label: 'Register'
          },
          {
            prop: 'ftd_member',
            label: 'FTD Member'
          },
          {
            prop: 'adjustment_amount',
            label: 'Adjustment Amount'
          },
          {
            prop: 'deposit_percent',
            label: 'Deposit Percent'
          },
          {
            prop: 'admin_name',
            label: 'Bo User Name'
          }
        ]
      },
      resInformation: {},
      dropList: {}
    }
  },
  methods: {
    // 列表
    initHttp (formInline) {
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageCrmReportWeeklyHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 下拉
    initDropList () {
      backstageCrmReportDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['type'])
        this.dropList = res
      }).catch(() => {
      })
    },
    // 回调
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
    // 下载
    exportExcel (formInline) {
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageCrmReportWeeklyExportExcelHttp(datalist).then(res => {
        filter.downloadExcel(res)
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  activated () {
    this.initHttp(this.formInline)
    this.initDropList()
  }
}
</script>

<style scoped>

</style>
