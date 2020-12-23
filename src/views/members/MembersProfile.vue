<style lang="scss" scoped type="text/scss">
  .MembersProfile {
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
</style>

<template>
    <div class="MembersProfile">
      <member-profile-navs/>
      <el-row>
        <el-col :span="12" style="text-align: left">Profile Remarks:</el-col>
        <el-col :span="12" style="text-align: right">
          <el-button
            type="primary"
            class="AddMembersProfil"
            @click="ProfileVisible = true;RemarksRequist= {remark: '',category: 1}"
          >
            Add Members Profile
          </el-button>
        </el-col>
      </el-row>
      <table-comp
        :tableConfig = ProfileRemarkstableConfig
        :resInformation = ProfileRemarksData
        @handleSizePageChange = handleSizePageChange
        @sortByColumn="sortChange"
      />
      <ul class="FlexRowSpaceAroundCenter">
        <li>
          <div class="safe">{{informatin.info.verified_percent}}%</div>
          <div>Account Safety</div>
          <el-button
            type="primary"
            v-if="informatin.info.verified_percent === 100 && informatin.info.is_can_claim_verify_prize"
            class="AddMembersProfil"
            style="margin-bottom: 10px"
            @click="ReceiveVisible = true"
          >
            Receive
          </el-button>
        </li>
        <li :style="informatin.info.is_profile_verified === true ? {color: '#E6A23C'} : null">
          <i class="el-icon-s-custom"></i>
          <div>Update Profile</div>
        </li>
        <li :style="informatin.info.is_bank_account_verified === true ? {color: '#E6A23C'} : null" @click="validation('bank_account')">
          <i class="el-icon-bank-card"></i>
          <div>Bank Details</div>
        </li>
        <li :style="informatin.info.is_email_verified ? {color: '#E6A23C'} : null" @click="validation('email')">
          <i class="el-icon-message"></i>
          <div>Verify Email</div>
        </li>
        <li :style="informatin.info.is_phone_verified ? {color: '#E6A23C'} : null" @click="validation('contact number')">
          <i class="el-icon-mobile-phone"></i>
          <div>Verify Contact No</div>
        </li>
      </ul>
      <ul class="information FlexRowFlexStartFlexStart">
        <li><div class="item-title">Member Code</div>: {{informatin.name}}</li>
        <li>
          <div class="item-title">
            <i @click="backstageUsersAuditMethodHttp('birth_at')" class="el-icon-info"></i>
            Birthday
          </div>:
          <el-input v-model="informatin.info.birth_at" style="max-width: 200px" suffix-icon="el-icon-edit" placeholder="For example：1992-10-20" />
        </li>
        <li>
          <div class="item-title">
          <i @click="backstageUsersAuditMethodHttp('risk_group_id')" class="el-icon-info"></i>
          <span @click="popWindowStatus('Risk')" class="popWindow">
            Risk Category</span>
          </div>:
<!--          <el-select  v-model="informatin.risk_group_id"  placeholder="Select A Risk Category">-->
<!--            <el-option disabled v-for="item in membersDropList.risk_group_id" :label="item.value" :key="item.key" :value="item.key" />-->
<!--          </el-select>-->
          <span>{{informatin.display_risk_group_id}}</span>
        </li>
        <li><div class="item-title">Currency</div>: {{informatin.currency}}</li>
        <li>
          <div class="item-title">
            <i @click="backstageUsersAuditMethodHttp('email')" class="el-icon-info"></i>
            Email Address
          </div>:
          <el-input v-model="informatin.info.email" style="max-width: 200px" suffix-icon="el-icon-edit" placeholder="Please enter email" />
        </li>
        <li>
          <div class="item-title">
            <i @click="backstageUsersAuditMethodHttp('payment_group_id')" class="el-icon-info"></i>
            <span @click="popWindowStatus('payment')" class="popWindow">
              Payment Group
            </span>
          </div>:
<!--          <el-select  v-model="informatin.payment_group_id"  placeholder="Select A Payment Group">-->
<!--            <el-option disabled v-for="item in membersDropList.payment_group_id" :label="item.value" :key="item.key" :value="item.key" />-->
<!--          </el-select>-->
          <span>{{informatin.display_payment_group_id}}</span>
        </li>
        <li>
          <div class="item-title">
            <i @click="backstageUsersAuditMethodHttp('full_name')" class="el-icon-info"></i>
            Full Name
          </div>:
          <el-input v-model="informatin.info.full_name" style="max-width: 200px" suffix-icon="el-icon-edit" placeholder="Please enter Full Name" />
        </li>
        <li>
          <div class="item-title"><i @click="backstageUsersAuditMethodHttp('phone')" class="el-icon-info"></i>
            Contact No</div>:
          <el-select style="width: 75px;" v-model="informatin.info.country_code" clearable placeholder="Select A Country Code">
            <el-option v-for="item in membersDropList.country_code" :label="item.value" :key="item.key" :value="item.key" />
          </el-select>
          <el-input v-model="informatin.info.phone" style="max-width: 120px" suffix-icon="el-icon-edit" placeholder="Please enter Phone" />
        </li>
        <li>
          <div class="item-title">
          <i @click="backstageUsersAuditMethodHttp('vip_id')" class="el-icon-info"></i>
          Member Profiling</div>:
          <el-select v-model="informatin.vip_id" clearable placeholder="Select A Payment Group">
            <el-option v-for="item in membersDropList.vip_id" :label="item.value" :key="item.key" :value="item.key" />
          </el-select>
        </li>
        <li><div class="item-title">Register URL</div>: {{informatin.info.register_url}}</li>
        <li>
          <div class="item-title">
          <i @click="backstageUsersAuditMethodHttp('gender')" class="el-icon-info"></i>
          Gender</div>:
          <el-select v-model="informatin.info.display_gender" clearable placeholder="Select A Risk Category">
            <el-option v-for="item in membersDropList.gender" :label="item.value" :key="item.key" :value="item.key" />
          </el-select>
        </li>
        <li>
          <div class="item-title">
          <i @click="backstageUsersAuditMethodHttp('reward_id')" class="el-icon-info"></i>
          <span @click="popWindowStatus('reward')" class="popWindow">
            Reward Level
          </span></div>:
<!--          <el-select  v-model="informatin.reward.level"  placeholder="Select A Payment Group">-->
<!--            <el-option disabled v-for="item in membersDropList.reward_id" :label="item.value" :key="item.key" :value="item.key" />-->
<!--          </el-select>-->
          <span>{{informatin.display_reward}}</span>
        </li>
        <li>
          <div class="item-title"><i @click="backstageUsersAuditMethodHttp('status')" class="el-icon-info"></i>
          <span @click="popWindowStatus('status')" class="popWindow">
            Status
          </span></div>:
          <el-select  v-model="informatin.status"  placeholder="Select A Status">
            <el-option disabled v-for="item in membersDropList.status" :label="item.value" :key="item.key" :value="item.key" />
          </el-select>
        </li>
        <li>
          <div class="item-title"><i @click="backstageUsersAuditMethodHttp('password')" class="el-icon-info"></i>
          Password change Log</div>:
          <el-button type="danger" @click="PasswordFormVisible = true">
            reset
          </el-button>
        </li>
        <li>
          <div class="item-title"><i @click="backstageUsersAuditMethodHttp('language')" class="el-icon-info"></i>
          Preferred Language</div>:
          <el-select v-model="informatin.language" clearable placeholder="Select A Payment Group">
            <el-option v-for="item in membersDropList.language" :label="item.value" :key="item.key" :value="item.key" />
          </el-select>
        </li>
        <li><div class="item-title">Referral Code</div>: {{informatin.referral_code}}</li>
        <li>
          <div class="item-title">
            <i @click="backstageUsersAuditMethodHttp('security_question')" class="el-icon-info"></i>
            Security Question
          </div>:
          <el-button type="danger" @click="resetSecurityQuestion">
            reset
          </el-button>
        </li>
        <li>
          <div class="item-title">
          <i @click="backstageUsersAuditMethodHttp('odds')" class="el-icon-info"></i>
          Odds Type
          </div>:
          <el-select v-model="informatin.odds" clearable placeholder="Select A Odds Type">
            <el-option v-for="item in membersDropList.odds" :label="item.value" :key="item.key" :value="item.key" />
          </el-select>
        </li>
        <li><div class="item-title">referrer Code</div>: {{informatin.referrer_code}}</li>
        <li><div class="item-title">Register Time</div>: {{informatin.created_at}}</li>
        <li><div class="item-title">Affiliated Code</div>: {{informatin.affiliated_code}}</li>
      </ul>
      <div class="button FlexRowCenterCenter">
        <div>
          <el-button type="danger" @click="$router.go(-1)">Back previous page</el-button>
          <el-popover
            placement="top"
            width="160"
            class="logout"
            v-model="visible">
            <p>Update profile？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">cancel</el-button>
              <el-button type="primary" size="mini" @click="UpdateProfileHttp">Yes</el-button>
            </div>
            <el-button slot="reference" type="primary">Update profile</el-button>
          </el-popover>
        </div>
      </div>

      <el-dialog title="Add Members Profile" :visible.sync="ProfileVisible">
        <el-form :model="form">
          <el-form-item label="category" :label-width="formLabelWidth">
            <el-select v-model="RemarksRequist.category" placeholder="Select A Category">
              <el-option v-for="item in RemarksDroplist.category_id" :label="item.value" :key="item.key" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="Remark" :label-width="formLabelWidth">
            <el-input v-model="RemarksRequist.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ProfileVisible = false">cancel</el-button>
          <el-button type="primary" @click="affirmProfile">Submit</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="transit.title" :visible.sync="transit.StatusFormVisible">
        <el-form :model="informatin">
          <el-form-item label="Username" :label-width="formLabelWidth">
            <el-input v-model="informatin.name" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="transit.status" label="Status" :label-width="formLabelWidth">
            <el-select  v-model="transit.form.status" placeholder="Select A Status">
              <el-option v-for="item in membersDropList.status" :label="item.value" :key="item.key" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="transit.risk_group_id " label="Risk Category" :label-width="formLabelWidth">
            <el-select  v-model="transit.form.risk_group_id" placeholder="Select A Status">
              <el-option v-for="item in membersDropList.risk_group_id" :label="item.value" :key="item.key" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="transit.payment_group_id " label="Payment Group" :label-width="formLabelWidth">
            <el-select  v-model="transit.form.payment_group_id" placeholder="Select A Status">
              <el-option v-for="item in membersDropList.payment_group_id" :label="item.value" :key="item.key" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="transit.reward_id" label="Reward Level" :label-width="formLabelWidth">
            <el-select  v-model="transit.form.reward_id" placeholder="Select A Status">
              <el-option v-for="item in membersDropList.reward_id" :label="item.value" :key="item.key" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="Remark" :label-width="formLabelWidth">
            <el-input v-model="transit.form.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="transit.StatusFormVisible = false">cancel</el-button>
          <el-button type="primary" @click="affirmStatus">Submit</el-button>
        </div>
      </el-dialog>

      <el-dialog title="history" :visible.sync="historyVisible">
        <table-comp
          :tableConfig = historyConfig
          :resInformation = history
        />
        <div slot="footer" class="dialog-footer">
          <el-button type="cancel" @click="historyVisible = false">close</el-button>
        </div>
      </el-dialog>
      <el-dialog title="Reset password" :visible.sync="PasswordFormVisible">
        <el-form :model="form">
          <el-form-item label="New Password" :label-width="formLabelWidth">
            <el-input v-model="new_password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="PasswordFormVisible = false">cancel</el-button>
          <el-button type="primary" @click="affirmPassword('manual')">Manual update</el-button>
          <el-button type="primary" @click="affirmPassword('auto')">Auto update</el-button>
        </div>
      </el-dialog>
      <el-dialog title="Receive" :visible.sync="ReceiveVisible">
        <el-form :model="form">
          <el-select v-model="platform_code" placeholder="Select A platform code">
            <el-option v-for="item in membersDropList.platform_code" :label="item.value" :key="item.key" :value="item.key" />
          </el-select>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="platformCodeReceive">Receive</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import {
  backstageUsersDetailHttp,
  backstageUsersProfileRemarksHttp,
  backstageProfileRemarksDroplistHttp,
  addBackstageUsersProfileRemarksHttp,
  backstageGamePlatformUsersVerifyPhoneHttp,
  backstageGamePlatformUsersVerifyEmailHttp,
  backstageUsersAuditHttp,
  backstageUsersStatusHttp,
  backstageUsersRiskGroupHttp,
  backstageUsersPaymentGroupHttp,
  backstageUsersRewardHttp,
  backstageUsersUserUpdateHttp,
  backstageUsersDropListHttp,
  resetSecurityQuestionHttp,
  backstageUsersResetPasswordHttp,
  backstageGamePlatformUsersVerifyBankAccountHttp,
  claimVerifyPrizeHttp
} from '../../api/members/initAxios'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import { mapGetters } from 'vuex'
import element from '../../config/element'
import moment from 'moment'
import MemberProfileNavs from '../../components/nav/MemberProfileNavs'
export default {
  name: 'MembersProfile',
  data () {
    return {
      platform_code: '',
      membersDropList: {},
      historyVisible: false,
      ReceiveVisible: false,
      history: null,
      new_password: '',
      PasswordFormVisible: false,
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
      form: {},
      ProfileVisible: false,
      formLabelWidth: '120px',
      RemarksRequist: {
        remark: '',
        category: 1
      },
      per_page: 50,
      page: 1,
      id: '',
      informatin: {
        reward: {
          level: ''
        },
        info: {
          full_name: ''
        }
      },
      visible: false,
      ProfileRemarkstableConfig: {
        border: true,
        tableColumn: [{
          prop: 'created_at',
          label: 'Date',
          fixWidth: '200px',
          sortable: true
        }, {
          prop: 'admin_name',
          label: 'Update By',
          fixWidth: '200px',
          sortable: true
        }, {
          prop: 'category',
          label: 'Category',
          fixWidth: '200px',
          sortable: true
        }, {
          prop: 'remark',
          label: 'Remarks',
          header: {
            prop: 'remark',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'members_profile', query: {id: params.item.id}})
                    }
                  }
                }, params.item.name)
              ])
            }
          }
        }]
      },
      ProfileRemarksData: {
        data: []
      },
      RemarksDroplist: {
        category_id: null
      },
      StatusForm: {
        title: 'Status',
        StatusFormVisible: false,
        status: true,
        form: {
          status: '',
          remark: ''
        }
      },
      RiskGroupForm: {
        title: 'Risk Category',
        StatusFormVisible: false,
        risk_group_id: true,
        form: {
          risk_group_id: '',
          remark: ''
        }
      },
      PaymentGroupForm: {
        title: 'payment Group',
        StatusFormVisible: false,
        payment_group_id: true,
        form: {
          payment_group_id: '',
          remark: ''
        }
      },
      RewardForm: {
        title: 'reward Level',
        StatusFormVisible: false,
        reward_id: true,
        form: {
          reward_id: '',
          remark: ''
        }
      },
      transit: {
        title: 'Account status',
        StatusFormVisible: false,
        form: {
          status: '',
          remark: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  components: {
    MemberProfileNavs,
    tableComp
  },
  // created () {
  //   this.id = this.$route.query.id
  //   this.backstageUsersProfileRemarksHttp()
  //   this.userDetailHttp()
  // },
  activated () {
    this.id = this.$route.query.id
    this.userDetailHttp()
    this.backstageUsersProfileRemarksHttp()
    this.backstageProfileRemarksDroplistHttp()
    this.backstageUsersDropListHttp()
  },
  methods: {
    platformCodeReceive () {
      claimVerifyPrizeHttp(this.id, {platform_code: this.platform_code}).then(res => {
        this.ReceiveVisible = false
        this.userDetailHttp();
        element.message({
          type: 'success',
          message: 'Receive success'
        })
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
      backstageUsersResetPasswordHttp(this.id, datalist).then(res => {
        this.PasswordFormVisible = false
        this.new_password = ''
        element.message({
          type: 'success',
          message: 'Your password was modified successfully'
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    resetSecurityQuestion () {
      this.$prompt('', 'Reset remark', {
        confirmButtonText: 'affirm',
        cancelButtonText: 'cancel',
        inputType: 'textarea',
        inputValue: ''
      }).then(({ value }) => {
        if (!value) {
          element.message({
            type: 'error',
            message: 'The remark cannot be empty'
          })
        }
        resetSecurityQuestionHttp(this.id, {remark: value}).then(res => {
          element.message({
            type: 'success',
            message: 'Security Question Reset Success'
          })
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    // 更新状态 弹窗
    affirmStatus () {
      var type = this.transit.title
      if (!this.transit.form.remark) {
        element.message({
          type: 'error',
          message: 'The remark field is required'
        })
        return
      }
      if (type === 'Status') {
        backstageUsersStatusHttp(this.id, this.transit.form).then(res => {
          this.informatin.status = Number(res.status)
          this.transit.StatusFormVisible = false
          element.message({
            type: 'success',
            message: 'Your ' + type + ' was modified successfully'
          })
          this.backstageUsersProfileRemarksHttp()
          this.userDetailHttp()
        }).catch((error) => {
          console.log(error)
        })
      } else if (type === 'Risk Category') {
        backstageUsersRiskGroupHttp(this.id, this.transit.form).then(res => {
          this.informatin.risk_group_id = Number(res.risk_group_id)
          this.transit.StatusFormVisible = false
          element.message({
            type: 'success',
            message: 'Your ' + type + ' was modified successfully'
          })
          this.backstageUsersProfileRemarksHttp()
          this.userDetailHttp()
        }).catch((error) => {
          console.log(error)
        })
      } else if (type === 'payment Group') {
        backstageUsersPaymentGroupHttp(this.id, this.transit.form).then(res => {
          this.informatin.payment_group_id = res.payment_group_id
          this.transit.StatusFormVisible = false
          element.message({
            type: 'success',
            message: 'Your ' + type + ' was modified successfully'
          })
          this.backstageUsersProfileRemarksHttp()
          this.userDetailHttp()
        }).catch((error) => {
          console.log(error)
        })
      } else {
        backstageUsersRewardHttp(this.id, this.transit.form).then(res => {
          this.informatin.reward.level = res.reward
          this.transit.StatusFormVisible = false
          element.message({
            type: 'success',
            message: 'Your ' + type + ' was modified successfully'
          })
          this.backstageUsersProfileRemarksHttp()
          this.userDetailHttp()
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    // 用户状态更新 弹窗
    popWindowStatus (type) {
      if (type === 'status') {
        this.StatusForm.StatusFormVisible = true
        this.StatusForm.form.status = this.informatin.status
        this.StatusForm.form.remark = ''
        this.transit = this.StatusForm
      } else if (type === 'Risk') {
        this.RiskGroupForm.StatusFormVisible = true
        this.RiskGroupForm.form.risk_group_id = this.informatin.risk_group_id
        this.RiskGroupForm.form.remark = ''
        this.transit = this.RiskGroupForm
      } else if (type === 'payment') {
        this.PaymentGroupForm.StatusFormVisible = true
        this.PaymentGroupForm.form.payment_group_id = this.informatin.payment_group_id
        this.PaymentGroupForm.form.remark = ''
        this.transit = this.PaymentGroupForm
      } else {
        this.RewardForm.StatusFormVisible = true
        this.RewardForm.form.reward = this.informatin.reward
        this.RewardForm.form.remark = ''
        this.transit = this.RewardForm
      }
      console.log(this.transit)
    },
    // 用户字段更新记录
    backstageUsersAuditMethodHttp (field) {
      if (field === 'payment_group_id') {
        this.historyConfig.tableColumn[2].label = 'Previous payment Group'
        this.historyConfig.tableColumn[3].label = 'New payment Group'
      } else {
        this.historyConfig.tableColumn[2].label = 'Previous Value'
        this.historyConfig.tableColumn[3].label = 'New Value'
      }
      backstageUsersAuditHttp(this.id, {include: 'user', field: field}).then(res => {
        this.historyVisible = true
        this.history = res
      }).catch(error => {
        console.log(error)
      })
    },
    // 添加new profile
    affirmProfile () {
      if (!this.RemarksRequist.remark) {
        element.message({
          type: 'error',
          message: 'The remark cannot be empty'
        })
        return
      }
      addBackstageUsersProfileRemarksHttp(this.id, this.RemarksRequist).then(res => {
        element.message({
          type: 'success',
          message: 'You add new profile'
        })
        this.ProfileVisible = false
        this.backstageUsersProfileRemarksHttp()
      }).catch(error => {
        console.log(error)
      })
    },
    // 下拉菜单请求
    backstageProfileRemarksDroplistHttp () {
      backstageProfileRemarksDroplistHttp().then(res => {
        this.RemarksDroplist = res
      }).catch(error => {
        console.log(error)
      })
    },
    // memberDropList下拉菜单
    backstageUsersDropListHttp () {
      backstageUsersDropListHttp().then(res => {
        this.membersDropList = res
        filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'status', 'risk_group_id', 'payment_group_id'])
      }).catch(() => {
      })
    },
    // ProfileRemarks请求
    backstageUsersProfileRemarksHttp () {
      backstageUsersProfileRemarksHttp(this.id, {per_page: this.per_page, page: this.page}).then(res => {
        this.ProfileRemarksData = res
      }).catch(error => {
        console.log(error)
      })
    },
    // 回调页码
    handleSizePageChange (value) {
      if (value.per_page) {
        this.per_page = value.per_page
      } else if (value.page) {
        this.page = value.page
      }
      this.backstageUsersProfileRemarksHttp()
    },
    validationProfile () {
      if (this.informatin.info.full_name === '') {
        element.message({
          type: 'error',
          message: 'Full Name can\'t be empty'
        })
        return false
      }
      if (this.informatin.info.birth_at === '') {
        element.message({
          type: 'error',
          message: 'Birthday can\'t be empty'
        })
        return false
      }
      if (this.informatin.info.email === '') {
        element.message({
          type: 'error',
          message: 'Email Address can\'t be empty'
        })
        return false
      }
      if (this.informatin.info.language === '') {
        element.message({
          type: 'error',
          message: ' Preferred Language can\'t be empty'
        })
        return false
      }
      if (this.informatin.info.phone === '') {
        element.message({
          type: 'error',
          message: 'Contact No can\'t be empty'
        })
        return false
      }
      if (this.informatin.info.odds === '') {
        element.message({
          type: 'error',
          message: 'Odds Type can\'t be empty'
        })
        return false
      }
      if (this.informatin.info.country_code === '') {
        element.message({
          type: 'error',
          message: 'Phone Country can\'t be empty'
        })
        return false
      }
      return true
    },
    // 更新用户详情
    UpdateProfileHttp () {
      if (!this.validationProfile()) {
        return
      }
      var datalist = {
        include: 'info',
        full_name: this.informatin.info.full_name,
        birth_at: this.informatin.info.birth_at,
        email: this.informatin.info.email,
        status: this.informatin.status,
        gender: this.informatin.info.display_gender,
        language: this.informatin.language,
        phone: this.informatin.info.phone,
        odds: this.informatin.odds,
        country_code: this.informatin.info.country_code,
        vip_id: this.informatin.vip_id
      }
      if (moment(new Date()).diff(moment(this.informatin.info.birth_at), 'years') < 18 && (this.informatin.info.birth_at !== '' || this.informatin.info.birth_at !== undefined)) {
        element.message({
          type: 'error',
          message: 'Less than 18 years of age'
        })
        return
      }
      backstageUsersUserUpdateHttp(this.id, datalist).then(res => {
        this.visible = !this.visible
        element.message({
          type: 'success',
          message: 'updated success'
        })
        this.userDetailHttp()
      })
    },
    // 用户详情请求
    userDetailHttp () {
      backstageUsersDetailHttp(this.id, {include: 'info,account,gamePlatformUsers,vip,reward'}).then(res => {
        if (!res.reward) {
          res.reward = {
            level: null
          }
        }
        this.informatin = res
      }).catch(error => {
        console.log(error)
      })
    },
    // 验证手机和邮箱
    validation (method) {
      this.$confirm('Are you sure you want to verify ' + method + '？', 'Confirm the information', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Verify',
        cancelButtonText: 'cancel'
      })
        .then(() => {
          if (method === 'email') {
            backstageGamePlatformUsersVerifyEmailHttp(this.id).then(res => {
              this.informatin.info.is_email_verified = true
              element.message({
                type: 'success',
                message: method + ' Verified'
              })
              this.userDetailHttp()
            }).catch(error => {
              console.log(error)
            })
          } else if (method === 'bank_account') {
            backstageGamePlatformUsersVerifyBankAccountHttp(this.id).then(res => {
              this.informatin.info.is_bank_account_verified = true
              element.message({
                type: 'success',
                message: method + ' Verified'
              })
              this.userDetailHttp()
            }).catch(error => {
              console.log(error.message)
            })
          } else {
            backstageGamePlatformUsersVerifyPhoneHttp(this.id).then(res => {
              this.informatin.info.is_phone_verified = true
              element.message({
                type: 'success',
                message: method + ' Verified'
              })
              this.userDetailHttp()
            }).catch(error => {
              console.log(error.message)
            })
          }
        }).catch(action => {
        })
    },
    sortChange (a) {
      console.log(a)
    }
  }
}
</script>
