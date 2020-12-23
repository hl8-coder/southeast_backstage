<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="Process">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
      <template v-slot:content>
        <!--Manual 按钮-->
        <el-button v-if="manualStatus" style="margin-right: 5px" type="danger" @click="manualTheseTransaction">Manual</el-button>
        <!--Release 按钮-->
        <el-button v-if="releaseStatus" style="margin-right: 5px" type="warning">Release</el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
      @handleSelectionChange = handleSelectionChange
    />
    <el-dialog
      title="Chose Transaction Type"
      :visible.sync="choseTransactionTypeStatus"
    >
      <el-form
        class="demo-form-inline"
      >
        <el-form-item>
          <el-select
            v-model="ChoseTransactionTypeForm.type_id"
            placeholder="Select A Transaction Type"
          >
            <el-option
              v-for="item in selectListData.list"
              :key="item.id"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-table :data="selectListData.list">
        <el-table-column property="id" label="Transaction ID"></el-table-column>
        <el-table-column property="type" label="Transaction Type" width="150"></el-table-column>
        <el-table-column property="name" label="Member Code" width="200"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="choseTransactionTypeStatus = false">cancel</el-button>
        <el-button type="primary" @click="choseTransactionTypeStatus = false">submit</el-button>
      </div>
    </el-dialog>
    <process-processing
      :processProcessingFormStatus="processProcessingFormStatus"
    ></process-processing>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import ProcessProcessing from './Withdrawal/ProcessProcessing'
export default {
  name: 'Process',
  data () {
    return {
      iconShow: false,
      // 头部搜索表单配置
      formInlineConfig: [
        {
          type: 'select',
          label: 'Transaction Type',
          formValue: 'type',
          placeholder: 'Select A Transaction Type',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Bank Name',
          formValue: 'bank_name',
          placeholder: 'Select A Bank Name',
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
        per_page: 50,
        page: 1,
        type: '',
        currency: '',
        bank_name: '',
        amount: '',
        from_date: '',
        to_date: ''
      },
      tableConfig: {
        border: true,
        loading: true,
        // 多选框
        selection: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'Transaction ID',
            width: '60',
            render: (h, params) => {
              return h('div', [
                this.iconShow ?
                  h('el-Link', {
                    props: {
                      circle: true,
                      type: 'primary',
                      icon: 'el-icon-s-order'
                    },
                    on: {
                      click: () => {
                        this.processProcessingFormStatus = true
                      }
                    }
                  }, params.item.id) : h('span', {
                    props: {
                      size: 'small',
                      type: 'primary'
                    }
                  }, params.item.id)
              ])
            }
          },
          {
            prop: 'type',
            label: 'Transaction Type',
            width: '60'
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
            prop: 'location',
            label: 'Location',
            width: '150'
          },
          {
            prop: 'reason',
            label: 'Reason',
            width: '150'
          }
        ]
      },
      resInformation: {},
      // 选中的数据
      selectListData: {
        ids: [],
        list: []
      },
      choseTransactionTypeStatus: false,
      ChoseTransactionTypeForm: {
        type_id: '',
        ids: []
      },
      // 下拉菜单
      dropList: {},
      manualStatus: false,
      releaseStatus: false,
      // 提现申请表单
      processProcessingFormStatus: false
    }
  },
  components: {
    ProcessProcessing,
    TableComp,
    FormInlineComp
  },
  computed: {
    ...mapGetters([
      'PaymentWithdrawNav'
    ])
  },
  methods: {
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initProcess(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initProcess(this.formInline)
        return
      }
      this.initProcess(value)
    },
    // 数据初始化
    initProcess (formInline) {
      this.changeOfTheTransactionType(formInline.type)
      this.tableConfig.loading = true
      let list = []
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
            location: 'location' + Math.ceil(Math.random() * 100),
            reason: 'reason' + Math.ceil(Math.random() * 100)
          }
        )
      }
      this.resInformation.data = list
      this.tableConfig.loading = false
    },
    // checkbox 选中事件
    handleSelectionChange (value) {
      this.selectListData.list = value.page
      let ids = []
      for (var i = 0; i < value.page.length; i++) {
        ids.push(value.page[i].id)
      }
      this.selectListData.ids = ids
    },
    // 对选中的数据进行处理
    manualTheseTransaction () {
      this.choseTransactionTypeStatus = true
    },
    // Drop List
    processDropList () {
      let res = {
        type: [
          {
            key: 1,
            value: 'Review'
          },
          {
            key: 2,
            value: 'Processing'
          },
          {
            key: 3,
            value: 'Deferred'
          },
          {
            key: 4,
            value: 'Hold'
          }
        ]
      }
      filter.formValueListFilter(this.formInlineConfig, res, ['type'])
      this.dropList = res
    },
    // Transaction Type 改变事件
    changeOfTheTransactionType (event) {
      switch (event) {
        case 1:
          this.manualStatus = true
          this.releaseStatus = false
          this.iconShow = false
          break
        case 2:
          this.manualStatus = false
          this.releaseStatus = false
          this.iconShow = true
          break
        case 3:
          this.releaseStatus = true
          this.manualStatus = false
          this.iconShow = false
          break
        case 4:
          this.releaseStatus = true
          this.manualStatus = false
          this.iconShow = false
          break
        default:
          this.manualStatus = false
          this.releaseStatus = false
          this.iconShow = false
          break
      }
    }
  },
  created () {
    this.initProcess(this.formInline)
    this.processDropList()
  }
}
</script>
