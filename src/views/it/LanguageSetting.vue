<template>
  <div class="SystemLanguageSetting">
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
    />
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import {
  backstageITToolLanguagesIndexHttp,
  backstageITToolLanguagesUpdateHttp
} from '../../api/it_tools/initAxios'
export default {
  name: 'SystemLanguageSetting',
  components: {TableComp},
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'name',
            label: 'Name'
          },
          {
            prop: 'code',
            label: 'Code'
          },
          {
            prop: 'display_status',
            label: 'Status'
          },
          {
            prop: 'updated_at',
            label: 'Update Time'
          },
          {
            prop: '',
            label: 'Action',
            render: (h, params) => {
              return h('div', [
                h('el-button', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  style: {
                    marginRight: '5px',
                    color: '#fff',
                    border: 'none'
                  },
                  on: {
                    click: () => {
                      this.$confirm('Are you sure?', 'Prompt', {
                        confirmButtonText: 'YES',
                        cancelButtonText: 'NO',
                        type: 'warning'
                      }).then(() => {
                        let status = !params.item.status ? 1 : 0
                        let id = params.item.id
                        backstageITToolLanguagesUpdateHttp(id, {status: status}).then(res => {
                          this.initHttp()
                        }).catch((error) => {
                          console.log(error)
                        })
                      })
                    }
                  }
                }, 'Update Status')
              ])
            }
          }
        ]
      },
      resInformation: {}
    }
  },
  methods: {
    // 初始化
    initHttp () {
      backstageITToolLanguagesIndexHttp().then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    }
  },
  created () {
    this.initHttp()
  }
}
</script>

<style scoped>

</style>
