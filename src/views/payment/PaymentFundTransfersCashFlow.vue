<style scoped>

</style>

<template>
  <div class="CashFlow">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="danger">Export</el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    ></table-comp>
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
export default {
  name: 'CashFlow',
  components: {TableComp, FormInlineComp},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'date',
          label: 'Date',
          formValue: 'date',
          value: ''
        },
        {
          type: 'select',
          label: 'Account Type',
          formValue: 'type',
          placeholder: 'Select A Account Type',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Game',
          formValue: 'product',
          placeholder: 'Select A Game',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Username',
          formValue: 'name',
          placeholder: 'Username',
          value: ''
        },
        {
          type: 'input',
          label: 'ID',
          formValue: 'id',
          placeholder: 'ID',
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
            prop: 'name',
            label: 'MemberCode'
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'products',
            label: 'Products'
          },
          {
            prop: 'amount',
            label: 'Amount'
          },
          {
            prop: 'amount',
            label: 'W/L Amount'
          },
          {
            prop: 'before',
            label: 'Before'
          },
          {
            prop: 'after',
            label: 'After'
          },
          {
            prop: 'description',
            label: 'Description'
          }
        ]
      },
      resInformation: {}
    }
  },
  methods: {
    // 提交表单与分页回调
    callbacks () {},
    // 数据初始化
    initCashFlow () {
      this.tableConfig.loading = true
      let list = []
      for (var i = 1; i < 21; i++) {
        list.push(
          {
            date: 'date' + Math.ceil(Math.random() * 100),
            name: 'name' + i,
            currency: 'currency' + Math.ceil(Math.random() * 100),
            products: 'products' + Math.ceil(Math.random() * 100),
            amount: 'amount' + Math.ceil(Math.random() * 100),
            before: 'before' + Math.ceil(Math.random() * 100),
            after: 'after' + Math.ceil(Math.random() * 100),
            description: 'description' + Math.ceil(Math.random() * 100)
          }
        )
      }
      this.resInformation.data = list
      this.tableConfig.loading = false
    }
  },
  created () {
    this.initCashFlow()
  }
}
</script>
