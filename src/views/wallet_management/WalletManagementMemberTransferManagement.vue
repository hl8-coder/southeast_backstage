<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="MemberTransferManagement">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange = callbacks
    />
    <el-dialog
      title="Wallet Transfer"
      :visible.sync="dialogVisible"
      width="40%">
        <div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Username">
              <el-input v-model="form.user_name"></el-input>
            </el-form-item>
            <el-form-item label="From">
              <el-select v-model="form.from_platform_code" placeholder="From">
                <el-option
                  v-for="item1 in dropList.platform_code"
                  :label="item1.value"
                  :key="item1.key"
                  :value="item1.key" />
              </el-select>
            </el-form-item>
<!--            <el-form-item label="Balance">-->
<!--              <el-input v-model="form.Balance"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="To">
              <el-select v-model="form.to_platform_code" placeholder="To">
                <el-option
                  v-for="item1 in dropList.platform_code"
                  :label="item1.value"
                  :key="item1.key"
                  :value="item1.key" />
              </el-select>
            </el-form-item>
<!--            <el-form-item label="Balance">-->
<!--              <el-input v-model="form.Balance"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="Amount">
              <el-input v-model="form.amount"></el-input>
            </el-form-item>
            <el-form-item label="Bonus code">
              <el-input v-model="form.bonus_code"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit1">submit</el-button>
              <el-button @click="dialogVisible = false">cancel</el-button>
            </el-form-item>
          </el-form>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import {mapGetters} from 'vuex'
import {
  backstageWalletManagementMemberTransferManagementHttp,
  backstageWalletManagementMemberTransferManagementDropListHttp,
  backstageWalletManagementMemberTransferManagementStoreHttp,
  backstageManualSuccessHttp,
  backstageManualFailHttp,
  backstageCheckingHttp
} from '../../api/wallet_management/initAxios'
import FormInlineComp from '../../components/form/formInlineComp'
import filter from '../../util/filter'
import element from '../../config/element';
export default {
  name: 'MemberTransferManagement',
  data () {
    return {
      resInformation: {},
      formInline: {
        per_page: 50,
        page: 1,
        user_name: '', // 名称
        start_at: '',
        end_at: '',
        currency: ''
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
          type: 'select',
          label: 'Currency',
          formValue: 'currency',
          placeholder: 'Select A Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'dateTime',
          label: 'Date'
        },
        {
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      dialogVisible: false,
      form: {
        user_name: '',
        from_platform_code: '',
        to_platform_code: '',
        amount: '',
        bonus_code: ''
      },
      tableConfig: {
        border: true,
        tableColumn: [{
          prop: 'created_at',
          label: 'Date',
          width: '100'
        },{
          prop: 'user_name',
          label: 'Member Code',
          fixWidth: '140'
        }, {
            prop: 'currency',
            label: 'Currency'
        }, {
          prop: 'order_no',
          label: 'Tranx ID',
          fixWidth: '140'
        }, {
          prop: 'from',
          label: 'From wallet',
          width: '80',
        }, {
          prop: 'from_before_balance',
          label: 'Balance before',
          width: '80'
        }, {
          prop: 'from_after_balance',
          label: 'Balance after',
          width: '80'
        }, {
          prop: 'to',
          label: 'To wallet',
          width: '100'
        }, {
          prop: 'to_before_balance',
          label: 'ToWallet Balance before',
          width: '80'
        }, {
          prop: 'to_after_balance',
          label: 'ToWallet Balance after',
          width: '80'
        }, {
          prop: 'amount',
          label: 'Amount',
          width: '80'
        }, {
          prop: 'status',
          label: 'Status',
          width: '80'
        }, {
          prop: 'admin_name',
          label: 'Admin',
        }, {
          prop: '',
          label: '',
          fixWidth: 200,
          width: '80',
          render: (h, params) => {
            let string = '<b style="color: red;font-size: 1.5rem;">Are you sure to confirm with a third party?</b> <br>Please Enter Remark'
            if (params.item.is_show_manual_button) {
              return h('div', [
                h('el-button', {
                  props: {
                    type: 'primary',
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.$prompt(string, 'Remark', {
                        confirmButtonText: 'submit',
                        cancelButtonText: 'cancel',
                        dangerouslyUseHTMLString: true
                      }).then(({ value }) => {
                        if (value === null) {
                          element.message({
                            message: 'Remark is required',
                            type: 'error'
                          })
                          return
                        }
                        backstageManualSuccessHttp(params.item.id, {remark: value}).then(res => {
                          this.initMemberTransferManagement(this.formInline)
                          element.message({
                            message: 'Approve success',
                            type: 'success'
                          })
                        })
                      }).catch(error => {
                        console.log(error)
                      })
                    }
                  }
                }, 'Success'),
                h('el-button', {
                  props: {
                    type: 'danger'
                  },
                  on: {
                    click: () => {
                      this.$prompt(string, 'Remark', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: 'submit',
                        cancelButtonText: 'cancel'
                      }).then(({ value }) => {
                        if (value === null) {
                          element.message({
                            message: 'Remark is required',
                            type: 'error'
                          })
                          return
                        }
                        backstageManualFailHttp(params.item.id, {remark: value}).then(res => {
                          this.initMemberTransferManagement(this.formInline)
                          element.message({
                            message: 'Reject success',
                            type: 'success'
                          })
                        })
                      }).catch(error => {
                        console.log(error)
                      })
                    }
                  }
                }, 'Fail')
              ])
            }
            if (params.item.is_show_check_button) {
              return h('el-button', {
                props: {
                  type: 'warning',
                },
                on: {
                  click: () => {
                    backstageCheckingHttp(params.item.id).then(res => {
                      this.initMemberTransferManagement(this.formInline)
                      element.message({
                        message: 'check success',
                        type: 'success'
                      })
                    })
                  }
                }
              }, 'Add Check Job');
            }
          }
        }]
      },
      dropList: {}
    }
  },
  components: {
    TableComp,
    FormInlineComp
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  methods: {
    // 初始化数据
    initMemberTransferManagement (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageWalletManagementMemberTransferManagementHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initMemberTransferManagement(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initMemberTransferManagement(this.formInline)
        return
      }
      this.initMemberTransferManagement(value)
    },
    onSubmit (formInline) {
      this.formInline = formInline
    },
    onAdd () {
      this.dialogVisible = true
      this.clearForm()
    },
    onSubmit1 () {
      backstageWalletManagementMemberTransferManagementStoreHttp(this.form).then(res => {
        element.message({
          type: 'success',
          message: 'success'
        })
        this.dialogVisible = false
      }).catch((error) => {
        console.log(error)
      })
    },
    initDropList () {
      filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
      backstageWalletManagementMemberTransferManagementDropListHttp().then(res => {
        this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    clearForm () {
      this.form = {
        user_name: '',
        from_platform_code: '',
        to_platform_code: '',
        amount: '',
        bonus_code: ''
      }
    }
  },
  created () {
    this.initMemberTransferManagement(this.formInline)
    this.initDropList()
  }
}
</script>
