<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div id="SubAffiliate">
    <div>
      <el-form
        inline
      >
        <el-form-item label="Currency">
          <el-select
            v-model="currency"
            @change="changeTheCommission"
            placeholder="Select A Currency">
            <el-option
              v-for="item in dropList.currency"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Commision %">
          <el-input
            v-model="commission"
            disabled
            style="max-width: 220px"
          />
        </el-form-item>
      </el-form>
    </div>
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
import {backstageAffiliatesSubsHttp, backstageGameManagementGamePlatformsDropListHttp} from '../../api/affiliate/initAxios'
import filter from '../../util/filter'
import {backstageITToolCurrenciesIndexHttp} from '../../api/it_tools/initAxios'
export default {
  name: 'SubAffiliate',
  components: {TableComp, FormInlineComp},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'input',
          label: 'Refer Code',
          formValue: 'refer_by_code',
          placeholder: 'Refer Code',
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
          label: 'AFF ID',
          formValue: 'parent_name',
          placeholder: 'AFF ID',
          clearable: true,
          value: ''
        },
        {
          type: 'date',
          label: 'Date',
          formValue: 'date',
          value: ''
        },
        {
          type: 'select',
          label: 'Currency',
          formValue: 'currency',
          placeholder: 'Currency',
          clearable: true,
          value: '',
          list: []
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
            label: 'NO.'
          },
          {
            prop: 'refer_by_code',
            label: 'RefererCode'
          },
          {
            prop: 'parentUser.name',
            label: 'affiliate ID'
          },
          {
            prop: 'sub_id',
            label: 'Sub-affiliate ID',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'affiliate_profile', query: {id: params.item.id}})
                    }
                  }
                }, params.item.user.name)
              ])
            }
          },
          {
            prop: 'user.currency',
            label: 'Currency'
          },
          {
            prop: 'user.display_status',
            label: 'Status'
          },
          {
            prop: 'userInfo.register_ip',
            label: 'Registrer IP'
          },
          {
            prop: 'user.created_at',
            label: 'Registrer Date'
          }
        ]
      },
      resInformation: {},
      formInline: {
        include: 'user,userInfo,bankAccount,parentUser',
        per_page: 50,
        page: 1,
        parent_name: '',
        status: '',
        currency: '',
        refer_by_code: '',
        start_at: '',
        end_at: ''
      },
      dropList: {},
      currencySetting: {},
      currency: '',
      commission: ''
    }
  },
  methods: {
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initSubAffiliate(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initSubAffiliate(this.formInline)
        return
      }
      this.initSubAffiliate(value)
    },
    // 数据初始化
    initSubAffiliate (formInline) {
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
      backstageAffiliatesSubsHttp(datalist).then(res => {
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
        filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'status'])
        this.dropList = res
      }).catch(() => {
      })
    },
    // 获取币别设置
    getCurrencySetting () {
      backstageITToolCurrenciesIndexHttp().then(res => {
        this.currencySetting = res.data
        console.log(res)
      }).catch(() => {
      })
    },
    // 改变抽成
    changeTheCommission (value) {
      this.currencySetting.forEach((item) => {
        if (value === item.code) {
          console.log(item)
          this.commission = item.commission
          console.log(this.commission)
        }
      })
    }
  },
  created () {
    this.initSubAffiliate(this.formInline)
    this.theDropList()
    this.getCurrencySetting()
  }
}
</script>
