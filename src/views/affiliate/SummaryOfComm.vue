<template>
  <div class="SummaryOfComm">
    <sub-nav
      :navs="navs"
    />
    <form-inline-comp
      :formInlineConfig="formInlineConfig"
      @onSubmit = callbacks
    ></form-inline-comp>
    <table-comp
      :tableConfig="tableConfig"
      :resInformation = resInformation
      @handleSizePageChange = callbacks
    ></table-comp>
    <el-dialog
      title="Expenses"
      :visible.sync="dialog.status"
    >
      <table-comp
        :tableConfig="expensesTableConfig"
        :resInformation = expensesResInformation
      />
    </el-dialog>
  </div>
</template>

<script>
import SubNav from '../../components/nav/SubNav'
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstageGameManagementGamePlatformsCommissionsHttp
} from '../../api/affiliate/initAxios'
import element from '../../config/element'
export default {
  name: 'SummaryOfComm',
  components: {TableComp, FormInlineComp, SubNav},
  data () {
    return {
      navs: [
        {
          name: 'affiliate Profile',
          routeName: 'affiliate_profile',
          parameter: 'id',
          param: 1
        },
        {
          name: 'affiliate Summary',
          routeName: 'affiliate_summary',
          parameter: 'id',
          param: 1
        },
        {
          name: 'affiliate Member Detail',
          routeName: 'affiliate_member_detail',
          parameter: 'id',
          param: 1
        },
        {
          name: 'Summary Of Comm',
          routeName: 'summary_of_comm',
          parameter: 'id',
          param: 1
        }
      ],
      formInlineConfig: [
        {
          type: 'oneDate',
          label: 'Month',
          formValue: 'month',
          placeholder: 'Month',
          pickerType: 'month',
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
            prop: 'user_name',
            label: 'affiliate ID'
          },
          {
            prop: 'stake',
            label: 'Total Stake'
          },
          {
            prop: 'profit',
            label: 'Company Revenue'
          },
          {
            prop: 'expenses',
            label: 'Expenses',
            fixWidth: '125px',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.expensesResInformation.data = []
                      this.dialog.status = true
                      this.expensesTableConfig.loading = true
                      this.expensesResInformation.data = [
                        {
                          transaction_cost: params.item.transaction_cost,
                          bear_cost: params.item.bear_cost,
                          product_cost: params.item.product_cost
                        }
                      ]
                      this.expensesTableConfig.loading = false
                    }
                  }
                }, params.item.expenses)
              ])
            }
          },
          {
            prop: 'net_loss',
            label: 'Gross Commission'
          },
          {
            prop: 'sub_commission',
            label: 'Sub affiliate Commission',
            fixWidth: '160px'
          },
          {
            prop: 'rake',
            label: 'Rakes Amount'
          },
          {
            prop: 'previous_remain_commission',
            label: 'Previous Month Comm',
            fixWidth: '160px'
          },
          {
            prop: 'affiliate_adjustment',
            label: 'Adjustment'
          },
          {
            prop: 'commission_percent',
            label: 'Comm percentag'
          },
          {
            prop: 'active_count',
            label: 'No.of Active Player'
          },
          {
            prop: 'payout_commission',
            label: 'Payout Comm'
          },
          {
            prop: 'remain_commission',
            label: 'B/F',
            fixWidth: '190px'
          }
        ]
      },
      resInformation: {},
      expensesTableConfig: {
        border: true,
        loading: false,
        tableColumn: [
          {
            prop: 'transaction_cost',
            label: 'payment Fee'
          },
          {
            prop: 'bear_cost',
            label: 'Rebate,Promotion & Others'
          },
          {
            prop: 'product_cost',
            label: 'Royalty'
          }
        ]
      },
      expensesResInformation: {},
      dialog: {
        status: false
      },
      formInline: {
        month: '',
        per_page: 50,
        page: 1
      }
    }
  },
  methods: {
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
      if (!value.month) {
        element.message({
          type: 'error',
          message: 'Months are needed'
        })
        return
      }
      this.initHttp(value)
    },
    // 初始化数据
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      this.tableConfig.loading = true
      if (formInline.month) {
        var datalist = filter.formInlineFilter(formInline)
        backstageGameManagementGamePlatformsCommissionsHttp(this.$route.query.id, datalist).then(res => {
          this.resInformation = res
          this.tableConfig.loading = false
        }).catch((error) => {
          this.tableConfig.loading = false
          console.log(error)
        })
      } else {
        this.tableConfig.loading = false
      }
    }
  },
  activated () {
    this.formInlineConfig[0].value = ''
    this.formInline.month = ''
    this.resInformation = {}
    this.initHttp(this.formInline)
  }
}
</script>
