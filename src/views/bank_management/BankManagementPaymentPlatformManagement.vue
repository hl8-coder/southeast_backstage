<style lang="scss" type="text/scss">
  .PGManagement-Dialog {
    overflow: hidden;
    .el-form-item--small.el-form-item {
      width: 50%;
      float: left;
    }
  }
</style>
<template>
  <div class="PGManagement">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    ></form-inline-comp>
    <table-comp
      :table-config="tableConfig"
      :res-information="resInformation"
      @handleSizePageChange = callbacks
    ></table-comp>
    <el-dialog
      custom-class="PGManagement-Dialog"
      :title="pgManagementDialog.title"
      :visible.sync="pgManagementDialog.status"
      width="1200px"
    >
      <el-form :model="form" label-width="150px">
        <el-form-item
          label="Name"
        >
          <el-input
            placeholder="name"
            v-model="form.name">
          </el-input>
        </el-form-item>

        <el-form-item
          label="Display Name"
        >
          <el-input
            placeholder="display_name"
            v-model="form.display_name">
          </el-input>
        </el-form-item>

        <el-form-item
          label="Code"
        >
          <el-input
            :disabled="readOnly"
            placeholder="code"
            v-model="form.code">
          </el-input>
        </el-form-item>

        <el-form-item
          label="Remarks"
        >
          <el-input
            placeholder="remarks"
            v-model="form.remarks">
          </el-input>
        </el-form-item>

        <el-form-item
          label="Currencies"
        >
          <el-input
            placeholder="Currencies"
            v-model="form.currencies">
          </el-input>
        </el-form-item>

        <el-form-item
          label="Payment Type"
        >
          <el-select
            v-model="form.payment_type"
            placeholder="Select"
          >
            <el-option
              v-for="item in dropList.payment_type"
              v-if="item.value"
              :key="item.key"
              :value="item.key"
              :label="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Customer Id"
        >
          <el-input
            placeholder="customer_id"
            v-model="form.customer_id">
          </el-input>
        </el-form-item>

        <el-form-item
          label="Customer Key"
        >
          <el-input
            placeholder="customer_key"
            v-model="form.customer_key">
          </el-input>
        </el-form-item>

        <el-form-item
          label="Request Url"
        >
          <el-input
            placeholder="request_url"
            v-model="form.request_url">
          </el-input>
        </el-form-item>

        <el-form-item
          label="Request Type"
        >
          <el-select
            v-model="form.request_type"
            placeholder="Select"
          >
            <el-option
              v-for="item in dropList.request_type"
              v-if="item.value"
              :key="item.key"
              :value="item.key"
              :label="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Max Deposit"
        >
          <el-input
            placeholder="max_deposit"
            v-model="form.max_deposit">
          </el-input>
        </el-form-item>

        <el-form-item
          label="Min Deposit"
        >
          <el-input
            placeholder="min_deposit"
            v-model="form.min_deposit">
          </el-input>
        </el-form-item>

        <el-form-item
          label="Need Fee"
        >
          <el-select
            v-model="form.is_fee"
            placeholder="Select"
          >
            <el-option
              v-for="item in dropList.is_fee"
              v-if="item.value"
              :key="item.key"
              :value="item.key"
              :label="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Need Type Amount"
        >
          <el-select
            v-model="form.is_need_type_amount"
            placeholder="Select"
          >
            <el-option
              v-for="item in dropList.is_need_type_amount"
              v-if="item.value"
              :key="item.key"
              :value="item.key"
              :label="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Max Fee"
        >
          <el-input
            placeholder="max_fee"
            v-model="form.max_fee">
          </el-input>
        </el-form-item>

        <el-form-item
          label="Min Fee"
        >
          <el-input
            placeholder="min_fee"
            v-model="form.min_fee">
          </el-input>
        </el-form-item>

        <el-form-item
          label="Fee Rebate"
        >
          <el-input
            placeholder="fee_rebate"
            v-model="form.fee_rebate">
          </el-input>
        </el-form-item>

        <el-form-item
          label="Img"
        >
          <file-upload
            :fileConfig = fileConfig
            @Success="handleUploadSuccess"
          />
        </el-form-item>
        <el-form-item
          label="Related Name"
        >
          <el-input
            placeholder="Related Name"
            v-model="form.related_name">
          </el-input>
        </el-form-item>
        <el-form-item
          label="Related No"
        >
          <el-input
            placeholder="Related No"
            v-model="form.related_no">
          </el-input>
        </el-form-item>
        <el-form-item
          label="Status"
        >
          <el-select
            v-model="form.status"
            placeholder="Status"
          >
            <el-option
              v-for="item in dropList.status"
              v-if="item.value"
              :key="item.key"
              :value="item.key"
              :label="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Sort"
        >
          <el-input
            placeholder="sort"
            v-model="form.sort">
          </el-input>
        </el-form-item>
        <el-form-item
          label="Show Type"
        >
          <el-select
            v-model="form.show_type"
            placeholder="Select"
          >
            <el-option
              v-for="item in dropList.show_type"
              v-if="item.value"
              :key="item.key"
              :value="item.key"
              :label="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item style="margin-top: 10px;">
          <el-button
            type="primary"
            @click="storeOrUpdatePGManagement"
          >Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import filter from '../../util/filter'
import {
  backstageBankManagementPGManagementHttp,
  backstageBankManagementPGManagementDropListHttp,
  backstageBankManagementPGManagementUpdateHttp,
  backstageBankManagementPGManagementStoreHttp
} from '../../api/compony_account_management/initAxios'
import TableComp from '../../components/table/tableComp'
import FormInlineComp from '../../components/form/formInlineComp'
import element from '../../config/element'
import resourcesList from '../../util/static'
import FileUpload from '../../components/file/fileUpload'

export default {
  name: 'PGManagement',
  components: {FileUpload, FormInlineComp, TableComp},
  data () {
    return {
      tableConfig: {
        loading: true,
        border: true,
        tableColumn: [
          {
            prop: 'name',
            label: 'Name'
          },
          {
            prop: 'code',
            label: 'code',
            fixWidth: '210px',
            render: (h, params) => {
              let self = this
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      self.pgManagementDialog.status = true
                      self.pgManagementDialog.title = 'Update'
                      self.pgManagementID = params.item.id
                      self.readOnly = true
                      self.fileConfig.fileList = []
                      if (params.item.image_path) {
                        self.fileConfig.fileList.push({name: 'image', url: params.item.image_path})
                      }
                      this.form.name = params.item.name
                      this.form.display_name = params.item.display_name
                      this.form.code = params.item.code
                      this.form.show_type = params.item.show_type
                      this.form.remarks = params.item.remarks
                      this.form.currencies = params.item.currencies
                      this.form.devices = params.item.devices
                      this.form.payment_type = params.item.payment_type
                      this.form.payment_method = params.item.payment_method
                      this.form.customer_id = params.item.customer_id
                      this.form.customer_key = params.item.customer_key
                      this.form.request_url = params.item.request_url
                      this.form.request_type = params.item.request_type
                      this.form.max_deposit = params.item.max_deposit
                      this.form.min_deposit = params.item.min_deposit
                      this.form.is_fee = Number(params.item.is_fee)
                      this.form.is_need_type_amount = params.item.is_need_type_amount
                      this.form.max_fee = params.item.max_fee
                      this.form.related_name = params.item.related_name
                      this.form.related_no = params.item.related_no
                      this.form.min_fee = params.item.min_fee
                      this.form.fee_rebate = params.item.fee_rebate
                      this.form.status = params.item.status
                      this.form.sort = params.item.sort
                    }
                  }
                }, params.item.code)
              ])
            }
          },
          {
            prop: 'currencies',
            label: 'currency'
          },
          {
            prop: 'max_deposit',
            label: 'max deposit'
          },
          {
            prop: '',
            label: 'image',
            render: (h, params) => {
              if (!params.item.image_path) {
                return
              }
              return h('div', [
                h('img', {
                  style: {
                    display: 'inline-block',
                    boxSizing: 'border-box',
                    textAlign: 'center',
                    overflow: 'hidden',
                    color: '#fff',
                    background: '#C0C4CC',
                    width: '100px',
                    height: '40px',
                    lineHeight: '40px',
                    fontSize: '14px'
                  },
                  domProps: {
                    src: params.item.image_path
                  },
                  on: {
                    click: () => {
                      this.$msgbox({
                        title: 'img',
                        message: h('div', null, [
                          h('el-image', {
                            props: {
                              src: params.item.image_path
                            },
                            style: {
                              width: '100%',
                              height: '100%'
                            }
                          })
                        ]),
                        showCancelButton: true,
                        cancelButtonText: 'close'
                      }).then(action => {
                      })
                    }
                  }
                })
              ])
            }
          },
          {
            prop: 'min_deposit',
            label: 'min deposit'
          },
          {
            prop: 'display_is_fee',
            label: 'need fee'
          },
          {
            prop: 'fee_rebate',
            label: 'fee rebate'
          },
          {
            prop: 'min_fee',
            label: 'min fee'
          },
          {
            prop: 'max_fee',
            label: 'max fee'
          },
          {
            prop: 'remarks',
            label: 'remark'
          },
          {
            prop: 'display_status',
            label: 'status'
          }
        ]
      },
      readOnly: false,
      resInformation: {},
      formInlineConfig: [
        {
          type: 'input',
          label: 'Name',
          formValue: 'name',
          placeholder: 'Name',
          value: ''
        },
        {
          type: 'input',
          label: 'Code',
          formValue: 'code',
          placeholder: 'Code',
          value: ''
        },
        {
          type: 'select',
          label: 'Currency',
          formValue: 'currencies',
          placeholder: 'Select A Currency',
          clearable: true,
          value: '',
          list: ''
        },
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
          type: 'select',
          label: 'Need Fee',
          formValue: 'is_fee',
          placeholder: 'Select A Need Fee',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'search'
        },
        // {
        //   type: 'add'
        // }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        name: '',
        code: '',
        status: '',
        currencies: '',
        is_fee: ''
      },
      form: {
        name: '',
        display_name: '',
        code: '',
        show_type: '',
        remarks: '',
        related_name: '',
        related_no: '',
        currencies: '',
        devices: '',
        payment_type: '',
        payment_method: '',
        customer_id: '',
        customer_key: '',
        request_url: '',
        request_type: '',
        max_deposit: '',
        min_deposit: '',
        is_fee: '',
        is_need_type_amount: '',
        max_fee: '',
        min_fee: '',
        fee_rebate: '',
        image_id: '',
        status: '',
        sort: ''
      },
      pgManagementDialog: {
        status: false,
        title: ''
      },
      dropList: {},
      pgManagementID: '',
      fileConfig: {
        url: '/api/backstage/images',
        fileHeaders: resourcesList.fileHeaders,
        name: 'image',
        limit: 1,
        data: {},
        accept: 'image/*', // 文件上传类型
        fileList: []
      }
    }
  },
  methods: {
    // 数据初始化
    initPGManagement (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageBankManagementPGManagementHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 分页与搜索
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initPGManagement(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initPGManagement(this.formInline)
        return
      }
      this.initPGManagement(value)
    },
    // 下拉列表
    pgManagementDropListHttp () {
      backstageBankManagementPGManagementDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currencies', 'is_fee', 'status'])
        this.dropList = res
      }).catch(() => {
      })
    },
    // 添加或者更新
    storeOrUpdatePGManagement () {
      if (this.pgManagementID) {
        backstageBankManagementPGManagementUpdateHttp(this.pgManagementID, this.form).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.pgManagementDialog.status = false
          this.initPGManagement(this.formInline)
        }).catch((error) => {
          console.log(error)
        })
      } else {
        backstageBankManagementPGManagementStoreHttp(this.form).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.pgManagementDialog.status = false
          this.initPGManagement(this.formInline)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    // 添加准备
    onAdd () {
      this.pgManagementDialog.status = true
      this.pgManagementDialog.title = 'Add'
      this.readOnly = false
      this.fileConfig.fileList = []
      this.pgManagementID = ''
      this.form = {
        name: '',
        display_name: '',
        code: '',
        show_type: '',
        remarks: '',
        related_name: '',
        related_no: '',
        currencies: '',
        devices: '',
        payment_type: '',
        payment_method: '',
        customer_id: '',
        customer_key: '',
        request_url: '',
        request_type: '',
        max_deposit: '',
        min_deposit: '',
        is_fee: '',
        is_need_type_amount: '',
        max_fee: '',
        min_fee: '',
        fee_rebate: '',
        image_id: '',
        status: '',
        sort: ''
      }
    },
    handleUploadSuccess (response, file, fileList) {
      console.log(response)
      this.form.image_id = response.id
    }
  },
  created () {
    this.initPGManagement(this.formInline)
    this.pgManagementDropListHttp()
  }
}
</script>

<style scoped>

</style>
