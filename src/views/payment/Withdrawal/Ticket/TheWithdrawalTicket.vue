<template>
  <div class="TheWithdrawalTicket">
    <WithdrawalTicket
      v-if="withdrawalDetail.data && dropList"
      :withdrawalDetail = withdrawalDetail
      :dropList="dropList"
      @refreshOpenWithdrawal = refreshOpenWithdrawal
      @backstagePaymentWithdrawalInfoHttp = backstagePaymentWithdrawalInfoHttp
    />
  </div>
</template>

<script>
import WithdrawalTicket from '../../Withdrawal/Ticket/WithdrawalTicket'
import {
  backstagePaymentWithdrawalInfoHttp,
  backstagePaymebtWithdrawalDropListHttp
} from '../../../../api/payment/withdraw/initAxiosWithdrawal'
export default {
  name: 'TheWithdrawalTicket',
  data () {
    return {
      withdrawalDetail: {
        data: null
      },
      dropList: null
    }
  },
  components: {
    WithdrawalTicket
  },
  created () {
    if (this.$route.params.id) {
      this.backstagePaymentWithdrawalInfoHttp(this.$route.params.id)
    }
    this.withdrawalDropList()
  },
  methods: {
    backstagePaymentWithdrawalInfoHttp (id) {
      backstagePaymentWithdrawalInfoHttp(id, {include: 'bank,user.info,user.account,images'}).then(res => {
        this.withdrawalDetail.data = res
        document.title = res.order_no
      }).catch((error) => {
        console.log(error)
      })
    },
    refreshOpenWithdrawal () {
      this.backstagePaymentWithdrawalInfoHttp(this.$route.params.id)
    },
    withdrawalDropList () {
      backstagePaymebtWithdrawalDropListHttp().then(res => {
        this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
