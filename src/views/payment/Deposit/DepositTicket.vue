<template>
  <div class="DepositTicket" v-if="ticketConfig.data && dropListDeposit">
    <deposit-ticket
      :ticketConfig = ticketConfig.data
      :DropListDeposit = dropListDeposit
    />
  </div>
</template>

<script>
import depositTicket from '../../../components/ticket/depositTicket'
import {
  backstageDepositDetailHttp,
  backstageDropListDepositHttp
} from '../../../api/payment/deposit/initAxios'
export default {
  name: 'DepositTicket',
  data () {
    return {
      dropListDeposit: {},
      ticketConfig: {
        data: null
      }
    }
  },
  components: {
    depositTicket
  },
  mounted () {
    this.backstageDropListDepositHttp()
    if (this.$route.params.id) {
      backstageDepositDetailHttp(this.$route.params.id, {
        include: 'user,accessLogs,operationLogs,userBank,userAccount,userDeposits,bankTransaction,images'
      }).then(res => {
        this.ticketConfig = {
          data: res
        }
        document.title = res.order_no
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  methods: {
    refresh () {
    },
    backstageDropListDepositHttp () {
      backstageDropListDepositHttp({}).then(res => {
        this.dropListDeposit = res
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
