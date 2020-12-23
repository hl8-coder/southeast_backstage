<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="FTListing">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="danger" icon="el-icon-document" @click="walletTransfer"></el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    ></table-comp>
    <wallet-transfer
      :walletTransferInfo="walletTransferInfo"
    ></wallet-transfer>
  </div>
</template>

<script>
import FormInlineComp from '../../../components/form/formInlineComp'
import TableComp from '../../../components/table/tableComp'
import WalletTransfer from './WalletTransfer'
export default {
  name: 'FTListing',
  components: {WalletTransfer, TableComp, FormInlineComp},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'input',
          label: 'Operation ID',
          formValue: 'id',
          placeholder: 'Operation ID',
          value: ''
        },
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'name',
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
          type: 'date',
          label: 'Date',
          formValue: 'date',
          value: ''
        },
        {
          type: 'search'
        }
      ],
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'date',
            label: 'Date'
          },
          {
            prop: 'id',
            label: 'Operation ID'
          },
          {
            prop: 'id',
            label: 'MEMBER ID'
          },
          {
            prop: 'form',
            label: 'From'
          },
          {
            prop: 'to',
            label: 'TO'
          },
          {
            prop: 'status',
            label: 'Status'
          },
          {
            prop: 'cur',
            label: 'Cur'
          },
          {
            prop: 'amount',
            label: 'Transfer Amount'
          },
          {
            prop: 'balance',
            label: 'Main Wallet Balance'
          },
          {
            prop: 'from_amt',
            label: 'From Products Amt'
          },
          {
            prop: 'to_amt',
            label: 'To Products Amt'
          },
          {
            prop: 'description',
            label: 'Description'
          },
          {
            prop: 'updated_at',
            label: 'Last Update'
          }
        ]
      },
      resInformation: {},
      walletTransferInfo: {
        statusFormVisible: false
      }
    }
  },
  methods: {
    // 提交表单与分页回调
    callbacks () {},
    // 数据初始化
    initFTListting () {
      this.tableConfig.loading = true
      let list = []
      for (var i = 1; i < 21; i++) {
        list.push(
          {
            date: 'date' + Math.ceil(Math.random() * 100),
            id: 'id' + i,
            form: 'form' + Math.ceil(Math.random() * 100),
            to: 'to' + Math.ceil(Math.random() * 100),
            status: 'status' + Math.ceil(Math.random() * 100),
            cur: 'cur' + Math.ceil(Math.random() * 100),
            amount: 'amount' + Math.ceil(Math.random() * 100),
            balance: 'balance' + Math.ceil(Math.random() * 100),
            from_amt: 'from_amt' + Math.ceil(Math.random() * 100),
            to_amt: 'to_amt' + Math.ceil(Math.random() * 100),
            description: 'description' + Math.ceil(Math.random() * 100),
            updated_at: 'updated_at' + Math.ceil(Math.random() * 100)
          }
        )
      }
      this.resInformation.data = list
      this.tableConfig.loading = false
    },
    // wallet transfer
    walletTransfer () {
      this.walletTransferInfo.statusFormVisible = true
    }
  },
  created () {
    this.initFTListting()
  }
}
</script>
