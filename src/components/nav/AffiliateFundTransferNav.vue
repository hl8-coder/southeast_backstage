<template>
  <div class="AffiliateFundTransferNav">
    <div style="text-align: center">
      <form-inline-comp
        :formInlineConfig = formInlineConfig
        @onSubmit = callbacks
      />
    </div>
    <ul class="FlexRowFlexStartFlexStart childrenNav">
      <li
        v-for="item in navs"
        :key="item.name"
      >
        <el-button
          :type="$route.name===item.routeName ? 'success': null"
          @click="buttonClick(item.routeName, name, item.breadcrumb)"
        >
          {{ item.name }}
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import element from '../../config/element'
import merge from 'webpack-merge'
import FormInlineComp from '../form/formInlineComp'
export default {
  name: 'AffiliateFundTransferNav',
  components: {FormInlineComp},
  props: ['user_name'],
  data () {
    return {
      formInlineConfig: [
        {
          type: 'input',
          label: 'AFF ID',
          formValue: 'user_name',
          placeholder: 'AFF ID',
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
          name: 'Deposit History',
          routeName: 'affiliate_deposit_history',
          breadcrumb: ['affiliate', 'affiliate Fund Transfers', 'Deposit History']
        },
        {
          name: 'Balance Adjustment',
          routeName: 'affiliate_fund_transfers',
          breadcrumb: ['affiliate', 'affiliate Fund Transfers', 'Balance Adjustment']
        },
        {
          name: 'Affiliates Top Up',
          routeName: 'affiliate_top_up',
          breadcrumb: ['affiliate', 'affiliate Fund Transfers', 'Affiliates Top Up']
        }
      ],
      name: ''
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
  methods: {
    callbacks (value) {
      this.formInline.user_name = value.user_name
      this.name = value.user_name
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

<style lang="scss">
  .AffiliateFundTransferNav{
    margin-bottom: 10px;
    .childrenNav{
      li{
        margin-right: 10px;
      }
    }
  }
</style>
