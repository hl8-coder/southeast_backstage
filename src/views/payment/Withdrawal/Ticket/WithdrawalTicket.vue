<template>
  <div class="WithdrawalTicket">
    <div class="WithdrawalTicket" v-if="theWithdrawalTicketInfo !== ''">
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
                <el-col style="font-weight: bold;font-size: 16px" :span="12" align="left">: {{theWithdrawalTicketInfo.amount}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="10" align="left">Name</el-col>
                <el-col :span="8" align="left">: {{theWithdrawalTicketInfo.account_name}}<button class="copy1" data-clipboard-action="copy" :data-clipboard-text="theWithdrawalTicketInfo.account_name" style="margin-left: 20px" @click="copy">copy</button></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="10" align="left">Bank Name</el-col>
                <el-col :span="12" align="left">: {{theWithdrawalTicketInfo.bank.name}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="10" align="left">Bank Account</el-col>
                <el-col :span="12" align="left">: {{theWithdrawalTicketInfo.account_no}}<button class="copy1" data-clipboard-action="copy" :data-clipboard-text="theWithdrawalTicketInfo.account_no" style="margin-left: 20px" @click="copy">copy</button></el-col>
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
              <el-row :gutter="20">
                <el-col :span="10" align="left">Affiliated Code</el-col>
                <el-col :span="11" align="left">: {{theWithdrawalTicketInfo.user.affiliated_code || "-"}}</el-col>
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
                  <el-link
                    @click="totalTurnover">
                    Total Turnover: {{theWithdrawalTicketInfo.verify_details.total_turnover}}
                  </el-link>
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
<!--            <el-row>-->
<!--              <el-col :span="24">-->
<!--                <div class="ml-35">-->
<!--                  <span-->
<!--                    v-if="theWithdrawalTicketInfo.verify_details.is_has_bonus"-->
<!--                    class="span span-success">-->
<!--                    <i class="el-icon-check"></i>-->
<!--                  </span>-->
<!--                  <span-->
<!--                    v-if="!theWithdrawalTicketInfo.verify_details.is_has_bonus"-->
<!--                    class="span span-danger">-->
<!--                    <i class="el-icon-close"></i>-->
<!--                  </span>-->
<!--                  First Time Claim Bonus-->
<!--                </div>-->
<!--              </el-col>-->
<!--            </el-row>-->
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
          <div class="member">
            <el-row>
              <el-col :span="20" align="center">
                <h3>
                  Total Amount : {{transactions.totalAmount}}
                  &nbsp;&nbsp;&nbsp;
                  Total Fees : {{transactions.totalFee}}
                  &nbsp;&nbsp;&nbsp;
                  Remain Amount :
                  <span v-if="transactions.balance !== 0" style="color: #f00">{{transactions.balance}}</span>
                  <span v-else>{{transactions.balance}}</span>
                </h3>
              </el-col>
              <el-col :span="4" align="center">
                <el-button
                  size="small"
                  v-if="theWithdrawalTicketInfo.add_transactions_btn_is_show"
                  class="button--small"
                  @click="addRecord"
                  type="primary">Add</el-button>
              </el-col>
            </el-row>
            <el-row
              v-for="(item, key) in transactions.records"
              :key="key"
            >
              <el-col :span="6" align="center">Amount: {{item.amount | AllFilter('numeral')}}</el-col>
              <el-col :span="6" align="center">Fee: {{item.fee | AllFilter('numeral')}}</el-col>
              <el-col :span="6" align="center">Fund Out: {{item.company_bank_account_code}}</el-col>
              <el-col :span="6">
                <el-button
                  size="small"
                  v-if="theWithdrawalTicketInfo.add_transactions_btn_is_show"
                  @click="modifyTrans(key)"
                  class="button--small"
                  type="success">Modify</el-button>
                <el-button
                  size="small"
                  v-if="theWithdrawalTicketInfo.add_transactions_btn_is_show"
                  @click="deleteTrans(key)"
                  class="button--small"
                  type="danger">Delete</el-button>
              </el-col>
            </el-row>
          </div>
          <el-dialog
            append-to-body
            class="Remarks"
            :title="transactionsForm.title"
            :visible.sync="transactionsForm.status"
          >
            <el-form
              label-position="right"
              label-width="80px"
              :model="transactions">
              <el-form-item
                label="Amount"
              >
                <el-input
                  v-model="recordForm.amount"
                />
              </el-form-item>
              <el-form-item
                label="Fee"
              >
                <el-input
                  v-model="recordForm.fee"
                />
              </el-form-item>
              <el-form-item
                label="Fund Out">
                <el-select
                  v-model="recordForm.company_bank_account_code"
                  placeholder="Fund Out"
                >
                  <el-option
                    v-for="item in theWithdrawalTicketInfo.company_bank_account_code"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="recordFormSubmit">Submit</el-button>
                <el-button @click="transactionsForm.status = false">cancel</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <!--LAST 10 TRANSACTIONS-->
          <div class="member" align="center">
            <h3>LAST 10 TRANSACTIONS</h3>
            <div class="box" style="height: 9rem;line-height: 1;">
              <el-row
                v-for="item in theWithdrawalTicketInfo.userWithdrawals.data"
                :key="item.id"
              >
                <el-col :span="6" align="center">
                  <el-link @click="showThisWithdrawal(item.id)" type="primary">{{item.order_no}}</el-link>
                </el-col>
                <el-col :span="6" align="center" v-if="item.created_at">{{theWithdrawalTicketInfo.display_status}}</el-col>
                <el-col :span="6">{{item.amount}}</el-col>
                <el-col :span="6">{{item.created_at}}</el-col>
              </el-row>
            </div>
            <el-link type="primary" @click="allTrans(theWithdrawalTicketInfo.user.name)">VIEW ALL TRANSACTIONS</el-link>
          </div>
          <el-row style="padding: 0 10px 0 0">
            <el-col :span="24" align="right">
              <el-popover
                placement="top"
                width="160"
                v-for="(item, key) in buttonGroups"
                :key="key"
                trigger="click"
                @hide="hide(item)"
                @show="show(item)"
                v-model="item.visible">
                <p>are you sure？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="item.visible = false">cancel</el-button>
                  <el-button type="primary" size="mini" @click="withdrawalButtonClick(item)">Submit</el-button>
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
        </el-col>
      </el-row>
      <withdrawal-remarks
        :remarks="remarkOfTicket"
        :theWithdrawalTicketInfo="theWithdrawalTicketInfo"
        @refresh="closeWithdrawalTicket"
      />
      <el-dialog
        title="Total Turnover"
        style="height: 850px;overflow-y: auto"
        append-to-body
        :visible.sync="totalTurnoverDialog"
      >
        <div style="text-align: right">
          Remaining Turnover: {{theWithdrawalTicketInfo.verify_details.total_not_close_turnover}}
        </div>
        <table-comp
          :table-config="totalTurnoverTableConfig"
          :res-information="totalTurnoverResInformation"
        ></table-comp>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import FileUpload from '../../../../components/file/fileUpload'
import resourcesList from '../../../../util/static'
import {
  backstagePaymentWithdrawalAddRecords,
  backstagePaymentWithdrawalHoldHttp,
  backstagePaymentWithdrawalReleaseHoldHttp,
  backstagePaymentWithdrawalEscalateHttp,
  backstagePaymentWithdrawalReviewHttp,
  backstagePaymentWithdrawalProcessHttp,
  backstagePaymentWithdrawalDeferHttp,
  backstagePaymentWithdrawalReleaseDeferHttp,
  backstagePaymentWithdrawalApproveHttp,
  backstagePaymentWithdrawalRmApproveHttp,
  backstagePaymentWithdrawalSecondApproveHttp,
  backstagePaymentWithdrawalSecondRejectHttp,
  backstagePaymentWithdrawalRejectHttp,
  backstagePaymentWithdrawalRemarkHttp,
  backstagePaymentWithdrawalClaimHttp,
  backstagePaymentWithdrawalUnclaimHttp
} from '../../../../api/payment/withdraw/initAxiosWithdrawal'
import element from '../../../../config/element'
import numeral from 'numeral'
import WithdrawalRemarks from '../newTicket/WithdrawalRemarks'
import filter from '../../../../util/filter'
import TableComp from '../../../../components/table/tableComp'
export default {
  name: 'WithdrawalTicket',
  components: {TableComp, WithdrawalRemarks, FileUpload},
  props: ['withdrawalDetail', 'dropList'],
  data () {
    return {
      theWithdrawalTicketInfo: this.withdrawalDetail.data,
      uploadConfig: {
        url: '',
        name: 'image',
        accept: 'image/*',
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        type: 'withdrawalTicket',
        id: ''
      },
      remarkOfTicket: {
        formStatus: false,
        user: {
          id: ''
        }
      },
      oEvent: null,
      timer: '',
      userID: '',
      theReasonOfList: {
        hold_reason: '',
        reject_reason: '',
        escalate_reason: ''
      },
      transactions: {
        totalAmount: '',
        totalFee: '',
        balance: '',
        records: []
      },
      transactionsForm: {
        title: '',
        status: false
      },
      recordForm: {
        amount: '',
        fee: '',
        company_bank_account_code: ''
      },
      theTrans: {
        amount: '',
        fee: '',
        records: ''
      },
      buttonGroups: [],
      recordsKey: '',
      totalTurnoverDialog: false,
      totalTurnoverTableConfig: {
        border: true,
        loading: false,
        tableColumn: [
          {
            prop: 'order_no',
            label: 'Transaction ID'
          },
          {
            prop: 'type',
            label: 'Type'
          },
          {
            prop: 'turnover_closed_value',
            label: 'Total Turnover'
          },
          {
            prop: 'turnover_current_value',
            label: 'Current Turnover'
          },
          {
            prop: 'is_turnover_closed',
            label: 'Meet Rollover',
            render: (h, params) => {
              if (params.item.is_turnover_closed) {
                return h('div', [
                  h('span', {
                  }, params.item.is_turnover_closed)
                ])
              } else {
                return h('div', [
                  h('span', {
                    style: {
                      color: '#f00'
                    }
                  }, params.item.is_turnover_closed)
                ])
              }
            }
          }
        ]
      },
      totalTurnoverResInformation: {}
    }
  },
  mounted () {
    this.initValue(this.withdrawalDetail.data)
  },
  methods: {
    copy () {
     let clipboard = new this.clipboard('.copy1')
      element.message({
        type: 'success',
        message: 'copy success'
      })
    },
    // remark 列表
    remarksList () {
      this.timer = new Date().getTime()
      this.remarkOfTicket.formStatus = true
    },
    // 关闭弹窗 刷新列表
    closeWithdrawalTicket (res) {
      if (res) {
        this.$emit('refreshOpenWithdrawal')
      } else {
        this.$emit('backstagePaymentWithdrawalInfoHttp', this.theWithdrawalTicketInfo.id)
      }
    },
    // 流水明细
    totalTurnover () {
      this.totalTurnoverDialog = true
      this.totalTurnoverTableConfig.loading = true
      this.totalTurnoverTableConfig.loading = false
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
    },
    // 添加或更新 Record
    recordFormSubmit () {
      if (!this.recordForm.amount) {
        element.message({
          type: 'error',
          message: 'Amount field is required'
        })
        return false
      }
      if (!this.recordForm.company_bank_account_code) {
        element.message({
          type: 'error',
          message: 'Fund Out field is required'
        })
        return false
      }
      if (this.recordsKey !== '') {
        this.transactions.records[this.recordsKey] = {
          amount: numeral(this.recordForm.amount).value(),
          fee: numeral(this.recordForm.fee).value(),
          company_bank_account_code: this.recordForm.company_bank_account_code
        }
      } else {
        let temp = {
          amount: numeral(this.recordForm.amount).value(),
          fee: numeral(this.recordForm.fee).value(),
          company_bank_account_code: this.recordForm.company_bank_account_code
        }
        this.transactions.totalAmount += Number(temp.amount)
        this.transactions.totalFee += Number(temp.fee)
        this.transactions.records.push(temp)
      }
      this.countTrans()
      if (numeral(this.transactions.fee).value() > 20) {
        element.message({
          type: 'error',
          message: 'The fee can\'t exceed 20!'
        })
        return false
      }
      backstagePaymentWithdrawalAddRecords(this.theWithdrawalTicketInfo.id, this.transactions).then(res => {
        element.message({
          type: 'success',
          message: 'success!'
        })
        this.transactionsForm.status = false
        this.closeWithdrawalTicket(false)
      }).catch((error) => {
        this.transactionsForm.status = false
        this.closeWithdrawalTicket(false)
        console.log(error)
      })
    },
    // 数据初始化
    initValue (val) {
      this.initButtonGroups(val)
      this.theWithdrawalTicketInfo = val
      this.transactions.totalAmount = numeral(val.paid_amount).format('0,0.00')
      this.transactions.totalFee = numeral(val.paid_fee).format('0,0.00')
      this.transactions.balance = numeral(Number(numeral(val.amount).value()) - Number(val.paid_amount)).format('0,0.00')
      let records = val.records
      if (records === null) {
        records = []
      }
      this.transactions.records = records
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
      this.totalTurnoverResInformation.data = val.verify_details.turnover_details
    },
    // 提现历史记录
    showThisWithdrawal (id) {
      if (this.$route.params.id) {
        let routeData = this.$router.resolve({
          name: 'WithdrawalTicket',
          params: {id: id}
        })
        window.open(routeData.href, '_blank')
      }
      var URL = document.URL.split('?')[0] + '?id=' + id
      window.open(URL)
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
    // 初始化Button
    initButtonGroups (buttons) {
      this.buttonGroups = []
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
      if (buttons.claim_btn_is_show) {
        this.buttonGroups.push({
          type: 'claim',
          btnType: 'primary',
          btnName: 'CLAIM',
          visible: false,
          loading: false,
          disabled: false
        })
      }
      if (buttons.unclaim_btn_is_show) {
        this.buttonGroups.push({
          type: 'unclaim',
          btnType: 'danger',
          btnName: 'UNCLAIM',
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
          btnName: 'SECOND REJECT',
          visible: false,
          loading: false,
          disabled: false
        })
      }
      if (buttons.second_reject_btn_is_show) {
        this.buttonGroups.push({
          type: 'second_reject',
          btnType: 'danger',
          btnName: 'SECOND APPROVE',
          visible: false,
          loading: false,
          disabled: false
        })
      }
    },
    // 判断点击按钮
    withdrawalButtonClick (item) {
      item.visible = false
      this.withdrawalButtonStatus(item.type, 1)
      if (this.theWithdrawalTicketInfo.remark) {
        backstagePaymentWithdrawalRemarkHttp(
          this.theWithdrawalTicketInfo.id,
          {remark: this.theWithdrawalTicketInfo.remark}
        ).then(res => {
        }).catch((error) => {
          console.log(error)
        })
      }
      switch (item.type) {
        case 'hold':
          if (!this.theReasonOfList.hold_reason) {
            element.message({
              type: 'error',
              message: 'Please input hold reason'
            })
            this.withdrawalButtonStatus(item.type, 0)
            return false
          }
          backstagePaymentWithdrawalHoldHttp(
            this.theWithdrawalTicketInfo.id,
            this.theReasonOfList
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
        case 'cancel':
          if (!this.theReasonOfList.reject_reason) {
            element.message({
              type: 'error',
              message: 'Please input cancel reason'
            })
            this.withdrawalButtonStatus(item.type, 0)
            return false
          }
          backstagePaymentWithdrawalRejectHttp(
            this.theWithdrawalTicketInfo.id,
            this.theReasonOfList
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
        case 'review':
          backstagePaymentWithdrawalReviewHttp(
            this.theWithdrawalTicketInfo.id,
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
        case 'escalate':
          if (!this.theReasonOfList.escalate_reason) {
            element.message({
              type: 'error',
              message: 'Please input escalate reason'
            })
            this.withdrawalButtonStatus(item.type, 0)
            this.withdrawalButtonStatus(item.type, 0)
            return false
          }
          backstagePaymentWithdrawalEscalateHttp(
            this.theWithdrawalTicketInfo.id,
            this.theReasonOfList
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
        case 'manual':
          backstagePaymentWithdrawalProcessHttp(
            this.theWithdrawalTicketInfo.id
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
        case 'defer':
          backstagePaymentWithdrawalDeferHttp(
            this.theWithdrawalTicketInfo.id
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
        case 'approve':
          backstagePaymentWithdrawalApproveHttp(
            this.theWithdrawalTicketInfo.id
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
        case 'release_hold':
          backstagePaymentWithdrawalReleaseHoldHttp(
            this.theWithdrawalTicketInfo.id
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
        case 'release_defer':
          backstagePaymentWithdrawalReleaseDeferHttp(
            this.theWithdrawalTicketInfo.id
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
        case 'claim':
          backstagePaymentWithdrawalClaimHttp(
            this.theWithdrawalTicketInfo.id
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
        case 'unclaim':
          backstagePaymentWithdrawalUnclaimHttp(
            this.theWithdrawalTicketInfo.id
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
        case 'rm_approve':
          backstagePaymentWithdrawalRmApproveHttp(
            this.theWithdrawalTicketInfo.id
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
        case 'second_approve':
          backstagePaymentWithdrawalSecondApproveHttp(
            this.theWithdrawalTicketInfo.id
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
        case 'second_reject':
          backstagePaymentWithdrawalSecondRejectHttp(
            this.theWithdrawalTicketInfo.id
          ).then(res => {
            this.withdrawalButtonStatus(item.type, 0)
            this.isCloseTheTicket(res)
          }).catch((error) => {
            this.withdrawalButtonStatus(item.type, 0)
            this.closeWithdrawalTicket()
            console.log(error)
            return false
          })
          break
      }
    },
    // 更改按钮状态
    withdrawalButtonStatus (type, status) {
      for (var i in this.buttonGroups) {
        if (status) {
          if (this.buttonGroups[i].type !== type) {
            this.buttonGroups[i].disabled = true
          } else {
            this.buttonGroups[i].loading = true
          }
        } else {
          if (this.buttonGroups[i].type !== type) {
            this.buttonGroups[i].disabled = false
          } else {
            this.buttonGroups[i].disabled = false
            this.buttonGroups[i].loading = false
          }
        }
      }
    },
    // 键盘点击事件
    hide () {
      document.removeEventListener('keydown', this.oEvent)
    },
    // 键盘点击事件
    show (item) {
      document.removeEventListener('keydown', this.oEvent)
      this.oEvent = () => {
        var oEvent = window.event
        if (oEvent.keyCode === 32) {
          this.withdrawalButtonClick(item)
        }
      }
      document.addEventListener('keydown', this.oEvent)
    },
    // 更改转账记录
    modifyTrans (key) {
      this.recordsKey = key
      this.transactionsForm.status = true
      this.transactionsForm.title = 'Update Record'
      this.recordForm = {
        amount: this.transactions.records[key].amount,
        fee: this.transactions.records[key].fee,
        company_bank_account_code: this.transactions.records[key].company_bank_account_code
      }
    },
    // 删除转账记录
    deleteTrans (key) {
      this.transactions.records.splice(key, 1)
      this.countTrans()
    },
    // 计算trans
    countTrans () {
      let data = this.transactions.records
      let totalAm = 0
      let totalFee = 0
      for (var i = 0; i < data.length; i++) {
        totalAm = totalAm + Number(data[i].amount)
        totalFee = totalFee + Number(data[i].fee)
      }
      this.transactions.totalAmount = numeral(totalAm).format('0,0.00')
      this.transactions.totalFee = numeral(totalFee).format('0,0.00')
      this.transactions.balance = numeral(Number(numeral(this.theWithdrawalTicketInfo.amount).value()) - totalAm).format('0,0.00')
    },
    // 添加Record
    addRecord () {
      this.transactionsForm.status = true
      this.transactionsForm.title = 'Add Record'
      this.recordForm = {
        amount: numeral(numeral(this.theWithdrawalTicketInfo.amount).value()).format('0,0'),
        fee: '',
        company_bank_account_code: ''
      }
    },
    // 根据返回数据判断动作
    isCloseTheTicket (res) {
      element.message({
        message: 'success!',
        type: 'success'
      })
      this.closeWithdrawalTicket(res.is_close_form)
    },
    // 查看所有记录
    allTrans (name) {
      let breadcrumb = ['payment', 'Fund Transfers', 'withdrawalHistory']
      let routeData = this.$router.resolve({
        name: 'payment_fund_transfers_withdrawal_history',
        query: {breadcrumb: JSON.stringify(breadcrumb), name: name}
      })
      window.open(routeData.href, '_blank')
    }
  },
  watch: {
    // 监测值得变化，动态更新
    'withdrawalDetail.data': function (val) {
      this.initValue(val)
    },
    'recordForm.amount' (newValue, oldValue) {
      this.recordForm.amount = filter.numeralChange(newValue, oldValue)
    },
    'recordForm.fee' (newValue, oldValue) {
      this.recordForm.fee = filter.numeralChange(newValue, oldValue)
    }
  }
}
</script>

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
