<style lang="scss" scoped type="text/scss">
  .Navs{
    margin: 10px 0;
    .childrenNav{
      li{
        margin-right: 10px;
      }
    }
  }
</style>
<template>
  <div class="SearchNavs">
    <div style="text-align: center">
      <form-inline-comp
        :formInlineConfig = formInlineConfig
        @onSubmit = callbacks
      />
    </div>
    <div class="Navs">
      <ul class="FlexRowCenterCenter childrenNav">
        <li v-for="item in navs" :key="item.name">
          <el-button
            :type="$route.name===item.routeName ? 'success': null"
            @click="buttonClick(item.routeName, name, item.breadcrumb)">
            {{ item.name }}
          </el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FormInlineComp from '../../../components/form/formInlineComp'
import merge from 'webpack-merge'
import element from '../../../config/element'
export default {
  name: 'SearchNavs',
  components: {FormInlineComp},
  props: ['user_name'],
  data () {
    return {
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        user_name: ''
      },
      navs: [
        {
          name: 'Account Summary',
          routeName: 'payment_fund_transfers_account_summary',
          breadcrumb: ['payment', 'Fund Transfers', 'Account Summary']
        },
        {
          name: 'Member Profile',
          routeName: 'payment_fund_transfers_member_profile',
          breadcrumb: ['payment', 'Fund Transfers', 'Member Profile']
        },
        {
          name: 'Remark',
          routeName: 'payment_fund_transfers_remarks',
          breadcrumb: ['payment', 'Fund Transfers', 'Remark']
        },
        {
          name: 'Deposit History',
          routeName: 'payment_fund_transfers_deposit_history',
          breadcrumb: ['payment', 'Fund Transfers', 'Deposit History']
        },
        {
          name: 'Withdrawal History',
          routeName: 'payment_fund_transfers_withdrawal_history',
          breadcrumb: ['payment', 'Fund Transfers', 'Withdrawal History']
        },
        {
          name: 'Balance Adjustment',
          routeName: 'payment_fund_transfers_member_listing',
          breadcrumb: ['payment', 'Fund Transfers', 'Balance Adjustment']
        },
        {
          name: 'Total Bet',
          routeName: 'payment_fund_transfers_total_bet',
          breadcrumb: ['payment', 'Fund Transfers', 'Total Bet']
        },
        {
          name: 'Auto Rebate',
          routeName: 'payment_fund_transfers_auto_rebate_report',
          breadcrumb: ['payment', 'Fund Transfers', 'Auto Rebate']
        },
        {
          name: 'Affiliates Top Up',
          routeName: 'payment_fund_transfers_affiliates_top_up',
          breadcrumb: ['payment', 'Fund Transfers', 'Affiliates Top Up']
        }
      ],
      name: ''
    }
  },
  methods: {
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initAccountSummary(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initAccountSummary(this.formInline)
        return
      }
      this.formInline.user_name = value.user_name
      this.$router.push({
        query: merge(this.$route.query, {name: value.user_name, breadcrumb: this.$route.query.breadcrumb})
      })
      this.$emit('searchMemberCode', value.user_name)
    },
    // 点击事件
    buttonClick (routeName, name, breadcrumb) {
      if (name) {
        this.$router.push({name: routeName, query: {name: name, breadcrumb: JSON.stringify(breadcrumb)}})
      } else {
        element.message({
          message: 'Please input member code',
          type: 'danger'
        })
        return false
      }
    }
  },
  watch: {
    'user_name' (val) {
      this.name = val
      this.formInlineConfig[0].value = val
      this.formInline.user_name = val
    }
  },
  mounted () {
    this.name = this.user_name
    this.formInlineConfig[0].value = this.name
    this.formInline.user_name = this.name
  },
  activated () {
    let name = this.$route.query.name
    if (name) {
      this.name = name
      this.formInlineConfig[0].value = name
      this.formInline.user_name = name
    }
  }
}
</script>
