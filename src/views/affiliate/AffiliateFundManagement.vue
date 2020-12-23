<style lang="scss" scoped type="text/scss">

</style>

<template>
    <div id="FundManagerment">
      <form-inline-comp
        :formInlineConfig="formInlineConfig"
        @onSubmit = callbacks
      ></form-inline-comp>
      <table-comp
        :tableConfig = tableConfig
        :resInformation = resInformation
        @handleSizePageChange =  callbacks
        @sortChange="sortChange"
      ></table-comp>
    </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import {mapGetters} from 'vuex'
import {backstageAffiliatesFundsHttp, backstageGameManagementGamePlatformsDropListHttp} from '../../api/affiliate/initAxios'
import filter from '../../util/filter'
export default {
  name: 'FundManagerment',
  components: {TableComp, FormInlineComp},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'input',
          label: 'AFF Code',
          formValue: 'code',
          placeholder: 'AFF Code',
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
          label: 'Status',
          formValue: 'status',
          placeholder: 'Status',
          clearable: true,
          value: '',
          list: []
        },
        {
          type: 'input',
          label: 'Member/Sub- AFF',
          formValue: 'to_user_name',
          placeholder: 'Member/Sub- AFF',
          value: ''
        },
        {
          type: 'dateTime',
          label: 'Date',
          formValue: 'date',
          value: ''
        },
        {
          type: 'search'
        }
      ],
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'created_at',
            sortable: 'custom',
            label: 'Date/ Time'
          },
          {
            prop: 'code',
            label: 'AFF Code'
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'user_name',
            sortable: 'custom',
            label: 'From'
          },
          {
            prop: 'from_before_balance',
            sortable: 'custom',
            label: 'Balance before'
          },
          {
            prop: 'from_after_balance',
            sortable: 'custom',
            label: 'Balance  after'
          },
          {
            prop: 'to_user_name',
            sortable: 'custom',
            label: 'To  member / Sub - AFF',
            render: (h, params) => {
              if (params.item.to_user_name_is_agent) {
                return h('div', [
                  h('span', {
                    style: {
                      color: 'blue'
                    }
                  }, params.item.to_user_name)
                ])
              }
              return h('div', [
                h('span', {
                }, params.item.to_user_name)
              ])
            }
          },
          {
            prop: 'display_status',
            label: 'Status'
          },
          {
            prop: 'amount',
            sortable: 'custom',
            label: 'Amount Transfer'
          }
        ]
      },
      resInformation: {},
      formInline: {
        include: 'user',
        per_page: 50,
        page: 1,
        code: '',
        to_user_name: '',
        start_at: '',
        currency: '',
        end_at: ''
      },
      dropList: {}
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  methods: {
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initFundManagement(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initFundManagement(this.formInline)
        return
      }
      this.initFundManagement(value)
    },
    initFundManagement (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageAffiliatesFundsHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 下拉菜单
    theDropList () {
      backstageGameManagementGamePlatformsDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currency'])
        this.dropList = res
      }).catch(() => {
      })
    },
    sortChange (obj) {
      console.log(obj)
      this.initFundManagement(Object.assign(this.formInline, obj))
    }
  },
  created () {
    this.initFundManagement(this.formInline)
    this.theDropList()
  }
}
</script>
