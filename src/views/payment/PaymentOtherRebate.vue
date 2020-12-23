<template>
  <div class="RebateSettlement">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @downloadExcel = downloadExcel
    >
      <template v-slot:content>
        <el-form-item>
          <el-button @click="Payout" type="primary">Initiate Payout</el-button>
        </el-form-item>
      </template>
    </form-inline-comp>
    <el-tag
      style="margin: 0 2px"
      v-for="(item,index) in resInformation.meta.info"
      :key="item.key"
    >{{ index }} : {{ item }}</el-tag>
    <table-comp
      style="margin-top: -35px"
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
      @handleSelectionChange = handleSelectionChange
    />
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstagePaymentOtherRebateSettlementHttp,
  backstagePaymentUserRebatePrizesDownloadHttp
} from '../../api/payment/other/initAxios'
import element from '../../config/element'
import {
  backstageReportsAutoRebateInitiatePayoutReportDropListHttp,
  backstageUserRebatePrizesPaymentSendHttp
} from '../../api/report/initAxios'
import {mapGetters} from 'vuex'
export default {
  name: 'RebateSettlement',
  components: {
    TableComp,
    FormInlineComp
  },
  data () {
    return {
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
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'select',
          label: 'Risk Group',
          formValue: 'risk_group_id',
          placeholder: 'Risk Group',
          clearable: true,
          value: [],
          list: ''
        },
        {
          type: 'select',
          label: 'Vip',
          formValue: 'vip_id',
          placeholder: 'Vip',
          clearable: true,
          value: [],
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
          label: 'Initiate Payout',
          formValue: 'payment_initiate_payout',
          placeholder: 'Select A Initiate Payout',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'dateTime',
          label: 'Date',
          formValue: 'date',
          value: ''
        },
        {
          type: 'search'
        },
        {
          type: 'export'
        }
      ],
      tableConfig: {
        paginationPosition: 'top',
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
          prop: 'product_code',
          label: 'Product',
          fixWidth: '90px'
        }, {
          prop: 'rebate_code',
          label: 'Rebate Code',
          width: '60'
        }, {
          prop: 'user_name',
          label: 'Member Code'
        }, {
          prop: 'currency',
          label: 'Currency',
          fixWidth: '75px'
        }, {
          prop: 'display_risk_group_id',
          label: 'Risk ID',
          width: '60'
        }, {
          prop: 'effective_bet',
          label: 'Gross Eligible Stake Amt',
          fixWidth: '155px'
        }, {
          prop: 'close_bonus_bet',
          label: 'Balance Eligible Stake Amt',
          fixWidth: '166px'
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
          prop: 'status',
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
          prop: 'payment_admin_name',
          label: 'Initiate Payout By',
          width: '80'
        }, {
          prop: 'payment_sent_at',
          label: 'Initiate Payout Date',
          width: '80'
        }]
      },
      resInformation: {},
      user_rebate_prize_ids: [],
      formInline: {
        per_page: 50,
        page: 1,
        user_name: '',
        vip_id: '',
        product_code: '',
        rebate_code: '',
        start_at: '',
        end_at: '',
        risk_group_id: '',
        currency: '',
        payment_initiate_payout: ''
      },
      dropList: {}
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
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
      backstageUserRebatePrizesPaymentSendHttp({user_rebate_prize_ids: datalist}).then(res => {
        element.message({
          type: 'success',
          message: 'Payout Success'
        })
        this.initRebateSettlement(this.formInline)
      }).catch((error) => {
        console.log(error)
      })
    },
    // 数据初始化
    initRebateSettlement (formInline) {
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
      backstagePaymentOtherRebateSettlementHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    handleSelectionChange (value) {
      this.user_rebate_prize_ids = value.page
    },
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initRebateSettlement(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initRebateSettlement(this.formInline)
        return
      }
      this.initRebateSettlement(value)
    },
    DropListHttp () {
      filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
      backstageReportsAutoRebateInitiatePayoutReportDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['product_code', 'risk_group_id', 'vip_id', 'payment_initiate_payout'])
        this.dropList = res
      }).catch(() => {
      })
    },
    downloadExcel (form) {
      var datalist = filter.formInlineFilterByEcho(form, [], ['per_page', 'page'])
      backstagePaymentUserRebatePrizesDownloadHttp(datalist).then((res) => {
        filter.downloadExcel(res)
      }).catch((error) => {
        const reader = new FileReader()

        reader.addEventListener('loadend', function () { //
          let res = JSON.parse(reader.result) // 返回的数据
          element.message({
            message: res.message,
            type: 'error'
          })
        })
        reader.readAsText(error.response.data, 'utf-8')
      })
    }
  },
  created () {
    this.DropListHttp()
    this.initRebateSettlement(this.formInline)
  }
}
</script>

<style scoped>

</style>
