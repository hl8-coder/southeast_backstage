<style lang="scss" scoped type="text/scss">

</style>

<template>
    <div class="AffiliateListing">
      <form-inline-comp
        :formInlineConfig = formInlineConfig
        @onSubmit = callbacks
      ></form-inline-comp>
      <table-comp
        :tableConfig = tableConfig
        :resInformation = resInformation
        @handleSizePageChange =  callbacks
      ></table-comp>
    </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import {backstageAffiliateListingListHttp, backstageGameManagementGamePlatformsDropListHttp} from '../../api/affiliate/initAxios'
import filter from '../../util/filter'
export default {
  name: 'AffiliateListing',
  components: {TableComp, FormInlineComp},
  data () {
    return {
      // 列表配置
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: '',
            label: 'affiliate code',
            width: '60',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'affiliate_profile', query: {id: params.item.id, breadcrumb: JSON.stringify(this.breadcrumb)}})
                    }
                  }
                }, params.item.code)
              ])
            }
          },
          {
            prop: 'user.name',
            label: 'affiliate ID',
            render: (h, params) => {
              if (params.item.user.parent_id) {
                return h('div', [
                  h('span', {
                    style: {
                      color: 'blue'
                    }
                  }, params.item.user.name)
                ])
              }
              return h('div', [
                h('span', {}, params.item.user.name)
              ])
            }
          },
          {
            prop: 'userInfo.full_name',
            label: 'Full Name'
          },
          {
            prop: 'user.currency',
            label: 'Currency'
          },
          {
            prop: 'userInfo.email',
            label: 'Email'
          },
          {
            prop: 'user.display_status',
            label: 'Status'
          },
          {
            prop: 'userInfo.web_url',
            label: 'Web URL'
          },
          {
            prop: 'user.display_risk_group_id',
            label: 'Risk Category'
          },
          {
            prop: 'user.display_payment_group_id',
            label: 'payment Group'
          },
          {
            prop: 'user.created_at',
            label: 'Registeration Date'
          },
          {
            prop: 'userInfo.register_ip',
            label: 'Registrer IP'
          }
        ]
      },
      // 列表数据
      resInformation: {},
      formInlineConfig: [
        {
          type: 'input',
          label: 'affiliate ID',
          formValue: 'name',
          placeholder: 'affiliate ID',
          value: ''
        },
        {
          type: 'input',
          label: 'affiliate code',
          formValue: 'code',
          placeholder: 'affiliate code',
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
          type: 'input',
          label: 'Email',
          formValue: 'email',
          placeholder: 'Email',
          value: ''
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
          label: 'Web URL',
          formValue: 'web_url',
          placeholder: 'Web URL',
          value: ''
        },
        {
          type: 'dateTime',
          label: 'Registeration Date:'
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        include: 'user,userInfo,bankAccount',
        per_page: 50,
        page: 1,
        code: '',
        name: '',
        currency: '',
        email: '',
        status: '',
        web_url: '',
        start_at: '',
        end_at: ''
      },
      dropList: {},
      breadcrumb: []
    }
  },
  methods: {
    // 初始化
    initAffiliateListing (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.include = 'user,userInfo,bankAccount'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageAffiliateListingListHttp(datalist).then(res => {
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
        this.initAffiliateListing(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initAffiliateListing(this.formInline)
        return
      }
      this.initAffiliateListing(value)
    },
    // Drop List
    affiliateListingDropList () {
      backstageGameManagementGamePlatformsDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'status'])
        // this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    let breadcrumb = this.$route.query.breadcrumb
    if (breadcrumb) {
      this.breadcrumb = JSON.parse(breadcrumb)
    }
    this.initAffiliateListing(this.formInline)
    this.affiliateListingDropList()
  }
}
</script>
