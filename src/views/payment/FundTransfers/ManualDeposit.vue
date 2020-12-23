<template>
  <div class="ManualDeposit">
    <el-main
      v-loading="!manualLoading"
      style="height: 600px"
    >
      <el-menu
        :default-active=activeIndex
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item
          v-for="item in menus"
          :key="item.id + 'y'"
          :index="item.id"
        >
          <div @click="setPlatformType(item)">{{item.name}}</div>
        </el-menu-item>
      </el-menu>
      <!--Bank Transfer type === 1-->
      <el-form
        v-loading="formLoading"
        v-if="form.payment_type === 1"
        label-width="220px"
      >
        <el-form-item
          label="Member Code:"
        >
          <el-input
            style="width: 220px"
            readonly
            v-model="form.user_name"
            placeholder="Enter The Member Code"
          />
        </el-form-item>
        <el-form-item
          label="Deposit Amount:"
        >
          <el-input
            v-model="form.amount"
            placeholder="Enter the deposit amount"
          />
        </el-form-item>
        <el-form-item
          label="Select a Bank Account:"
        >
          <el-select
            v-model="form.company_bank_account_id"
            placeholder="Select"
          >
            <el-option
              v-for="item in bankResInformation.data"
              :key="item.companyBankAccount.id"
              :label="item.companyBankAccount.bank_code"
              :value="item.companyBankAccount.id"
            >
              <div
                @click="paymentPlatform(item.companyBankAccount)"
              >
                <span style="float: left; width: 150px;">{{ item.companyBankAccount.bank_code }}</span>
                <span style="margin: 0 5px; width: 150px;">{{ item.companyBankAccount.account_name }}</span>
                <span style="margin: 0 5px; width: 150px;">{{ item.companyBankAccount.account_no }}</span>
                <span style="float: right; width: 150px;">{{ item.companyBankAccount.branch }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Deposit Date and Time:"
        >
          <el-date-picker
            v-model="form.deposit_date"
            type="date"
            placeholder="Select date"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="Deposit Channel:"
        >
          <el-select
            v-model="form.online_banking_channel"
            placeholder="Select"
            @change="channelChange"
            clearable
          >
            <el-option
              v-for="item in dropList.online_banking_channel"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Bank Account:"
          v-if="bankFormItemStatus.bankAccountNo"
        >
          <el-select
            v-model="form.user_bank_account_id"
            placeholder="Select"
          >
            <el-option
              v-for="item in userBankList"
              :key="item.id"
              :label="item.bank.code + '-' + item.account_no"
              :value="item.id"
            >
              {{item.bank.code + '-' + item.account_no}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Bank Account Name:"
          v-if="bankFormItemStatus.bankAccountName"
        >
          <el-input
            readonly
            v-model="form.user_bank_account_name"
            placeholder="Enter the Bank Account Name"
          />
        </el-form-item>
        <el-form-item
          label="Select a bank:"
          v-if="bankFormItemStatus.selectBank"
        >
          <el-select
            v-model="form.user_bank_id"
            placeholder="Select">
            <el-option
              v-for="item in companyBankAccountList.bank"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="bankFormItemStatus.reference"
          label="Reference ID (if applicable):"
        >
          <el-input
            v-model="form.reference_id"
            placeholder="Enter the Reference ID"
          />
        </el-form-item>
        <el-form-item
          label="Upload Deposit Receipt:"
        >
          <file-upload
            :fileConfig = fileConfig
            @Success="handleUploadSuccess"
          />
        </el-form-item>
      </el-form>
      <!--Scratch  type === 4-->
      <el-form
        v-loading="formLoading"
        v-if="form.payment_type === 4"
        label-width="220px"
      >
        <el-form-item
          label="Member Code:"
        >
          <el-input
            style="width: 220px"
            readonly
            v-model="form.user_name"
            placeholder="Enter The Member Code"
          />
        </el-form-item>
        <el-form-item
          label="Choose Network:"
        >
          <el-select
            v-model="form.card_type"
            placeholder="Select"
          >
            <el-option
              v-for="item in cardList.card_types"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            >
              <div
                @click="paymentPlatform(cardList)"
              >
                {{item.value}}
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Price per Value:"
        >
          <el-select
            v-model="form.amount"
            placeholder="Select">
            <el-option
              v-for="item in pricePer"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Card Pin:"
        >
          <el-input
            v-model="form.pin_number"
            placeholder="Enter The Card Pin"
          />
        </el-form-item>
        <el-form-item
          label="Card Serial:"
        >
          <el-input
            v-model="form.serial_number"
            placeholder="Enter The Card Serial"
          />
        </el-form-item>
      </el-form>
      <!--mpay type === 3-->
      <el-form
        v-loading="formLoading"
        v-if="form.payment_type === 3"
        label-width="220px"
      >
        <el-form-item
          label="Member Code:"
        >
          <el-input
            style="width: 220px"
            readonly
            v-model="form.user_name"
            placeholder="Enter The Member Code"
          />
        </el-form-item>
        <el-form-item
          label="Deposit Amount:"
        >
          <el-input
            style="width: 220px"
            v-model="form.amount"
            placeholder="Deposit Amount"
          />
        </el-form-item>
        <el-form-item
          label="Account name:"
        >
          <el-input
            style="width: 220px"
            disabled
            v-model="cardList.related_name"
          />
        </el-form-item>
        <el-form-item
          label="Phone NUmber:"
        >
          <el-input
            style="width: 220px"
            disabled
            v-model="cardList.related_no"
          />
        </el-form-item>
        <el-form-item
          label="Payment Method:"
        >
          {{cardList.name}}
        </el-form-item>
        <el-form-item
          label="your mpay number:"
        >
          <el-select
            v-model="form.user_mpay_number"
            placeholder="Select">
            <el-option
              v-for="item in userMpayNumber.user_mpay_numbers"
              :key="item.country_code"
              :label="item.country_code + '-' + item.number"
              :value="item.country_code + '-' + item.number">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Your Trading Code:"
        >
          <el-input
            v-model="form.mpay_trading_code"
            placeholder="Enter Trading Code"
          />
        </el-form-item>
      </el-form>
      <!--mpay type === 5-->
      <el-form
        v-loading="formLoading"
        v-if="form.payment_type === 5"
        label-width="220px"
      >
        <el-form-item
          label="Member Code:"
        >
          <el-input
            style="width: 220px"
            readonly
            v-model="form.user_name"
            placeholder="Enter The Member Code"
          />
        </el-form-item>
        <el-form-item
          label="LINE ID:"
        >
          <el-input
            style="width: 220px"
            v-model="form.linepay_id"
            placeholder="LINE ID"
          />
        </el-form-item>
        <el-form-item
          label="Deposit Amount:"
        >
          <el-input
            style="width: 220px"
            v-model="form.amount"
            placeholder="Deposit Amount"
          />
        </el-form-item>
        <el-form-item
          label="Date:"
        >
          <el-date-picker
            v-model="form.deposit_date"
            format="yyyy-MM-dd HH:mm"
            type="datetime">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="Upload Deposit Receipt:"
        >
          <file-upload
            :fileConfig = fileConfig
            @Success="handleUploadSuccess"
          />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="doDeposit">Deposit</el-button>
    </el-main>
  </div>
</template>

<script>
import TableComp from '../../../components/table/tableComp'
import FileUpload from '../../../components/file/fileUpload'
import resourcesList from '../../../util/static'
import {
  backstageManualDepositMenuHttp,
  backstageManualDepositPaymentPlatformHttp,
  backstageManualDepositPaymentPlatformDropListHttp,
  backstageManualDepositHttp,
  backstageManualDepositBankDropListHttp,
  backstageGetUserBankHttp,
  backstageUserMpayNumberHttp
} from '../../../api/payment/deposit/initAxios'
import filter from '../../../util/filter'
import element from '../../../config/element'
export default {
  name: 'ManualDeposit',
  props: ['userInfo'],
  components: {
    FileUpload,
    TableComp
  },
  data () {
    return {
      menus: [],
      activeIndex: '0',
      bankResInformation: {},
      form: {
        amount: '',
        user_name: '',
        is_agent: 0,
        company_bank_account_id: '',
        user_bank_account_id: '',
        user_mpay_number: '',
        mpay_trading_code: '',
        deposit_date: '',
        online_banking_channel: '',
        payment_platform_id: '',
        payment_type: 1,
        reference_id: '',
        user_bank_account_name: '',
        user_bank_id: '',
        card_type: '',
        pin_number: '',
        receipts: '',
        linepay_id: '',
        serial_number: ''
      },
      dropList: {},
      fileConfig: {
        url: '/api/backstage/images',
        fileHeaders: resourcesList.fileHeaders,
        name: 'image',
        limit: 1,
        data: {},
        accept: 'image/*', // 文件上传类型
        fileList: []
      },
      bankTransferShow: true,
      platformFormInline: {
        include: 'companyBankAccount',
        payment_type: 1,
        id: '',
        currency: ''
      },
      bankFormItemStatus: {
        bankAccountNo: false,
        bankAccountName: false,
        selectBank: false,
        reference: false
      },
      companyBankAccountList: {},
      isCheck: false,
      user: {},
      userBankList: [],
      allBankList: [],
      pricePer: [],
      manualLoading: false,
      formLoading: false,
      cardList: {},
      userMpayNumber: {
        user_mpay_numbers: []
      }
    }
  },
  watch: {
    'userInfo' (val) {
      this.setUserInfo(val)
    }
  },
  methods: {
    // 初始化User信息
    setUserInfo (user) {
      this.cleanForm()
      this.bankFormItemStatus = {
        bankAccountNo: false,
        bankAccountName: false,
        selectBank: false,
        reference: false
      }
      this.fileConfig.fileList = []
      this.user = user
      this.form.user_name = user.name
      this.form.is_agent = Number(user.is_agent)
      this.form.user_bank_account_name = user.info.full_name
      this.platformFormInline.currency = user.currency
      this.getUserBanks(user.id)
      this.getManualDepositBank()
      this.getDepositChannelMenu()
      this.getBankAccountList()
      this.backstageUserMpayNumber(user.name);
      console.log(this.form.payment_type)
    },
    backstageUserMpayNumber(name) {
      var data = {
        user_name: name,
        is_agent: 0
      }
      backstageUserMpayNumberHttp(data).then(res => {
        this.userMpayNumber = res
        this.form.user_mpay_number = res.length !== 0 ? res.user_mpay_numbers[0].country_code + '-' + res.user_mpay_numbers[0].number : ''
      })
    },
    // 获取充值渠道菜单
    getDepositChannelMenu () {
      this.manualLoading = false
      backstageManualDepositMenuHttp({currency: this.user.currency}).then(res => {

        res.data.map(item => {
          if(!item.id) {
            item.id = 0
          }
          item.id = item.id.toString()
          return item
        })
        console.log(res.data)
        this.menus = res.data
        this.manualLoading = true
      }).catch((error) => {
        console.log(error)
      })
    },
    // 获取Deposit Channel
    getDropList () {
      backstageManualDepositPaymentPlatformDropListHttp().then(res => {
        this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // 监测渠道变化，展示不同表单
    channelChange (val) {
      switch (val) {
        case 1:
        case 2:
        case 3:
          this.bankFormItemStatus.bankAccountNo = true
          this.bankFormItemStatus.bankAccountName = false
          this.bankFormItemStatus.selectBank = false
          break
        case 4:
        case 5:
          this.bankFormItemStatus.bankAccountNo = false
          this.bankFormItemStatus.bankAccountName = true
          this.bankFormItemStatus.selectBank = true
          break
      }
      this.bankFormItemStatus.reference = true
    },
    // 获取会员的银行卡
    getUserBanks () {
      if (!this.user) {
        element.message({
          type: 'error',
          message: 'Please check member code'
        })
        return false
      }
      backstageGetUserBankHttp(this.user.id, {include: 'bank'}).then(res => {
        this.isCheck = true
        this.userBankList = res.data
      }).catch((error) => {
        this.isCheck = false
        console.log(error)
      })
    },
    // 根据会员的币别获取公司的银行卡
    getBankAccountList () {
      this.bankResInformation = {}
      if (!this.platformFormInline.currency) {
        element.message({
          type: 'error',
          message: 'Please check member code'
        })
        return false
      }
      var datalist = filter.formInlineFilterByEcho(this.platformFormInline, ['payment_type', 'id'])
      backstageManualDepositPaymentPlatformHttp(datalist).then(res => {
        if (this.platformFormInline.payment_type === 1) {
          this.bankResInformation = res
        } else if (this.platformFormInline.payment_type === 4 || this.platformFormInline.payment_type === 3 || this.platformFormInline.payment_type === 5) {
          this.cardList = res.data[0]
          this.form.payment_platform_id = res.data[0].id
        }
        this.formLoading = false
      }).catch((error) => {
        console.log(error)
      })
    },
    // 根据会员的币别获取所有银行
    getManualDepositBank () {
      if (!this.user.currency) {
        element.message({
          type: 'error',
          message: 'Please check member code'
        })
        return false
      }
      backstageManualDepositBankDropListHttp(this.user.currency).then(res => {
        this.companyBankAccountList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // 上传凭证
    handleUploadSuccess (response, file, fileList) {
      this.form.receipts = response.id
    },
    // 提交充值表单
    doDeposit () {
      console.log(this.form)
      var form = filter.removeTheNullValue(this.form)
      backstageManualDepositHttp(form).then(res => {
        element.message({
          type: 'success',
          message: 'success'
        })
        this.refreshDepositList()
      }).catch((error) => {
        console.log(error)
      })
    },
    // 设置setPlatformType
    setPlatformType (val) {
      if (val.name.indexOf("FGO") > -1) {
        this.pricePer = [
          {
            value: '50',
            key: '50'
          },
          {
            value: '100',
            key: '100'
          },
          {
            value: '200',
            key: '200'
          },
          {
            value: '300',
            key: '300'
          },
          {
            value: '500',
            key: '500'
          },
          {
            value: '1000',
            key: '1000'
          },
          {
            value: '2000',
            key: '2000'
          },
          {
            value: '5000',
            key: '5000'
          },
          {
            value: '10000',
            key: '10000'
          }
        ];
      } else {
        this.pricePer = [
          {
            value: '10',
            key: '10'
          },
          {
            value: '20',
            key: '20'
          },
          {
            value: '30',
            key: '30'
          },
          {
            value: '40',
            key: '40'
          },
          {
            value: '50',
            key: '50'
          },
          {
            value: '60',
            key: '60'
          },
          {
            value: '70',
            key: '70'
          },
          {
            value: '80',
            key: '80'
          },
          {
            value: '90',
            key: '90'
          },
          {
            value: '100',
            key: '100'
          },
          {
            value: '200',
            key: '200'
          },
          {
            value: '300',
            key: '300'
          },
          {
            value: '400',
            key: '400'
          },
          {
            value: '500',
            key: '500'
          },
          {
            value: '600',
            key: '600'
          },
          {
            value: '700',
            key: '700'
          },
          {
            value: '800',
            key: '800'
          },
          {
            value: '900',
            key: '900'
          },
          {
            value: '1000',
            key: '1000'
          },
        ]
      }
      this.formLoading = true
      this.platformFormInline.payment_type = val.payment_type
      this.platformFormInline.id = val.id
      this.form.payment_type = val.payment_type
      this.getBankAccountList()
    },
    // 动态设置payment_platform_id
    paymentPlatform (val) {
      if (this.form.payment_type === 1) {
        this.form.payment_platform_id = val.platform_id
      } else {
        this.form.payment_platform_id = val.id
      }
    },
    // 父组件 刷新
    refreshDepositList () {
      this.$emit('refreshDepositList')
    },
    cleanForm () {
      this.form = {
        amount: '',
        user_name: '',
        company_bank_account_id: '',
        user_bank_account_id: '',
        deposit_date: '',
        is_agent: 0,
        online_banking_channel: '',
        payment_platform_id: '',
        payment_type: this.form.payment_type,
        reference_id: '',
        user_bank_account_name: '',
        user_bank_id: '',
        card_type: '',
        pin_number: '',
        receipts: '',
        serial_number: ''
      }
    }
  },
  mounted () {
    this.manualLoading = false
    this.getDropList()
  }
}
</script>

<style lang="scss">
  .ManualDeposit {
    .el-input--small .el-input__inner {
      max-width: 220px;
    }
    .el-table__body tr.current-row>td {
      background-color: #67C23A;
    }
  }
</style>
