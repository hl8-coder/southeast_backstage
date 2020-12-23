<style lang="scss">
  .WithdrawalTicket {
    width: 1200px;
    margin: 0 auto;
    background: white;
    line-height: 1.4;
    .el-dialog{
      margin-top: 0 !important;
      width: 50% !important;
    }
    .el-dialog__header {
      padding: 0 20px 0 !important;
    }
    .el-dialog__headerbtn {
      top: 5px;
    }
    .el-dialog__body {
      padding: 0 20px 10px !important;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    .member {
      margin: 5px;
      border: 1px solid #c3c3c3;
      padding: 5px;
      background: white;
      h3 {
        text-align: center;
      }
      .danger {
        color: #F56C6C;
      }
      .success {
        color: #67C23A;
      }
      .el-row{
        margin: 0 5px;
      }
    }
    .pop-img {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
      margin: 0;
      .img-content {
        width: 50%;
        height: 50%;
        margin: auto;
        margin-top: 125px;
      }
    }
    .button--small {
      padding: 2px 5px;
    }
    .box {
      height: 9.4rem;
      overflow: hidden;
      overflow-y: auto;
    }
    .Remarks {
      padding-top: 10rem;
    }
    .span {
      display: inline-block;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      margin: 0 10px;
      i {
        color: #fff;
      }
    }
    .span-success{
      background-color: #67C23A;
      border-color: #67C23A;
    }
    .span-danger{
      background-color: #F56C6C;
      border-color: #F56C6C;
    }
  }
  .WithdrawalUploadedReceipt{
    .el-upload-list {
      .el-upload-list__item{
        width: 20%;
        float: left;
      }
    }
    .el-upload-list__item:first-child {
      margin-top: 5px;
    }
    .fileUpload {
      height: 6rem;
      overflow: hidden;
      overflow-y: auto;
    }
  }
</style>
<template>
  <div class="WithdrawalTicket" v-if="theWithdrawalTicketInfo !== ''">
    <!--头部-->
    <el-row>
      <el-col :span="24" align="left">
        <h2 style="padding-left: 20px">
          {{withdrawalDetail.data.display_status}} &nbsp;&nbsp;&nbsp;
          Transaction ID: {{withdrawalDetail.data.order_no}}</h2>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <!--会员详情-->
        <div class="member">
          <h3>MEMBER DETAILS</h3>
          <div class="box" style="height: 5.5rem;line-height: 1;">
            <el-row :gutter="20">
              <el-col :span="10" align="left">Amount</el-col>
              <el-col :span="12" align="left">: {{theWithdrawalTicketInfo.amount}}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10" align="left">Name</el-col>
              <el-col :span="12" align="left">: {{theWithdrawalTicketInfo.account_name}}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10" align="left">Bank Name</el-col>
              <el-col :span="12" align="left">: {{theWithdrawalTicketInfo.bank.name}}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10" align="left">Bank Account</el-col>
              <el-col :span="12" align="left">: {{theWithdrawalTicketInfo.account_no}}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10" align="left">City</el-col>
              <el-col :span="12" align="left">: {{theWithdrawalTicketInfo.city}}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10" align="left">Province</el-col>
              <el-col :span="12" align="left">: {{theWithdrawalTicketInfo.province}}</el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <!--会员简介-->
        <div class="member">
          <h3>MEMBER PROFILE</h3>
          <div class="box" style="height: 5.5rem;line-height: 1;">
            <el-row :gutter="20">
              <el-col :span="10" align="left">Member Code</el-col>
              <el-col :span="11" align="left">:
                <el-link type="primary" @click="toMemberProfile(theWithdrawalTicketInfo.user.name)">
                  {{theWithdrawalTicketInfo.user.name}}
                </el-link>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10" align="left">Member Status</el-col>
              <el-col :span="11" align="left">: {{theWithdrawalTicketInfo.user.display_status}}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10" align="left">Member Wallet</el-col>
              <el-col :span="11" align="left">: {{theWithdrawalTicketInfo.user.status}}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10" align="left">Member Rank</el-col>
              <el-col :span="11" align="left">: {{theWithdrawalTicketInfo.user.vip_id}}</el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <!--上传凭证-->
      <div class="member upload WithdrawalUploadedReceipt" style="padding: 10px 0">
        <el-row>
          <el-col :span="24" align="center">
            <file-upload
              :fileConfig="uploadConfig"
            >
            </file-upload>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <!--信息校对-->
    <div class="member">
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <div class="ml-35">
              <span
                v-if="theWithdrawalTicketInfo.verify_details.turnover_is_closed"
                class="span span-success">
                <i class="el-icon-check"></i>
              </span>
                <span
                  v-if="!theWithdrawalTicketInfo.verify_details.turnover_is_closed"
                  class="span span-danger">
                <i class="el-icon-close"></i>
              </span>
                Total Rollover: {{theWithdrawalTicketInfo.verify_details.total_turnover}}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="ml-35">
              <span
                v-if="theWithdrawalTicketInfo.verify_details.deposit_is_closed"
                class="span span-success">
                <i class="el-icon-check"></i>
              </span>
                <span
                  v-if="!theWithdrawalTicketInfo.verify_details.deposit_is_closed"
                  class="span span-danger">
                <i class="el-icon-close"></i>
              </span>
                Total Deposit RO: {{theWithdrawalTicketInfo.verify_details.deposit_turnover}}
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <div class="ml-35">
              <span
                v-if="theWithdrawalTicketInfo.verify_details.is_has_remark"
                class="span span-success">
                <i class="el-icon-check"></i>
              </span>
                <span
                  v-if="!theWithdrawalTicketInfo.verify_details.is_has_remark"
                  class="span span-danger">
                <i class="el-icon-close"></i>
              </span>
                <el-link
                  @click="remarksList">
                  Remarks
                </el-link>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="ml-35">
              <span
                v-if="theWithdrawalTicketInfo.verify_details.is_poker_player"
                class="span span-success">
                <i class="el-icon-check"></i>
              </span>
                <span
                  v-if="!theWithdrawalTicketInfo.verify_details.is_poker_player"
                  class="span span-danger">
                <i class="el-icon-close"></i>
              </span>
                Poker Player
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="ml-35">
              <span
                v-if="theWithdrawalTicketInfo.verify_details.is_has_bonus"
                class="span span-success">
                <i class="el-icon-check"></i>
              </span>
                <span
                  v-if="!theWithdrawalTicketInfo.verify_details.is_has_bonus"
                  class="span span-danger">
                <i class="el-icon-close"></i>
              </span>
                First Time Claim Bonus
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!--Last Access-->
    <div class="member">
      <el-row>
        <el-col :span="24" align="center">Last Access: {{theWithdrawalTicketInfo.last_access_name}} {{theWithdrawalTicketInfo.last_access_at}}</el-col>
      </el-row>
      <el-row class="box">
        <el-col
          v-for="item in theWithdrawalTicketInfo.audits"
          :key="item.key"
          :span="12"
          align="center">
          {{item.action}}:&nbsp;&nbsp;{{item.admin_name}}&nbsp;&nbsp;{{item.created_at}}
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20">
      <el-col :span="10">
        <!--Reason List-->
        <div class="member">
          <el-row>
            <el-col :span="12" align="left">HOLD REASON:</el-col>
            <el-col :span="12" align="center">
              <el-select
                v-model="theReasonOfList.hold_reason"
                placeholder="Please select a hold reason">
                <el-option
                  v-for="item in dropList.hold_reason"
                  :key="item.value"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" align="left">CANCEL REASON:</el-col>
            <el-col :span="12" align="center">
              <el-select
                v-model="theReasonOfList.reject_reason"
                placeholder="Please select a cancel reason">
                <el-option
                  v-for="item in dropList.reject_reason"
                  :key="item.value"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" align="left">ESCALATE REASON:</el-col>
            <el-col :span="12" align="center">
              <el-select
                v-model="theReasonOfList.escalate_reason"
                placeholder="Please select a escalate reason">
                <el-option
                  v-for="item in dropList.escalate_reason"
                  :key="item.value"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <!--EXTERNAL REMARKS-->
        <div class="member">
          <h3 style="text-align: left">EXTERNAL REMARKS</h3>
          <el-form>
            <el-form-item>
              <el-input :rows="4" type="textarea" v-model="theWithdrawalTicketInfo.remark"></el-input>
            </el-form-item>
            <el-form-item align="right">
              <el-button class="buttonRight" type="primary" @click="withdrawalAddRemark">Modify</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="14">
        <!--TRANSACTIONS-->
        <withdrawal-transactions-list
          :transactionsList="theWithdrawalTicketInfo"
          :dropList="dropList"
          @closeWithdrawalTicket="closeWithdrawalTicket"
        />
        <!--LAST 10 TRANSACTIONS-->
        <withdrawal-last-transactions
          :lastTransaction="theWithdrawalTicketInfo"
          :reasons="theReasonOfList"
          @closeWithdrawalTicket="closeWithdrawalTicket"
        />
        <el-row style="padding: 0 10px 0 0">
          <el-col :span="24" align="right">
            <el-popover
              placement="top"
              width="160"
              v-for="(item, key) in buttonGroups"
              :key="key"
              trigger="hover"
              v-model="item.visible">
              <p>are you sure？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="item.visible = false">cancel</el-button>
                <el-button type="primary" size="mini">Submit</el-button>
              </div>
              <el-button
                :type="item.btnType"
                slot="reference"
                style="margin: 0 .5rem"
                :loading="item.loading"
                :disabled="item.disabled"
              >{{item.btnName}}</el-button>
            </el-popover>
          </el-col>
        </el-row>
<!--        <withdrawal-buttons-->
<!--          :key="timer"-->
<!--          :buttons="theWithdrawalTicketInfo"-->
<!--          :reasons="theReasonOfList"-->
<!--          :theTrans="theTrans"-->
<!--          @updateTheWithdrawal="updateTheWithdrawal"-->
<!--          @closeWithdrawalTicket="closeWithdrawalTicket"-->
<!--        />-->
      </el-col>
    </el-row>
    <withdrawal-remarks
      :remarks="remarkOfTicket"
      :theWithdrawalTicketInfo="theWithdrawalTicketInfo"
      @refresh="closeWithdrawalTicket"
      :key="timer"
    />
  </div>
</template>

<script>
import WithdrawalMemberDetails from './WithdrawalMemberDetails'
import WithdrawalMemberProfile from './WithdrawalMemberProfile'
import WithdrawalUploadedReceipt from './WithdrawalUploadedReceipt'
import WithdrawalInformationProofreading from './WithdrawalInformationProofreading'
import WithdrawalLastAccess from './WithdrawalLastAccess'
import WithdrawalReasons from './WithdrawalReasons'
import WithdrawalTransactionsList from './WithdrawalTransactionsList'
import WithdrawalExternalRemarks from './WithdrawalExternalRemarks'
import WithdrawalLastTransactions from './WithdrawalLastTransactions'
import WithdrawalButtons from './WithdrawalButtons'
import resourcesList from '../../../../util/static'
import FileUpload from '../../../../components/file/fileUpload'
import WithdrawalRemarks from './WithdrawalRemarks'
import {backstagePaymentWithdrawalRemarkHttp} from '../../../../api/payment/withdraw/initAxiosWithdrawal'
import element from '../../../../config/element'
export default {
  name: 'WithdrawalTicket',
  components: {
    WithdrawalRemarks,
    FileUpload,
    WithdrawalButtons,
    WithdrawalLastTransactions,
    WithdrawalExternalRemarks,
    WithdrawalTransactionsList,
    WithdrawalReasons,
    WithdrawalLastAccess,
    WithdrawalInformationProofreading,
    WithdrawalUploadedReceipt,
    WithdrawalMemberProfile,
    WithdrawalMemberDetails
  },
  props: ['withdrawalDetail', 'dropList'],
  data () {
    return {
      theReasonOfList: {
        hold_reason: '',
        reject_reason: '',
        escalate_reason: ''
      },
      theTrans: {
        amount: '',
        fee: '',
        records: ''
      },
      theWithdrawalTicketInfo: this.withdrawalDetail.data,
      timer: '',
      uploadConfig: {
        url: '',
        name: 'image',
        accept: 'image/*',
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        type: 'withdrawalTicket',
        id: ''
      },
      userID: '',
      remarkOfTicket: {
        formStatus: false,
        user: {
          id: ''
        }
      },
      // 按钮
      buttonGroups: []
    }
  },
  watch: {
    // 监测值得变化，动态更新
    'withdrawalDetail.data': function (val) {
      this.theReasonOfList = {
        hold_reason: val.hold_reason,
        reject_reason: val.reject_reason,
        escalate_reason: val.escalate_reason,
      }
      this.theTrans = {
        amount: val.paid_amount,
        fee: val.paid_fee,
        records: val.records
      }
      this.uploadConfig = {
        url: '/api/backstage/withdrawals/' + val.id + '/images',
        name: 'image',
        accept: 'image/*',
        fileHeaders: resourcesList.fileHeaders,
        fileList: val.images.data,
        type: 'withdrawalTicket',
        id: val.id
      }
      this.userID = val.user.id
      this.remarkOfTicket = {
        formStatus: false,
        user: {
          id: this.userID
        }
      }
      this.theWithdrawalTicketInfo = val
    }
  },
  mounted () {
    this.initValue()
  },
  activated () {
    console.log(1111)
    this.initButtonGroups(this.withdrawalDetail)
  },
  created () {
    console.log(1111)
    this.initButtonGroups(this.theWithdrawalTicketInfo)
  },
  methods: {
    // 初始化Button
    initButtonGroups (buttons) {
      if (buttons.hold_btn_is_show) {
        this.buttonGroups.push({
          type: 'hold',
          btnType: 'success',
          btnName: 'HOLD',
          visible: false,
          loading: false,
          disabled: false
        })
      }
      if (buttons.cancel_btn_is_show) {
        this.buttonGroups.push({
          type: 'cancel',
          btnType: 'danger',
          btnName: 'CANCEL',
          visible: false,
          loading: false,
          disabled: false
        })
      }
      if (buttons.review_btn_is_show) {
        this.buttonGroups.push({
          type: 'review',
          btnType: 'primary',
          btnName: 'REVIEW',
          visible: false,
          loading: false,
          disabled: false
        })
      }
      if (buttons.escalate_btn_is_show) {
        this.buttonGroups.push({
          type: 'escalate',
          btnType: 'warning',
          btnName: 'ESCALATE',
          visible: false,
          loading: false,
          disabled: false
        })
      }
      if (buttons.manual_btn_is_show) {
        this.buttonGroups.push({
          type: 'manual',
          btnType: 'info',
          btnName: 'MANUAL',
          visible: false,
          loading: false,
          disabled: false
        })
      }
      if (buttons.defer_btn_is_show) {
        this.buttonGroups.push({
          type: 'defer',
          btnType: 'danger',
          btnName: 'DEFER',
          visible: false,
          loading: false,
          disabled: false
        })
      }
      if (buttons.approve_btn_is_show) {
        this.buttonGroups.push({
          type: 'approve',
          btnType: 'success',
          btnName: 'APPROVE',
          visible: false,
          loading: false,
          disabled: false
        })
      }
      if (buttons.release_hold_btn_is_show) {
        this.buttonGroups.push({
          type: 'release_hold',
          btnType: 'info',
          btnName: 'RELEASE HOLD',
          visible: false,
          loading: false,
          disabled: false
        })
      }
      if (buttons.release_defer_btn_is_show) {
        this.buttonGroups.push({
          type: 'release_defer',
          btnType: 'info',
          btnName: 'RELEASE DEFER',
          visible: false,
          loading: false,
          disabled: false
        })
      }
      if (buttons.rm_approve_btn_is_show) {
        this.buttonGroups.push({
          type: 'rm_approve',
          btnType: 'success',
          btnName: 'APPROVE',
          visible: false,
          loading: false,
          disabled: false
        })
      }
      if (buttons.second_approve_btn_is_show) {
        this.buttonGroups.push({
          type: 'second_approve',
          btnType: 'success',
          btnName: 'SECOND APPROVE',
          visible: false,
          loading: false,
          disabled: false
        })
      }
      if (buttons.second_reject_btn_is_show) {
        this.buttonGroups.push({
          type: 'second_reject',
          btnType: 'danger',
          btnName: 'SECOND REJECT',
          visible: false,
          loading: false,
          disabled: false
        })
      }
    },
    // 初始化数据
    initValue () {
      this.theReasonOfList = {
        hold_reason: this.withdrawalDetail.data.hold_reason,
        reject_reason: this.withdrawalDetail.data.reject_reason,
        escalate_reason: this.withdrawalDetail.data.escalate_reason,
      }
      this.theTrans = {
        amount: this.withdrawalDetail.data.paid_amount,
        fee: this.withdrawalDetail.data.paid_fee,
        records: this.withdrawalDetail.data.records
      }
      this.uploadConfig = {
        url: '/api/backstage/withdrawals/' + this.withdrawalDetail.data.id + '/images',
        name: 'image',
        accept: 'image/*',
        fileHeaders: resourcesList.fileHeaders,
        fileList: this.withdrawalDetail.data.images.data,
        type: 'withdrawalTicket',
        id: this.withdrawalDetail.data.id
      }
      this.userID = this.withdrawalDetail.data.user.id
      this.remarkOfTicket = {
        formStatus: false,
        user: {
          id: this.userID
        }
      }
    },
    theReasons (value) {
      this.theReasonOfList = value
    },
    // 关闭弹窗 刷新列表
    closeWithdrawalTicket (res) {
      if (res) {
        this.$emit('refreshOpenWithdrawal')
      } else {
        this.$emit('backstagePaymentWithdrawalInfoHttp', this.theWithdrawalTicketInfo.id)
      }
    },
    // 更新数据
    updateTheWithdrawal (value) {
      this.theWithdrawalTicketInfo = value
      this.$emit('refreshOpenWithdrawal')
    },
    // 跳转到个人中心页面
    toMemberProfile (name) {
      let breadcrumb = ['payment', 'Fund Transfers', 'Member Profile']
      let routeData = this.$router.resolve({
        name: 'payment_fund_transfers_member_profile',
        query: {breadcrumb: JSON.stringify(breadcrumb), name: name}
      })
      window.open(routeData.href, '_blank')
    },
    // remark 列表
    remarksList () {
      this.timer = new Date().getTime()
      this.remarkOfTicket.formStatus = true
    },
    // 添加备注
    withdrawalAddRemark () {
      if (this.theWithdrawalTicketInfo.remark) {
        backstagePaymentWithdrawalRemarkHttp(
          this.theWithdrawalTicketInfo.id,
          {remark: this.theWithdrawalTicketInfo.remark}
        ).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.closeWithdrawalTicket()
        }).catch((error) => {
          console.log(error)
        })
      } else {
        this.$message.error('Please input remark!')
      }
    }
  }
}
</script>
