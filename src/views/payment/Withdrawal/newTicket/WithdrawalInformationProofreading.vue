<template>
  <div class="member">
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="24">
            <div class="ml-35">
              <span
                v-if="informationProofreading.verify_details.turnover_is_closed"
                class="span span-success">
                <i class="el-icon-check"></i>
              </span>
              <span
                v-if="!informationProofreading.verify_details.turnover_is_closed"
                class="span span-danger">
                <i class="el-icon-close"></i>
              </span>
              Total Rollover: {{informationProofreading.verify_details.total_turnover}}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="ml-35">
              <span
                v-if="informationProofreading.verify_details.deposit_is_closed"
                class="span span-success">
                <i class="el-icon-check"></i>
              </span>
              <span
                v-if="!informationProofreading.verify_details.deposit_is_closed"
                class="span span-danger">
                <i class="el-icon-close"></i>
              </span>
              Total Deposit RO: {{informationProofreading.verify_details.deposit_turnover}}
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="24">
            <div class="ml-35">
              <span
                v-if="informationProofreading.verify_details.is_has_remark"
                class="span span-success">
                <i class="el-icon-check"></i>
              </span>
              <span
                v-if="!informationProofreading.verify_details.is_has_remark"
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
                v-if="informationProofreading.verify_details.is_poker_player"
                class="span span-success">
                <i class="el-icon-check"></i>
              </span>
              <span
                v-if="!informationProofreading.verify_details.is_poker_player"
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
                v-if="informationProofreading.verify_details.is_has_bonus"
                class="span span-success">
                <i class="el-icon-check"></i>
              </span>
              <span
                v-if="!informationProofreading.verify_details.is_has_bonus"
                class="span span-danger">
                <i class="el-icon-close"></i>
              </span>
              First Time Claim Bonus
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <withdrawal-adjustment
      :withdrawalAdjustment="adjustment"
    />
    <withdrawal-remarks
      :remarks="remarkOfTicket"
      @refresh="refresh"
      :key="times"
    />
  </div>
</template>

<script>
import WithdrawalAdjustment from './WithdrawalAdjustment'
import WithdrawalRemarks from './WithdrawalRemarks'
export default {
  name: 'WithdrawalInformationProofreading',
  components: {WithdrawalRemarks, WithdrawalAdjustment},
  props: ['informationProofreading'],
  data () {
    return {
      adjustment: {
        formStatus: false
      },
      remarkOfTicket: {
        formStatus: false,
        user: {
          id: this.informationProofreading.user.id
        }
      },
      times: ''
    }
  },
  methods: {
    refresh () {
      this.$emit('closeWithdrawalTicket')
    },
    remarksList () {
      this.remarkOfTicket.formStatus = true
    }
  }
}
</script>

<style scoped lang="scss">
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
</style>
