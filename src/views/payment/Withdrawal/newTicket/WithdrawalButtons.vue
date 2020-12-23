<template>
  <el-row style="padding: 0 10px 0 0">
    <el-col :span="24" align="right">
<!--      <el-popover-->
<!--        placement="top"-->
<!--        width="160"-->
<!--        v-for="(item, key) in buttonGroups"-->
<!--        :key="key"-->
<!--        trigger="hover"-->
<!--        v-model="item.visible">-->
<!--        <p>are you sure？</p>-->
<!--        <div style="text-align: right; margin: 0">-->
<!--          <el-button size="mini" type="text" @click="item.visible = false">cancel</el-button>-->
<!--          <el-button type="primary" size="mini" @click="affirm(item)">Submit</el-button>-->
<!--        </div>-->
<!--        <el-button-->
<!--          :type="item.btnType"-->
<!--          slot="reference"-->
<!--          style="margin: 0 .5rem"-->
<!--          :loading="item.loading"-->
<!--          :disabled="item.disabled"-->
<!--        >{{item.btnName}}</el-button>-->
<!--      </el-popover>-->
      <el-button
        v-if="buttons.hold_btn_is_show"
        type="success"
        :loading="buttonsStatus.holdReason"
        :disabled="buttonsDisabled.holdReason"
        @click="toClickBtn('holdReason')">HOLD
      </el-button>
      <el-button
        type="warning"
        :loading="buttonsStatus.cancelReason"
        :disabled="buttonsDisabled.cancelReason"
        v-if="buttons.cancel_btn_is_show"
        @click="toClickBtn('cancelReason')">CANCEL
      </el-button>
      <el-button
        type="danger"
        :loading="buttonsStatus.review"
        :disabled="buttonsDisabled.review"
        v-if="buttons.review_btn_is_show"
        @click="toClickBtn('review')">REVIEW
      </el-button>
      <el-button
        type="danger"
        :loading="buttonsStatus.defer"
        :disabled="buttonsDisabled.defer"
        v-if="buttons.defer_btn_is_show"
        @click="toClickBtn('defer')">DEFER
      </el-button>
      <el-button
        v-if="buttons.approve_btn_is_show"
        type="success"
        :loading="buttonsStatus.approve"
        :disabled="buttonsDisabled.approve"
        @click="toClickBtn('approve')">APPROVE
      </el-button>
      <el-button
        v-if="buttons.second_approve_btn_is_show"
        type="success"
        :loading="buttonsStatus.secondApprove"
        :disabled="buttonsDisabled.secondApprove"
        @click="toClickBtn('secondApprove')">Second Approve
      </el-button>
      <el-button
        v-if="buttons.rm_approve_btn_is_show"
        type="success"
        :loading="buttonsStatus.rmApprove"
        :disabled="buttonsDisabled.rmApprove"
        @click="toClickBtn('rmApprove')">APPROVE
      </el-button>
      <el-button
        type="danger"
        :loading="buttonsStatus.releaseDefer"
        :disabled="buttonsDisabled.releaseDefer"
        v-if="buttons.release_defer_btn_is_show"
        @click="toClickBtn('releaseDefer')">RELEASE DEFER
      </el-button>
      <el-button
        type="danger"
        :loading="buttonsStatus.secondReject"
        :disabled="buttonsDisabled.secondReject"
        v-if="buttons.second_reject_btn_is_show"
        @click="toClickBtn('secondReject')">Second Cancel
      </el-button>
      <el-button
        type="info"
        :loading="buttonsStatus.escalateReason"
        v-if="buttons.escalate_btn_is_show"
        :disabled="buttonsDisabled.escalateReason"
        @click="toClickBtn('escalateReason')">ESCALATE
      </el-button>
      <el-button
        type="info"
        :loading="buttonsStatus.releaseHold"
        :disabled="buttonsDisabled.releaseHold"
        v-if="buttons.release_hold_btn_is_show"
        @click="toClickBtn('releaseHold')">RELEASE HOLD
      </el-button>
      <el-button
        type="info"
        :loading="buttonsStatus.manual"
        :disabled="buttonsDisabled.manual"
        v-if="buttons.manual_btn_is_show"
        @click="toClickBtn('manual')">MANUAL
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
import {
  backstagePaymentWithdrawalApproveHttp,
  backstagePaymentWithdrawalDeferHttp,
  backstagePaymentWithdrawalEscalateHttp,
  backstagePaymentWithdrawalHoldHttp,
  backstagePaymentWithdrawalProcessHttp,
  backstagePaymentWithdrawalRejectHttp,
  backstagePaymentWithdrawalReleaseDeferHttp,
  backstagePaymentWithdrawalReleaseHoldHttp,
  backstagePaymentWithdrawalReviewHttp,
  backstagePaymentWithdrawalRmApproveHttp,
  backstagePaymentWithdrawalSecondApproveHttp,
  backstagePaymentWithdrawalSecondRejectHttp
} from '../../../../api/payment/withdraw/initAxiosWithdrawal'
import element from '../../../../config/element'
import numeral from 'numeral'

export default {
  name: 'WithdrawalButtons',
  props: ['buttons', 'reasons', 'theTrans'],
  data () {
    return {
      buttonGroups: [],
      theReasons: {
        hold_reason: this.reasons.hold_reason,
        reject_reason: this.reasons.reject_reason,
        escalate_reason: this.reasons.escalate_reason
      },
      thisTrans: {
        amount: this.theTrans.amount,
        fee: this.theTrans.fee,
        records: this.theTrans.records
      },
      buttonsStatus: {
        holdReason: false,
        cancelReason: false,
        review: false,
        defer: false,
        approve: false,
        releaseDefer: false,
        escalateReason: false,
        releaseHold: false,
        manual: false,
        secondApprove: false,
        secondReject: false,
        rmApprove: false
      },
      buttonsDisabled: {
        holdReason: false,
        cancelReason: false,
        review: false,
        defer: false,
        approve: false,
        releaseDefer: false,
        escalateReason: false,
        releaseHold: false,
        manual: false,
        secondApprove: false,
        secondReject: false,
        rmApprove: false
      }
    }
  },
  computed: {
    computedTheReasons () {
      return this.reasons
    },
    computedThisTrans () {
      let theTrans = {
        amount: this.theTrans.amount,
        fee: this.theTrans.fee,
        records: this.theTrans.records
      }
      return theTrans
    }
  },
  watch: {
    'reasons': function (val) {
      this.theReasons = val
    },
    'theTrans': function (val) {
      this.thisTrans = {
        amount: val.amount,
        fee: val.fee,
        transactions: val.records
      }
    }
  },
  methods: {
    // 按钮点击事件
    toClickBtn (operating) {
      switch (operating) {
        case 'holdReason':
          if (this.theReasons.hold_reason) {
            this.$confirm('Hold?', 'Prompt', {
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              type: 'warning'
            }).then(() => {
              this.disabledThisButton('holdReason', 1)
              this.buttonsStatus.holdReason = true
              backstagePaymentWithdrawalHoldHttp(
                this.buttons.id,
                this.theReasons
              ).then(res => {
                this.disabledThisButton('holdReason', 0)
                this.isCloseTheTicket(res)
              }).catch((error) => {
                this.disabledThisButton('holdReason', 0)
                this.$emit('closeWithdrawalTicket')
                console.log(error)
              })
            }).catch(() => {
            })
          } else {
            element.message({
              message: 'Please input Hold Reason!',
              type: 'error'
            })
          }
          break
        case 'releaseHold':
          this.$confirm('Release Hold?', 'Prompt', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            this.disabledThisButton('releaseHold', 1)
            backstagePaymentWithdrawalReleaseHoldHttp(
              this.buttons.id
            ).then(res => {
              this.disabledThisButton('releaseHold', 0)
              this.isCloseTheTicket(res)
            }).catch((error) => {
              this.disabledThisButton('releaseHold', 0)
              this.$emit('closeWithdrawalTicket')
              console.log(error)
            })
          }).catch(() => {
          })
          break
        case 'cancelReason':
          if (this.theReasons.reject_reason) {
            this.$confirm('Cancel?', 'Prompt', {
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              type: 'warning'
            }).then(() => {
              this.disabledThisButton('cancelReason', 1)
              backstagePaymentWithdrawalRejectHttp(
                this.buttons.id,
                this.theReasons
              ).then(res => {
                this.disabledThisButton('cancelReason', 0)
                this.isCloseTheTicket(res)
              }).catch((error) => {
                this.disabledThisButton('cancelReason', 0)
                this.$emit('closeWithdrawalTicket')
                console.log(error)
              })
            }).catch(() => {
            })
          } else {
            element.message({
              message: 'Please input Cancel Reason!',
              type: 'error'
            })
          }
          break
        case 'escalateReason':
          if (this.theReasons.escalate_reason) {
            this.$confirm('Escalate?', 'Prompt', {
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              type: 'warning'
            }).then(() => {
              this.disabledThisButton('escalateReason', 1)
              backstagePaymentWithdrawalEscalateHttp(
                this.buttons.id,
                this.theReasons
              ).then(res => {
                this.disabledThisButton('escalateReason', 0)
                this.isCloseTheTicket(res)
              }).catch((error) => {
                this.disabledThisButton('escalateReason', 0)
                this.$emit('closeWithdrawalTicket')
                console.log(error)
              })
            }).catch(() => {
            })
          } else {
            element.message({
              message: 'Please input Escalate Reason!',
              type: 'error'
            })
          }
          break
        case 'review':
          this.$confirm('Review?', 'Prompt', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            if (this.buttons.verify_details.is_has_remark) {
              this.disabledThisButton('review', 1)
              backstagePaymentWithdrawalReviewHttp(
                this.buttons.id
              ).then(res => {
                this.disabledThisButton('review', 0)
                this.isCloseTheTicket(res)
              }).catch((error) => {
                this.disabledThisButton('review', 0)
                this.$emit('closeWithdrawalTicket')
                console.log(error)
              })
            } else {
              element.message({
                message: 'Please remove remark first!',
                type: 'error'
              })
            }
          }).catch(() => {
          })
          break
        case 'manual':
          this.$confirm('Manual?', 'Prompt', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            this.disabledThisButton('manual', 1)
            backstagePaymentWithdrawalProcessHttp(this.buttons.id
            ).then(res => {
              this.disabledThisButton('manual', 0)
              this.isCloseTheTicket(res)
            }).catch((error) => {
              this.disabledThisButton('manual', 0)
              this.$emit('closeWithdrawalTicket')
              console.log(error)
            })
          }).catch(() => {
          })
          break
        case 'defer':
          this.$confirm('Defer?', 'Prompt', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            this.disabledThisButton('defer', 1)
            backstagePaymentWithdrawalDeferHttp(
              this.buttons.id
            ).then(res => {
              this.disabledThisButton('defer', 0)
              this.isCloseTheTicket(res)
            }).catch((error) => {
              this.disabledThisButton('defer', 0)
              this.$emit('closeWithdrawalTicket')
              console.log(error)
            })
          }).catch(() => {
          })
          break
        case 'releaseDefer':
          this.$confirm('Release Defer?', 'Prompt', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            this.disabledThisButton('releaseDefer', 1)
            backstagePaymentWithdrawalReleaseDeferHttp(
              this.buttons.id
            ).then(res => {
              this.disabledThisButton('releaseDefer', 0)
              this.isCloseTheTicket(res)
            }).catch((error) => {
              this.disabledThisButton('releaseDefer', 0)
              this.$emit('closeWithdrawalTicket')
              console.log(error)
            })
          }).catch(() => {
          })
          break
        case 'approve':
          this.$confirm('Approve?', 'Prompt', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            this.disabledThisButton('approve', 1)
            backstagePaymentWithdrawalApproveHttp(
              this.buttons.id
            ).then(res => {
              this.disabledThisButton('approve', 0)
              this.isCloseTheTicket(res)
            }).catch((error) => {
              this.disabledThisButton('approve', 0)
              this.$emit('closeWithdrawalTicket')
              console.log(error)
            })
          }).catch(() => {
          })
          break
        case 'rmApprove':
          this.$confirm('Approve?', 'Prompt', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            this.disabledThisButton('rmApprove', 1)
            backstagePaymentWithdrawalRmApproveHttp(
              this.buttons.id
            ).then(res => {
              this.disabledThisButton('rmApprove', 0)
              this.isCloseTheTicket(res)
            }).catch((error) => {
              this.disabledThisButton('rmApprove', 0)
              this.$emit('closeWithdrawalTicket')
              console.log(error)
            })
          }).catch(() => {
          })
          break
        case 'secondApprove':
          this.$confirm('Second Approve?', 'Prompt', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            this.disabledThisButton('secondApprove', 1)
            backstagePaymentWithdrawalSecondApproveHttp(
              this.buttons.id
            ).then(res => {
              this.disabledThisButton('secondApprove', 0)
              this.isCloseTheTicket(res)
            }).catch((error) => {
              this.disabledThisButton('secondApprove', 0)
              this.$emit('closeWithdrawalTicket')
              console.log(error)
            })
          }).catch(() => {
          })
          break
        case 'secondReject':
          this.$confirm('Second Reject?', 'Prompt', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            this.disabledThisButton('secondReject', 1)
            backstagePaymentWithdrawalSecondRejectHttp(
              this.buttons.id
            ).then(res => {
              this.disabledThisButton('secondReject', 0)
              this.isCloseTheTicket(res)
            }).catch((error) => {
              this.disabledThisButton('secondReject', 0)
              this.$emit('closeWithdrawalTicket')
              console.log(error)
            })
          }).catch(() => {
          })
          break
      }
    },
    // 将按钮禁止
    disabledThisButton (button, status) {
      for (var i in this.buttonsDisabled) {
        if (status) {
          if (button !== i) {
            this.buttonsDisabled[i] = true
          } else {
            this.buttonsStatus[i] = true
          }
        } else {
          if (button !== i) {
            this.buttonsDisabled[i] = false
          } else {
            this.buttonsDisabled[i] = false
            this.buttonsStatus[i] = false
          }
        }
      }
    },
    // 校验数据
    checkAmount () {
      console.log(Number(numeral(this.thisTrans.amount).value()))
      console.log(Number(numeral(this.buttons.amount).value()))
      console.log(this.thisTrans)
      if (Number(numeral(this.thisTrans.amount).value()) === Number(numeral(this.buttons.amount).value()) && numeral(this.thisTrans.fee).value() <= 20) {
        return true
      } else {
        return false
      }
    },
    // 根据返回数据判断动作
    isCloseTheTicket (res) {
      element.message({
        message: 'success!',
        type: 'success'
      })
      this.$emit('closeWithdrawalTicket', res.is_close_form)
    },
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
    }
  },
  created () {
    this.initButtonGroups(this.buttons)
  }
}
</script>

<style scoped>

</style>
