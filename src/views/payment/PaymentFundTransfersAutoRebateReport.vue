<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="AutoRebateInitiatePayoutReport">
    <search-navs
      :user_name="formInline.user_name"
      @searchMemberCode="callbacks"
    />
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
      <template v-slot:content>
     <!--    <el-form-item>
          <el-button type="primary">Export</el-button>
          <el-button @click="Payout" type="primary">Initiate Payout</el-button>
        </el-form-item> -->
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
      @handleSelectionChange = handleSelectionChange
    />
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import {
  backstageReportsAutoRebateInitiatePayoutReportDropListHttp,
  backstageReportsAutoRebateInitiatePayoutReportHttp,
  backstageUserRebatePrizesMarketingSendHttp
} from '../../api/report/initAxios'
import {
  backstageMemberUserRebatePrizesHttp
} from '../../api/payment/fundTransfers/initAxiosFundTransfer'
import {mapGetters} from 'vuex'
import filter from '../../util/filter'
import element from '../../config/element'
import SearchNavs from './FundTransfers/SearchNavs'
export default {
  name: 'AutoRebateInitiatePayoutReport',
  data () {
    return {
      Visible: false,
      resInformation: {},
      user_rebate_prize_ids: [],
      tableConfig: {
        border: true,
        loading: true,
        selection: true,
        tableColumn: [{
          prop: 'id',
          label: 'NO.',
          fixWidth: '55px'
        }, {
          prop: 'date',
          label: 'Rebate Date',
          fixWidth: '90px'
        }, {
            prop: 'currency',
            label: 'Currency'
        }, {
          prop: 'product_code',
          label: 'Product',
          fixWidth: '90px'
        }, {
          prop: 'rebate_code',
          label: 'Rebate Code',
          width: '70'
        }, {
          prop: 'user_name',
          label: 'Member Code',
          width: '60'
        }, {
          prop: 'display_risk_group_id',
          label: 'Risk ID',
          width: '60'
        }, {
          prop: 'effective_bet',
          label: 'Gross Eligible Stake Amt',
          fixWidth: '155px'
        }, {
          prop: 'calculate_rebate_bet',
          label: 'Balance Bonus Rolover',
          fixWidth: '150px'
        }, {
          prop: 'multipiler',
          label: 'Multiplier',
          fixWidth: '72px'
        }, {
          prop: 'prize',
          label: 'Rebate Amt ',
          fixWidth: '85px'
        }, {
          prop: 'created_at',
          label: 'Rebate Computation Date ',
          fixWidth: '165px'
        }, {
          prop: 'display_status',
          label: 'Initiate Payout',
          fixWidth: '100px',
          render: (h, params) => {
            if (params.item.status === 'NO') {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.$confirm('Are you sure?', 'Prompt', {
                        confirmButtonText: 'YES',
                        cancelButtonText: 'NO',
                        type: 'warning'
                      }).then(() => {
                        element.message({
                          type: 'success',
                          message: 'success'
                        })
                        this.initHttp(this.formInline)
                      }).catch(() => {})
                    }
                  }
                }, params.item.status)
              ])
            } else {
              return h('div', {}, params.item.display_status)
            }
          }
        }, {
          prop: 'marketing_admin_name',
          label: 'Initiate Payout By',
          width: '70'
        }, {
          prop: 'marketing_sent_at',
          label: 'Initiate Payout Date',
          width: '80'
        }]
      },
      formInlineConfig: [
        {
          type: 'select',
          label: 'Product Code',
          formValue: 'product_code',
          placeholder: 'Product Code',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Rebate Code',
          formValue: 'rebate_code',
          placeholder: 'Rebate Code',
          value: ''
        },
        {
          type: 'dateTime',
          label: 'Date',
          formValue: 'date',
          value: ''
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        user_name: '',
        product_code: '',
        rebate_code: '',
        start_at: '',
        end_at: '',
      },
      dropList: {}
    }
  },
  activated () {
    let name = this.$route.query.name
    if (name) {
      this.formInline.user_name = name
      this.initHttp(this.formInline) 
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  created () {
    this.DropListHttp()
  },
  components: {
    tableComp, formInlineComp, SearchNavs
  },
  methods: {
    Payout () {
      if (this.user_rebate_prize_ids.length === 0) {
        element.message({
          type: 'error',
          message: 'You have not selected yet'
        })
        return
      }
      let datalist = []
      this.user_rebate_prize_ids.forEach(item => {
        datalist.push(item.id)
      })
      backstageUserRebatePrizesMarketingSendHttp({user_rebate_prize_ids: datalist}).then(res => {
        element.message({
          type: 'success',
          message: 'Payout Success'
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    handleSelectionChange (value) {
      this.user_rebate_prize_ids = value.page
    },
    // 会员信息请求
    initHttp (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.per_page && !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageMemberUserRebatePrizesHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.formInline.user_name = this.$route.query.name
        this.initHttp(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.user_name = this.$route.query.name
        this.formInline.per_page = value.per_page
        this.initHttp(this.formInline)
        return
      }
      value.user_name = this.$route.query.name
      this.initHttp(value)
    },
    DropListHttp () {
      filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
      backstageReportsAutoRebateInitiatePayoutReportDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['product_code', 'risk_group_id', 'vip_id'])
        this.dropList = res
      }).catch(() => {
      })
    }
  }
}
</script>
