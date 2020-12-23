<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="Withdrawal">
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
import FormInlineComp from '../../../components/form/formInlineComp'
import tableComp from '../../../components/table/tableComp'
import childrenNav from '../../../components/nav/childrenNav'
import { mapGetters } from 'vuex'
import filter from '../../../util/filter'
import { backstageWithdrawalsHttp } from '../../../api/members/initAxios'

export default {
  name: 'Withdrawal',
  data () {
    return {
      formInline: {
        user_name: '' // 名称
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
          type: 'search'
        }
      ],
      resInformation: {},
      tableConfig: {
        border: true,
        tableColumn: [{
          prop: 'created_at',
          label: 'Date',
          width: '160'
        }, {
          prop: 'id',
          label: 'Tranx ID',
          width: '60'
        }, {
          prop: 'amount',
          label: 'Amount',
          width: '80',
          statusColor: 'statusColor'
        }, {
          prop: 'bank_id',
          label: 'Bank',
          width: '100'
        }, {
          prop: 'status',
          label: 'Status',
          width: '80'
        }]
      }
    }
  },
  components: {
    FormInlineComp, tableComp, childrenNav
  },
  created () {
    this.initHttp(this.formInline)
  },
  computed: {
    ...mapGetters([
      'csPaymentNav'
    ])
  },
  methods: {
    // 提现列表请求
    initHttp (formInline) {
      backstageWithdrawalsHttp(filter.formInlineFilter(formInline)).then(res => {
        this.resInformation = res
      }).catch((error) => {
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
