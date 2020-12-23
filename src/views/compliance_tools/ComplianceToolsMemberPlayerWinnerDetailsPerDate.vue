<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="MemberPlayerWinnerDetailsPerDate">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
      <template v-slot:content>
        <el-button type="danger" @click="resetFilter">Reset</el-button>
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
import {
  backstageRMRiskPlayerWinnerDropListHttp,
  backstageRMRiskPlayerWinnerDetailsPerDateHttp
} from '../../api/rm_tool/initAxios'
import filter from '../../util/filter'
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
export default {
  name: 'MemberPlayerWinnerDetailsPerDate',
  data () {
    return {
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'date',
            sortable: 'custom',
            label: 'Date'
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'total_stake',
            sortable: 'custom',
            label: 'Bet Amount'
          },
          {
            prop: 'total_profit',
            sortable: 'custom',
            label: 'W/L Amount'
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
        start_at: ''
      }
    }
  },
  activated () {
    this.formInline.user_name = this.$route.query.user_name
    this.formInline.product_code = this.$route.query.product_code
    this.formInlineConfig[0].value = this.$route.query.user_name
    this.formInlineConfig[2].value = this.$route.query.product_code
    this.dropListHttp()
    if (this.$route.query.user_name) {
      this.initHttp(this.formInline)
    }
    this.tableConfig.loading = false
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
      backstageRMRiskPlayerWinnerDetailsPerDateHttp(datalist).then(res => {
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
      backstageRMRiskPlayerWinnerDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['product_code', 'currency'])
        this.dropList = res
      }).catch(() => {
      })
    },
    // resetFilter
    resetFilter () {
      this.formInlineConfig.forEach((item) => {
        item.value = ''
      })
    }
  }
}
</script>
