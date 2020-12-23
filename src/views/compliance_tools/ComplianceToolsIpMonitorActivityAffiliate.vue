<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="ComplianceToolsAffiliate">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    ></form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    ></table-comp>
    <affiliate-dialog
      :AffiliateDialogForm="AffiliateDialogForm"
    ></affiliate-dialog>
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import AffiliateDialog from './IpMonitorActivity/AffiliateDialog'
import filter from '../../util/filter'
import {
  mapGetters
} from 'vuex'
import {backstageRMIPMonitorActivityAffiliateHttp} from '../../api/rm_tool/initAxios'
export default {
  name: 'ComplianceToolsAffiliate',
  components: {AffiliateDialog, FormInlineComp, TableComp},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'input',
          label: 'MemberCode',
          formValue: 'user_name',
          placeholder: 'MemberCode',
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
          label: 'affiliate Code',
          formValue: 'affiliate_code',
          placeholder: 'affiliate Code',
          value: ''
        },
        {
          type: 'input',
          label: 'IP Address ',
          formValue: 'ip',
          placeholder: 'IP Address ',
          value: ''
        },
        {
          type: 'date',
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
            prop: 'id',
            label: 'No',
            fixWidth: '75px'
          },
          {
            prop: 'id',
            label: 'Operation ID',
            fixWidth: '110px'
          },
          {
            prop: 'user.affiliate_code',
            label: 'affiliate Code',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      // this.AffiliateDialogForm.statusFormVisible = true
                    }
                  }
                }, params.item.user.affiliate_code)
              ])
            }
          },
          {
            prop: 'user.affiliate_id',
            label: 'affiliate ID'
          },
          {
            prop: 'user_name',
            label: 'Member Code'
          },
          {
            prop: 'user.currency',
            label: 'Currency'
          },
          {
            prop: 'user.display_risk_group_id',
            label: 'Risk ID'
          },
          {
            prop: 'ip',
            label: 'Register IP'
          },
          {
            prop: 'country',
            label: 'Country'
          },
          {
            prop: 'city',
            label: 'City'
          },
          {
            prop: 'created_at',
            label: 'Login Time'
          },
          {
            prop: 'browser',
            label: 'Browser'
          },
          {
            prop: 'display_device',
            label: 'Mode'
          },
          {
            prop: 'equipment',
            label: 'Device'
          }
        ]
      },
      resInformation: {},
      AffiliateDialogForm: {
        statusFormVisible: false
      },
      formInline: {
        include: 'user.info',
        per_page: 50,
        page: 1,
        user_name: '',
        affiliate_code: '',
        currency: '',
        ip: '',
        start_at: '',
        end_at: ''
      }
    }
  },
  methods: {
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initComplianceToolsAffiliate(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initComplianceToolsAffiliate(this.formInline)
        return
      }
      this.initComplianceToolsAffiliate(value)
    },
    // 数据初始化
    initComplianceToolsAffiliate (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
        formInline.include = this.formInline.include
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageRMIPMonitorActivityAffiliateHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  created () {
    this.initComplianceToolsAffiliate(this.formInline)
    filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
  }
}
</script>
