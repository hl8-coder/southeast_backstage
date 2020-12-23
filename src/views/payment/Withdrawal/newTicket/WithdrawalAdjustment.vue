<style scoped>
  .el-dialog {
    margin-top: 10rem !important;
  }
</style>
<template>
  <div class="WithdrawalAdjustment">
    <el-dialog
      append-to-body
      title="Adjustment Of Withdrawal"
      :visible.sync="withdrawalAdjustment.formStatus"
    >
      <el-button
        style="margin-bottom: 10px"
        type="success"
        @click="addAdjustmentInfo.statusFormVisible = true">
        Add Adjustment
      </el-button>
      <table-comp
        :tableConfig = tableConfig
        :resInformation = resInformation
        @handleSizePageChange = callbacks
      ></table-comp>
      <withdrawal-add-adjustment
        :addAdjustment = addAdjustmentInfo
      ></withdrawal-add-adjustment>
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../../../components/table/tableComp'
import WithdrawalAddAdjustment from './WithdrawalAddAdjustment'
export default {
  name: 'WithdrawalAdjustment',
  components: {WithdrawalAddAdjustment, TableComp},
  props: ['withdrawalAdjustment'],
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: '',
            label: '',
            render: (h, params) => {
              return h('div', [
                h('el-button', {
                  props: {
                    size: 'small',
                    circle: true,
                    icon: 'el-icon-delete'
                  },
                  style: {
                    marginRight: '5px',
                    background: '#409EFF',
                    color: '#fff',
                    border: 'none'
                  },
                  on: {
                    click: () => {
                      this.$prompt('REMOVE REASON', 'Prompt', {
                        confirmButtonText: 'Remove',
                        cancelButtonText: 'cancel'
                      }).then(({ value }) => {
                        this.$message({
                          type: 'success',
                          message: ': ' + value
                        })
                      }).catch(() => {
                        this.$message({
                          type: 'info',
                          message: ''
                        })
                      })
                    }
                  }
                })
              ])
            }
          },
          {
            prop: 'date',
            label: 'DATE'
          },
          {
            prop: 'type',
            label: 'TYPE'
          },
          {
            prop: 'amount',
            label: 'Amount'
          },
          {
            prop: 'category',
            label: 'CATEGORY'
          },
          {
            prop: 'product',
            label: 'Product'
          },
          {
            prop: 'reason',
            label: 'REASON'
          },
          {
            prop: 'remarks',
            label: 'REMARKS'
          },
          {
            prop: 'id',
            label: 'ADJUSTMENT ID'
          },
          {
            prop: 'status',
            label: 'STATUS'
          }
        ]
      },
      resInformation: {},
      addAdjustmentInfo: {
        statusFormVisible: false
      }
    }
  },
  methods: {
    // 提交表单与分页回调
    callbacks () {},
    // 数据初始化
    initAdjustmentOfWithdrawal () {
      this.tableConfig.loading = true
      let list = []
      for (var i = 1; i < 21; i++) {
        list.push(
          {
            date: 'date' + Math.ceil(Math.random() * 100),
            id: 'id' + i,
            type: 'type' + Math.ceil(Math.random() * 100),
            amount: 'amount' + Math.ceil(Math.random() * 100),
            category: 'category' + Math.ceil(Math.random() * 100),
            product: 'product' + Math.ceil(Math.random() * 100),
            reason: 'reason' + Math.ceil(Math.random() * 100),
            remarks: 'remarks' + Math.ceil(Math.random() * 100),
            status: 'status' + Math.ceil(Math.random() * 100)
          }
        )
      }
      this.resInformation.data = list
      this.tableConfig.loading = false
    }
  },
  created () {
    this.initAdjustmentOfWithdrawal()
  }
}
</script>
