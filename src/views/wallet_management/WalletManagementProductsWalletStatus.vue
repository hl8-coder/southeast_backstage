<style lang="scss" scoped type="text/scss">

</style>

<template>
    <div id="ProductsWalletStatus">
      <form-inline
        :formInline = formInline
        @onSubmit = onSubmit
      />
      <table-comp
        :tableConfig = tableConfig
        :resInformation = resInformation
      />
      <!--更改Wallet Transfer弹窗-->
      <el-dialog
        title="Wallet Transfer"
        :visible.sync="dialogVisible"
        width="40%">
        <div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="status">
              <el-select v-model="form.status" placeholder="status">
                <el-option label="shanghai" value="shanghai"></el-option>
                <el-option label="beijing" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Remark">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit1">submit</el-button>
              <el-button @click="dialogVisible = false">cancel</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
      <!--历史记录弹窗-->
      <el-dialog title="history" :visible.sync="historyVisible">
        <table-comp
          :tableConfig = historyConfig
          :resInformation = history
        />
        <div slot="footer" class="dialog-footer">
          <el-button type="cancel" @click="historyVisible = false">close</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import formInline from '../../components/form/formInline'
import tableComp from '../../components/table/tableComp'
export default {
  name: 'ProductsWalletStatus',
  data () {
    return {
      formInline: {
        name: '' // 名称
      },
      dialogVisible: false,
      form: {
        status: '',
        remark: ''
      },
      resInformation: {
        data: [{
          Walle: 'OW Sport',
          status: 'Active',
          FromWallet: '1',
          BalanceBefore: '1',
          BalanceAfter: '1',
          ToWallet: '1',
          ToWalletBalanceBefore: '1',
          ToWalletBalanceAfter: '1',
          Amount: '1',
          Status: '1',
          Admin: '1'
        }]
      },
      tableConfig: {
        border: true,
        tableColumn: [{
          prop: 'Walle',
          label: 'Walle',
          width: '60',
          render: (h, params) => {
            return h('div', [
              h('el-link', {
                props: {
                  circle: true,
                  type: 'warning',
                  icon: 'el-icon-warning-outline'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.historyVisible = true
                  }
                }
              }),
              h('span', params.item.Walle)
            ])
          }
        }, {
          prop: 'status',
          label: 'Status',
          width: '60'
        }, {
          prop: 'Action',
          label: 'Action',
          width: '120',
          render: (h, params) => {
            return h('div', [
              h('el-button', {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.dialogVisible = true
                  }
                }
              }, 'Update')
            ])
          }
        }]
      },
      historyConfig: {
        border: true,
        tableColumn: [{
          prop: 'created_at',
          label: 'Date/Time',
          width: '60'
        }, {
          prop: 'name',
          label: 'Admin',
          width: '60'
        }, {
          prop: 'old_value',
          label: 'Previous Value',
          width: '80'
        }, {
          prop: 'new_value',
          label: 'New Value',
          width: '80'
        }]
      },
      history: {
        data: [{
          created_at: '1992-10-09',
          name: 'qq',
          old_value: '1',
          new_value: '2'
        }]
      },
      historyVisible: false
    }
  },
  components: {
    formInline, tableComp
  },
  methods: {
    onSubmit () {
      console.log('aaa')
    },
    onSubmit1 () {
      console.log('aaa')
    }
  }
}
</script>
