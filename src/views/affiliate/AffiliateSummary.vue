<style scoped lang="scss">
.AffiliateSummary {
  .el-col {
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
  }
  .item-title {
    display: inline-block;
    width: 135px;
  }
}
.border-0{
  border: none !important;
}
</style>

<template>
  <div class="AffiliateSummary" v-if="affiliateDetail">
    <sub-nav
      :navs="AffiliateNav"
    />
    <div style="margin: 10px 0;width: 70%">
      <p>AFF tracking link website (PC) :</p>
      <div style="text-indent: 60px" :key="item.detail" v-for="item in affiliateDetail.sub_member_pc_url" @click="toMemberWebSite(`${item.url}?affiliate_id=${affiliateDetail.id}&affiliate_code=${affiliateDetail.code}&tracking_id=${affiliateDetail.tid}`)">
        {{item.url}}?affiliate_id={{affiliateDetail.id}}&affiliate_code={{affiliateDetail.code}}&tracking_id={{affiliateDetail.tid}}
        <span style="margin-left: 100px">{{item.detail}}</span>
      </div>
      <p>AFF tracking link website (MOBILE) :</p>
      <div style="text-indent: 60px" :key="item.detail" v-for="item in affiliateDetail.sub_member_mobile_url" @click="toMemberWebSite(`${item.url}?affiliate_id=${affiliateDetail.id}&affiliate_code=${affiliateDetail.code}&tracking_id=${affiliateDetail.tid}`)">
        {{item.url}}?affiliate_id={{affiliateDetail.id}}&affiliate_code={{affiliateDetail.code}}&tracking_id={{affiliateDetail.tid}}
        <span style="margin-left: 100px">{{item.detail}}</span>
      </div>
      <p>
      <span class="item-title">Last login</span>: {{affiliateDetail.userInfo.last_login_at}}
      </p>
      <p><span class="item-title">Tier 1 Affiliate ID</span>: {{affiliateDetail.user.name}}</p>
      <div style="background: #fff;">
        <el-row>
          <el-col :span="8">
            <div align="center">Member</div>
          </el-col>
          <el-col :span="8">
            <div align="center">Quick sumary of this month</div>
          </el-col>
          <el-col :span="8">
            <div align="center">Commission</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-row>
              <el-col :span="12" align="center">total member</el-col>
              <el-col :span="12" align="center">{{affiliateDetail.total_member}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8" class="border-0">
            <div>
              <el-row>
                <el-col :span="12" align="center">No.of click</el-col>
                <el-col :span="12" align="center">{{affiliateDetail.click}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12" align="center">New Sign Up</el-col>
                <el-col :span="12" align="center">{{affiliateDetail.new_sign_count}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12" align="center">New Sign Up with deposit</el-col>
                <el-col :span="12" align="center">{{affiliateDetail.new_sign_deposit_count}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12" align="center">Active member</el-col>
                <el-col :span="12" align="center">{{affiliateDetail.active_member}}</el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8" class="border-0">
            <div>
              <el-row :key="item.currency" v-if="affiliateDetail.commissions" v-for="item in affiliateDetail.commissions.data">
                <el-col :span="8" align="center">{{item.issue}}</el-col>
                <el-col :span="8" align="center">{{item.payout_comm_amount}}</el-col>
                <el-col :span="8" align="center">{{item.currency}}</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="margin: 10px 0;width: 25%">
      <b>Transaction data</b>
      <div style="background: #fff;">
        <el-row>
          <el-col :span="24">
            <div align="center">Total</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div align="center">
              <el-row>
                <el-col :span="12" align="center">Company Win/Loss</el-col>
                <el-col :span="12" align="center">{{affiliateDetail.user.currency}} {{affiliateDetail.transaction.platform_profit}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12" align="center">Turnover</el-col>
                <el-col :span="12" align="center">{{affiliateDetail.user.currency}} {{affiliateDetail.transaction.user_bet}}</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
    />
<!--    <div v-if="resInformation.length !== 0" style="margin: 10px 0;width: 100%" v-for="(item1, key) in DropList.product_type" :key="key">-->
<!--      <b>{{item1.value}}</b>-->
<!--      <el-row>-->
<!--        <el-col style="background: #fff;" v-for="(item, key) in resInformation.data" :key="key" v-if="item1.value === item.display_game_type" :span="4">-->
<!--          <div align="center">Current Month {{item.platform_name}} - {{item.display_game_type}}</div>-->
<!--          <el-row>-->
<!--            <el-col :span="12" align="center">Win/Loss</el-col>-->
<!--            <el-col :span="12" align="center">{{affiliateDetail.user.currency}} {{item.platform_profit}}</el-col>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-col :span="12" align="center">Total active member </el-col>-->
<!--            <el-col :span="12" align="center">{{item.active_count}}</el-col>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-col :span="12" align="center">Number of bets</el-col>-->
<!--            <el-col :span="12" align="center">{{item.bet_count}}</el-col>-->
<!--          </el-row>-->
<!--          <el-row>-->
<!--            <el-col :span="12" align="center">Turnover</el-col>-->
<!--            <el-col :span="12" align="center">{{affiliateDetail.user.currency}} {{item.user_bet}}</el-col>-->
<!--          </el-row>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </div>-->

    <div style="margin: 10px 0;width: 25%">
      <b>Sub Affiliate Summary</b>
      <div style="background: #fff;">
        <el-row>
          <el-col :span="24">
            <div align="center">Sub Affiliate</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="border-0">
            <div align="center">
              <el-row>
                <el-col :span="12" align="center">Company Win/Loss</el-col>
                <el-col :span="12" align="center">{{affiliateDetail.user.currency}} {{affiliateDetail.sub_transaction.platform_profit}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12" align="center">Total active member </el-col>
                <el-col :span="12" align="center">{{affiliateDetail.sub_transaction.active_member}}</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import SubNav from '../../components/nav/SubNav'
import {
  backstageGameManagementGamePlatformsDropListProfitInfoHttp,
  backstageAffiliateListingListDetailHttp,
  backstageAffiliateListingCommissionsDropListHttp
} from '../../api/affiliate/initAxios'
export default {
  name: 'AffiliateSummary',
  components: {TableComp, SubNav},
  data () {
    return {
      AffiliateNav: [
        {
          name: 'affiliate Profile',
          routeName: 'affiliate_profile',
          parameter: 'id',
          param: 1
        },
        {
          name: 'affiliate Summary',
          routeName: 'affiliate_summary',
          parameter: 'id',
          param: 1
        },
        {
          name: 'affiliate Member Detail',
          routeName: 'affiliate_member_detail',
          parameter: 'id',
          param: 1
        },
        {
          name: 'Summary Of Comm',
          routeName: 'summary_of_comm',
          parameter: 'id',
          param: 1
        }
      ],
      scope: {},
      breadcrumb: [],
      resInformation: {},
      affiliateDetail: {},
      DropList: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'display_game_type',
            label: 'Type'
          },
          {
            prop: 'platform_code',
            label: 'platform'
          },
          {
            prop: 'platform_profit',
            label: 'Win/Loss'
          },
          {
            prop: 'active_count',
            label: 'Total active member'
          },
          {
            prop: 'bet_count',
            label: 'Number of bets'
          },
          {
            prop: 'user_bet',
            label: 'Turnover'
          }
        ]
      }
    }
  },
  created () {
    this.backstageAffiliateListingCommissionsDropListHttp()
  },
  activated () {
    this.backstageAffiliateListingListDetailHttp()
    this.backstageGameManagementGamePlatformsProfitInfoHttp()
  },
  methods: {
    backstageAffiliateListingListDetailHttp () {
      backstageAffiliateListingListDetailHttp(this.$route.query.id, {include: 'user,userInfo,bankAccount,commissions'}).then(res => {
        this.affiliateDetail = res
      }).catch((error) => {
        console.log(error)
      })
    },
    backstageGameManagementGamePlatformsProfitInfoHttp () {
      this.tableConfig.loading = true
      backstageGameManagementGamePlatformsDropListProfitInfoHttp(this.$route.query.id).then(res => {
        this.tableConfig.loading = false
        this.resInformation.data = res.data
      }).catch((error) => {
        console.log(error)
      })
    },
    backstageAffiliateListingCommissionsDropListHttp () {
      backstageAffiliateListingCommissionsDropListHttp().then(res => {
        this.DropList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    toMemberWebSite (url) {
      window.open(url, '_blank')
    }
  }
}
</script>
