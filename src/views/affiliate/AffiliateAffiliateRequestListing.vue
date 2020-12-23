<style lang="scss">
</style>

<template>
    <div id="AffiliateRequestList">
      <form-inline-comp
        :formInlineConfig="formInlineConfig"
        @onSubmit = callbacks
      ></form-inline-comp>
      <table-comp
        :tableConfig = tableConfig
        :resInformation = resInformation
        @handleSizePageChange =  callbacks
      ></table-comp>
      <tier-of-this-user
        @refresh=refresh
        :tierOfThisUserForm = tierOfThisUserForm
      ></tier-of-this-user>
    </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import TierOfThisUser from './TierOfThisUser'
import {
  backstageAffiliatesRequestsHttp,
  affiliateRequestDropListHttp
} from '../../api/affiliate/initAxios'
import filter from '../../util/filter'
export default {
  name: 'AffiliateRequestList',
  components: {TierOfThisUser, TableComp, FormInlineComp},
  data () {
    return {
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
          type: 'input',
          label: 'Mobile Num:',
          formValue: 'phone',
          placeholder: 'Mobile Num:',
          value: ''
        },
        {
          type: 'select',
          label: 'Status',
          formValue: 'cs_status',
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
          type: 'date',
          label: 'Date:',
          formValue: 'register_at',
          placeholder: 'Date:',
          value: ''
        },
        {
          type: 'search'
        }
      ],
      // 列表配置
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'NO.'
          },
          {
            prop: 'code',
            label: 'affiliate code'
          },
          {
            prop: 'userInfo.full_name',
            label: 'affiliate Name'
          },
          {
            prop: 'user.name',
            label: 'affiliate ID',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.tierOfThisUserForm.formStatus = true
                      this.tierOfThisUserForm.data = {
                        id: params.item.id,
                        name: params.item.user.name,
                        commission_setting: params.item.commission_setting,
                      }
                    }
                  }
                }, params.item.user.name)
              ])
            }
          },
          {
            prop: 'userInfo.email',
            label: 'Email'
          },
          {
            prop: 'userInfo.phone',
            label: 'Mobile Num'
          },
          {
            prop: 'web_url',
            label: 'WebURL'
          },
          {
            prop: 'userInfo.register_ip',
            label: 'Registrer IP'
          },
          {
            prop: 'user.created_at',
            label: 'Registeration Date'
          },
          {
            prop: 'userInfo.birth_at',
            label: 'Date of Birth'
          },
          {
            prop: 'display_cs_status',
            label: 'Status'
          },
          {
            prop: 'admin_name',
            label: 'Created By'
          }
        ]
      },
      resInformation: {},
      tierOfThisUserForm: {
        formStatus: false,
        data: {}
      },
      formInline: {
        include: 'user,userInfo,bankAccount,commissions',
        per_page: 50,
        page: 1,
        name: '',
        code: '',
        currency: '',
        email: '',
        cs_status: '',
        start_at: '',
        end_at: '',
        phone: '',
        web_url: ''
      }
    }
  },
  mounted () {
    this.affiliateRequestDropListHttp()
  },
  methods: {
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
    affiliateRequestDropListHttp () {
      affiliateRequestDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'cs_status'])
        // this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // 初始化数据
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.include = 'user,userInfo,bankAccount,commissions'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageAffiliatesRequestsHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
      // this.affiliateProfileData.data = list
    },
    // 刷新
    refresh () {
      this.initHttp(this.formInline)
    }
  },
  created () {
    this.initHttp(this.formInline)
  }
}
</script>
