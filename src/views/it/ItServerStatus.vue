<template>
  <div class="ItServerStatus">
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
    />
  </div>
</template>

<script>
import filter from '../../util/filter'
import {backstageServerStatusHttp} from '../../api/it_tools/initAxios'
import TableComp from '../../components/table/tableComp'

export default {
  name: 'ItServerStatus',
  components: {TableComp},
  data () {
    return {
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'name',
            label: 'Name'
          },
          {
            prop: 'status',
            label: 'Status',
            render: (h, params) => {
              if (params.item.status) {
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
      }
    }
  },
  methods: {
    // 列表
    initHttp (formInline) {
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageServerStatusHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
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
