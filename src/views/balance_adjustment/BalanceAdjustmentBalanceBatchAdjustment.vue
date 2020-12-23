<style lang="scss" scoped type="text/scss">
  .BalanceBatchAjustment{
    .radio{
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <div class="BalanceBatchAjustment">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    >
      <template v-slot:content>
        <el-button type="danger" @click="downloadExcel">Download Template</el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog
      title="Add"
      :visible.sync="dialog.addStatus"
    >
      <el-form
        label-width="150px"
      >
        <el-form-item>
          <el-radio-group @change="typeChange" v-model="form.type">
            <el-radio :label="1">Deposit</el-radio>
            <el-radio :label="2">Withdrawal</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Chose File">
          <file-upload
            :fileConfig="uploadConfig"
            @Success="handleWebSuccess"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onSubmit" :loading="dialog.addSubmit">Submit</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="1200px"
      :title="dialog.showTitle"
      :visible.sync="dialog.showStatus"
    >
      <table-comp
        :tableConfig = detailTableConfig
        :resInformation = detailResInformation
      ></table-comp>
    </el-dialog>
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import {
  backstageBalanceBatchAdjustmentIndexHttp,
  backstageBalanceBatchAdjustmentExportHttp,
  backstageBalanceBatchAdjustmentStoreHttp,
  backstageBalanceBatchAdjustmentShowHttp
} from '../../api/balance_adjustment/initAxios'
import filter from '../../util/filter'
import FileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
import element from '../../config/element'
export default {
  name: 'BalanceBatchAjustment',
  data () {
    return {
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'type',
            label: 'Type',
            render: (h, params) => {
              if (params.item.type === 1) {
                return h('div', [
                  h('span', {}, '+')
                ])
              }
              return h('div', [
                h('span', {}, '-')
              ])
            }
          },
          {
            prop: 'file',
            label: 'File',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.showDetails(params.item.id)
                      this.dialog.showStatus = true
                      this.dialog.showTitle = params.item.file
                    }
                  }
                }, params.item.file)
              ])
            }
          },
          {
            prop: 'upload_by',
            label: 'Upload By'
          },
          {
            prop: 'created_at',
            label: 'Created At'
          }
        ]
      },
      formInlineConfig: [
        {
          type: 'add'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1
      },
      form: {
        type: '',
        file: '',
        unique_key: '',
      },
      dialog: {
        addStatus: false,
        showStatus: false,
        showTitle: '',
        addSubmit: false
      },
      uploadConfig: {
        url: '/api/backstage/batch_adjustment/upload',
        name: 'file',
        limit: 1,
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        type: 'Games'
      },
      detailTableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'created_at',
            label: 'DATE'
          },
          {
            prop: 'type',
            label: 'TYPE',
            render: (h, params) => {
              if (params.item.type === 'Deposit') {
                return h('div', [
                  h('span', {}, '+')
                ])
              } else {
                return h('div', [
                  h('span', {}, '-')
                ])
              }
            }
          },
          {
            prop: 'amount',
            label: 'AMOUNT'
          },
          {
            prop: 'user_name',
            label: 'Member Code'
          },
          {
            prop: 'category',
            label: 'CATEGORY'
          },
          {
            prop: 'platform_code',
            label: 'PLATFORM'
          },
          {
            prop: 'reason',
            label: 'REASON'
          },
          {
            prop: 'remark',
            label: 'REMARKS'
          },
          {
            prop: 'id',
            label: 'ADJUSTMENT ID',
            render: (h, params) => {
              return h('div', [
                h('span', {}, params.item.order_no)
              ])
            }
          },
          {
            prop: 'status',
            label: 'STATUS'
          },
          {
            prop: 'created_admin_name',
            label: 'Created By'
          }
        ]
      },
      detailResInformation: {}
    }
  },
  created () {
    this.initHttp(this.formInline)
  },
  components: {
    FileUpload,
    tableComp,
    formInlineComp
  },
  methods: {
    // 会员信息请求
    initHttp (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.per_page && !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      backstageBalanceBatchAdjustmentIndexHttp(formInline).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 提交表单与分页回调
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
    // memberDropList下拉菜单
    onAdd () {
      this.form = {
        type: '',
        file: ''
      }
      this.uploadConfig.fileList = []
      this.dialog.addStatus = true
    },
    // Type
    typeChange (val) {
      this.form.type = val
    },
    // 文件改动
    handleWebSuccess (response, file, fileList) {
      this.form.file = response.path
      this.form.unique_key = response.unique_key
    },
    // 添加
    onSubmit () {
      this.dialog.addSubmit = true
      backstageBalanceBatchAdjustmentStoreHttp(this.form).then(res => {
        element.message({
          message: 'success',
          type: 'success'
        })
        this.dialog.addSubmit = false
        this.initHttp(this.formInline)
        this.dialog.addStatus = false
      }).catch((error) => {
        this.dialog.addSubmit = false
        console.log(error.response)
      })
    },
    downloadExcel () {
      backstageBalanceBatchAdjustmentExportHttp().then(res => {
        filter.downloadExcel(res)
      }).catch((error) => {
        console.log(error.response)
      })
    },
    showDetails (id) {
      backstageBalanceBatchAdjustmentShowHttp(id).then(res => {
        this.detailTableConfig.loading = false
        this.detailResInformation = res
      }).catch((error) => {
        this.detailTableConfig.loading = false
        console.log(error)
      })
    }
  }
}
</script>
