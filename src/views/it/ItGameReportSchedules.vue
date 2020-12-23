<template>
  <div class="GameReportSchedules">
    <form-inline-comp
      :formInlineConfig="formInlineConfig"
      @onSubmit = callbacks
    >
    </form-inline-comp>
    <table-comp
      :resInformation="resInformation"
      :table-config="tableConfig"
      @handleSizePageChange = callbacks
    />
    <el-dialog width="300px" title="Update" :visible.sync="dialogStatus">
      <span>Status: </span>
      <el-select v-model="updateStatus" placeholder="Select A Status">
        <el-option v-for="item in dropList.status" :key="item.key" :label="item.value" :value="item.key"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="updateStatusSubmit()">Submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import filter from '../../util/filter'
import {
  backstageGamePlatformPullReportSchedulesHttp,
  patchBackstageGamePlatformPullReportSchedulesHttp,
  backstageGamePlatformPullReportSchedulesDropListHttp
} from '../../api/it_tools/initAxios'
import TableComp from '../../components/table/tableComp'
import FileUpload from '../../components/file/fileUpload'
import element from '../../config/element'
export default {
  name: 'GameReportSchedules',
  components: {FileUpload, TableComp, FormInlineComp},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'select',
          label: 'Platform Code',
          formValue: 'platform_code',
          placeholder: 'Select A Platform Code',
          clearable: true,
          value: '',
          list: ''
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
          type: 'dateTime'
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        platform_code: '',
        status: '',
        start_at: '',
        end_at: ''
      },
      dropList: [],
      eachData: {},
      updateStatus: '',
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'Id',
            fixWidth: '133px',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.onUpdate(params.item)
                    }
                  }
                }, params.item.id)
              ])
            }
          },
          {
            prop: 'platform_code',
            label: 'Platform Code'
          },
          {
            prop: 'start_at',
            label: 'Start At'
          },
          {
            prop: 'end_at',
            label: 'End At'
          },
          {
            prop: 'pulled_at',
            label: 'Pull At'
          },
          {
            prop: 'origin_total',
            label: 'Origin Total'
          },
          {
            prop: 'transfer_total',
            label: 'Transfer Total',
          },
          {
            prop: 'times',
            label: 'Times',
          },
          {
            prop: 'remarks',
            label: 'Remarks',
          },
          {
            prop: 'display_status',
            label: 'Status'
          }
        ]
      },
      resInformation: {},
      dialogStatus: false,
    }
  },
  methods: {
    // 分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initGamePlatformPullReportSchedules(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initGamePlatformPullReportSchedules(this.formInline)
        return
      }
      this.initGamePlatformPullReportSchedules(value)
    },
    // 数据初始化
    initGamePlatformPullReportSchedules (formInline) {
      this.tableConfig.loading = true
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageGamePlatformPullReportSchedulesHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // drop list
    GamePlatformPullReportSchedulesDropList () {
      backstageGamePlatformPullReportSchedulesDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['platform_code','status'])
        this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // 更新
    updateStatusSubmit () {

      patchBackstageGamePlatformPullReportSchedulesHttp(this.eachData.id, {status: this.updateStatus}).then(res => {
        this.initGamePlatformPullReportSchedules(this.formInline)
        element.message({
          type: 'success',
          message: 'Update Success'
        })
        this.dialogStatus = false
      })
    },
    // 更新按钮
    onUpdate(item) {
      this.eachData = item
      this.updateStatus = item.status
      this.dialogStatus = true
    }
  },
  created () {
    this.initGamePlatformPullReportSchedules(this.formInline)
    this.GamePlatformPullReportSchedulesDropList()
  }
}
</script>

<style lang="scss" type="text/scss">
  .Games{
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
      margin-bottom: .2rem;
    }
    .el-dialog {
      margin-top: 8vh !important;
    }
    .form_inline_comp{
      .el-form-item {
        width: 45%;
      }
      .border {
        padding: 5px 0;
        border: 1px solid #eee;
        .el-form-item {
          width: auto;
        }
        .el-form-item:nth-child(5) {
          width: 100%;
          .el-form-item__content {
            width: 90%;
            .ql-editor {
              height: 10rem;
            }
          }
        }
      }
    }
  }
</style>
