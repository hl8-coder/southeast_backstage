<template>
  <div class="ChangingConfigSetting">
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
    />
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import {backstageITToolChangingConfigSettingHttp} from '../../api/it_tools/initAxios'
export default {
  name: 'ChangingConfigSetting',
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
            prop: 'remark',
            label: 'Remark'
          },
          {
            prop: 'is_front_show',
            label: 'Is Front Show'
          },
          {
            prop: 'type',
            label: 'Type'
          },
          {
            prop: 'value',
            label: 'Value'
          },
          {
            prop: 'updated_at',
            label: 'Update Time'
          }
        ]
      },
      resInformation: {}
    }
  },
  methods: {
    // 初始化
    initHttp () {
      backstageITToolChangingConfigSettingHttp().then(res => {
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
