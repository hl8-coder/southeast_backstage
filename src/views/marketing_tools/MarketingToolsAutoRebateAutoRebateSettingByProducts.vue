<style lang="scss" scoped type="text/scss">
  .AutoRebateSettingByProducts{
    .el-dialog__body{
      padding: 0 20px 10px;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
      margin-bottom: .2rem;
    }
  }
  .form_inline_comp{
    overflow: hidden;
    .el-form-item {
      width: 50%;
      float: left;
    }
  }
  .content {
    overflow: hidden;
    padding: .2rem 0;
    .el-form-item {
      float: left;
      margin-bottom: 0;
    }
  }
  .content::after {
    display: table;
    content: "";
    clear: both;
  }
  .border{
    border: 1px solid #eee;
  }
</style>
<template>
  <div class="AutoRebateSettingByProducts">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.status"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="Rebate Code">
          <el-input
            v-model="form.code"
            :disabled="codeStatus"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item label="Product Code">
          <el-select v-model="form.product_code" placeholder="Product Code">
            <el-option
              v-for="item in dropList.product_code"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Initiate Payout">
          <el-select v-model="form.is_manual_send" placeholder="Initiate Payout">
            <el-option
              v-for="item in dropList.is_manual_send"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="form.status" placeholder="Status">
            <el-option
              v-for="item in dropList.status"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Risk Group">
          <el-select v-model="form.risk_group_id" placeholder="Risk Group">
            <el-option
              v-for="item in dropList.risk_group_id"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Currencies">
          <el-button @click="addArr('currency')" type="primary">Add</el-button>
        </el-form-item>
        <div class="border" v-if="form.currencies.length">
          <div
            class="content"
            v-for="(item, key) in form.currencies"
            :key="key"
          >
            <el-form-item label="Currency" prop="Currency">
              <el-select style="width: 150px;" v-model="item.currency" placeholder="Select A Currency">
                <el-option
                  v-for="(item1, key1) in dropList.currency"
                  :key="key1"
                  :label="item1.value"
                  :value="item1.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Min Payout">
              <el-input
                style="width: 150px;"
                v-model="item.min_prize"
              />
            </el-form-item>
            <el-form-item label="Max Payout">
              <el-input
                v-model="item.max_prize"
                style="width: 150px;"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="deleteArr(key, 'currency')">Delete</el-button>
            </el-form-item>
            <hr style="clear: both"/>
          </div>
        </div>
        <el-form-item label="Member Profiling">
          <el-button @click="addArr('vip')" type="primary">Add</el-button>
        </el-form-item>
        <div class="border" v-if="form.vips.length">
          <div
            class="content"
            v-for="(item, key) in form.vips"
            :key="key"
          >
            <el-form-item label="Member Profiling">
              <el-select
                v-model="item.vip_id"
                style="width: 150px;"
                placeholder="Select A Member Profiling"
              >
                <el-option
                  v-for="item2 in dropList.vip_id"
                  :key="item2.value"
                  :label="item2.value"
                  :value="item2.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Multipiler(%)">
              <el-input
                v-model="item.multipiler"
                style="width: 150px;"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="deleteArr(key, 'vip')">Delete</el-button>
            </el-form-item>
          </div>
        </div>
        <el-form-item style="margin-top: 1rem">
          <el-button type="primary" @click="submitRebate">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  backstageRebatesHttp,
  backstageDropListRebateHttp,
  addbackstageRebatesHttp,
  patchBackstageRebatesHttp
} from '../../api/marketing_tools/initAxios'
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import fileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
import element from '../../config/element'
import {mapGetters} from 'vuex'
import filter from '../../util/filter'
export default {
  name: 'AutoRebateSettingByProducts',
  data () {
    return {
      dialog: {
        status: false,
        title: ''
      },
      form: {
        code: '',
        product_code: '',
        is_manual_send: '',
        status: '',
        risk_group_id: '',
        currencies: [],
        vips: []
      },
      dropList: {
        status: [],
        risk_group_id: [],
        product_code: [],
        is_manual_send: [],
        currency: [],
        vip_id: []
      },
      codeStatus: false,
      rebateId: '',
      fileConfig: {
        disabled: false,
        autoUpload: false,
        url: '/api/backstage/bonuses',
        fileHeaders: resourcesList.fileHeaders,
        name: 'excel',
        limit: 1,
        data: {},
        fileList: []
      },
      DropList: {},
      Visible: false,
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'code',
          label: 'Rebate Code',
          width: '80',
          render: (h, params) => {
            return h('div', [
              h('el-link', {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                on: {
                  click: () => {
                    this.dialog.status = true
                    this.dialog.title = 'Update Rebate'
                    this.codeStatus = true
                    this.rebateId = params.item.id
                    this.form.code = params.item.code
                    this.form.product_code = params.item.product_code
                    this.form.is_manual_send = Number(params.item.is_manual_send)
                    this.form.status = Number(params.item.status)
                    this.form.risk_group_id = params.item.risk_group_id
                    this.form.currencies = params.item.currencies
                    this.form.vips = params.item.vips
                  }
                }
              }, params.item.code)
            ])
          }
        }, {
          prop: 'product_code',
          label: 'Products',
          width: '80'
        }, {
          prop: 'display_status',
          label: 'Status',
          width: '80'
        }, {
          prop: 'display_is_manual_send',
          label: 'Initiate Payout',
          width: '80'
        }, {
          prop: 'admin_name',
          label: 'Update By',
          width: '80'
        }, {
          prop: 'display_risk_group_id',
          label: 'Risk Group',
          width: '80'
        }]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Rebate Code',
          formValue: 'code',
          placeholder: 'Rebate Code',
          value: ''
        },
        {
          type: 'select',
          label: 'Products',
          formValue: 'product_code',
          placeholder: 'Select A Products',
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
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        code: '',
        product_code: '',
        status: ''
      },
      formConfig: [
        {
          type: 'input',
          label: 'Rebate Code',
          formValue: 'code',
          placeholder: 'Rebate Code',
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
          type: 'input',
          label: 'Min Prize',
          formValue: 'min_prize',
          placeholder: 'Min Prize',
          value: ''
        },
        {
          type: 'input',
          label: 'Max Prize',
          formValue: 'max_prize',
          placeholder: 'Max Prize',
          value: ''
        },
        {
          type: 'select',
          label: 'Is Manual Send',
          formValue: 'is_manual_send',
          placeholder: 'Is Manual Send',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Status',
          formValue: 'status',
          placeholder: 'Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Product Code',
          formValue: 'product_code',
          placeholder: 'Select A Product Code',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Risk Group',
          formValue: 'risk_group_id',
          placeholder: 'Risk Group',
          clearable: true,
          value: [],
          list: ''
        },
        {
          type: 'Submit',
          popover: true
        }
      ]
    }
  },
  created () {
    this.DropListHttp()
    this.initHttp(this.formInline)
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  components: {
    tableComp, formInlineComp, fileUpload
  },
  methods: {
    DropListHttp () {
      backstageDropListRebateHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['status', 'product_code'])
        this.dropList = res
      }).catch(() => {
      })
    },
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.per_page && !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageRebatesHttp(datalist).then(res => {
        this.resInformation = res
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
    },
    // 添加
    onAdd () {
      this.dialog.status = true
      this.dialog.title = 'Add Rebate'
      this.rebateId = ''
      this.codeStatus = false
      this.clearForm()
    },
    // 添加数组
    addArr (value) {
      if (value === 'currency') {
        this.form.currencies.push({
          currency: '',
          min_prize: '',
          max_prize: ''
        })
      } else if (value === 'vip') {
        this.form.vips.push({
          vip_id: '',
          amount: ''
        })
      }
    },
    // 删除数组
    deleteArr (key, value) {
      if (value === 'currency') {
        this.form.currencies.splice(key, 1)
      } else if (value === 'vip') {
        this.form.vips.splice(key, 1)
      }
    },
    // 提交
    submitRebate () {
      if (!filter.validationFilterByEcho(this.form, [], ['risk_group_id'])) {
        return
      }
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        // 有id是更新
        if (this.rebateId) {
          patchBackstageRebatesHttp(this.rebateId, this.form).then(res => {
            element.message({
              type: 'success',
              message: 'Success'
            })
            this.dialog.status = false
            this.rebateId = ''
            this.initHttp(this.formInline)
          }).catch(() => {
          })
          return
        }
        addbackstageRebatesHttp(this.form).then(res => {
          element.message({
            type: 'success',
            message: 'Success'
          })
          this.dialog.status = false
          this.initHttp(this.formInline)
          this.form.forEach(item => {
            item.value = ''
          })
        }).catch(() => {
        })
      }).catch(() => {
      })
    },
    // 清空数据
    clearForm () {
      for (var i in this.form) {
        if (i === 'currencies' || i === 'vips') {
          this.form[i] = []
        } else {
          this.form[i] = ''
        }
      }
    }
  }
}
</script>
