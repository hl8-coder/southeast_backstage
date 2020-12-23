<template>
  <div class="ItVerifiedPrizeBlackUserList">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="success" @click="downloadExcel">Download</el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog
      title="Add"
      :visible.sync="dialog.status"
    >
      <el-form
        label-width="150px"
      >
        <el-form-item
          label="Member Code"
        >
          <el-input
            v-model="form.user_name"
          />
        </el-form-item>
        <el-form-item label="Upload">
          <file-upload
            :fileConfig="uploadConfig"
            @Success="handleSuccess"
          ></file-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doStore">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import FormInlineComp from '../../components/form/formInlineComp'
import filter from '../../util/filter'
import {
  backstageVerifiedPrizeBlackUserListHttp,
  backstageVerifiedPrizeBlackUserStoreHttp,
  backstageVerifiedPrizeBlackUserDeleteHttp,
  backstageVerifiedPrizeBlackUserDownloadHttp
} from '../../api/it_tools/initAxios'
import {mapGetters} from 'vuex'
import element from '../../config/element'
import FileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
import {deleteBackstageAdminsRolesHttp} from "../../api/system/initAxios";
export default {
  name: 'ItVerifiedPrizeBlackUserList',
  components: {FileUpload, FormInlineComp, TableComp},
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
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
            prop: 'user_id',
            label: 'User ID'
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'user_name',
            label: 'Username'
          },
          {
            prop: 'add_by',
            label: 'Admin Name'
          },
          {
            prop: 'add_at',
            label: 'Add At'
          },
          {
            prop: 'created_at',
            label: 'Created At'
          },
          {
            prop: 'delect',
            label: 'Delect',
            width: '60',
            render: (h, params) => {
              return h('div', [
                h('el-button', {
                  props: {
                    size: 'small',
                    circle: true,
                    icon: 'el-icon-delete'
                  },
                  style: {
                    marginRight: '5px',
                    background: '#409EFF',
                    color: '#fff',
                    border: 'none'
                  },
                  on: {
                    click: () => {
                      this.$confirm('Are you sure you want to delete?', 'Prompt', {
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'Cancel',
                        type: 'warning'
                      }).then(() => {
                        backstageVerifiedPrizeBlackUserDeleteHttp(params.item.id).then(res => {
                          this.initHttp(this.formInline)
                        })
                      }).catch(() => {
                      })
                    }
                  }
                })
              ])
            }
          }
        ]
      },
      resInformation: {},
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name_like',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'input',
          label: 'Admin Name',
          formValue: 'admin_name_like',
          placeholder: 'Admin Name',
          value: ''
        },
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
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      formInline: {
        user_name_like: '',
        admin_name_like: '',
        currency: ''
      },
      form: {
        user_name: ''
      },
      dialog: {
        status: false
      },
      uploadConfig: {
        url: '/api/backstage/verified_prize_black_users/excel',
        name: 'excel',
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        limit: 1,
        type: 'excel'
      }
    }
  },
  methods: {
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageVerifiedPrizeBlackUserListHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
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
    onAdd () {
      this.form = {
        user_name: ''
      }
      this.dialog.status = true
    },
    doStore () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        backstageVerifiedPrizeBlackUserStoreHttp(this.form).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.dialog.status = false
          this.initHttp(this.formInline)
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    // 下载报表
    downloadExcel () {
      var datalist = filter.formInlineFilterByEcho(this.formInline, [], ['per_page', 'page'])
      backstageVerifiedPrizeBlackUserDownloadHttp(datalist).then(res => {
        filter.downloadExcel(res)
      }).catch(() => {
      })
    },
    // 文件改动
    handleSuccess (response, file, fileList) {
      element.message({
        type: 'success',
        message: 'success'
      })
      this.dialog.status = false
      this.initHttp(this.formInline)
    }
  },
  activated () {
    filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
    this.initHttp(this.formInline)
  }
}
</script>

<style scoped>

</style>
