<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="MembersActivityReports">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    />
    <div class="TheTotalInfo">
      <el-tag>Register: {{resInformation.meta.total.register}}</el-tag>
      <el-tag type="success">Deposit: {{resInformation.meta.total.deposit}}</el-tag>
      <el-tag type="danger">Inactive: {{resInformation.meta.total.inactive}}</el-tag>
    </div>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import {
  backstageMembersActivityReportsHttp,
  backstageReportsMemberPromotionClaimReportsDropListHttp
} from '../../api/report/initAxios'
import filter from '../../util/filter'
export default {
  name: 'MembersActivityReports',
  data () {
    return {
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'date',
          label: 'Date'
        }, {
          prop: 'register',
          label: 'Register'
        }, {
          prop: 'inactive',
          label: 'Inactive'
        }, {
          prop: 'deposit',
          label: 'Deposited'
        }]
      },
      formInlineConfig: [
        {
          type: 'select',
          label: 'Currency',
          formValue: 'currency',
          placeholder: 'Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'dateTime'
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        currency: '',
        start_at: '',
        end_at: ''
      }
    }
  },
  created () {
    this.dropListHttp()
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp
  },
  methods: {
    // 列表
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageMembersActivityReportsHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 提交表单与分页回调
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
    dropListHttp () {
      backstageReportsMemberPromotionClaimReportsDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currency'])
        this.dropList = res
      }).catch(() => {
      })
    }
  }
}
</script>
