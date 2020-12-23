<style lang="scss" scoped type="text/scss">
</style>
<template>
  <div class="bankManagement">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
      <!--<template v-slot:content>-->
      <!--sss-->
      <!--</template>-->
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
  </div>
</template>

<script>
import {
  backstageCompanyBankAccountReportsHttp
} from '../../api/compony_account_management/initAxios'
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {mapGetters} from 'vuex'
export default {
  name: 'bankManagement',
  data () {
    return {
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'company_bank_account_code',
          label: 'Account Code',
          width: '80'
        }, {
          prop: 'opening_balance',
          label: 'Opening Balance',
          width: '80'
        }, {
          prop: 'buffer_in',
          label: 'Buffer Topup',
          width: '80'
        }, {
          prop: 'deposit',
          label: 'Deposit',
          width: '80'
        }, {
          prop: 'adjustment',
          label: 'Adjustment',
          width: '80'
        }, {
          prop: 'internal_transfer',
          label: 'Internal Transfer',
          width: '80'
        }, {
          prop: 'withdrawal',
          label: 'Withdrawal',
          width: '80'
        }, {
          prop: 'buffer_in',
          label: 'Transfer to Buffer',
          width: '80'
        }, {
          prop: 'ending_balance',
          label: 'Ending Balance',
          width: '80'
        }]
      },
      formInlineConfig: [
        {
          type: 'date',
          label: 'Date'
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1
      }
    }
  },
  created () {
    this.initHttp(this.formInline)
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
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        // formInline.include = 'user'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageCompanyBankAccountReportsHttp(datalist).then(res => {
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
    }
  }
}
</script>
