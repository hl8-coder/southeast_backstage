<template>
  <div class="member">
    <h3>MEMBER DETAILS</h3>
    <div class="box" style="height: 5.5rem;line-height: 1;">
      <el-row :gutter="20">
        <el-col :span="10" align="left">Amount</el-col>
        <el-col :span="12" align="left">: {{memberDetails.amount}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" align="left">Name</el-col>
        <el-col :span="12" align="left">: {{memberDetails.account_name}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" align="left">Bank Name</el-col>
        <el-col :span="12" align="left">: {{memberDetails.bank.name}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" align="left">Bank Account</el-col>
        <el-col :span="12" align="left">: {{memberDetails.account_no}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" align="left">City</el-col>
        <el-col :span="12" align="left">: {{memberDetails.city}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" align="left">Province</el-col>
        <el-col :span="12" align="left">: {{memberDetails.province}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WithdrawalMemberDetails',
  props: ['memberDetails']
}
</script>

<style scoped>

</style>
