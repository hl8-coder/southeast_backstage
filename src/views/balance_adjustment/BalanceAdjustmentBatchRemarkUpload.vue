<style lang="scss" scoped type="text/scss">
  .BatchRemarkUpload{
    .radio{
      margin-bottom: 20px;
    }
  }
</style>

<template>
  <div class="BatchRemarkUpload">
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
    <el-dialog
      width="1200px"
      title="fail"
      :visible.sync="dialogFail"
    >
      <table-comp
        :tableConfig = failsTableConfig
        :resInformation = failsResInformation
      ></table-comp>
    </el-dialog>
  </div>
</template>

<script>
  import formInlineComp from '../../components/form/formInlineComp'
  import tableComp from '../../components/table/tableComp'
  import {
    backstageBalanceBatchRemarkIndexHttp,
    backstageBalanceBatchRemarkExportHttp,
    backstageBalanceBatchRemarkStoreHttp,
    batchRemarkFailsHttp,
    backstageBalanceBatchRemarkShowHttp
  } from '../../api/balance_adjustment/initAxios'
  import filter from '../../util/filter'
  import FileUpload from '../../components/file/fileUpload'
  import resourcesList from '../../util/static'
  import element from '../../config/element'
  export default {
    name: 'BatchRemarkUpload',
    data () {
      return {
        resInformation: {},
        tableConfig: {
          border: true,
          loading: true,
          tableColumn: [
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
              prop: 'fail_num',
              label: 'FAIL',
              render: (h, params) => {
                if (params.item.fail_num === 0) {
                  return h('div', {}, params.item.fail_num)
                }
                return h('div', [
                  h('el-Link', {
                    props: {
                      size: 'small',
                      type: 'primary'
                    },
                    style: {
                      color: 'red'
                    },
                    on: {
                      click: () => {
                        batchRemarkFailsHttp(params.item.id, {}).then(res => {
                          this.failsTableConfig.loading = false
                          this.failsResInformation = res
                        })

                        this.dialogFail = true
                      }
                    }
                  }, params.item.fail_num)
                ])
              }
            },
            {
              prop: 'created_at',
              label: 'Created At'
            }
          ]
        },
        failsResInformation: {},
        failsTableConfig: {
          border: true,
          loading: true,
          tableColumn: [
            {
              prop: 'type',
              label: 'TYPE'
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
              prop: 'sub_category',
              label: 'Sub Category'
            },
            {
              prop: 'reason',
              label: 'REASON'
            }
          ]
        },
        dialogFail: false,
        formInlineConfig: [
          {
            type: 'date',
            label: 'Date'
          },
          {
            type: 'search'
          },
          {
            type: 'add'
          }
        ],
        formInline: {
          per_page: 50,
          page: 1,
          start_at: '',
          end_at: ''
        },
        form: {
          file: ''
        },
        dialog: {
          addStatus: false,
          showStatus: false,
          showTitle: '',
          addSubmit: false
        },
        uploadConfig: {
          url: '/api/backstage/batch_remark/upload',
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
              label: 'TYPE'
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
              prop: 'sub_category',
              label: 'Sub Category'
            },
            {
              prop: 'reason',
              label: 'REASON'
            },
            {
              prop: 'admin_name',
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
        backstageBalanceBatchRemarkIndexHttp(formInline).then(res => {
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
      },
      // 添加
      onSubmit () {
        this.dialog.addSubmit = true
        backstageBalanceBatchRemarkStoreHttp(this.form).then(res => {
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
        backstageBalanceBatchRemarkExportHttp().then(res => {
          filter.downloadExcel(res)
        }).catch((error) => {
          console.log(error.response)
        })
      },
      showDetails (id) {
        backstageBalanceBatchRemarkShowHttp(id).then(res => {
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
