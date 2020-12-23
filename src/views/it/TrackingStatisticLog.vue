<template>
  <div class="TrackingStatisticLog">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
  </div>
</template>

<script>
import {backstageTrackingStatisticLogHttp} from '../../api/it_tools/initAxios'
import filter from '../../util/filter'
import TableComp from '../../components/table/tableComp'
import FormInlineComp from '../../components/form/formInlineComp'

export default {
  name: 'TrackingStatisticLog',
  components: {
    FormInlineComp,
    TableComp
  },
  data () {
    return {
      formInlineConfig: [
        {
          label: 'AFF ID',
          type: 'input',
          formValue: 'user_name',
          placeholder: 'AFF ID',
          value: ''
        },
        {
          label: 'AFF Code',
          type: 'input',
          formValue: 'code',
          placeholder: 'AFF Code',
          value: ''
        },
        {
          label: 'Tracking Name',
          type: 'input',
          formValue: 'tracking_name',
          placeholder: 'Tracking Name',
          value: ''
        },
        {
          label: 'Date',
          type: 'dateTime'
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        include: 'trackingStatistic,trackingStatistic.user',
        page: 1,
        per_page: 50,
        user_name: '',
        tracking_name: '',
        currency: '',
        start_at: '',
        end_at: '',
        code: ''
      },
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'affiliate_code',
            label: 'Code'
          },
          {
            prop: 'ip',
            label: 'Ip'
          },
          {
            prop: 'tracking_id',
            label: 'Tracking ID'
          },
          {
            prop: '',
            label: 'Tracking Name',
            render: (h, params) => {
              if (params.item.id) {
                let t = params.item.trackingStatistic
                if (typeof t === 'object') {
                  if (t.hasOwnProperty('tracking_name')) {
                    return h('div', [
                      h('span', {}, t.tracking_name)
                    ])
                  }
                }
              }
            }
          },
          {
            prop: '',
            label: 'AFF ID',
            render: (h, params) => {
              if (params.item.id) {
                let t = params.item.trackingStatistic
                if (typeof t === 'object') {
                  if (t.hasOwnProperty('user')) {
                    let u = t.user
                    return h('div', [
                      h('span', {}, u.name)
                    ])
                  }
                }
              }
            }
          },
          {
            prop: '',
            label: 'AFF Code',
            render: (h, params) => {
              if (params.item.id) {
                let t = params.item.trackingStatistic
                if (typeof t === 'object') {
                  if (t.hasOwnProperty('user')) {
                    let u = t.user
                    return h('div', [
                      h('span', {}, u.affiliate_code)
                    ])
                  }
                }
              }
            }
          },
          {
            prop: 'created_at',
            label: 'Created At'
          },
          {
            prop: 'url',
            label: 'Url'
          }
        ]
      },
      resInformation: {}
    }
  },
  methods: {
    // 列表数据
    initHttp (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilterByEcho(formInline, [], ['per_page', 'page', 'include'])
      this.tableConfig.loading = true
      backstageTrackingStatisticLogHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
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
    }
  },
  activated () {
    this.initHttp(this.formInline)
  }
}
</script>

<style scoped>

</style>
