<style scoped lang="scss">
  .border{
    border: 1px solid #eee;
  }
  .content {
    padding: .2rem 0;
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form-item__label {
      width: 100px !important;
    }
    .el-form-item__content {
      margin-left: 100px !important;
    }
  }
  .clear{
    clear: both;
  }
  .quill-editor{
    .ql-editor {
      height: 15rem;
    }
  }
</style>

<template>
  <div class="PromotionSetting">
    <form-inline-comp
      :formInlineConfig="formInlineConfig"
      @onAdd = onAdd
      @onSubmit = callbacks
    ></form-inline-comp>
    <table-comp
      :tableConfig="tableConfig"
      :resInformation="resInformation"
      @handleSizePageChange = callbacks
    ></table-comp>
    <el-dialog
      :title="promotionSettingDialog.title"
      :visible.sync="promotionSettingDialog.status"
      width="1200px"
      @close="clearForm"
    >
      <el-form
        ref="form"
        :model="promotionSettingForm"
        label-width="200px"
      >
        <el-form-item label="Type">
          <el-select
            clearable
            v-model="promotionSettingForm.promotion_type_code"
            placeholder="Type"
          >
            <el-option
              v-for="item in dropList.promotion_type_code"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Show Type">
          <el-select
            clearable
            collapse-tags
            multiple
            v-model="promotionSettingForm.show_types"
            placeholder="Show Type"
          >
            <el-option
              v-for="item in dropList.promotion_type_code"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Promotion Code">
          <el-input
            v-model="promotionSettingForm.code"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item label="Approve/Reject">
          <el-checkbox v-model="promotionSettingForm.is_verified"></el-checkbox>
        </el-form-item>
        <el-form-item label="Related Type">
          <el-select
            :clearable = true
            v-model="promotionSettingForm.related_type"
            placeholder="Related Type"
          >
            <el-option
              v-for="item in dropList.related_type"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Related Codes">
          <el-input
            v-model="promotionSettingForm.codes"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item label="Backstage Title">
          <el-input
            v-model="promotionSettingForm.backstage_title"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item label="Display Time">
          <el-date-picker
            v-model="promotionSettingForm.display_date"
            type="daterange"
            range-separator="to"
            start-placeholder="Display Start At"
            end-placeholder="Display End At"
          />
        </el-form-item>
        <el-form-item label="Upload Web Image">
          <file-upload
            :fileConfig="uploadConfig"
            @Success="handleWebSuccess"
          ></file-upload>
        </el-form-item>
        <el-form-item label="Upload Web Content Image">
          <file-upload
            :fileConfig="uploadConfig"
            @Success="handleWebContentSuccess"
          ></file-upload>
        </el-form-item>
        <el-form-item label="Upload Mobile Image">
          <file-upload
            :fileConfig="uploadConfig"
            @Success="handleMobileSuccess"
          ></file-upload>
        </el-form-item>
        <el-form-item label="Upload Mobile Content Image">
          <file-upload
            :fileConfig="uploadConfig"
            @Success="handleMobileContentSuccess"
          ></file-upload>
        </el-form-item>
        <el-form-item label="Status">
          <el-select
            clearable
            v-model="promotionSettingForm.status"
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
        <el-form-item label="Sort">
          <el-input
            v-model="promotionSettingForm.sort"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item label="Is Claim">
          <el-switch
            v-model="promotionSettingForm.is_can_claim"
            active-color="#13ce66"
            :active-value=1
            :inactive-value=0
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item label="Currencies">
          <el-select v-model="promotionSettingForm.currencies" multiple placeholder="Please select Currencies">
            <el-option
              v-for="item in dropList.currency"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Languages">
          <el-button type="primary" @click="addArr">Add</el-button>
        </el-form-item>
        <div class="border" v-if="promotionSettingForm.languages.length">
          <div
            class="content"
            v-for="(item, key) in promotionSettingForm.languages"
            :key="key"
          >
            <el-form
              label-width="105px"
            >
              <el-form-item label="Language" prop="language">
                <el-select v-model="item.language" placeholder="Select A Language">
                  <el-option
                    v-for="item1 in dropList.language"
                    :key="item1.key"
                    :label="item1.value"
                    :value="item1.key"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                style="width: 100%"
                label="Title">
                <el-input
                  v-model="item.title"
                />
              </el-form-item>
              <el-form-item
                style="width: 100%"
                label="Description">
                <el-input
                  type="textarea"
                  row="3"
                  v-model="item.description"
                />
              </el-form-item>
<!--              <el-form-item label="Mobile Image" v-if="platform !== 'eg'">-->
<!--                <file-upload :fileConfig="setUploadConfig(item)"-->
<!--                             @Success="response => handleMobileLanguageSuccess(response, item)"-->
<!--                ></file-upload>-->
<!--              </el-form-item>-->
              <el-form-item label="Content">
                <kind-editor
                  :options="options"
                  v-model="item.content"
                  :listKey="key"
                  @input="changeTheBody"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="deleteArr">Delete</el-button>
              </el-form-item>
            </el-form>
            <div class="clear"></div>
          </div>
        </div>
        <el-form-item align="right">
          <el-button type="primary" @click="doStoreOrUpdate">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import {
  backstagePromotionSettingDropListHttp,
  backstagePromotionSettingListHttp,
  backstagePromotionSettingStoreHttp,
  backstagePromotionSettingUpdateHttp,
  backstagePromotionSettingDeleteHttp,
  backstagePromotionSettingCopyHttp,
} from '../../api/marketing_tools/initAxios'
import {mapGetters} from 'vuex'
import {backstageGeOoperationIdHttp} from '../../api/initAxios';
import FormInlineComp from '../../components/form/formInlineComp'
import filter from '../../util/filter'
import FileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
import moment from 'moment'
import KindEditor from '../../components/kindEditor/KindEditor'
export default {
  name: 'PromotionSetting',
  components: {KindEditor, FileUpload, FormInlineComp, TableComp},
  data () {
    return {
      platform: '',
      options: [],
      timer: '',
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: '',
            label: 'Promotion Code',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.promotionSettingID = params.item.id
                      this.promotionSettingForm.promotion_type_code = params.item.promotion_type_code
                      this.promotionSettingForm.show_types = params.item.show_types.split(',')
                      this.promotionSettingForm.backstage_title = params.item.backstage_title
                      this.promotionSettingForm.codes = params.item.codes
                      this.promotionSettingForm.code = params.item.code
                      this.promotionSettingForm.is_can_claim = Number(params.item.is_can_claim)
                      this.promotionSettingForm.is_verified = Boolean(params.item.is_verified)
                      this.promotionSettingForm.related_type = params.item.related_type
                      this.promotionSettingForm.display_date.push(params.item.display_start_at)
                      this.promotionSettingForm.display_date.push(params.item.display_end_at)
                      this.promotionSettingForm.display_start_at = params.item.display_start_at
                      this.promotionSettingForm.display_end_at = params.item.display_end_at
                      this.promotionSettingForm.sort = params.item.sort
                      this.promotionSettingForm.status = params.item.status
                      this.promotionSettingForm.web_img_id = params.item.web_img_id
                      this.promotionSettingForm.web_content_img_id = params.item.web_content_img_id
                      this.promotionSettingForm.mobile_img_id = params.item.mobile_img_id
                      this.promotionSettingForm.mobile_content_img_id = params.item.mobile_content_img_id
                      this.promotionSettingForm.currencies = params.item.currencies
                      this.promotionSettingForm.languages = params.item.languages
                      this.isUpload = true
                      this.promotionSettingDialog = {
                        title: 'Update Promotion Setting',
                        status: true
                      }
                    }
                  }
                }, params.item.code)
              ])
            }
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'backstage_title',
            label: 'Backstage Title'
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
            prop: 'admin_name',
            label: 'Updated By'
          },
          {
            prop: 'display_status',
            fixWidth: '70px',
            label: 'Status'
          },
          {
            prop: 'sort',
            label: 'Sort'
          },
          {
            prop: 'created_at',
            label: 'Created At'
          },
          {
            prop: 'promotion_type_code',
            label: 'Type'
          },
          {
            prop: 'display_related_type',
            label: 'Related Type'
          },
          {
            prop: 'delete',
            label: 'Delete',
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
                        backstagePromotionSettingDeleteHttp(params.item.id).then(res => {
                          this.initPromotionSetting(this.formInline)
                        })
                      }).catch(() => {
                      })
                    }
                  }
                }),
                h('el-button', {
                  props: {
                    size: 'small',
                    circle: true,
                    icon: 'el-icon-document-copy'
                  },
                  style: {
                    marginRight: '5px',
                    background: '#67C23A',
                    color: '#fff',
                    border: 'none'
                  },
                  on: {
                    click: () => {
                      backstagePromotionSettingCopyHttp(params.item.id).then(res => {
                        this.promotionSettingID = res.id
                        this.promotionSettingForm.promotion_type_code = res.promotion_type_code
                        this.promotionSettingForm.backstage_title = res.backstage_title
                        this.promotionSettingForm.show_types = res.show_types.split(',')
                        this.promotionSettingForm.codes = res.codes
                        this.promotionSettingForm.code = res.code
                        this.promotionSettingForm.is_can_claim = Number(res.is_can_claim)
                        this.promotionSettingForm.is_verified = Boolean(res.is_verified)
                        this.promotionSettingForm.related_type = res.related_type
                        this.promotionSettingForm.display_date.push(res.display_start_at)
                        this.promotionSettingForm.display_date.push(res.display_end_at)
                        this.promotionSettingForm.display_start_at = res.display_start_at
                        this.promotionSettingForm.display_end_at = res.display_end_at
                        this.promotionSettingForm.sort = res.sort
                        this.promotionSettingForm.status = Number(res.status)
                        this.promotionSettingForm.web_img_id = res.web_img_id
                        this.promotionSettingForm.web_content_img_id = res.web_content_img_id
                        this.promotionSettingForm.mobile_img_id = res.mobile_img_id
                        this.promotionSettingForm.mobile_content_img_id = res.mobile_content_img_id
                        this.promotionSettingForm.currencies = res.currencies
                        this.promotionSettingForm.languages = res.languages
                        this.isUpload = true
                        this.promotionSettingDialog = {
                          title: 'Copy Promotion Setting',
                          status: true
                        }
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
        per_page: 50,
        page: 1,
        promotion_type_code: '',
        code: '',
        backstage_title: '',
        related_type: '',
        is_can_claim: '',
        status: '',
        display_start_at: '',
        display_end_at: '',
        currency: ''
      },
      formInlineConfig: [
        {
          type: 'select',
          label: 'Type',
          formValue: 'promotion_type_code',
          placeholder: 'Select A Type',
          clearable: true,
          value: '',
          list: ''
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
          type: 'input',
          label: 'Promotion Code',
          formValue: 'code',
          placeholder: 'Promotion Code',
          value: ''
        },
        {
          type: 'input',
          label: 'Backstage Title',
          formValue: 'backstage_title',
          placeholder: 'Backstage Title',
          value: ''
        },
        {
          type: 'select',
          label: 'Related Type',
          formValue: 'related_type',
          placeholder: 'Select A Related Type',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Is Claim',
          formValue: 'is_can_claim',
          placeholder: 'Is Claim',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Status',
          formValue: 'status',
          placeholder: 'Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'date',
          formKey1: 'display_start_at',
          formKey2: 'display_end_at',
          label: 'Display Time'
        },
        {
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      dropList: {},
      promotionSettingDialog: {
        title: '',
        status: false
      },
      promotionSettingID: '',
      promotionSettingForm: {
        show_types: [],
        promotion_type_code: '',
        codes: '',
        code: '',
        is_can_claim: '',
        is_verified: true,
        related_type: '',
        backstage_title: '',
        display_date: [],
        display_start_at: '',
        display_end_at: '',
        web_img_id: '',
        web_content_img_id: '',
        mobile_img_id: '',
        mobile_content_img_id: '',
        status: '',
        sort: '',
        currencies: [],
        languages: []
      },
      uploadConfig: {
        url: '/api/backstage/images',
        name: 'image',
        accept: 'image/*',
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        type: 'Games'
      },
      editorOption: {},
      isUpload: false,
      codes: ''
    }
  },
  created () {
    this.initPromotionSetting(this.formInline)
    this.promotionSettingDropList()
  },
  methods: {
    // 数据初始化
    initPromotionSetting (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstagePromotionSettingListHttp(datalist).then(res => {
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
        this.initPromotionSetting(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initPromotionSetting(this.formInline)
        return
      }
      this.initPromotionSetting(value)
    },
    // 下拉菜单
    promotionSettingDropList () {
      filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
      backstagePromotionSettingDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['promotion_type_code', 'status', 'related_type', 'is_can_claim'])
        this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // 添加按钮
    onAdd () {
      this.promotionSettingID = ''
      this.codes = ''
      this.clearForm()
      this.isUpload = false
      this.uploadConfig.fileList = []
      this.promotionSettingDialog = {
        title: 'Add Promotion Setting',
        status: true
      }
    },
    // 文件改动
    handleWebSuccess (response, file, fileList) {
      this.promotionSettingForm.web_img_id = response.id
    },
    // 文件改动
    handleWebContentSuccess (response, file, fileList) {
      this.promotionSettingForm.web_content_img_id = response.id
    },
    // 文件改动
    handleMobileSuccess (response, file, fileList) {
      this.promotionSettingForm.mobile_img_id = response.id
    },
    // 文件改动
    handleMobileContentSuccess (response, file, fileList) {
      this.promotionSettingForm.mobile_content_img_id = response.id
    },
    handleMobileLanguageSuccess (response, item) {
      item.mobile_image_id = response.id;
    },
    onEditorReady (editor) { // 准备编辑器
    },
    // 添加或更新
    doStoreOrUpdate () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if (this.promotionSettingForm.display_date instanceof Array) {
          if (this.promotionSettingForm.display_date[0]) {
            this.promotionSettingForm.display_start_at = moment(this.promotionSettingForm.display_date[0]).format('YYYY-MM-DD')
          }
          if (this.promotionSettingForm.display_date[1]) {
            this.promotionSettingForm.display_end_at = moment(this.promotionSettingForm.display_date[1]).format('YYYY-MM-DD')
          }
        }

        this.promotionSettingForm.is_verified = Number(this.promotionSettingForm.is_verified)
        console.log(this.promotionSettingID)
        if (this.promotionSettingID) {
          backstagePromotionSettingUpdateHttp(this.promotionSettingID, this.promotionSettingForm).then(res => {
            this.$message.success('success')
            this.promotionSettingDialog.status = false
            this.initPromotionSetting(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        } else {
          let check = filter.validationFilterByEcho(this.promotionSettingForm, ['promotion_type_code', 'title'])
          if (check) {
            backstagePromotionSettingStoreHttp(this.promotionSettingForm).then(res => {
              this.$message.success('success')
              this.promotionSettingDialog.status = false
              this.initPromotionSetting(this.formInline)
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
      this.promotionSettingForm = {
        show_types: [],
        promotion_type_code: '',
        codes: '',
        code: '',
        is_can_claim: '',
        is_verified: true,
        related_type: '',
        backstage_title: '',
        display_date: [],
        display_start_at: '',
        display_end_at: '',
        web_img_id: '',
        web_content_img_id: '',
        mobile_img_id: '',
        mobile_content_img_id: '',
        status: '',
        sort: '',
        currencies: [],
        languages: []
      }
    },
    // 添加数组
    addArr () {
      this.promotionSettingForm.languages.push({
        language: '',
        title: '',
        description: '',
        content: '',
        mobile_image_id: ''
      })
    },
    // 删除数组
    deleteArr (key) {
      this.promotionSettingForm.languages.splice(key, 1)
    },
    // 更改body
    changeTheBody (val, key) {
      this.promotionSettingForm.languages[key].content = val
    },
    getPlatform() {
      backstageGeOoperationIdHttp().then(res => {
        this.platform = res
      })
    },
    setUploadConfig(item) {
      const uploadConfig = {...this.uploadConfig};
      if (item.mobile_language_image_show) {
        uploadConfig.fileList = [{
          name: item.mobile_language_image_show,
          url: item.mobile_language_image_show
        }];
      }
      return uploadConfig;
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ]),
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  activated () {
    this.getPlatform();
  }
}
</script>

<style lang="scss">
  .PromotionSetting {
    .el-dialog {
      margin-top: 0 !important;
      .el-dialog__body {
        padding: 0 20px 10px;
      }
    }
    .el-form .el-form-item {
      margin-bottom: .2rem !important;
    }
    .ql-editor {
      height: 15rem;
    }
  }
</style>
