<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="AutoRebateInitiatePayoutReport">
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
      ref="multipleTable"
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
      @handleSelectionChange = handleSelectionChange
      @sortChange="sortChange"
    />
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import {
  backstageReportsAutoRebateInitiatePayoutReportDropListHttp,
  backstageReportsAutoRebateInitiatePayoutReportHttp,
  backstageUserRebatePrizesMarketingSendHttp,
  backstageMarktingUserRebatePrizesDownloadHttp
} from '../../api/report/initAxios'
import {mapGetters} from 'vuex'
import filter from '../../util/filter'
import element from '../../config/element'
export default {
  name: 'AutoRebateInitiatePayoutReport',
  data () {
    return {
      Visible: false,
      resInformation: {},
      user_rebate_prize_ids: [],
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
          sortable: 'custom',
          label: 'Gross Eligible Stake Amt',
          fixWidth: '155px'
        }, {
          prop: 'calculate_rebate_bet',
          sortable: 'custom',
          label: 'Balance Bonus Rolover',
          fixWidth: '150px'
        }, {
          prop: 'multipiler',
          sortable: 'custom',
          label: 'Multiplier',
          fixWidth: '72px'
        }, {
          prop: 'prize',
          sortable: 'custom',
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
          type: 'input',
          label: 'Min Payout',
          formValue: 'min_payout',
          placeholder: 'Min Payout',
          value: ''
        },
        {
          type: 'input',
          label: 'Max Payout',
          formValue: 'max_payout',
          placeholder: 'Max Payout',
          value: ''
        },
        {
          type: 'select',
          label: 'Initiate Payout',
          formValue: 'marketing_initiate_payout',
          placeholder: 'Initiate Payout',
          clearable: true,
          value: [],
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
        min_payout: '',
        max_payout: '',
        marketing_initiate_payout: ''
      },
      dropList: {}
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  created () {
    this.DropListHttp()
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp
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
        this.$refs.multipleTable.toggleSelection()
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
      backstageReportsAutoRebateInitiatePayoutReportHttp(datalist).then(res => {
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
        this.initHttp(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initHttp(this.formInline)
        return
      }
      this.initHttp(value)
    },
    DropListHttp () {
      filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
      backstageReportsAutoRebateInitiatePayoutReportDropListHttp().then(res => {
        this.formInlineConfig[8].list = res.payment_initiate_payout
        filter.formValueListFilter(this.formInlineConfig, res, ['product_code', 'risk_group_id', 'vip_id'])
        this.dropList = res
      }).catch(() => {
      })
    },
    sortChange (obj) {
      this.initHttp(Object.assign(this.formInline, obj))
    },
    downloadExcel (form) {
      var datalist = filter.formInlineFilterByEcho(form, [], ['per_page', 'page'])
      backstageMarktingUserRebatePrizesDownloadHttp(datalist).then((res) => {
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
  }
}
</script>
