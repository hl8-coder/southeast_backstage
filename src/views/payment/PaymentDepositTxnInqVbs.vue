<style lang="scss" scoped type="text/scss">

</style>
<style>
  .VBS-remarkLog-Config .el-table thead {
    display: none;
  }
</style>
<template>
  <div class="TxnInqVbs">
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
    <el-dialog title="Add" :visible.sync="FormVisible" >
      <div class="FlexRowSpaceBetweenFlexStart">
        <div style="width: 30%">
          <el-form :model="formFile">
            <el-form-item label="Fund In Account" :label-width="formLabelWidth">
              <el-select
                v-model="formFile.fund_in_account"
                placeholder="Select Fund In Account"
                @change="fundInAccountChange"
              >
                <el-option
                  v-for="item in BankTransactionsDropList.fund_in_account"
                  :label="item.value"
                  :key="item.key"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <!--:data="{currency: form.currency,fund_in_account: form.fund_in_account}"-->
          <el-upload
            :disabled="Disabled.fileDisabled"
            class="upload-demo"
            ref="upload"
            action="/api/backstage/bank_transactions/excel"
            :headers="fileHeaders"
            name="excel"
            :limit="1"
            accept=".xls, .xlsx"
            :data="formFile"
            :on-change="handleChange"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :on-preview="handlePreview"
            :on-error="uploadFalse"
            :on-success="uploadSuccess"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">Select File</el-button>
          </el-upload>
        </div>
        <el-input :autosize="{ minRows: 8}" v-model="text" :disabled="Disabled.textareaDisabled" style="width: 65%" type="textarea"></el-input>
        <el-form :model="formFile" v-if="lastBalanceShow">
          <el-form-item label="Last Balance" :label-width="formLabelWidth">
            <el-input v-model="last_balance" placeholder="Last Balance" />
          </el-form-item>
        </el-form>
        <!--<el-form-item label="Last Balance" :label-width="formLabelWidth">-->
          <!--<el-input v-if="text" v-model="last_balance" placeholder="Last Balance" />-->
        <!--</el-form-item>-->
      </div>
      <div slot="footer" class="dialog-footer FlexRowCenterCenter">
        <el-button type="primary" @click="Check">Check Statement</el-button>
      </div>
    </el-dialog>
    <el-dialog title="Repeat the upload" :visible.sync="repetitionRecord.FormVisible" >
      <table-comp
        :tableConfig = repetitionRecord.tableConfig
        :resInformation = repetitionRecord.resInformation
      />
    </el-dialog>
    <el-dialog width="800px" custom-class="VBS-remarkLog-Config" :title="remarkLogConfig.statementId" :visible.sync="remarkLogConfig.visible" >
      <table-comp
        :tableConfig = remarkLogConfig.tableConfig
        :resInformation = remarkLogConfig.resInformation
        @handleSizePageChange = remarkLogCallbacks
      />
      <hr>
      <el-form>
        <el-form-item label="Remark" label-width="80px">
          <el-input :disabled="!remarkLogConfig.is_can_modify" type="textarea" row="5" v-model="remarkLogConfig.form.remark" placeholder="Enter Remark" />
        </el-form-item>
        <el-form-item label="Amount" label-width="80px">
          <el-input :disabled="!remarkLogConfig.is_can_modify" v-model="remarkLogConfig.form.credit" placeholder="Enter Amount" />
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="houseKeep">HOUSEKEEP</el-button>
          <el-button :disabled="!remarkLogConfig.is_show_modify_button" type="danger" @click="modify">MODIFY</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import resourcesList from '../../util/static'
import element from '../../config/element'
import {
  backstageBankTransactionsHttp,
  deleteBackstageBankTransactionsHttp,
  backstageBankTransactionsCreditHttp,
  backstageDropListBankTransactionsHttp,
  backstageBankTransactionsTextHttp,
  backstageBankTransactionsDuplicateTransactionsHttp,
  backstageBankTransactionsDuplicateTransactionsDelectHttp,
  backstageBankTransactionsLogsHttp
} from '../../api/payment/deposit/initAxios'
export default {
  name: 'TxnInqVbs',
  data () {
    return {
      remarkLogConfig: {
        visible: false,
        statementId: '',
        is_show_modify_button: true,
        is_can_modify: true,
        id: '',
        form: {
          credit: '',
          remark: ''
        },
        tableConfig: {
          border: true,
          pageArray: [5, 10, 20, 40],
          tableColumn: [{
            prop: 'type',
            label: 'type',
            render: (h, params) => {
              return h('div', params.item.type + ' To')
            }
          }, {
            prop: 'deposit_order_no',
            label: 'Order No',
          }, {
            prop: 'admin_name',
            label: 'Admin Name',
            render: (h, params) => {
              return h('div', 'By ' + params.item.admin_name)
            }
          }, {
            prop: 'created_at',
            label: 'Created At',
            fixWidth: '140px'
          }]
        },
        resInformation: {},
        formInline: {
          per_page: 5,
          page: 1
        }
      },
      BankTransactionsDropList: {},
      text: '',
      last_balance: '',
      Disabled: {
        fileDisabled: false,
        textareaDisabled: false
      },
      fileHeaders: resourcesList.fileHeaders,
      fileList: [],
      formFile: {
        fund_in_account: ''
      },
      form: {},
      repetitionRecord: {
        resInformation: {
          data: []
        },
        FormVisible: false,
        tableConfig: {
          border: true,
          tableColumn: [{
            prop: 'transaction_date',
            label: 'Transaction Date',
            width: '60'
          }, {
            prop: 'description',
            label: 'Description',
            width: '180'
          }, {
            prop: 'debit',
            label: 'Debit',
            width: '60'
          }, {
            prop: 'credit',
            label: 'Credit',
            width: '60'
          }, {
            prop: 'balance',
            label: 'Balance',
            width: '60'
          }, {
            prop: 'UploadDuplicate',
            label: 'Upload Duplicate',
            width: '60',
            render: (h, params) => {
              return h('div', [
                h('el-button', {
                  props: {
                    type: 'danger'
                  },
                  on: {
                    click: () => {
                      this.delectFile(params.item, params.index)
                    }
                  }
                }, 'delete')
              ])
            }
          }]
        }
      },
      FormVisible: false,
      formLabelWidth: '120px',
      resInformation: {},
      tableConfig: {
        border: true,
        tableColumn: [{
          prop: 'StatementID',
          label: 'Statement ID',
          fixWidth: '150',
          render: (h, params) => {
            return h('div', [
              h('el-link', {
                props: {
                  circle: true,
                  type: 'primary',
                  icon: 'el-icon-s-order'
                },
                style: {
                  marginRight: '10px',
                  display: params.item.is_show_edit_button ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.remarkLogConfig.visible = true
                    this.remarkLogConfig.statementId = 'STATEMENT ID: ' + params.item.order_no
                    this.remarkLogConfig.id = params.item.id
                    this.remarkLogConfig.form.remark = params.item.remark
                    this.remarkLogConfig.form.credit = ''
                    this.remarkLogConfig.is_show_modify_button = params.item.is_show_modify_button
                    this.remarkLogConfig.is_can_modify = params.item.is_can_modify
                    this.remarkLogConfig.form.credit = params.item.credit
                    this.backstageBankTransactionsLogsHttp()
                  }
                }
              }),
              h('span', params.item.order_no)
            ])
          }
        }, {
          prop: 'fund_in_account',
          label: 'Fund In Account',
          fixWidth: '115px'
        }, {
          prop: 'transaction_id',
          label: 'Transaction ID',
          fixWidth: '105px'
        }, {
          prop: 'account_no',
          label: 'Account Number',
          fixWidth: '125px'
        }, {
          prop: 'bank_reference',
          label: 'Bank Reference',
          fixWidth: '108px'
        }, {
          prop: 'transfer_details',
          label: 'Transfer Details',
          fixWidth: '185px'
        }, {
          prop: 'description',
          label: 'Description',
          width: '200'
        }, {
          prop: 'debit',
          label: 'Debit',
          width: '60'
        }, {
          prop: 'credit',
          label: 'Credit',
          width: '60'
        }, {
          prop: 'amount',
          label: 'Amount',
          width: '60'
        }, {
          prop: 'channel',
          label: 'Channel',
          fixWidth: '180px'
        }, {
          prop: 'transaction_date',
          label: 'Transaction Date',
          fixWidth: '120px'
        }, {
          prop: 'transaction_at',
          label: 'Transaction Time',
          fixWidth: '120px'
        }, {
          prop: 'currency',
          label: 'Currency',
          width: '60'
        }, {
          prop: 'location',
          label: 'Location',
          width: '60'
        }, {
          prop: 'balance',
          label: 'Balance',
          width: '60'
        }]
      },
      formInlineConfig: [
        {
          type: 'select',
          label: 'Status',
          formValue: 'status',
          placeholder: 'Select A Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Statement ID',
          formValue: 'id',
          placeholder: 'STATEMENT ID',
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
          type: 'select',
          label: 'Fund In Account',
          formValue: 'fund_in_account',
          placeholder: 'Select A Account',
          clearable: true,
          value: '',
          list: []
        },
        {
          type: 'input',
          label: 'Description',
          formValue: 'description',
          placeholder: 'Description',
          value: ''
        },
        {
          type: 'input',
          label: 'Account No',
          formValue: 'account_no',
          placeholder: 'Description',
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
          type: 'select',
          label: 'HouseKeep',
          formValue: 'housekeep',
          placeholder: 'Select A HouseKeep',
          clearable: true,
          value: '',
          list: []
        },
        {
          type: 'date',
          label: 'Date',
          formValue: 'date',
          formKey1: 'transaction_start_at',
          formKey2: 'transaction_end_at',
          value: ''
        },
        {
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        status: '',
        id: '',
        currency: '',
        fund_in_account: '',
        description: '',
        housekeep: '',
        account_no: '',
        amount: '',
        transaction_start_at: '',
        transaction_end_at: ''
      },
      lastBalanceShow: false
    }
  },
  watch: {
    text () {
      if (this.text) {
        this.Disabled.fileDisabled = true
        return
      }
      this.Disabled.fileDisabled = false
    },
    'remarkLogConfig.form.credit' (newvalue, oldvalue) {
      this.remarkLogConfig.form.credit = filter.numeralChange(newvalue, oldvalue)
    }
  },
  components: {
    formInlineComp, tableComp
  },
  created () {
    this.backstageDropListBankTransactionsHttp()
    this.initHttp(this.formInline)
  },
  methods: {
    backstageBankTransactionsLogsHttp () {
      backstageBankTransactionsLogsHttp(this.remarkLogConfig.id, this.remarkLogConfig.formInline).then(res => {
        this.remarkLogConfig.resInformation = res
        console.log(res)
      })
    },
    remarkLogCallbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.remarkLogConfig.formInline.page = value.page
        this.backstageBankTransactionsLogsHttp()
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.remarkLogConfig.formInline.per_page = value.per_page
        this.backstageBankTransactionsLogsHttp()
        return
      }
    },
    // 修改remark
    modify () {
      if (this.remarkLogConfig.form.credit === '') {
        element.message({
          type: 'error',
          message: 'Credit can\'t be empty'
        })
        return
      }
      if (this.remarkLogConfig.form.remark === '') {
        element.message({
          type: 'error',
          message: 'remark can\'t be empty'
        })
        return
      }
      backstageBankTransactionsCreditHttp(this.remarkLogConfig.id, this.remarkLogConfig.form).then(res => {
        this.remarkLogConfig.visible = false
        this.initHttp(this.formInline)
      })
    },
    houseKeep () {
      this.$confirm('Are you sure?', 'HOUSEKEEP', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteBackstageBankTransactionsHttp(this.remarkLogConfig.id).then(res => {
          this.remarkLogConfig.visible = false
          this.initHttp(this.formInline)
          this.$message({
            type: 'success',
            message: 'houseKeep already'
          })
        })
      })
    },
    // 下拉菜单
    backstageDropListBankTransactionsHttp () {
      backstageDropListBankTransactionsHttp().then(res => {
        this.BankTransactionsDropList = res
        filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'status', 'company_bank_account', 'fund_in_account', 'housekeep'])
      }).catch(error => {
        console.log(error)
      })
    },
    // Bank Transactions 请求
    initHttp (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return
      }
      if (!formInline.per_page && !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageBankTransactionsHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch(error => {
        console.log(error)
        this.tableConfig.loading = false
      })
    },
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
    // 检查单子
    Check () {
      if (!this.formFile.fund_in_account) {
        element.message({
          type: 'error',
          message: 'Fund In Account cannot be empty'
        })
        return
      }
      if (this.text) {
        if (!this.last_balance) {
          element.message({
            type: 'error',
            message: 'Last Balance cannot be empty'
          })
          return
        }
        var datalist = {
          text: this.text,
          fund_in_account: this.formFile.fund_in_account,
          last_balance: this.last_balance,
          is_force: 0
        }
        backstageBankTransactionsTextHttp(datalist).then(res => {
          this.uploadSuccess(res)
        }).catch(error => {
          if (error.response.data.message === '-1') {
            this.$confirm('Your balance does not match system balance! Do you want to continue?', 'Prompt', {
              confirmButtonText: 'Submit',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              datalist.is_force = 1
              backstageBankTransactionsTextHttp(datalist).then(res => {
                this.uploadSuccess(res)
              }).catch(error => {
                console.log(error)
              })
            }).catch(() => {
              console.log('cancel')
            })
          }
          console.log(error)
        })
        return
      }
      this.$refs.upload.submit()
    },
    // 添加按钮
    onAdd () {
      this.formFile.fund_in_account = ''
      this.text = ''
      this.FormVisible = true
    },
    // 超过文件限制
    handleExceed () {
      element.message({
        type: 'warning',
        message: `Only one file can be uploaded`
      })
    },
    // 文件移除
    handleRemove (files, fileList) {
      if (fileList.length === 0) {
        this.Disabled.textareaDisabled = false
        return
      }
      this.Disabled.textareaDisabled = true
    },
    // 文件改动
    handleChange (files, fileList) {
      if (fileList.length === 0) {
        this.Disabled.textareaDisabled = false
        return
      }
      this.Disabled.textareaDisabled = true
    },
    // 改动之前
    handlePreview () {

    },
    // 上传文件错误
    uploadFalse (err) {
      this.$refs.upload.clearFiles()
      if (err) {
        console.log('error Updated')
      }
    },
    // 上传文件成功
    uploadSuccess (res) {
      this.initHttp(this.formInline)
      if (res) {
        this.$refs.upload.clearFiles()
        element.message({
          type: 'success',
          message: `Uploaded successfully`
        })
        backstageBankTransactionsDuplicateTransactionsHttp({cache_key: res.cache_key}).then(res => {
          this.repetitionRecord.resInformation.data = res
          this.repetitionRecord.FormVisible = !this.repetitionRecord.FormVisible
        }).catch(error => {
          console.log(error)
        })
      }
    },
    // 删除文件
    delectFile (item, index) {
      var datalist = {
        fund_in_account: item.fund_in_account,
        description: item.description,
        debit: item.debit,
        credit: item.credit,
        balance: item.balance,
        transaction_date: item.transaction_date
      }
      backstageBankTransactionsDuplicateTransactionsDelectHttp(datalist).then(res => {
        this.repetitionRecord.resInformation.data.splice(index, 1)
        element.message({
          type: 'success',
          message: `success delete`
        })
      }).catch(error => {
        console.log(error)
      })
    },
    // Fund In Account change event
    fundInAccountChange (val) {
      let tempForm = this.formInline
      tempForm.fund_in_account = val
      var datalist = filter.formInlineFilter(tempForm)
      backstageBankTransactionsHttp(datalist).then(res => {
        if (res.data.length) {
          this.last_balance = res.data[0].balance
        } else {
          this.last_balance = ''
        }
      }).catch(error => {
        console.log(error)
      })
      this.lastBalanceShow = true
    }
  }
}
</script>
