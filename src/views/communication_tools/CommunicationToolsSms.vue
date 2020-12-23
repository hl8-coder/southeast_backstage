<style lang="scss" scoped type="text/scss">
  .FlexRowFlexStartFlexStart{
    margin-bottom: 10px;
    .title {
      text-align: right;
      float: left;
      font-size: 14px;
      width: 140px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
</style>

<template>
  <div class="SMS">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="danger" @click="downloadExcel">Download</el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog title="New Annoucement" :visible.sync="Visible">
      <el-alert
        style="margin-bottom: 10px"
        title="Please download the excel file template"
        type="info"
        center
        :closable="false"
        show-icon>
      </el-alert>
      <div class="FlexRowFlexStartFlexStart">
        <div class="title">Member Code</div>
        <file-upload
          ref="fileUpload"
          :fileConfig = fileConfig
          @handleChange = handleChange
          @handleRemove = handleRemove
          @Success = Success
          @Error = Error
        />
      </div>
      <form-inline-comp
        inline="false"
        ref="formInlineComp"
        formLabelWidth="140px"
        :formInlineConfig = formConfig
        @inputEvent = inputEvent
        @onSubmit = onSubmit
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  backstageDropListUserMessagesHttp,
  backstageUserMessagesHttp,
  addBackstageUserMessagesHttp,
  detailBackstageUserMessagesHttp,
  backstageUserMessagesExcelDownloadHttp
} from '../../api/communication_tools/initAxios'
import fileUpload from '../../components/file/fileUpload'
import formInlineComp from '../../components/form/formInlineComp'
import resourcesList from '../../util/static'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import element from '../../config/element'
import {mapGetters} from 'vuex'
export default {
  name: 'SMS',
  data () {
    return {
      Visible: false,
      resInformation: {},
      pagination: {
        currency: '',
        per_page: 50,
        total: 20,
        page: 1
      },
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'category',
          label: 'Category',
          width: '80'
        }, {
          prop: 'content',
          label: 'Message Details',
          width: '300'
        }, {
          prop: 'number',
          label: 'Number Of SMS',
          width: '80',
          render: (h, params) => {
            if (params.item.number === 0) {
              return h('div', [
                h('span', {
                }, params.item.number)
              ])
            }
            var self = this
            return h('el-popover', {
              props: {
                placement: 'left',
                width: '600',
                trigger: 'click'
              }
            }, [
              h('el-table', {
                props: {
                  data: self.gridData
                }
              }, [
                h('el-table-column', {
                  props: {
                    width: '50',
                    property: 'id',
                    label: 'ID'
                  }
                }),
                h('el-table-column', {
                  props: {
                    width: '120',
                    property: 'receive_user_name',
                    label: 'Member Code'
                  }
                }),
                h('el-table-column', {
                  props: {
                    width: '80',
                    property: 'currency',
                    label: 'Currency'
                  }
                }),
                h('el-table-column', {
                  props: {
                    width: '120',
                    property: 'status',
                    label: 'Status'
                  }
                }),
                h('el-table-column', {
                  props: {
                    width: '200',
                    property: 'created_at',
                    label: 'Date'
                  }
                })
              ]),
              h('el-pagination', {
                props: {
                  layout: 'prev, pager, next',
                  total: self.pagination.total,
                  'page-size': self.pagination.per_page,
                  'current-page': self.pagination.page
                },
                on: {
                  'current-change': (val) => {
                    self.pagination.page = val
                    detailBackstageUserMessagesHttp(params.item.id, {page: val, per_page: self.pagination.per_page}).then(res => {
                      self.gridData = res.data
                      self.pagination.total = res.meta.pagination.total
                    }).catch((error) => {
                      console.log(error)
                    })
                  }
                }
              }, params.item.number),
              h('el-link', {
                slot: 'reference',
                props: {
                  type: 'primary',
                  icon: 'el-icon-view'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    self.pagination.page = 1
                    detailBackstageUserMessagesHttp(params.item.id, {page: self.pagination.page, per_page: self.pagination.per_page}).then(res => {
                      self.gridData = res.data
                      self.pagination.total = res.meta.pagination.total
                    }).catch((error) => {
                      console.log(error)
                    })
                  }
                }
              }, params.item.number)
            ])
          }
        }, {
          prop: 'created_at',
          label: 'Date',
          width: '80'
        }, {
          prop: 'sent_admin_name',
          label: 'Created By',
          width: '80'
        }]
      },
      formInlineConfig: [
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
          type: 'select',
          label: 'Category',
          formValue: 'category',
          placeholder: 'Select A Category',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'date'
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
        category: '',
        start_at: '',
        end_at: '',
        currency: ''
      },
      formConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          placeholder: 'Member Code',
          change: true,
          disabled: false,
          value: ''
        },
        {
          type: 'select',
          label: 'Member Status',
          formValue: 'member_status',
          placeholder: 'Select A Member Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Category',
          formValue: 'category',
          placeholder: 'Select A Category',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'textarea',
          label: 'SMS Content',
          formValue: 'content',
          placeholder: 'SMS Content',
          value: ''
        },
        {
          type: 'Submit'
        }
      ],
      fileConfig: {
        disabled: false,
        autoUpload: false,
        url: '/api/backstage/user_messages',
        fileHeaders: resourcesList.fileHeaders,
        name: 'excel',
        limit: 1,
        data: {},
        accept: '.xls, .xlsx', // 文件上传类型
        fileList: []
      },
      gridData: []
    }
  },
  created () {
    this.DropListHttp()
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp, fileUpload
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  methods: {
    Error () {
      this.formConfig[0].disabled = false
      this.fileConfig.fileList = []
    },
    Success (res) {
      this.formConfig[0].disabled = false
      this.fileConfig.fileList = []
      this.Visible = false
      this.initHttp(this.formInline)
      if (res.failed_count !== 0) {
        element.message({
          type: 'success',
          message: `total message: ${res.total_count}, failed message: ${res.failed_count}`
        })
      } else {
        element.message({
          type: 'success',
          message: 'add all success'
        })
      }
    },
    inputEvent (value) {
      if (value.value) {
        this.fileConfig.disabled = true
        return
      }
      this.fileConfig.disabled = false
    },
    handleRemove (file) {
      if (file.fileList.length === 0) {
        this.formConfig[0].disabled = false
      }
    },
    handleChange (file) {
      if (file.fileList.length !== 0) {
        this.formConfig[0].value = ''
        this.formConfig[0].disabled = true
      }
    },
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        // formInline.include = 'user'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageUserMessagesHttp(datalist).then(res => {
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
      this.Visible = true
      this.formConfig[0].disabled = false
      this.fileConfig.fileList = []
      this.fileConfig.disabled = false
      this.formConfig.forEach(item => {
        item.value = ''
      })
    },
    downloadExcel () {
      backstageUserMessagesExcelDownloadHttp().then((res) => {
        filter.downloadExcel(res)
      })
    },
    onSubmit (form) {
      if (this.fileConfig.disabled) {
        addBackstageUserMessagesHttp(form).then(res => {
          this.Visible = false
          this.initHttp(this.formInline)
          if (res.failed_count !== 0) {
            element.message({
              type: 'success',
              message: `total message: ${res.total_count}, failed message: ${res.failed_count}`
            })
          } else {
            element.message({
              type: 'success',
              message: 'add all success'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
        return
      }
      delete form.user_name
      this.fileConfig.data = form
      setTimeout(() => {
        this.$refs.fileUpload.uploadSubmit()
      }, 500)
    },
    DropListHttp () {
      filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
      backstageDropListUserMessagesHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['category'])
        filter.formValueListFilter(this.formConfig, res, ['category', 'member_status'])
      }).catch(() => {
      })
    }
  }
}
</script>
