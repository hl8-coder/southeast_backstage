<style lang="scss" scoped type="text/scss">

</style>

<template>
    <div id="TransactionSearch">
      <form-inline-comp
        :form-inline-config="formInlineConfig"
        @onSubmit = callbacks
        @downloadExcel = downloadExcel
      />
      <el-tag
        style="margin: 0 2px"
        v-for="(item,index) in resInformation.meta.info"
        :key="item.key"
      >{{ index }} : {{ item }}</el-tag>
      <table-comp
        style="margin-top: -40px"
        :tableConfig = tableConfig
        :resInformation = resInformation
        @handleSizePageChange = callbacks
      />
    </div>
</template>

<script>
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {backstagePaymentTransactionSearchHttp, backstagePaymentTransactionSearchExportHttp, backstagePaymentTransactionDropListHttp} from '../../api/payment/other/initAxios'
import FormInlineComp from '../../components/form/formInlineComp'
import { mapGetters } from 'vuex'
export default {
  name: 'TransactionSearch',
  data () {
    return {
      resInformation: {},
      tableConfig: {
        paginationPosition: 'top',
        border: true,
        tableColumn: [
          {
            prop: 'order_no',
            label: 'Transaction ID'
          },
          {
            prop: 'display_type_group',
            label: 'Category'
          },
          {
            prop: 'user.name',
            label: 'Member Code'
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'display_is_income',
            label: 'Type'
          },
          {
            prop: 'amount',
            label: 'Amount'
          },
          {
            prop: 'before_balance',
            label: 'Before Balance'
          },
          {
            prop: 'after_balance',
            label: 'After Balance'
          },
          {
            prop: 'created_at',
            label: 'Transaction Date'
          },
          {
            prop: 'display_status',
            label: 'Status'
          }
        ]
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
          type: 'input',
          label: 'Transaction ID',
          formValue: 'order_no',
          placeholder: 'Transaction ID',
          value: ''
        },
        {
          type: 'select',
          label: 'Category',
          formValue: 'type_group',
          placeholder: 'Select A Category',
          clearable: true,
          collapseTags: true,
          multiple: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Type',
          formValue: 'is_income',
          placeholder: 'Select A Type',
          clearable: true,
          value: '',
          list: ''
        },
        {

          type: 'date',
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
        include: 'user',
        per_page: 50,
        page: 1,
        user_name: '',
        currency: '',
        start_at: '',
        end_at: '',
        // type_group: '',
        // is_income: '',
        order_no: ''
      }
    }
  },
  components: {
    FormInlineComp,
    tableComp
  },
  methods: {
    downloadExcel (formInline) {
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
        formInline.include = this.formInline.include
      }
      var datalist = filter.formInlineFilter(formInline)
      backstagePaymentTransactionSearchExportHttp(datalist).then((res) => {
        filter.downloadExcel(res)
      })
    },
    // 数据初始化
    initTransactionSearch (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
        formInline.include = this.formInline.include
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstagePaymentTransactionSearchHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initTransactionSearch(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initTransactionSearch(this.formInline)
        return
      }
      this.initTransactionSearch(value)
    },
    droplist () {
      filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
      backstagePaymentTransactionDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['is_income', 'type_group'])
      })
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  created () {
    this.initTransactionSearch(this.formInline)
    this.droplist()
  }
}
</script>
