<style scoped>
.box {
  height: 130px;
  overflow: hidden;
  overflow-y: auto;
}
</style>
<template>
  <div class="member">
    <el-row>
      <el-col :span="24" align="center">Last Access: {{lastAccess.last_access_name}} {{lastAccess.last_access_at}}</el-col>
    </el-row>
    <el-row class="box">
      <el-col
        v-for="item in times"
        :key="item.key"
        :span="12"
        align="center">
        {{item.action}}:&nbsp;&nbsp;{{item.admin_name}}&nbsp;&nbsp;{{item.created_at}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'WithdrawalLastAccess',
  props: ['lastAccess'],
  data () {
    return {
      times: this.lastAccess.audits
    }
  },
  computed: {
    computedTimes () {
      return this.lastAccess.audits
    }
  },
  watch: {
    'lastAccess': function (val) {
      this.times = val.audits
    }
  }
}
</script>
