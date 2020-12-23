<template>
  <div class="member">
    <h3>MEMBER PROFILE</h3>
    <div class="box" style="height: 5.5rem;line-height: 1;">
      <el-row :gutter="20">
        <el-col :span="10" align="left">Member Code</el-col>
        <el-col :span="11" align="left">:
          <el-link type="primary" @click="toMemberProfile(memberProfile.user.id)">
            {{memberProfile.user.name}}
          </el-link>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" align="left">Member Status</el-col>
        <el-col :span="11" align="left">: {{memberProfile.user.display_status}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" align="left">Member Wallet</el-col>
        <el-col :span="11" align="left">: {{memberProfile.user.status}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" align="left">Member Rank</el-col>
        <el-col :span="11" align="left">: {{memberProfile.user.vip_id}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WithdrawalMemberProfile',
  props: ['memberProfile'],
  methods: {
    toMemberProfile (name) {
      let url = this.$router.resolve({
        name: 'payment_fund_transfers_member_profile',
        query: {name: name}
      })
      window.open(url.href)
    }
  }
}
</script>

<style scoped>

</style>
