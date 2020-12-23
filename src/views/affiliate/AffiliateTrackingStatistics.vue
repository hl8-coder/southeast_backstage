<template>
  <div class="AffiliateCreativeReport">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange = callbacks
    />
    <el-dialog
      :title="log.title"
      :visible.sync="log.status"
    >
      <table-comp
        :tableConfig = logTableConfig
        :resInformation = logResInformation
        @handleSizePageChange = logCallbacks
      />
    </el-dialog>
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import {
  backstageAffiliateTrackingStatisticDropListHttp,
  backstageAffiliateTrackingStatisticHttp,
  backstageAffiliateTrackingStatisticDetailHttp
} from '../../api/affiliate/initAxios'
import filter from '../../util/filter'
export default {
  name: 'AffiliateCreativeReport',
  components: {TableComp, FormInlineComp},
  data () {
    return {
      formInlineConfig: [
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
          label: 'Date',
          type: 'dateTime'
        },
        {
          type: 'input',
          label: 'affiliate ID',
          formValue: 'name',
          placeholder: 'affiliate ID',
          value: ''
        },
        {
          type: 'select',
          label: 'Status',
          formValue: 'status',
          placeholder: 'Select A Status',
          clearable: true,
          value: '',
          list: ''
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
            prop: 'user.affiliate_code',
            label: 'affiliate code'
          },
          {
            prop: 'user.info.full_name',
            label: 'affiliate Name'
          },
          {
            prop: 'user.name',
            label: 'affiliate ID'
          },
          {
            prop: 'tracking_name',
            label: 'Tracking name'
          },
          {
            prop: 'total_click',
            label: 'Clicks'
          },
          {
            prop: 'unique_click',
            label: 'Unique clicks',
            render: (h, params) => {
              if (params.item.unique_click) {
                return h('div', [
                  h('el-Link', {
                    props: {
                      size: 'small',
                      type: 'primary'
                    },
                    on: {
                      click: () => {
                        this.logPar.id = params.item.id
                        this.logPar.type = 'unique_clicks'
                        this.getInfo(this.logPar.id, this.logPar)
                        this.log.title = 'unique_clicks'
                        this.log.status = true
                      }
                    }
                  }, params.item.unique_click)
                ])
              } else {
                return h('div', [
                  h('span', {}, params.item.unique_click)
                ])
              }
            }
          },
          {
            prop: 'user.display_status',
            label: 'Status'
          },
          {
            prop: 'url',
            label: 'URL',
            render: (h, params) => {
              if (params.item.url) {
                return h('div', [
                  h('el-Link', {
                    props: {
                      size: 'small',
                      type: 'primary'
                    },
                    on: {
                      click: () => {
                        this.logPar.id = params.item.id
                        this.logPar.type = 'url'
                        this.getInfo(this.logPar.id, this.logPar)
                        this.log.title = 'url'
                        this.log.status = true
                      }
                    }
                  }, params.item.url)
                ])
              } else {
                return h('div', [
                  h('span', {}, params.item.url)
                ])
              }
            }
          },
          {
            prop: 'date',
            label: 'Date'
          }
        ]
      },
      resInformation: {},
      logResInformation: {},
      logTableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'log',
            label: 'Log'
          },
          {
            prop: 'count',
            label: 'Count'
          }
        ]
      },
      log: {
        title: '',
        status: false
      },
      formInline: {
        include: 'user,user.info',
        per_page: 50,
        page: 1,
        currency: '',
        name: '',
        status: '',
        code: '',
        start_at: '',
        end_at: ''
      },
      logPar: {
        per_page: 50,
        page: 1,
        id: '',
        start_at: '',
        end_at: '',
        type: ''
      }
    }
  },
  methods: {
    // 数据初始化
    initHttp (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.include = this.formInline.include
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageAffiliateTrackingStatisticHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 回调
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
    // 下拉菜单
    dropList () {
      backstageAffiliateTrackingStatisticDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'status'])
      }).catch((error) => {
        console.log(error)
      })
    },
    getInfo (id, logPar) {
      this.logTableConfig.loading = true
      logPar.start_at = this.formInline.start_at
      logPar.end_at = this.formInline.end_at
      backstageAffiliateTrackingStatisticDetailHttp(id, logPar).then(res => {
        this.logResInformation.data = res
        this.logTableConfig.loading = false
      }).catch((error) => {
        this.logTableConfig.loading = false
        console.log(error)
      })
    },
    // 回调
    logCallbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.logPar.page = value.page
        this.getInfo(this.logPar.id, this.logPar)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.logPar.per_page = value.per_page
        this.getInfo(this.logPar.id, this.logPar)
        return
      }
      this.getInfo(value)
    }
  },
  created () {
    this.initHttp(this.formInline)
    this.dropList()
  }
}
</script>

<style scoped>

</style>
