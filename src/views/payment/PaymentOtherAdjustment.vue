<template>
  <div class="PaymentOtherAdjustment">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
      <template v-slot:content>
        <el-form-item>
          <el-button type="danger" @click="downloadExcel">Export</el-button>
        </el-form-item>
      </template>
    </form-inline-comp>
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
import filter from '../../util/filter'
import {mapGetters} from 'vuex'
import {
  backstageAdjustmentsHttp,
  backstageDropListAdjustmentsHttp,
  backstageDownloadExcel
} from '../../api/adjustments/initAxios'

export default {
  name: 'PaymentOtherAdjustment',
  components: {TableComp, FormInlineComp},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code: ',
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
          type: 'dateTime',
          formValue: 'date',
          label: 'Date: ',
          value: ''
        },
        {
          type: 'defaultSelect',
          formValue: 'status',
          placeholder: 'Select A Status',
          clearable: true,
          label: 'Transaction Status: ',
          value: '',
          list: ''
        },
        {
          type: 'defaultSelect',
          formValue: 'type',
          placeholder: 'Select A Type',
          label: 'Type: ',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'defaultSelect',
          formValue: 'category',
          placeholder: 'Select A Adjustment Category',
          label: 'Adjustment Category: ',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          formValue: 'id',
          placeholder: 'Transaction ID',
          label: 'Transaction ID: ',
          value: ''
        },
        {
          type: 'input',
          formValue: 'reason',
          placeholder: 'Adjustment Reason',
          label: 'Adjustment Reason: ',
          value: ''
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        page: 1,
        per_page: 50,
        user_name: '',
        type: '',
        category: '',
        start_at: '',
        end_at: '',
        status: '',
        reason: '',
        currency: ''
      },
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'user_name',
            label: 'Member code'
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'created_at',
            label: 'DATE'
          },
          {
            prop: 'type',
            label: 'TYPE',
            fixWidth: '52px',
            render: (h, params) => {
              if (params.item.type === 'Deposit') {
                return h('div', [
                  h('span', {}, '+')
                ])
              } else {
                return h('div', [
                  h('span', {}, '-')
                ])
              }
            }
          },
          {
            prop: 'amount',
            label: 'AMOUNT',
            fixWidth: '80px'
          },
          {
            prop: 'turnover_closed_value',
            label: 'Turnover Amt'
          },
          {
            prop: 'turnover_current_value',
            label: 'Current Turnover Amt'
          },
          {
            prop: 'display_is_turnover_closed',
            label: 'Meet Rollover'
          },
          {
            prop: 'category',
            label: 'CATEGORY'
          },
          {
            prop: 'platform_code',
            label: 'PLATFORM',
            fixWidth: '85px'
          },
          {
            prop: 'reason',
            label: 'REASON'
          },
          {
            prop: 'remark',
            label: 'REMARKS'
          },
          {
            prop: 'order_no',
            label: 'ADJUSTMENT ID',
            // render: (h, params) => {
            //   return h('div', [
            //     h('el-Link', {
            //       props: {
            //         size: 'small',
            //         type: 'primary'
            //       },
            //       on: {
            //         click: () => {
            //           // this.promptInfo(params.item)
            //         }
            //       }
            //     }, params.item.order_no)
            //   ])
            // }
          },
          {
            prop: 'status',
            label: 'STATUS'
          },
          {
            prop: 'created_admin_name',
            label: 'Admin'
          },
          {
            prop: 'verified_admin_name',
            label: 'Verified Admin'
          }
        ]
      },
      resInformation: {}
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  methods: {
    // 列表
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
      backstageAdjustmentsHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    downloadExcel () {
      var datalist = filter.formInlineFilter(this.formInline)
      backstageDownloadExcel(datalist).then(res => {
        filter.downloadExcel(res)
      }).catch(() => {
      })
    },
    // 分页 搜索
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
      backstageDropListAdjustmentsHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['status', 'category', 'type'])
      }).catch(() => {
      })
    }
  },
  activated () {
    this.DropListHttp()
    this.initHttp(this.formInline)
  }
}
</script>

<style scoped>

</style>
