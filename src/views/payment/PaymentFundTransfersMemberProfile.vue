<style scoped lang="scss">
  .item {
    margin-top: 10px;
    margin-right: 15px;
    i{
      font-size: 30px;
    }
  }
  .avatar{
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    i{
      color: #fff;
      font-size: 40px;
    }
  }
</style>
<template>
  <div class="MemberProfile">
    <search-navs
      :user_name="formInline.user_name"
      @searchMemberCode="callbacks"
    />
    <el-row v-if="show">
      <el-col :span="1">
        <div class="avatar">
          <el-progress
            type="circle"
            :percentage="member.info.verified_percent"
            :width="50"
          />
        </div>
      </el-col>
      <el-col :span="3">
        <el-badge
          :is-dot="member.info.is_profile_verified"
          class="item"
        >
          <i class="el-icon-s-custom"></i>
        </el-badge>
        <el-badge
          :is-dot="member.info.is_bank_account_verified"
          class="item"
        >
          <i class="el-icon-bank-card"></i>
        </el-badge>
        <el-badge
          :is-dot="member.info.is_phone_verified"
          class="item"
          type="primary"
        >
          <i
            class="el-icon-mobile-phone"
          ></i>
        </el-badge>
        <el-badge
          :is-dot="member.info.is_email_verified"
          class="item"
          type="warning"
        >
          <i
            class="el-icon-message"
          ></i>
        </el-badge>
      </el-col>
      <el-col :span="2">
        <p>Member Code</p>
        <p>{{member.name}}</p>
      </el-col>
    </el-row>
    <el-row v-if="show" style="margin-top: 20px">
      <el-col :span="5" class="border-0">
        <div align="center">
          <el-row>
            <el-col :span="12" align="center">Full Name:</el-col>
            <el-col :span="12" align="center">{{member.info.full_name}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12" align="center">Email:</el-col>
            <el-col :span="12" align="center">{{member.info.email}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12" align="center">Currency:</el-col>
            <el-col :span="12" align="center">{{member.currency}}</el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="5" class="border-0">
        <div align="center">
          <el-row>
            <el-col :span="12" align="center">Member Status:</el-col>
            <el-col :span="12" align="center">{{member.status}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12" align="center">Risk Category: </el-col>
            <el-col :span="12" align="center">{{member.display_risk_group_id}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12" align="center">Payment Group: </el-col>
            <el-col :span="12" align="center">{{member.display_payment_group_id}}</el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import {backstagePaymentFundTransferMemberListingHttp} from '../../api/payment/fundTransfers/initAxiosFundTransfer'
import SearchNavs from './FundTransfers/SearchNavs'
export default {
  name: 'MemberProfile',
  components: {SearchNavs, FormInlineComp},
  data () {
    return {
      formInline: {
        include: 'info,account,gamePlatformUsers,vip,reward',
        user_name: ''
      },
      member: {},
      show: false
    }
  },
  methods: {
    initMember (formInline) {
      backstagePaymentFundTransferMemberListingHttp(formInline).then(res => {
        this.member = res
        this.show = true
      }).catch((error) => {
        console.log(error)
      })
    },
    // 搜索表单与分页
    callbacks (value) {
      this.formInline.user_name = value
      this.initMember(this.formInline)
    }
  },
  activated () {
    let name = this.$route.query.name
    this.show = false
    if (name) {
      this.formInline.user_name = name
      this.initMember(this.formInline)
    }
  }
}
</script>
