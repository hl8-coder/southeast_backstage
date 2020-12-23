<template>
  <div class="SystemCurrencySetting">
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
    />
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.status"
    >
      <el-form
        label-width="300px"
      >
        <el-form-item
          label="Deposit Second Approve Amount"
        >
          <el-input
            v-model="form.deposit_second_approve_amount"

            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Withdrawal Second Approve Amount"
        >
          <el-input
            v-model="form.withdrawal_second_approve_amount"

            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Bank Account Verify Amount"
        >
          <el-input
            v-model="form.bank_account_verify_amount"

            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Info Verify Prize Amount"
        >
          <el-input
            v-model="form.info_verify_prize_amount"

            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Max Deposit"
        >
          <el-input
            v-model="form.max_deposit"

            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Min Deposit"
        >
          <el-input
            v-model="form.min_deposit"

            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Max Withdrawal"
        >
          <el-input
            v-model="form.max_withdrawal"

            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Min Withdrawal"
        >
          <el-input
            v-model="form.min_withdrawal"

            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Max Daily Withdrawal"
        >
          <el-input
            v-model="form.max_daily_withdrawal"

            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Min Transfer"
        >
          <el-input
            v-model="form.min_transfer"

            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Sub Affiliate Commission %"
        >
          <el-input
            v-model="form.commission"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Affiliate Commission Minimum Payout"
        >
          <el-input
            v-model="form.payout_comm_mini_limit"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Status"
        >
          <el-switch
            v-model="form.status"
            :active-value=1
            :inactive-value=0
          />
        </el-form-item>
        <el-form-item
          label="Sort"
        >
          <el-input
            v-model="form.sort"

            style="max-width: 220px"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doUpdate">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import {
  backstageITToolCurrenciesIndexHttp,
  backstageITToolCurrenciesUpdateHttp
} from '../../api/it_tools/initAxios'
export default {
  name: 'SystemCurrencySetting',
  components: {TableComp},
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'name',
            label: 'Name',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.currencyID = params.item.id
                      this.form.deposit_second_approve_amount = params.item.deposit_second_approve_amount
                      this.form.withdrawal_second_approve_amount = params.item.withdrawal_second_approve_amount
                      this.form.bank_account_verify_amount = params.item.bank_account_verify_amount
                      this.form.info_verify_prize_amount = params.item.info_verify_prize_amount
                      this.form.max_deposit = params.item.max_deposit
                      this.form.min_deposit = params.item.min_deposit
                      this.form.payout_comm_mini_limit = params.item.payout_comm_mini_limit
                      this.form.commission = params.item.commission
                      this.form.max_withdrawal = params.item.max_withdrawal
                      this.form.min_withdrawal = params.item.min_withdrawal
                      this.form.max_daily_withdrawal = params.item.max_daily_withdrawal
                      this.form.min_transfer = params.item.min_transfer
                      this.form.status = params.item.status
                      this.form.sort = params.item.sort
                      this.dialog.status = true
                      this.dialog.title = 'Update ' + params.item.name
                    }
                  }
                }, params.item.name)
              ])
            }
          },
          {
            prop: 'code',
            label: 'Code'
          },
          {
            prop: 'preset_language',
            label: 'Preset Language'
          },
          {
            prop: 'country',
            label: 'Country'
          },
          {
            prop: 'country_code',
            label: 'Country Code'
          },
          {
            prop: 'id_remove_three_zeros',
            label: 'Is Remove Three Zeros'
          },
          {
            prop: 'deposit_second_approve_amount',
            label: 'Deposit Second Approve Amount'
          },
          {
            prop: 'withdrawal_second_approve_amount',
            label: 'Withdrawal Second Approve Amount'
          },
          {
            prop: 'bank_account_verify_amount',
            label: 'Bank Account Verify Amount'
          },
          {
            prop: 'info_verify_prize_amount',
            label: 'Info Verify Prize Amount'
          },
          {
            prop: 'max_deposit',
            label: 'Max Deposit'
          },
          {
            prop: 'min_deposit',
            label: 'Min Deposit'
          },
          {
            prop: 'max_withdrawal',
            label: 'Max Withdrawal'
          },
          {
            prop: 'min_withdrawal',
            label: 'Min Withdrawal'
          },
          {
            prop: 'max_daily_withdrawal',
            label: 'Max Daily Withdrawal'
          },
          {
            prop: 'min_transfer',
            label: 'Min Transfer'
          },
          {
            prop: 'max_transfer',
            label: 'Max Transfer'
          },
          {
            prop: 'commission',
            label: 'Sub affiliate Commission %'
          },
          {
            prop: 'payout_comm_mini_limit',
            label: 'affiliate Commission Minimum Payout'
          },
          {
            prop: 'sort',
            label: 'Sort'
          },
          {
            prop: 'display_status',
            label: 'Status'
          }
        ]
      },
      resInformation: {},
      dialog: {
        status: false,
        title: ''
      },
      form: {
        deposit_second_approve_amount: '',
        withdrawal_second_approve_amount: '',
        bank_account_verify_amount: '',
        info_verify_prize_amount: '',
        payout_comm_mini_limit: '',
        commission: '',
        max_deposit: '',
        min_deposit: '',
        max_withdrawal: '',
        min_withdrawal: '',
        max_daily_withdrawal: '',
        min_transfer: '',
        status: '',
        sort: ''
      },
      currencyID: ''
    }
  },
  methods: {
    // 初始化
    initHttp () {
      backstageITToolCurrenciesIndexHttp().then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 更新
    doUpdate () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        type: 'warning'
      }).then(() => {
        backstageITToolCurrenciesUpdateHttp(this.currencyID, this.form).then(res => {
          this.dialog.status = false
          this.initHttp()
        }).catch((error) => {
          console.log(error)
        })
      })
    }
  },
  created () {
    this.initHttp()
  }
}
</script>

<style scoped>

</style>
