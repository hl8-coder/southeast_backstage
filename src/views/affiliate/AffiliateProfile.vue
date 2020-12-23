<style scoped lang="scss">
  .childrenNav{
    margin-bottom: 10px;
    .childrenNav{
      border-bottom: none;
      li{
        margin-right: 10px;
        display: inline-block;
      }
    }
  }
  .avatar-uploader {
    width: 300px;
    height: 300px;
    text-align: center;
  }
  .avatar {
    margin: auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #ccc center center no-repeat;
    background-size: cover;
  }
  .uploader-btn {
    margin-top: 20px;
    text-align: center;
  }
  .avatar-update {
    margin-top: 10px;
  }
  .Account-Information{
    margin-right: 100px;
    li{
      width: 500px;
      margin: 10px 0;
      text-align: left;
      line-height: 26px;
    }
    .item-title {
      display: inline-block;
      width: 120px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  .ml-5 {
    float: right;
  }
  .my-box {
    ul {
      border-bottom: 1px solid #666;
      li {
        text-align: center;
        .safe {
          height: 30px;
          font-size: 26px;
          line-height: 30px;
        }
        i {
          font-size: 30px;
        }
      }
    }
    .item-title {
      display: inline-block;
      width: 165px;
    }
    .information{
      padding: 5px 0;
      > li{
        width: 33.33%;
        line-height: 32px;
        text-align: left;
        i {
          font-size: 14px;
        }
        .el-icon-info:hover {
          color: #409EFF;
          cursor: pointer;
        }
        .popWindow{
          color: #409EFF;
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
    .button{
      margin-top: 10px;
    }
  }
  .affiliate-desc {
    text-align: left;
    margin: 10px auto;
    width: 1100px;
    .label {
      width: 120px;
      font-size: 14px;
    }
    .form-line {
      margin-top: 10px;
      padding-left: 60px;
      font-size: 0;
    }
  }
</style>

<template>
  <div class="AffiliateProfile">
    <sub-nav
      :navs="AffiliateNav"
    />
    <div class="FlexRowCenterCenter">
      <div class="avatar-uploader">
        <div class="avatar" :style="`background-image: url(${affiliateDetail.userInfo.avatar})`"></div>
        <file-upload class="uploader-btn"
          :fileConfig="uploadAvatar"
          @Success="handleAvatarUpload"
        ></file-upload>
        <el-button class="avatar-update" @click="updateAffiliate({avatar_id: affiliateDetail.userInfo.avatar_id}, 'Avatar')">update</el-button>
        <el-button type="danger" class="avatar-update" @click="updateAffiliate({avatar_id: 0}, 'Avatar')">delete</el-button>
      </div>
      <ul class="Account-Information">
        <li>
          <div class="item-title">Affiliate ID</div>
          : {{affiliateDetail.user.name}}</li>
        <li>
          <div class="item-title">Affiliate Code</div>
          : {{affiliateDetail.code}}</li>
        <li>
          <div class="item-title">Full Name</div>
          : <el-input clearable style="max-width: 200px" v-model="affiliateDetail.userInfo.full_name" suffix-icon="el-icon-edit" placeholder="Full Name" />
          <el-button class="ml-5" @click="updateAffiliate({full_name: affiliateDetail.userInfo.full_name}, 'Full Name')">update</el-button>
        </li>
        <li>
          <div class="item-title">Phone</div>
          : <el-input clearable style="max-width: 200px" v-model="affiliateDetail.userInfo.phone" suffix-icon="el-icon-edit" placeholder="Phone" />
          <el-button class="ml-5" @click="updateAffiliate({phone: affiliateDetail.userInfo.phone}, 'Phone')">update</el-button>
        </li>
        <li>
          <div class="item-title">Email</div>
          : <el-input clearable style="max-width: 200px" v-model="affiliateDetail.userInfo.email" suffix-icon="el-icon-edit" placeholder="Email" />
          <el-button class="ml-5" @click="updateAffiliate({email: affiliateDetail.userInfo.email}, 'Email')">update</el-button></li>
        <li>
          <div class="item-title">Birth Date</div>
          : <el-input clearable style="max-width: 200px" v-model="affiliateDetail.userInfo.birth_at" suffix-icon="el-icon-edit" placeholder="Birth Date" />
          <el-button class="ml-5" @click="updateAffiliate({birth_at: affiliateDetail.userInfo.birth_at}, 'Birth Date')">update</el-button>
        </li>
        <li>
          <div class="item-title">Gender</div>
          : {{affiliateDetail.userInfo.gender}}</li>
        <li>
          <div class="item-title">Currency</div>
          : {{affiliateDetail.user.currency}}</li>
        <li>
          <div class="item-title">Language</div>
          : {{affiliateDetail.user.language}}</li>
        <li>
          <div class="item-title">Refer by code</div>
          : {{affiliateDetail.refer_by_code}}</li>
      </ul>
      <ul class="Account-Information">
        <li>
          <div class="item-title">Status</div>
          : <el-select
            clearable
            v-model="affiliateDetail.user.status"
            placeholder="Status">
            <el-option
              v-for="item in dropList.status"
              :label="item.value"
              :key="item.key"
              :value="item.key" />
          </el-select>
          <el-button class="ml-5" @click="updateAffiliate({status: affiliateDetail.user.status}, 'Status')">update</el-button>
        </li>
        <li>
          <div class="item-title">Reset Password</div>
          : <el-button class="ml-5" @click="PasswordFormVisible = true">update</el-button>
        </li>
        <li>
          <div class="item-title">Registration Date</div>
           : {{affiliateDetail.user.created_at}}</li>
        <li>
          <div class="item-title">Register IP</div>
           : {{affiliateDetail.userInfo.register_ip}}</li>
        <li>
          <div class="item-title">Last Login</div>
           : {{affiliateDetail.userInfo.last_login_at}}</li>
        <li>
          <div class="item-title">WebURL</div>
          :
          <el-input clearable style="max-width: 200px" v-model="affiliateDetail.web_url" suffix-icon="el-icon-edit" placeholder="Please enter WebURL" />
          <el-button class="ml-5" @click="updateAffiliate({web_url: affiliateDetail.web_url}, 'WebURL')">update</el-button>
        </li>
        <li
        >
          <div class="item-title">Fund management</div>
          :
          <el-switch
            v-model="affiliateDetail.is_fund_open"
            :active-value= 1
            :inactive-value= 0
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
          <el-button class="ml-5" @click="updateAffiliate({is_fund_open: affiliateDetail.is_fund_open}, 'Fund managerment')">update</el-button>
        </li>
        <li
          v-if="affiliateDetail.is_fund_open ===1"
        >
          <div class="item-title">Balance</div> : {{affiliateDetail.userAccount.available_balance}}</li>
        <li><div class="item-title">Payment Group</div> : {{ affiliateDetail.user.display_payment_group_id }}</li>
      </ul>
    </div>
    <ul style="text-align: center">
      <li v-for="(item, key) in affiliateDetail.commission_setting" :key="key">
        Tier:
        <el-input
          clearable
          style="max-width: 200px"
          v-model="item.tier"
          suffix-icon="el-icon-edit"
          placeholder="Title"
        />
        Title:
        <el-input
          clearable
          style="max-width: 200px"
          v-model="item.title"
          suffix-icon="el-icon-edit"
          placeholder="Title"
        />
        Value:
        <el-input
          clearable
          style="max-width: 200px"
          v-model="item.value"
          suffix-icon="el-icon-edit"
          placeholder="Value"
        />
        Profit:
        <el-input
          clearable
          style="max-width: 200px"
          v-model="item.profit"
          suffix-icon="el-icon-edit"
          placeholder="Profit"
        />
        <el-button
          class="ml-5"
          @click="updateAffiliate({'commission_setting': affiliateDetail.commission_setting}, 'commission_setting')">update</el-button>
      </li>
    </ul>
    <div class="affiliate-desc">
      <span class="label">Describes: </span><el-button type="primary" @click="addDescription">Add content</el-button><el-button @click="updateDescribe({describe: affiliateDetail.userInfo.describe}, 'Describe')">update</el-button>
      <div class="content" v-for="(item, key) in affiliateDetail.userInfo.describe" :key="key">
        <div class="form-line">
          <span class="label">Languages</span>
          <el-select v-model="item.language" placeholder="Select A Languages">
            <el-option v-for="(item, key1) in dropList.language" :key="key1"  :label="item.value" :value="item.key"></el-option>
          </el-select>
          <el-button type="danger" style="margin-left: 10px;" @click="removeMessage(key)">remove this message</el-button>
        </div>
        <div class="form-line">
          <span class="label">Content</span>
          <el-input type="textarea" :rows="6" v-model="item.content"></el-input>
        </div>
      </div>
    </div>
    <hr style="margin: 10px 0">
    <div class="my-box" v-if="hasBankInfo">
      <ul class="information FlexRowFlexStartFlexStart">
        <li>
          <div class="item-title">
            <i @click="getValueHistory(bankInfo.id, 'account_name')" class="el-icon-info"></i>
            Account Name
          </div>:
          {{bankInfo.account_name}}
        </li>
        <li>
          <div class="item-title">
            <i @click="getValueHistory(bankInfo.id, 'account_no')" class="el-icon-info"></i>
            Account No.
          </div>:
          {{bankInfo.account_no}}
        </li>
        <li>
          <div class="item-title">
            <i @click="getValueHistory(bankInfo.id, 'bank_name')" class="el-icon-info"></i>
            Bank Name
          </div>:
          {{bankInfo.bank_name}}
        </li>
        <li>
          <div class="item-title">
            <i @click="getValueHistory(bankInfo.id, 'branch')" class="el-icon-info"></i>
            Bank Branch
          </div>:
          {{bankInfo.branch}}
        </li>
        <li>
          <div class="item-title">
            <i @click="getValueHistory(bankInfo.id, 'city')" class="el-icon-info"></i>
            City
          </div>:
          {{bankInfo.city}}
        </li>
        <li>
          <div class="item-title">
            <i @click="getValueHistory(bankInfo.id, 'province')" class="el-icon-info"></i>
            Province
          </div>:
          {{bankInfo.province}}
        </li>
        <li>
          <div class="item-title">
            <i @click="getValueHistory(bankInfo.id, 'status')" class="el-icon-info"></i>
            Status
          </div>:
          {{bankInfo.status}}
        </li>
        <li>
          <div class="item-title">
            Last Update At
          </div>:
          {{bankInfo.updated_at}}
        </li>
      </ul>
    </div>
    <el-dialog title="history" :visible.sync="historyVisible">
      <table-comp
        :tableConfig = historyConfig
        :resInformation = history
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="cancel" @click="historyVisible = false">close</el-button>
      </div>
    </el-dialog>
    Bank Info
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
    />
    <hr style="margin: 10px 0">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="success" @click="addRemarks">Add Remarks</el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = affiliateProfileTableConfig
      :resInformation = affiliateProfileData
      @handleSizePageChange = callbacks
    ></table-comp>
    <el-dialog title="Reset password" :visible.sync="PasswordFormVisible">
      <el-form>
        <el-form-item label="New Password">
          <el-input v-model="new_password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="PasswordFormVisible = false">cancel</el-button>
        <el-button type="primary" @click="affirmPassword('manual')">Manual update</el-button>
        <el-button type="primary" @click="affirmPassword('auto')">Auto update</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import FormInlineComp from '../../components/form/formInlineComp'
import SubNav from '../../components/nav/SubNav'
import moment from 'moment'
import {
  backstageAffiliateListingListDetailHttp,
  updateBackstageGameManagementGamePlatformsDropListHttp,
  updateBackstageGameManagementGamePlatformsDropListHttpForDescribe,
  backstageGameManagementGamePlatformsDropListRemarksHttp,
  addBackstageGameManagementGamePlatformsDropListRemarksHttp,
  backstageGameManagementGamePlatformsDropListHttp,
  backstageAffiliateBankHistoryHttp,
  backstageAffiliateBankHistoryListHttp,
  backstageAffiliateResetPasswordHttp
} from '../../api/affiliate/initAxios'
import filter from '../../util/filter'
import element from '../../config/element'
import FileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
export default {
  name: 'AffiliateProfile',
  components: {FormInlineComp, TableComp, SubNav, FileUpload},
  props: ['id'],
  data () {
    return {
      historyVisible: false,
      history: {},
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
      uploadAvatar: {
        url: '/api/backstage/images',
        name: 'image',
        accept: 'image/*',
        fileHeaders: resourcesList.fileHeaders,
        limit: 1,
        showFileList: false,
        button: 'Select A Image'
      },
      // affiliate Profile Table 配置
      affiliateProfileTableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'created_at',
            label: 'Date & Time',
            width: '60'
          },
          {
            prop: 'admin_name',
            label: 'Created by',
            width: '60'
          },
          {
            prop: 'reason',
            label: 'Reason ',
            width: '60'
          },
          {
            prop: 'remark',
            label: 'Remark',
            width: '60'
          }
        ]
      },
      formInline: {
        remark: '',
        per_page: 50,
        page: 1
      },
      affiliateProfileData: {},
      formInlineConfig: [
        {
          type: 'input',
          label: 'Remarks',
          formValue: 'remark',
          placeholder: 'Remarks',
          value: ''
        },
        {
          type: 'search'
        }
      ],
      AffiliateNav: [
        {
          name: 'affiliate Profile',
          routeName: 'affiliate_profile',
          parameter: 'id',
          param: 1
        },
        {
          name: 'affiliate Summary',
          routeName: 'affiliate_summary',
          parameter: 'id',
          param: 1
        },
        {
          name: 'affiliate Member Detail',
          routeName: 'affiliate_member_detail',
          parameter: 'id',
          param: 1
        },
        {
          name: 'Summary Of Comm',
          routeName: 'summary_of_comm',
          parameter: 'id',
          param: 1
        }
      ],
      breadcrumb: [],
      dropList: {},
      affiliateDetail: {
        user: {},
        userInfo: {}
      },
      new_password: '',
      PasswordFormVisible: false,
      password: '',
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'account_name',
            label: 'Account Name'
          },
          {
            prop: 'account_no',
            label: 'Account No.'
          },
          {
            prop: 'bank_name',
            label: 'Bank Name'
          },
          {
            prop: 'branch',
            label: 'Bank Branch'
          },
          {
            prop: 'city',
            label: 'City'
          },
          {
            prop: 'province',
            label: 'Province'
          },
          {
            prop: 'status',
            label: 'Status'
          },
          {
            prop: 'updated_at',
            label: 'Last Update At'
          }
        ]
      },
      resInformation: {},
      bankInfo: {},
      hasBankInfo: false
    }
  },
  methods: {
    handleAvatarUpload (response, file, fileList) {
      this.affiliateDetail.userInfo.avatar = response.url;
      this.affiliateDetail.userInfo.avatar_id = response.id;
    },
    addDescription () {
      const describe = this.affiliateDetail.userInfo.describe;
      if (describe) {
        describe.push({
          language: '',
          content: ''
        })
      } else {
        this.affiliateDetail.userInfo.describe = [{
          language: '',
          content: ''
        }]
      }
    },
    removeMessage (key) {
      this.affiliateDetail.userInfo.describe.splice(key, 1)
    },
    // 由于updateBackstageGameManagementGamePlatformsDropListHttp 默认使用application/x-www-form-urlencoded，
    // 公共代码也不能随意修改，
    // 所以只能重新定制化一遍代码
    updateDescribe(value, label) {
      this.$confirm('Are you sure want to update detail?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        updateBackstageGameManagementGamePlatformsDropListHttpForDescribe(this.$route.query.id, value).then(res => {
          this.$message({
            type: 'success',
            message: 'set ' + label + ' success'
          })
          this.backstageAffiliateListingListDetailHttp()
          this.initHttp(this.formInline)
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    updateAffiliate (value, label) {
      this.$confirm('Are you sure want to update detail?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if (label === 'Fund managermen') {
          value.is_fund_open = filter.BooleFilter(value.is_fund_open)
        }
        if (label === 'Birth Date') {
          if (moment(new Date()).diff(moment(value.birth_at), 'years') < 18 && (value.birth_at !== '' || value.birth_at !== undefined)) {
            element.message({
              type: 'error',
              message: 'Less than 18 years of age'
            })
            return
          }
        }
        // return false
        updateBackstageGameManagementGamePlatformsDropListHttp(this.$route.query.id, value).then(res => {
          this.$message({
            type: 'success',
            message: 'set ' + label + ' success'
          })
          this.backstageAffiliateListingListDetailHttp()
          this.initHttp(this.formInline)
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
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
    // 初始化数据 remark
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      delete formInline.auto_refresh
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.affiliateProfileTableConfig.loading = true
      backstageGameManagementGamePlatformsDropListRemarksHttp(this.$route.query.id, datalist).then(res => {
        this.affiliateProfileData = res
        this.affiliateProfileTableConfig.loading = false
      }).catch((error) => {
        this.affiliateProfileTableConfig.loading = false
        console.log(error)
      })
      // this.affiliateProfileData.data = list
    },
    backstageAffiliateListingListDetailHttp () {
      this.hasBankInfo = false
      backstageAffiliateListingListDetailHttp(this.$route.query.id, {include: 'user,userInfo,bankAccount,commissions,userAccount'}).then(res => {
        this.affiliateDetail = res
        if (res.hasOwnProperty('bankAccount')) {
          this.hasBankInfo = true
          this.bankInfo = res.bankAccount
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 添加Remarks
    addRemarks () {
      this.$prompt(' input detail', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Back'
      }).then(({ value }) => {
        addBackstageGameManagementGamePlatformsDropListRemarksHttp(this.$route.query.id, {remark: value}).then(res => {
          this.$message({
            type: 'success',
            message: value
          })
          this.initHttp(this.formInline)
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'cancel input'
        })
      })
    },
    backstageGameManagementGamePlatformsDropListHttp () {
      backstageGameManagementGamePlatformsDropListHttp().then(res => {
        this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // 修改密码请求
    affirmPassword (type) {
      if (type === 'manual') {
        if (!this.new_password) {
          element.message({
            type: 'error',
            message: 'The New password cannot be empty'
          })
          return
        }
        if (this.new_password.length < 6) {
          element.message({
            type: 'error',
            message: 'The New password cannot be less than 6 digits'
          })
          return
        }
      }
      var datalist = {
        type: type,
        new_password: this.new_password
      }
      backstageAffiliateResetPasswordHttp(this.$route.query.id, datalist).then(res => {
        this.PasswordFormVisible = false
        this.new_password = ''
        element.message({
          type: 'success',
          message: 'Your password was modified successfully'
        })
        this.initHttp(this.formInline)
      }).catch((error) => {
        console.log(error)
      })
    },
    // 银行卡修改记录
    getValueHistory (id, field) {
      backstageAffiliateBankHistoryHttp(id, {field: field}).then(res => {
        this.historyVisible = true
        this.history = res
      }).catch(error => {
        console.log(error)
      })
    },
    // 银行卡记录
    getBankHistory (id) {
      this.tableConfig.loading = true
      backstageAffiliateBankHistoryListHttp(id).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    }
  },
  activated () {
    let breadcrumb = this.$route.query.breadcrumb
    if (breadcrumb) {
      this.breadcrumb = JSON.parse(breadcrumb)
    }
    this.backstageAffiliateListingListDetailHttp()
    this.initHttp(this.formInline)
    this.getBankHistory(this.$route.query.id)
    this.backstageGameManagementGamePlatformsDropListHttp()
  }
}
</script>
