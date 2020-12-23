<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="CsPayment">
    <children-nav
      :Nav = csPaymentNav
    />
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange = callbacks
    />
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import childrenNav from '../../components/nav/childrenNav'
import filter from '../../util/filter'
import { mapGetters } from 'vuex'
import moment from 'moment'
import element from '../../config/element'
import {
  backstageUsersPlatformReportsHttp
} from '../../api/members/initAxios'

export default {
  name: 'CsPayment',
  data () {
    return {
      resInformation: {},
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'date',
          label: 'Date',
          formValue: 'date',
          value: [moment().subtract(1, 'days').format('YYYY-MM-DD'), moment().add(1, 'days').format('YYYY-MM-DD')]
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        user_name: '', // 名称
        start_at: '', // 时间
        end_at: ''
      },
      tableConfig: {
        loading: false,
        border: true,
        tableColumn: [{
          prop: 'game_platform_code',
          label: '',
          width: '60'
        }, {
          prop: 'deposit',
          label: 'Total Deposit',
          width: '60'
        }, {
          prop: 'withdrawal',
          label: 'Total Withdrawal',
          width: '60'
        }, {
          prop: 'adjustment',
          label: 'TotalAdjustment ',
          width: '80'
        }, {
          prop: 'profit',
          label: 'Total W/L',
          width: '80'
        }, {
          prop: 'balance',
          label: 'Main Wallet Balance',
          width: '80'
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'csPaymentNav'
    ])
  },
  components: {
    FormInlineComp, tableComp, childrenNav
  },
  methods: {
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include) {
        formInline.include = 'user'
      }
      if (!formInline.user_name) {
        element.message({
          type: 'error',
          message: 'Member Code Can\'t be empty'
        })
      }
      this.tableConfig.loading = true
      this.formInline = formInline
      var datalist = {
        start_at: formInline.start_at,
        end_at: formInline.end_at
      }
      backstageUsersPlatformReportsHttp(this.formInline.user_name, filter.formInlineFilter(datalist)).then(res => {
        this.resInformation.data = res
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
  }
}
</script>
