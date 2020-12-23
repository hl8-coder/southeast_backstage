<template>
  <div class="TotalBet">
    <search-navs
      :user_name="formInline.user_name"
      @searchMemberCode="callbacks"
    />
    <form-inline-comp
      :form-inline-config="selfFormInlineConfig"
      @onSubmit = selfSearch
    />
    <table-comp
      v-if="formInline.user_name"
      :table-config="tableConfig"
      :res-information="resInformation"
    />
  </div>
</template>

<script>
import SearchNavs from './FundTransfers/SearchNavs'
import filter from '../../util/filter'
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import {backstagePaymentFundTransferTotalBetHttp} from '../../api/payment/fundTransfers/initAxiosFundTransfer'
export default {
  name: 'TotalBet',
  components: {TableComp, FormInlineComp, SearchNavs},
  data () {
    return {
      formInline: {
        user_name: '',
        start_at: '',
        end_at: ''
      },
      selfFormInlineConfig: [
        {
          type: 'defaultMonth',
          formValue: 'date',
          value: ''
        },
        {
          type: 'search'
        }
      ],
      tableConfig: {
        border: true,
        loading: false,
        tableColumn: [
          {
            prop: 'product_code',
            label: ''
          },
          {
            prop: 'open_bet',
            label: 'Open bet'
          },
          {
            prop: 'stake',
            label: 'Stake'
          },
          {
            prop: 'effective_bet',
            label: 'Eligible Stake'
          }
        ]
      },
      resInformation: {}
    }
  },
  methods: {
    callbacks (value) {
      this.formInline.user_name = value
      this.initTotalBet(this.formInline)
    },
    selfSearch (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initHttp(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initHttp(this.formInline)
        return
      }
      value.user_name = this.formInline.user_name
      this.initTotalBet(value)
    },
    // 初始化
    initTotalBet (formInline) {
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
      backstagePaymentFundTransferTotalBetHttp(datalist).then(res => {
        this.resInformation.data = res.data
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    }
  },
  activated () {
    let name = this.$route.query.name
    if (name) {
      this.formInline.user_name = name
    }
  }
}
</script>

<style scoped>

</style>
