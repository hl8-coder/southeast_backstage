<template>
  <div class="ConfigSetting">
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
    />
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.status"
    >
      <el-form
        label-width="300px"
      >
        <el-form-item
          label="Value"
        >
          <el-input
            v-model="form.value"

            style="max-width: 220px"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doUpdate">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import {
  backstageITToolConfigSettingIndexHttp,
  backstageITToolConfigSettingUpdateHttp
} from '../../api/it_tools/initAxios'
export default {
  name: 'ConfigSetting',
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
            label: 'Code',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.configSettingID = params.item.id
                      this.form.value = params.item.value
                      this.dialog.status = true
                      this.dialog.title = 'Update ' + params.item.name
                    }
                  }
                }, params.item.code)
              ])
            }
          },
          {
            prop: 'group',
            label: 'Group'
          },
          {
            prop: 'remarks',
            label: 'Remark'
          },
          {
            prop: 'display_is_front_show',
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
      resInformation: {},
      dialog: {
        status: false,
        title: ''
      },
      form: {
        value: ''
      },
      configSettingID: ''
    }
  },
  methods: {
    // 初始化
    initHttp () {
      backstageITToolConfigSettingIndexHttp().then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 更新
    doUpdate () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        type: 'warning'
      }).then(() => {
        backstageITToolConfigSettingUpdateHttp(this.configSettingID, this.form).then(res => {
          this.dialog.status = false
          this.initHttp()
        }).catch((error) => {
          console.log(error)
        })
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
