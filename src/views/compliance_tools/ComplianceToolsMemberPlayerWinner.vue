<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="MemberPlayerWinner">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
      <template v-slot:content>
        <el-button type="danger" @click="resetFilter">Reset</el-button>
        <el-button type="warning" @click="download" >Export</el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
      @sortChange="sortChange"
    />
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import {
  backstageRMRiskPlayerWinnerDownloadHttp,
  backstageRMRiskPlayerWinnerDropListHttp,
  backstageRMRiskPlayerWinnerHttp
} from '../../api/rm_tool/initAxios'
import {mapGetters} from 'vuex'
import filter from '../../util/filter'
export default {
  name: 'MemberPlayerWinner',
  data () {
    return {
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'user_name',
            label: 'Member Code',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'compliance_tools_member_player_winner_details',
                        query: {
                          user_name: params.item.user_name,
                          product_code: params.item.product_code,
                          breadcrumb: JSON.stringify(['RM Tool', 'Member Enquiry', 'Player Winner Details'])
                        }
                      })
                    }
                  }
                }, params.item.user_name)
              ])
            }
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'total_stake',
            label: 'Bet Amount',
            sortable: 'custom',
          },
          {
            prop: 'total_profit',
            label: 'W/L Amount',
            sortable: 'custom',
          },
          {
            prop: 'percent',
            sortable: 'custom',
            label: 'Win/Lose %',
            render: (h, params) => {
              return h('div', [
                h('span', {}, params.item.percent + '%')
              ])
            }
          }
          // {
          //   prop: 'product_code',
          //   label: 'Product Code'
          // }
        ]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          clearable: true,
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'select',
          label: 'Currency',
          formValue: 'currency',
          placeholder: 'Select A Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Product Code:',
          formValue: 'product_code',
          placeholder: 'Select A Product Code',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'date',
          label: 'Date'
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        include: 'user',
        per_page: 50,
        page: 1,
        user_name: '',
        product_code: '',
        end_at: '',
        start_at: '',
        currency: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  created () {
    this.dropListHttp()
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp
  },
  methods: {
    // 会员信息请求
    initHttp (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.per_page && !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilterByEcho(formInline, [], ['per_page', 'page', 'include', 'order'])
      backstageRMRiskPlayerWinnerHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initHttp(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initHttp(this.formInline)
        return
      }
      this.initHttp(value)
    },
    sortChange (obj) {
      this.initHttp(Object.assign(this.formInline, obj))
    },
    dropListHttp () {
      filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
      backstageRMRiskPlayerWinnerDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['product_code'])
        this.dropList = res
      }).catch(() => {
      })
    },
    // resetFilter
    resetFilter () {
      this.formInlineConfig.forEach((item) => {
        item.value = ''
      })
    },
    download () {
      var datalist = filter.formInlineFilterByEcho(this.formInline, [], ['per_page', 'page', 'include'])
      backstageRMRiskPlayerWinnerDownloadHttp(datalist).then((res) => {
        filter.downloadExcel(res)
      })
    }
  }
}
</script>
