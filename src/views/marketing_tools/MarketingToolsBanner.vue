<template>
  <div class="Banner">
    <form-inline-comp
      :formInlineConfig="formInlineConfig"
      @onSubmit = callbacks
      @onAdd = onAdd
    ></form-inline-comp>
    <table-comp
      :tableConfig="tableConfig"
      :resInformation="resInformation"
      @handleSizePageChange = callbacks
    ></table-comp>
    <el-dialog
      :title="bannerSettingDialog.title"
      :visible.sync="bannerSettingDialog.status"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="150px"
      >
        <el-form-item label="Currency">
          <el-select
            v-model="form.currency"
            clearable
            placeholder="Select A Currency">
            <el-option
              v-for="item1 in dropList.currency"
              :label="item1.value"
              :key="item1.key"
              :value="item1.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Code">
          <el-input
            v-model="form.code"
            style="max-width: 220px"
            placeholder="Code"
          />
        </el-form-item>
        <el-form-item label="Display Time">
          <el-date-picker
            v-model="form.display_date"
            type="daterange"
            range-separator="to"
            start-placeholder="Display Start At"
            end-placeholder="Display End At"
          />
        </el-form-item>
        <el-form-item label="Position">
          <el-select
            v-model="form.position"
            placeholder="Position"
          >
            <el-option
              v-for="item in dropList.position"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Show Type">
          <el-select
            v-model="form.show_type"
            placeholder="Show Type"
          >
            <el-option
              v-for="item in dropList.show_type"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Target Type">
          <el-select
            v-model="form.target_type"
            placeholder="Target Type"
          >
            <el-option
              v-for="item in dropList.target_type"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Upload Web Image">
          <file-upload
            :fileConfig="uploadConfig"
            @Success="handleWebSuccess"
          ></file-upload>
        </el-form-item>
        <el-form-item label="Web Link Url">
          <el-input
            v-model="form.web_link_url"
            style="max-width: 220px"
            placeholder="Web Link Url"
          />
        </el-form-item>
        <el-form-item label="Upload Mobile Image">
          <file-upload
            :fileConfig="uploadConfig"
            @Success="handleMobileSuccess"
          ></file-upload>
        </el-form-item>
        <el-form-item label="Mobile Link Url">
          <el-input
            v-model="form.mobile_link_url"
            style="max-width: 220px"
            placeholder="Mobile Link Url"
          />
        </el-form-item>
        <el-form-item label="Status">
          <el-select
            v-model="form.status"
            placeholder="Status"
          >
            <el-option
              v-for="item in dropList.status"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Is agent">
          <el-select
            v-model="form.is_agent"
            placeholder="Is agent"
          >
            <el-option
              v-for="item in dropList.is_agent"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Sort">
          <el-input
            v-model="form.sort"
            style="max-width: 220px"
            placeholder="Sort"
          />
        </el-form-item>
        <el-form-item style="width: 100%"  label="Languages">
          <el-button type="primary" @click="addArr">Add</el-button>
        </el-form-item>
        <div class="border" v-if="form.languages.length">
          <div
            class="content"
            v-for="(item, key) in form.languages"
            :key="key"
          >
            <el-form
              :model="form"
              label-width="105px"
              inline
            >
              <el-form-item label="Language" prop="language">
                <el-select v-model="item.language" placeholder="Select A Language">
                  <el-option
                    v-for="(item1, key1) in dropList.language"
                    :key="key1"
                    :label="item1.value"
                    :value="item1.key"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="Title">
                <el-input
                  v-model="item.title"
                  placeholder="Title"
                />
              </el-form-item>
              <el-form-item label="Description">
                <el-input
                  v-model="item.description"
                  placeholder="Description"
                />
              </el-form-item>
              <el-form-item label="Content">
                <quill-editor
                  v-model="item.content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)">
                </quill-editor>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="deleteArr">Delete</el-button>
              </el-form-item>
            </el-form>
            <div class="clear"></div>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="doStoreOrUpdate">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import {
  backstageDropListBannerHttp,
  backstageBannersHttp,
  addBackstageBannersHttp,
  updateBackstageBannersHttp,
  deleteBackstageBannersHttp
} from '../../api/marketing_tools/initAxios'
import FormInlineComp from '../../components/form/formInlineComp'
import filter from '../../util/filter'
import FileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
import moment from 'moment'
export default {
  name: 'Banner',
  components: {FileUpload, FormInlineComp, TableComp},
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'Title',
            fixWidth: '173px',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.isUpload = true
                      this.bannerSettingDialog = {
                        title: 'Update Banner Setting',
                        status: true
                      }
                      this.bannerID = params.item.id
                      this.form.currency = params.item.currency
                      this.form.code = params.item.code
                      this.form.show_type = params.item.show_type
                      this.form.target_type = params.item.target_type
                      this.form.display_date.push(params.item.display_start_at)
                      this.form.display_date.push(params.item.display_end_at)
                      this.form.display_start_at = params.item.display_start_at
                      this.form.display_end_at = params.item.display_end_at
                      this.form.sort = params.item.sort
                      this.form.status = Number(params.item.status)
                      this.form.web_img_id = params.item.web_img_id
                      this.form.mobile_img_id = params.item.mobile_img_id
                      this.form.languages = params.item.languages
                      this.form.languages = params.item.languages
                      this.form.web_link_url = params.item.web_link_url
                      this.form.mobile_link_url = params.item.mobile_link_url
                      this.form.position = params.item.position
                    }
                  }
                }, params.item.code)
              ])
            }
          },
          {
            prop: 'currency',
            fixWidth: '70px',
            label: 'Currency'
          },
          {
            prop: 'display_position',
            fixWidth: '66px',
            label: 'Position'
          },
          {
            prop: 'display_show_type',
            fixWidth: '80px',
            label: 'Show Type'
          },
          {
            prop: 'display_target_type',
            fixWidth: '85px',
            label: 'Target Type'
          },
          {
            prop: 'display_start_at',
            fixWidth: '135px',
            label: 'Display Start Time'
          },
          {
            prop: 'display_end_at',
            fixWidth: '135px',
            label: 'Display End Time'
          },
          {
            prop: 'web_img_path',
            label: 'Web Image',
            fixWidth: '120px',
            render: (h, params) => {
              if (!params.item.web_img_path) {
                return
              }
              return h('div', [
                h('img', {
                  style: {
                    display: 'inline-block',
                    boxSizing: 'border-box',
                    textAlign: 'center',
                    overflow: 'hidden',
                    color: '#fff',
                    background: '#C0C4CC',
                    width: '100px',
                    height: '40px',
                    lineHeight: '40px',
                    fontSize: '14px'
                  },
                  domProps: {
                    src: params.item.web_img_path
                  },
                  on: {
                    click: () => {
                      this.$msgbox({
                        title: 'img',
                        message: h('div', null, [
                          h('el-image', {
                            props: {
                              src: params.item.web_img_path
                            },
                            style: {
                              width: '100%',
                              height: '100%'
                            }
                          })
                        ]),
                        showCancelButton: true,
                        cancelButtonText: 'close'
                      }).then(action => {
                      })
                    }
                  }
                })
              ])
            }
          },
          {
            prop: 'web_link_url',
            label: 'Web Link Url'
          },
          {
            prop: 'mobile_img_path',
            label: 'Mobile Image',
            fixWidth: '120px',
            render: (h, params) => {
              if (!params.item.mobile_img_path) {
                return
              }
              return h('div', [
                h('img', {
                  style: {
                    display: 'inline-block',
                    boxSizing: 'border-box',
                    textAlign: 'center',
                    overflow: 'hidden',
                    color: '#fff',
                    background: '#C0C4CC',
                    width: '100px',
                    height: '40px',
                    lineHeight: '40px',
                    fontSize: '14px'
                  },
                  domProps: {
                    src: params.item.mobile_img_path
                  },
                  on: {
                    click: () => {
                      this.$msgbox({
                        title: 'img',
                        message: h('div', null, [
                          h('el-image', {
                            props: {
                              src: params.item.mobile_img_path
                            },
                            style: {
                              width: '100%',
                              height: '100%'
                            }
                          })
                        ]),
                        showCancelButton: true,
                        cancelButtonText: 'close'
                      }).then(action => {
                      })
                    }
                  }
                })
              ])
            }
          },
          {
            prop: 'mobile_link_url',
            label: 'Mobile Link Url'
          },
          {
            prop: 'admin_name',
            fixWidth: '86px',
            label: 'Updated By'
          },
          {
            prop: 'display_status',
            fixWidth: '70px',
            label: 'Status'
          },
          {
            prop: 'sort',
            fixWidth: '70px',
            label: 'Sort'
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
                        deleteBackstageBannersHttp(params.item.id).then(res => {
                          this.backstageBannersHttp(this.formInline)
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
      formInline: {
        code: '',
        currency: '',
        position: '',
        show_type: '',
        target_type: '',
        status: '',
        display_start_at: '',
        display_end_at: '',
        per_page: 50,
        page: 1
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Title',
          formValue: 'code',
          placeholder: 'Title',
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
          type: 'select',
          label: 'Position',
          formValue: 'position',
          placeholder: 'Select A Position',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Show Type',
          formValue: 'show_type',
          placeholder: 'Select A Show Type',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Target Type',
          formValue: 'target_type',
          placeholder: 'Select A Target Type',
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
          type: 'dateTime',
          label: 'Date',
          formValue: 'date',
          formKey1: 'display_start_at',
          formKey2: 'display_end_at',
          value: ''
        },
        {
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      dropList: {},
      bannerSettingDialog: {
        title: '',
        status: false
      },
      bannerID: '',
      form: {
        currency: '',
        code: '',
        display_date: [],
        languages: [],
        display_start_at: '',
        display_end_at: '',
        show_type: '',
        target_type: '',
        web_img_id: '',
        is_agent: '',
        mobile_img_id: '',
        web_link_url: '',
        mobile_link_url: '',
        status: '',
        sort: '',
        position: ''
      },
      uploadConfig: {
        url: '/api/backstage/images',
        name: 'image',
        accept: 'image/*',
        limit: 1,
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        type: 'Games'
      },
      editorOption: {},
      isUpload: false
    }
  },
  created () {
    this.backstageBannersHttp(this.formInline)
    this.backstageDropListBannerHttp()
  },
  methods: {
    // 数据初始化
    backstageBannersHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageBannersHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 分页
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.backstageBannersHttp(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.backstageBannersHttp(this.formInline)
        return
      }
      this.backstageBannersHttp(value)
    },
    // 下拉菜单
    backstageDropListBannerHttp () {

      backstageDropListBannerHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'position', 'show_type', 'target_type', 'status'])
        this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // 添加按钮
    onAdd () {
      this.clearForm()
      this.bannerID = ''
      this.isUpload = false
      this.bannerSettingDialog = {
        title: 'Add Banner Setting',
        status: true
      }
    },
    // 文件改动
    handleWebSuccess (response, file, fileList) {
      // console.log(response)
      this.form.web_img_id = response.id
    },
    // 文件改动
    handleMobileSuccess (response, file, fileList) {
      this.form.mobile_img_id = response.id
    },
    onEditorReady (editor) { // 准备编辑器
    },
    onEditorBlur () {},
    onEditorFocus () {},
    onEditorChange () {},
    // 添加或更新
    doStoreOrUpdate () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.form.display_start_at = moment(this.form.display_date[0]).format('YYYY-MM-DD')
        this.form.display_end_at = moment(this.form.display_date[1]).format('YYYY-MM-DD')
        if (this.bannerID) {
          updateBackstageBannersHttp(this.bannerID, this.form).then(res => {
            this.$message.success('success')
            this.bannerSettingDialog.status = false
            this.backstageBannersHttp(this.formInline)
          }).catch((error) => {
            this.bannerSettingDialog.status = false
            console.log(error)
          })
        } else {
          let check = filter.validationFilterByEcho(
            this.form,
            ['show_type', 'target_type', 'button_text', 'display_start_at', 'display_end_at', 'web_img_id', 'mobile_img_id']
          )
          if (check) {
            addBackstageBannersHttp(this.form).then(res => {
              this.$message.success('success')
              this.bannerSettingDialog.status = false
              this.backstageBannersHttp(this.formInline)
            }).catch((error) => {
              console.log(error)
            })
          }
        }
      }).catch(() => {
      })
    },
    // 清空数据
    clearForm () {
      this.uploadConfig.fileList = []
      this.form = {
        currency: '',
        code: '',
        display_date: [],
        languages: [],
        display_start_at: '',
        display_end_at: '',
        show_type: '',
        target_type: '',
        web_img_id: '',
        is_agent: '',
        mobile_img_id: '',
        web_link_url: '',
        mobile_link_url: '',
        status: '',
        sort: '',
        position: ''
      }
    },
    // 添加数组
    addArr () {
      this.form.languages.push({
        language: '',
        title: '',
        description: '',
        content: ''
      })
    },
    // 删除数组
    deleteArr (key) {
      this.form.languages.splice(key, 1)
    },
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  }
}
</script>

<style lang="scss">
  .Banner .el-form .el-form-item {
    margin-bottom: .2rem !important;
  }
  .quill-editor{
    .ql-editor {
      height: 15rem;
    }
  }
  .Banner .el-dialog__body {
    padding-top: 10px;
  }
  .Banner .el-dialog {
    margin-top: 5% !important;
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
</style>
