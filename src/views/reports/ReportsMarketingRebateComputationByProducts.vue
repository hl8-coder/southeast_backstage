<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="RebateComputationByProducts">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
  </div>
</template>

<script>
import {
  backstageRebateComputationReportsHttp,
  backstageRebateComputationReportsDropListHttp
} from '../../api/report/initAxios'
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {mapGetters} from 'vuex'
export default {
  name: 'RebateComputationByProducts',
  data () {
    return {
      Visible: false,
      resInformation: {},
      tableConfig: {
        border: true,
        loading: false,
        tableColumn: [{
          prop: 'user_name',
          label: 'Member Code'
        }, {
          prop: 'currency',
          label: 'Currency'
        }, {
          prop: 'display_risk_group_id',
          label: 'Risk ID'
        }, {
          prop: 'account_status',
          label: 'Account Status'
        }, {
          prop: 'product_code',
          label: 'Product'
        }, {
          prop: 'effective_bet',
          label: 'Eligible Stake Amt'
        }, {
          prop: 'last_rebate_at',
          fixWidth: '195px',
          label: 'Last Rebate Credited Date/Time'
        }, {
          prop: 'prize_created_at',
          fixWidth: '130px',
          label: 'Claimed Date/ Time'
        }, {
          prop: 'bonus_code',
          label: 'Bonus Code'
        }, {
          prop: 'user_bonus_prize_count',
          label: 'Rollover Amt'
        }, {
          prop: 'total_close_value',
          label: 'Total Rollover Amt'
        }, {
          prop: 'is_turnover_closed',
          label: 'Void'
        }, {
          prop: 'turnover_closed_admin_name',
          label: 'Void By'
        }, {
          prop: 'turnover_closed_at',
          label: 'Void Date'
        }, {
          prop: '',
          fixWidth: '125px',
          label: 'Is Exclude Member'
        }]
      },
      pagination: {
        per_page: 50,
        total: 20,
        page: 1
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          placeholder: 'Member Code',
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
          type: 'select',
          label: 'Products',
          formValue: 'product_code',
          placeholder: 'Select A Products',
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
        product_code: '',
        currency: '',
        user_name: '',
        start_at: '',
        end_at: ''
      },
      gridData: []
    }
  },
  created () {
    this.DropListHttp()
  },
  components: {
    tableComp, formInlineComp
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  methods: {
    // 列表请求
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageRebateComputationReportsHttp(datalist).then(res => {
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
    Submit (form) {
      console.log(form)
    },
    formcallbacks () {

    },
    affirmStatus () {

    },
    DropListHttp () {
          filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])  
      backstageRebateComputationReportsDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['product_code'])
      }).catch(() => {
      })
    }
  }
}
</script>
