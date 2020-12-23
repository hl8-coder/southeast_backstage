<template>
  <div class="member">
    <el-row>
      <el-col :span="12" align="left">HOLD REASON:</el-col>
      <el-col :span="12" align="center">
        <el-select
          v-model="theReasonList.hold_reason"
          @change="outOfTheReason"
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
          v-model="theReasonList.reject_reason"
          @change="outOfTheReason"
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
          v-model="theReasonList.escalate_reason"
          @change="outOfTheReason"
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
</template>

<script>
export default {
  name: 'WithdrawalReasons',
  props: ['allReasons', 'dropList'],
  data () {
    return {
      theReasonList: {
        hold_reason: this.allReasons.hold_reason,
        reject_reason: this.allReasons.reject_reason,
        escalate_reason: this.allReasons.escalate_reason
      }
    }
  },
  // 利用computed 和 watch 将props的值赋给data中的变量
  computed: {
    computedTheReasonList () {
      let theReasonListComputed = {
        hold_reason: this.allReasons.hold_reason,
        reject_reason: this.allReasons.reject_reason,
        escalate_reason: this.allReasons.escalate_reason
      }
      return theReasonListComputed
    }
  },
  watch: {
    'allReasons.data': function (val) {
      this.theReasonList = {
        hold_reason: val.hold_reason,
        reject_reason: val.reject_reason,
        escalate_reason: val.escalate_reason
      }
    }
  },
  methods: {
    // 将值吐给父组件
    outOfTheReason () {
      this.$emit('theReasons', this.theReasonList)
    }
  }
}
</script>

<style scoped>

</style>
