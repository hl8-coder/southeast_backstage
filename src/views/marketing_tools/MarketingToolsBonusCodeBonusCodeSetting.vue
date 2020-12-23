<style lang="scss" scoped type="text/scss">
  .BonusCodeSetting{
    .border{
      border: 1px solid #eee;
    }
    .el-dialog__body {
      padding: 0 20px 10px;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
      margin-bottom: .2rem;
    }
    .content {
      padding: .2rem 0;
      .el-form-item {
        width: 20%;
        float: left;
        margin-bottom: 0;
      }
      .el-form-item__label {
        width: 100px !important;
      }
      .el-form-item__content {
        margin-left: 100px !important;
      }
    }
    .clear{
      clear: both;
    }
    .content::after, .border::after, .content::before, .border::before {
      display: table;
      content: "";
      clear: both;
    }
    .fileConfig{
      span {
        display: inline-block;
        line-height: 30px;
        width: 128px;
        font-size: 14px;
        text-align: right;
        padding-right: 12px;
        color: #606266;
      }
    }
    .ViewContain{
      .title {
        font-size: 16px;
        color: #666;
        font-weight: 600;
      }
      ul.FlexRowFlexStartFlexStart {
        border: 1px solid #eee;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 10px;
        li {
          width: 150px;
          margin-right: 10px;
        }
      }
    }
  }
</style>
<style lang="scss" type="text/scss">
  .BonusCodeSetting {
    .form_inline_comp{
      overflow: hidden;
      .el-form-item {
        width: 50%;
        float: left;
      }
    }
  }
</style>
<template>
  <div class="BonusCodeSetting">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="danger" @click="downloadExcel">Download</el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <!--添加更新红利-->
    <el-dialog
      :title="bonusDialog.title"
      :visible.sync="bonusDialog.status"
      width="1200px"
    >
      <el-form
        ref="form"
        :model="bonusForm"
        class="form_inline_comp"
        label-width="150px"
      >
        <el-form-item label="Is Claim">
          <el-select v-model="bonusForm.is_claim" placeholder="Is Claim">
            <el-option
              v-for="item in bonusDropList.is_claim"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Group Name">
          <el-select v-model="bonusForm.bonus_group_id" placeholder="Group Name">
            <el-option
              v-for="item in bonusDropList.bonus_group_id"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Bonus Category">
          <el-select v-model="bonusForm.category" placeholder="Bonus Category">
            <el-option
              v-for="item in bonusDropList.category"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Bonus Type">
          <el-select v-model="bonusForm.type" placeholder="Bonus Type">
            <el-option
              v-for="item in bonusDropList.type"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Bonus Code">
          <el-input
            :disabled="showThis"
            v-model="bonusForm.code"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item label="Rollover">
          <el-input
            v-model="bonusForm.rollover"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item label="Product Code">
          <el-select v-model="bonusForm.product_code" placeholder="Product Code">
            <el-option
              v-for="item in bonusDropList.product_code"
              :label="item.value"
              :key="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Bonus Amount">
          <el-input
            v-model="bonusForm.amount"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item label="Effective Date">
          <el-date-picker
            v-model="bonusForm.effective_date"
            type="daterange"
            range-separator="to"
            start-placeholder="Effective Start At"
            end-placeholder="Effective End At"
          />
        </el-form-item>
        <el-form-item label="Auto Hold Withdrawal">
          <el-select v-model="bonusForm.is_auto_hold_withdrawal" placeholder="Auto Hold Withdrawal">
            <el-option
              v-for="item in bonusDropList.is_auto_hold_withdrawal"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Sign Up Date">
          <el-date-picker
            v-model="bonusForm.sign_date"
            type="daterange"
            range-separator="to"
            start-placeholder="Sign Start At"
            end-placeholder="Sign End At"
          />
        </el-form-item>
        <el-form-item label="Recycle">
          <el-select v-model="bonusForm.cycle" placeholder="Recycle">
            <el-option
              v-for="item in bonusDropList.cycle"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="bonusForm.status" placeholder="Status">
            <el-option
              v-for="item in bonusDropList.status"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Member Type">
          <el-select v-model="bonusForm.user_type" placeholder="Member Type">
            <el-option
              v-for="item in bonusDropList.user_type"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item/>
        <el-form-item label="Risk Group">
          <el-select v-model="bonusForm.risk_group_ids" multiple placeholder="Risk Group">
            <el-option
              v-for="item in bonusDropList.risk_group_ids"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <div class="clear"></div>
      </el-form>
      <el-form
        label-width="150px"
      >
        <div>
          <el-form-item label="Payment Group" style="width: 50%;float: right">
            <el-select v-model="bonusForm.payment_group_ids" multiple placeholder="Payment Group">
              <el-option
                v-for="item in bonusDropList.payment_group_ids"
                :label="item.value"
                :key="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <div class="clear"></div>
        </div>
        <div>
          <el-form-item label="Member List" style="width: 50%;float: right">
            <el-button @click="selectFile">select file</el-button>
            <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style="display: none" name="user_ids" id="user_ids" @change="selectFileChange($event)">
          </el-form-item>
          <div class="clear"></div>
        </div>
      </el-form>
      <el-form
        label-width="150px"
      >
        <el-form-item label="Languages">
          <el-button type="primary" @click="addArr('language')">Add</el-button>
        </el-form-item>
      </el-form>
      <div class="border" v-if="bonusForm.languages.length">
        <div
          class="content"
          v-for="(item, key) in bonusForm.languages"
          :key="key"
        >
          <el-form
            :model="bonusForm"
            label-width="105px"
          >
            <el-form-item label="Language">
              <el-select v-model="item.language" placeholder="Select A Language">
                <el-option
                  v-for="(item1, key1) in bonusDropList.language"
                  :key="key1"
                  :label="item1.value"
                  :value="item1.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Title">
              <el-input
                v-model="item.title"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="deleteArr(key, 'language')">Delete</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-form
        label-width="150px"
      >
        <el-form-item label="Currencies" style="width: 100%">
          <el-button @click="addArr('currency')" type="primary">Add</el-button>
        </el-form-item>
      </el-form>
      <div class="border" v-if="bonusForm.currencies.length">
        <div
          class="content"
          v-for="(item, key) in bonusForm.currencies"
          :key="key"
        >
          <el-form
            :model="bonusForm"
            label-width="105px"
          >
            <el-form-item label="Currency" prop="Currency">
              <el-select v-model="item.currency" placeholder="Select A Currency">
                <el-option
                  v-for="(item1, key1) in bonusDropList.currency"
                  :key="key1"
                  :label="item1.value"
                  :value="item1.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Min Transfer">
              <el-input
                v-model="item.min_transfer"
              />
            </el-form-item>
            <el-form-item label="No.Txn">
              <el-input
                v-model="item.deposit_count"
              />
            </el-form-item>
            <el-form-item label="Max Payout">
              <el-input
                v-model="item.max_prize"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="deleteArr(key, 'currency')">Delete</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-form>
        <el-form-item style="width: 100%" align="right">
          <el-button type="primary" @click="addBonus">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--用户显示-->
    <el-dialog
      title="Member List"
      :visible.sync="memberListStatus"
    >
      <table-comp
        :tableConfig = memberListTableConfig
        :resInformation = users
        @handleSizePageChange = memberListCallbacks
      ></table-comp>
    </el-dialog>
  </div>
</template>

<script>
import {
  backstageBonusesHttp,
  backstageDropListBonusHttp,
  backstageBonusesExcelDownloadHttp,
  addbackstageBonusesHttp,
  patchBackstageBonusesHttp, backstageMarketingToolsBonusCodeSettingUsersHttp
} from '../../api/marketing_tools/initAxios'
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {mapGetters} from 'vuex'
import element from '../../config/element'
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'BonusCodeSetting',
  data () {
    return {
      bonusDialog: {
        status: false,
        title: ''
      },
      bonusForm: {
        is_claim: '',
        category: '',
        code: '',
        product_code: '',
        effective_date: [],
        effective_start_at: '',
        effective_end_at: '',
        sign_date: [],
        sign_start_at: '',
        sign_end_at: '',
        status: '',
        bonus_group_id: '',
        type: '',
        rollover: '',
        amount: '',
        is_auto_hold_withdrawal: '',
        cycle: '',
        user_type: '',
        risk_group_ids: [],
        payment_group_ids: [],
        currencies: [],
        languages: [],
        user_ids: []
      },
      bonusID: '',
      bonusDropList: {},
      formLabelWidth: '140px',
      DropList: {},
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'created_at',
            label: 'Create Date/Time'
          },
          {
            prop: 'bonus_group_name',
            label: 'Group Name'
          },
          // {
          //   prop: 'title',
          //   label: 'Bonus Title'
          // },
          {
            prop: 'code',
            label: 'Bonus Code',
            render: (h, params) => {
              return h('div', [
                h('el-link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.showThis = true
                      // 防止深拷贝 不要删
                      let info = JSON.parse(JSON.stringify(params.item))
                      this.bonusID = info.id
                      this.bonusForm.code = info.code
                      this.bonusForm.rollover = info.rollover
                      this.bonusForm.amount = info.amount
                      this.bonusForm.category = info.category
                      this.bonusForm.cycle = info.cycle
                      this.bonusForm.bonus_group_id = info.bonus_group_id
                      this.bonusForm.product_code = info.product_code
                      this.bonusForm.user_type = info.user_type
                      this.bonusForm.type = info.type
                      this.bonusForm.risk_group_ids = info.risk_group_ids
                      this.bonusForm.payment_group_ids = info.payment_group_ids
                      this.bonusForm.currencies = info.currencies
                      this.bonusForm.languages = info.languages
                      this.bonusForm.status = Number(info.status)
                      this.bonusForm.is_auto_hold_withdrawal = Number(info.is_auto_hold_withdrawal)
                      this.bonusForm.is_claim = Number(info.is_claim)
                      this.bonusForm.effective_date = [info.effective_start_at, info.effective_end_at]
                      this.bonusForm.sign_date = [info.sign_start_at, info.sign_end_at]
                      this.bonusDialog.title = 'Update Bonus'
                      this.bonusDialog.status = true
                    }
                  }
                }, params.item.code)
              ])
            }
          },
          {
            prop: 'product_code',
            label: 'Products'
          },
          {
            prop: 'effective_start_at',
            label: 'Effective From Date'
          },
          {
            prop: 'effective_end_at',
            label: 'Effective To Date'
          },
          {
            prop: 'display_status',
            label: 'Status'
          },
          {
            prop: 'user_count',
            label: 'Number',
            render: (h, params) => {
              if (params.item.user_count === 0) {
                return h('div', [
                  h('span', {
                  }, params.item.user_count)
                ])
              }
              return h('div', [
                h('el-link', {
                  props: {
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.getUsersByBonus(params.item.id)
                      this.memberListStatus = true
                    }
                  }
                }, params.item.user_count)
              ])
            }
          },
          {
            prop: 'admin_name',
            label: 'Last Update'
          }
        ]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Bonus Code',
          formValue: 'code',
          placeholder: 'Bonus Code',
          value: ''
        },
        {
          type: 'input',
          label: 'Bonus Title',
          formValue: 'title',
          placeholder: 'Bonus Title',
          value: ''
        },
        {
          type: 'select',
          label: 'Group Name',
          formValue: 'bonus_group_id',
          placeholder: 'Select A Group Name',
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
          label: 'Products',
          formValue: 'product_code',
          placeholder: 'Select A Products',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'date',
          label: 'Date'
        },
        {
          type: 'date',
          formKey1: 'effective_start_at',
          formKey2: 'effective_end_at',
          label: 'Effective Date'
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
        bonus_group_id: '',
        title: '',
        status: '',
        effective_start_at: '',
        effective_end_at: '',
        start_at: '',
        end_at: ''
      },
      showThis: false,
      users: {},
      memberListStatus: false,
      memberListTableConfig: {
        border: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'name',
            label: 'Member Code'
          },
          {
            prop: 'display_status',
            label: 'Status'
          },
          {
            prop: 'created_at',
            label: 'Registration Date'
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'display_payment_group_id',
            label: 'payment Group'
          },
          {
            prop: 'display_risk_group_id',
            label: 'Risk Group'
          }
        ]
      },
      memberListFormInline: {
        per_page: 50,
        page: 1
      }
    }
  },
  activated () {
    // 将下拉菜单放到activated中是因为，需要及时更新红利分组
    this.DropListHttp()
  },
  created () {
    this.initHttp(this.formInline)
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  components: {
    tableComp, formInlineComp
  },
  methods: {
    // 下载模板
    downloadExcel () {
      backstageBonusesExcelDownloadHttp().then((res) => {
        filter.downloadExcel(res)
      })
    },
    // 红利 DropList
    DropListHttp () {
      backstageDropListBonusHttp().then(res => {
        this.DropList = res
        this.bonusDropList = res
        filter.formValueListFilter(this.formInlineConfig, res, ['bonus_group_id', 'product_code', 'status'])
        filter.formValueListFilter(this.formConfig, res, [
          'bonus_group_id',
          'category', 'is_claim',
          'cycle',
          'is_auto_hold_withdrawal',
          'payment_group_ids',
          'product_code',
          'risk_group_ids',
          'user_type'
        ])
      }).catch(() => {
      })
    },
    // 红利列表请求
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include && !formInline.per_page && !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageBonusesHttp(datalist).then(res => {
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
    // 添加红利
    onAdd () {
      this.bonusID = ''
      this.showThis = false
      this.clearForm()
      this.bonusDialog.title = 'Add Bonus Code'
      this.bonusDialog.status = true
    },
    // 添加数组
    addArr (value) {
      if (value === 'currency') {
        this.bonusForm.currencies.push({
          currency: '',
          min_transfer: '',
          deposit_count: '',
          max_prize: ''
        })
      } else {
        this.bonusForm.languages.push({
          language: '',
          title: ''
        })
      }
    },
    // 删除数组
    deleteArr (key, value) {
      if (value === 'currency') {
        this.bonusForm.currencies.splice(key, 1)
      } else {
        this.bonusForm.languages.splice(key, 1)
      }
    },
    // 添加红利
    addBonus () {
      if (!this.bonusForm.languages.length) {
        element.message({
          type: 'error',
          message: 'Language cannot be empty'
        })
        return false
      }
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.bonusForm.effective_start_at = moment(this.bonusForm.effective_date[0]).format('YYYY-MM-DD')
        this.bonusForm.effective_end_at = moment(this.bonusForm.effective_date[1]).format('YYYY-MM-DD')
        this.bonusForm.sign_start_at = moment(this.bonusForm.sign_date[0]).format('YYYY-MM-DD')
        this.bonusForm.sign_end_at = moment(this.bonusForm.sign_date[1]).format('YYYY-MM-DD')
        if (this.bonusID) {
          patchBackstageBonusesHttp(this.bonusID, this.bonusForm).then(res => {
            element.message({
              type: 'success',
              message: 'Success'
            })
            this.bonusDialog.status = false
            this.initHttp(this.formInline)
          }).catch((error) => {
            this.bonusDialog.status = false
            console.log(error)
          })
        } else {
          addbackstageBonusesHttp(this.bonusForm).then(res => {
            element.message({
              type: 'success',
              message: 'Success'
            })
            this.bonusDialog.status = false
            this.initHttp(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        }
      }).catch(() => {
      })
    },
    // 选择文件
    selectFile () {
      let select = document.getElementById('user_ids')
      select.click()
    },
    // 上传文件改变
    selectFileChange (e) {
      this.readExcel(e.target.files[0])
      // this.bonusForm.user_ids = ReadFile.readExcel(e.target.files[0])
      // this.bonusForm.user_ids = e.target.files[0]
    },
    // 清空数据
    clearForm () {
      this.bonusForm = {
        is_claim: '',
        category: '',
        title: '',
        code: '',
        product_code: '',
        effective_date: [],
        effective_start_at: '',
        effective_end_at: '',
        sign_date: [],
        sign_start_at: '',
        sign_end_at: '',
        status: '',
        bonus_group_id: '',
        type: '',
        rollover: '',
        amount: '',
        is_auto_hold_withdrawal: '',
        cycle: '',
        user_type: '',
        risk_group_ids: [],
        payment_group_ids: [],
        currencies: [],
        languages: [],
        user_ids: []
      }
    },
    // 读取Excel文件
    readExcel (files) {
      console.log(files)
      let that = this
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = e.target.result
          const workBook = XLSX.read(data, {
            type: 'binary'
          })
          const wsName = workBook.SheetNames[0]
          const ws = XLSX.utils.sheet_to_json(workBook.Sheets[wsName])
          that.bonusForm.user_ids = []
          for (let i = 0; i < ws.length; i++) {
            let sheetData = ws[i].Member_code
            that.bonusForm.user_ids.push(sheetData)
          }
        } catch (e) {
          console.log(e.message)
        }
      }
      reader.readAsBinaryString(files)
    },
    // 获取红利的会员
    getUsersByBonus (bonus) {
      backstageMarketingToolsBonusCodeSettingUsersHttp(bonus, this.memberListFormInline).then(res => {
        this.users = res
        console.log(this.users)
      }).catch((error) => {
        console.log(error)
      })
    },
    memberListCallbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.memberListFormInline.page = value.page
        this.getUsersByBonus(this.memberListFormInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.memberListFormInline.per_page = value.per_page
        this.getUsersByBonus(this.memberListFormInline)
        return
      }
      this.getUsersByBonus(value)
    }
  }
}
</script>
