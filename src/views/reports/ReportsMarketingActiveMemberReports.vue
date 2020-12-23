<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="ActiveMemberReports">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    />
    <!--total-->
    <table-comp
      :tableConfig = totalTableConfig
      :resInformation = totalResInformation
    />
    <!--affiliate-->
    <table-comp
      style="margin: 15px 0"
      :tableConfig = affiliateTableConfig
      :resInformation = affiliateResInformation
    />
    <!--product-->
    <table-comp
      :tableConfig = productTableConfig
      :resInformation = productResInformation
    />
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import {
  backstageActiveMemberReportsDropListHttp,
  backstageActiveMemberReportsHttp,
  backstageActiveMemberReportsByAffiliateHttp,
  backstageActiveMemberReportsByProductHttp
} from '../../api/report/initAxios'
import filter from '../../util/filter'
export default {
  name: 'ActiveMemberReports',
  data () {
    return {
      Visible: false,
      totalResInformation: {},
      totalTableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'active',
            label: 'No Of. Active members'
          },
          {
            prop: 'inactive',
            label: 'No of, Inactive members'
          },
          {
            prop: 'margin',
            label: '% Margin'
          }
        ]
      },
      affiliateResInformation: {},
      affiliateTableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'platform_active',
            label: 'No Of. Active members Direct Marketing'
          },
          {
            prop: 'affiliate_active',
            label: 'No Of. Active members affiliate'
          },
          {
            prop: 'margin',
            label: '% Margin'
          }
        ]
      },
      productResInformation: {},
      productTableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'currency',
            label: 'Currency'
          }
        ]
      },
      formInlineConfig: [
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
          type: 'date'
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        currency: '',
        start_at: '',
        end_at: ''
      }
    }
  },
  created () {
    this.DropListHttp()
    this.initActiveMemberReportsHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp
  },
  methods: {
    // 会员信息请求
    initActiveMemberReportsHttp (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.totalTableConfig.loading = true
      this.affiliateTableConfig.loading = true
      this.productTableConfig.loading = true
      backstageActiveMemberReportsHttp(datalist).then(res => {
        this.totalResInformation = res
        this.totalTableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
      backstageActiveMemberReportsByAffiliateHttp(datalist).then(res => {
        this.affiliateResInformation = res
        this.affiliateTableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
      backstageActiveMemberReportsByProductHttp(datalist).then(res => {
        let tableColumn = []
        if (res.fields && res.fields.length) {
          Promise.resolve().then(() => {
            res.fields.forEach((item) => {
              tableColumn.push({
                prop: item,
                label: item
              })
            })
          }).then(() => {
            this.productTableConfig.tableColumn = [
              {
                prop: 'currency',
                label: 'Currency'
              }
            ]
            this.productTableConfig.tableColumn = this.productTableConfig.tableColumn.concat(tableColumn)
            this.productResInformation = res
          }).then(() => {
            this.productTableConfig.loading = false
          })
        } else {
          this.productTableConfig.loading = false
        }
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initActiveMemberReportsHttp(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initActiveMemberReportsHttp(this.formInline)
        return
      }
      this.initActiveMemberReportsHttp(value)
    },
    DropListHttp () {
      backstageActiveMemberReportsDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currency'])
      }).catch(() => {
      })
    }
  }
}
</script>
