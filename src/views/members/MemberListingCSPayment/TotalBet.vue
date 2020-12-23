<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="TotalBet">
    <children-nav
      :Nav = csPaymentNav
    />
    <form-inline
      :formInline = formInline
      @onSubmit = onSubmit
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
    />
  </div>
</template>

<script>
import formInline from '../../../components/form/formInline'
import tableComp from '../../../components/table/tableComp'
import childrenNav from '../../../components/nav/childrenNav'
import { mapGetters } from 'vuex'
export default {
  name: 'TotalBet',
  data () {
    return {
      resInformation: {
        data: [{
          platform: 'Gameplay Sport',
          OpenBet: '100',
          Stake: '800',
          RealBet: '744'
        }, {
          platform: 'Gameplay Sport',
          OpenBet: '100',
          Stake: '800',
          RealBet: '744'
        }, {
          platform: 'Gameplay Sport',
          OpenBet: '100',
          Stake: '800',
          RealBet: '744'
        }, {
          platform: 'Gameplay Sport',
          OpenBet: '100',
          Stake: '800',
          RealBet: '744'
        }, {
          platform: 'Gameplay Sport',
          OpenBet: '100',
          Stake: '800',
          RealBet: '744'
        }, {
          platform: 'Gameplay Sport',
          OpenBet: '100',
          Stake: '800',
          RealBet: '744'
        }, {
          platform: 'Gameplay Sport',
          OpenBet: '100',
          Stake: '800',
          RealBet: '744'
        }, {
          platform: 'Gameplay Sport',
          OpenBet: '100',
          Stake: '800',
          RealBet: '744'
        }]
      },
      formInline: {
        name: '', // 名称
        dataRangeTime: ''// 时间
      },
      tableConfig: {
        border: true,
        tableColumn: [{
          prop: 'platform',
          label: '',
          width: '80'
        }, {
          prop: 'OpenBet',
          label: 'OpenBet',
          width: '60'
        }, {
          prop: 'Stake',
          label: 'Stake',
          width: '80'
        }, {
          prop: 'RealBet',
          label: 'RealBet',
          width: '80'
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'csPaymentNav'
    ])
  },
  components: {
    formInline, tableComp, childrenNav
  },
  methods: {
    onSubmit (formInline) {
      this.formInline = formInline
    }
  }
}
</script>
