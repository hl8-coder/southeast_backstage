<style lang="scss" scoped type="text/scss">
  .PromotionCheckingTool{
    ul{
      margin-bottom: 10px;
      .p1{
        width: 120px;
        text-align: right;
      }
      .p2{
        text-indent: 10px;
      }
    }
  }
</style>

<template>
  <div class="PromotionCheckingTool">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @downloadExcel = downloadExcel
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
import FormInlineComp from '../../components/form/formInlineComp'
import filter from '../../util/filter'
import tableComp from '../../components/table/tableComp'
import {
  backstageMemberPromotionCheckingToolCloseHttp,
  backstageMemberPromotionCheckingToolHttp,
  backstageUserBonusPrizesExportHttp
} from '../../api/members/initAxios'
import element from '../../config/element'
import {mapGetters} from 'vuex'
import {backstagePaymentUserRebatePrizesDownloadHttp} from "../../api/payment/other/initAxios";

export default {
  name: 'PromotionCheckingTool',
  data () {
    return {
      formInline: {
        per_page: 50,
        page: 1,
        user_name: '',
        currency: '',
        start_at: '',
        end_at: '',
        bonus_code: '' // 名称
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Bonus Code',
          formValue: 'bonus_code',
          placeholder: 'Bonus Code',
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
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'dateTime'
        },
        {
          type: 'search'
        },
        {
          type: 'export'
        }
      ],
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'user_name',
          label: 'Member Code',
          width: '60'
        }, {
          prop: 'currency',
          label: 'Currency',
          width: '60'
        }, {
          prop: 'bonus_code',
          label: 'Bonus Code',
          width: '80'
        }, {
          prop: 'created_at',
          label: 'Claim time',
          width: '80'
        }, {
          prop: 'bonus_amount',
          label: 'Bonus Amount',
          width: '80'
        }, {
          prop: 'turnover_closed_value',
          label: 'Rollover Amount',
          width: '100'
        }, {
          prop: 'turnover_current_value',
          label: 'Priciple Bet',
          width: '150'
        }, {
          prop: 'display_is_turnover_closed',
          label: 'Meet Rollover',
          width: '80'
        }, {
          prop: 'void',
          label: 'Void',
          width: '150'
        }, {
          prop: 'turnover_closed_admin_name',
          label: 'By',
          width: '150'
        }, {
          prop: 'turnover_closed_at',
          label: 'By Time',
          width: '150'
        }, {
          prop: '',
          label: 'Operating',
          render: (h, params) => {
            if (!params.item.is_turnover_closed) {
              return h('div', [
                h('el-button', {
                  props: {
                    size: 'small',
                    type: 'danger'
                  },
                  on: {
                    click: () => {
                      this.$prompt('REMOVE REASON', 'Prompt', {
                        confirmButtonText: 'Remove',
                        cancelButtonText: 'cancel'
                      }).then(({ value }) => {
                        if (!value) {
                          element.message({
                            type: 'error',
                            message: 'remark field is required'
                          })
                          return
                        }
                        this.closeBonus(params.item.id, {remark: value})
                      }).catch(() => {
                      })
                    }
                  }
                }, 'Void')
              ])
            }
          }
        }]
      },
      resInformation: {}
    }
  },
  components: {
    FormInlineComp, tableComp
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  created () {
    filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
    this.initHttp(this.formInline)
  },
  methods: {
    // 页面初始化请求
    initHttp (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageMemberPromotionCheckingToolHttp(datalist).then(res => {
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
    // 关闭红利
    closeBonus (bonus, remark) {
      backstageMemberPromotionCheckingToolCloseHttp(bonus, remark).then(res => {
        element.message({
          type: 'success',
          message: 'Success'
        })
        this.initHttp(this.formInline)
      }).catch(() => {
        element.message({
          type: 'error',
          message: 'Error'
        })
      })
    },
    downloadExcel (form) {
      var datalist = filter.formInlineFilterByEcho(form, [], ['per_page', 'page'])
      backstageUserBonusPrizesExportHttp(datalist).then((res) => {
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
