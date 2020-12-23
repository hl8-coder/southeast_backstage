<style lang="scss" scoped type="text/scss">

</style>

<template>
    <div class="Deposit">
      <children-nav
        :Nav = csPaymentNav
      />
      <form-inline-comp
        :formInlineConfig = formInlineConfig
        @onSubmit = callbacks
      >
        <template v-slot:content>
          <el-button type="danger" icon="el-icon-plus" @click="deposited"></el-button>
        </template>
      </form-inline-comp>
      <el-dialog title="Deposited - Submit on behalf" :visible.sync="statusFormVisible">
        <el-form :model="formValue">
          <el-form-item label="Username" :label-width="formLabelWidth">
            <el-input
              placeholder="Username"
              v-model="formValue.name">
            </el-input>
          </el-form-item>
          <el-form-item label="Amount" :label-width="formLabelWidth">
            <el-input
              placeholder="Amount"
              v-model="formValue.amount">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="statusFormVisible = false">cancel</el-button>
          <el-button type="primary" @click="statusFormVisible = false">submit</el-button>
        </div>
      </el-dialog>
      <table-comp
        :tableConfig = tableConfig
        :resInformation = resInformation
      />
    </div>
</template>

<script>
import tableComp from '../../../components/table/tableComp'
import childrenNav from '../../../components/nav/childrenNav'
import FormInlineComp from '../../../components/form/formInlineComp'
import {
  backstageUsersDepositsUserHttp
} from '../../../api/members/initAxios'
import { mapGetters } from 'vuex'
export default {
  name: 'Deposit',
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
          type: 'search'
        }
      ],
      formInline: {
        include: 'user',
        per_page: 50,
        page: 1,
        user_name: ''
      },
      tableConfig: {
        border: true,
        tableColumn: [{
          prop: 'Date',
          label: 'Date',
          width: '160'
        }, {
          prop: 'TranxID',
          label: 'Tranx ID',
          width: '60'
        }, {
          prop: 'Channel',
          label: 'Channel',
          width: '80'
        }, {
          prop: 'Amount',
          label: 'Amount',
          width: '80',
          statusColor: 'statusColor'
        }, {
          prop: 'Bank',
          label: 'Bank',
          width: '100'
        }, {
          prop: 'Method',
          label: 'Method',
          width: '150'
        }, {
          prop: 'Status',
          label: 'Status',
          width: '80'
        }]
      },
      statusFormVisible: false,
      formValue: {
        name: ''
      },
      formLabelWidth: '120px'
    }
  },
  components: {
    FormInlineComp,
    tableComp,
    childrenNav
  },
  computed: {
    ...mapGetters([
      'csPaymentNav'
    ])
  },
  methods: {
    // 添加Deposit
    deposited () {
      this.statusFormVisible = true
    },
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include) {
        formInline.include = 'user'
      }
      if (!formInline.user_name) {
        return this.$message.error('Member Code Can\'t be empty')
      }
      this.tableConfig.loading = true
      backstageUsersDepositsUserHttp(this.formInline.user_name, {include: 'user'}).then(res => {
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
    }
  }
}
</script>
