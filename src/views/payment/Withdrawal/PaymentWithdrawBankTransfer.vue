<style lang="scss" scoped type="text/scss">
  .Legend {
    margin-top: 30px;
  }
</style>

<template>
    <div class="BankTransfer">
      <form-inline-comp
        :formInlineConfig = formInlineConfig
        @onSubmit = callbacks
      >
        <template v-slot:content>
          <!--下载按钮-->
          <el-button style="margin-right: 5px" type="danger">Download</el-button>
        </template>
      </form-inline-comp>
      <table-comp
        :tableConfig = tableConfig
        :resInformation = resInformation
        @handleSizePageChange =  callbacks
      />
      <!--色卡信息-->
      <div class="Legend">
        <div>
          <table-comp
            :tableConfig = LegendConfig
            :resInformation = LegendInformation
          />
        </div>
      </div>
    </div>
</template>

<script>
import FormInlineComp from '../../../components/form/formInlineComp'
import TableComp from '../../../components/table/tableComp'
// 引入色值配置
import colorFilter from '../../../config/colorFilter'
import {mapGetters} from 'vuex'
export default {
  name: 'BankTransfer',
  components: {TableComp, FormInlineComp},
  data () {
    return {
      // 头部搜索表单配置
      formInlineConfig: [
        {
          type: 'select',
          label: 'Transaction Type',
          formValue: 'transaction_type',
          placeholder: 'Select A Transaction Type',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Fund In / Fund Out',
          formValue: 'fund',
          placeholder: 'Select A Fund In / Fund Out',
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
          label: 'Transaction Inquiry',
          formValue: 'transaction_inquiry',
          placeholder: 'Transaction Inquiry',
          value: ''
        },
        {
          type: 'input',
          label: 'Bank Name',
          formValue: 'bank_name',
          placeholder: 'Bank Name',
          value: ''
        },
        {
          type: 'input',
          label: 'Member Name',
          formValue: 'name',
          placeholder: 'Member Name',
          value: ''
        },
        {
          type: 'input',
          label: 'Account Number',
          formValue: 'account_number',
          placeholder: 'Account Number',
          value: ''
        },
        {
          type: 'input',
          label: 'Amount',
          formValue: 'amount',
          placeholder: 'Amount',
          value: ''
        },
        {
          type: 'date',
          label: 'Date',
          formValue: 'date',
          value: ''
        },
        {
          type: 'search'
        }
      ],
      // 搜索字段与分页配置
      formInline: {
        include: 'user',
        per_page: 50,
        page: 1,
        transaction_type: '',
        fund: '',
        currency: '',
        transaction_inquiry: '',
        bank_name: '',
        name: '',
        account_number: '',
        amount: '',
        from_date: '',
        to_date: ''
      },
      // tableConfig Column 配置
      tableConfig: {
        // 边框
        border: false,
        // 加载动画
        loading: false,
        // 单元格设置
        tableColumn: [
          {
            prop: 'id',
            label: 'TransactionID',
            width: '60'
          },
          {
            prop: 'type',
            label: 'TransactionType',
            width: '80'
          },
          {
            prop: 'name',
            label: 'Member Code',
            width: '80'
          },
          {
            prop: 'account',
            label: 'Account',
            width: '80'
          },
          {
            prop: 'account_name',
            label: 'Name',
            width: '100'
          },
          {
            prop: 'bank_name',
            label: 'Bank Name',
            width: '150'
          },
          {
            prop: 'currency',
            label: 'Currency',
            width: '80'
          },
          {
            prop: 'amount',
            label: 'Amount',
            width: '150'
          },
          {
            prop: 'date',
            label: 'Transaction Date',
            width: '150'
          },
          {
            prop: 'location',
            label: 'Location',
            width: '150'
          },
          {
            prop: 'last_access',
            label: 'Last Access',
            width: '150'
          }
        ]
      },
      // response data 列表数据
      resInformation: {},
      // 色卡配置
      LegendConfig: {
        stripe: true,
        border: true,
        tableColumn: [{
          prop: 'LEGEND',
          label: 'LEGEND',
          width: '60',
          render: (h, params) => {
            return h('div', {
              style: {
                background: params.item.backgroundColor,
                width: '80%',
                height: '30px'
              }
            })
          }
        }, {
          prop: 'value',
          label: '',
          width: '60'
        }]
      },
      // 色值信息
      LegendInformation: {
        data: colorFilter.depositStatusList
      }
    }
  },
  computed: {
    ...mapGetters([
      'PaymentWithdrawNav'
    ])
  },
  mounted () {
    this.initBankTransfer(this.formInline)
    // 定时任务
    this.timer = setInterval(() => { this.initBankTransfer(this.formInline) }, 3000)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initBankTransfer(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initBankTransfer(this.formInline)
        return
      }
      this.initBankTransfer(value)
    },
    // 初始化数据
    initBankTransfer (formInline) {
      this.tableConfig.loading = true
      var list = []
      for (var i = 1; i < 21; i++) {
        list.push(
          {
            id: 'id' + i,
            type: 'type' + Math.ceil(Math.random() * 100),
            name: 'name' + Math.ceil(Math.random() * 100),
            account: 'account' + Math.ceil(Math.random() * 100),
            account_name: 'account_name' + Math.ceil(Math.random() * 100),
            bank_name: 'bank_name' + Math.ceil(Math.random() * 100),
            currency: 'currency' + Math.ceil(Math.random() * 100),
            amount: 'amount' + Math.ceil(Math.random() * 100),
            date: 'date' + Math.ceil(Math.random() * 100),
            location: 'location' + Math.ceil(Math.random() * 100),
            last_access: 'last_access' + Math.ceil(Math.random() * 100),
            color: ['', 'VIP', 'ALMOST 5 MINS', 'ALMOST 15 MINS', 'DEP: AUTO APPV', 'ADVANCE CREDIT'][Math.ceil(Math.random() * 5)]
          }
        )
      }
      this.resInformation.data = list
      this.tableConfig.loading = false
    }
  }
}
</script>
