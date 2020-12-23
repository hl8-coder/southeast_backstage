<template>
  <div class="ItGameReportSchedulesByPlatform">
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
    />
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstageGameReportSchedulesByPlatformHttp
} from '../../api/it_tools/initAxios'
export default {
  name: 'ItGameReportSchedulesByPlatform',
  components: {TableComp},
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'platform_code',
            label: 'Platform Code'
          },
          {
            prop: 'fail',
            label: 'Fail'
          },
          {
            prop: '',
            label: 'Is Has Created',
            render: (h, params) => {
              if (params.item.has_created) {
                return h('div', [
                  h('el-button', {
                    props: {
                      size: 'small',
                      icon: 'el-icon-check',
                      circle: true
                    },
                    style: {
                      marginRight: '5px',
                      background: '#67C23A',
                      color: '#fff',
                      border: 'none'
                    }
                  })
                ])
              } else {
                return h('div', [
                  h('el-button', {
                    props: {
                      size: 'small',
                      icon: 'el-icon-close',
                      circle: true
                    },
                    style: {
                      marginRight: '5px',
                      background: '#F56C6C',
                      color: '#fff',
                      border: 'none'
                    }
                  })
                ])
              }
            }
          },
          {
            prop: '',
            label: 'Status',
            render: (h, params) => {
              if (!params.item.is_error) {
                return h('div', [
                  h('el-button', {
                    props: {
                      size: 'small',
                      icon: 'el-icon-check',
                      circle: true
                    },
                    style: {
                      marginRight: '5px',
                      background: '#67C23A',
                      color: '#fff',
                      border: 'none'
                    }
                  })
                ])
              } else {
                return h('div', [
                  h('el-button', {
                    props: {
                      size: 'small',
                      icon: 'el-icon-close',
                      circle: true
                    },
                    style: {
                      marginRight: '5px',
                      background: '#F56C6C',
                      color: '#fff',
                      border: 'none'
                    }
                  })
                ])
              }
            }
          }
        ]
      },
      formInline: {
        per_page: 50,
        page: 1
      },
      resInformation: {}
    }
  },
  methods: {
    initHttp (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilterByEcho(formInline, [], ['per_page', 'page'])
      this.tableConfig.loading = true
      backstageGameReportSchedulesByPlatformHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    }
  },
  activated () {
    this.initHttp(this.formInline)
  }
}
</script>

<style scoped>

</style>
