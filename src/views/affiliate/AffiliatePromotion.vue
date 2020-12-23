<template>
  <div class="AffiliatePromotion">
    <form-inline-comp
      :formInlineConfig="formInlineConfig"
      @onAdd = onAdd
      @onSubmit = callbacks
    ></form-inline-comp>
    <table-comp
      :tableConfig="tableConfig"
      :resInformation="resInformation"
      @handleSizePageChange = callbacks
    />
    <el-dialog
      :title="promotionSettingDialog.title"
      :visible.sync="promotionSettingDialog.status"
      width="1200px"
      @close="clearForm"
    >
      <el-form
        ref="form"
        label-width="200px"
      >
        <el-form-item label="Promotion Code">
          <el-input
            v-model="promotionSettingForm.code"
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
              <el-form-item label="Content">
<!--                <kind-editor-->
<!--                  v-model="item.content"-->
<!--                  :listKey="key"-->
<!--                  @input="changeTheBody"-->
<!--                />-->
                <quill-editor
                  v-model="item.content"
                  ref="myQuillEditor"
                  :options="{}">
                </quill-editor>
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
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstagePromotionSettingDropListHttp,
  backstagePromotionSettingListHttp,
  backstagePromotionSettingStoreHttp,
  backstagePromotionSettingUpdateHttp
} from '../../api/marketing_tools/initAxios'
import moment from 'moment'
import {mapGetters} from 'vuex'
import KindEditor from '../../components/kindEditor/KindEditor'
import FileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
export default {
  name: 'AffiliatePromotion',
  components: {FileUpload, KindEditor, TableComp, FormInlineComp},
  data () {
    return {
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
      promotionSettingID: '',
      formInline: {
        per_page: 50,
        page: 1,
        is_agent: 1,
        promotion_type_code: '',
        code: '',
        backstage_title: '',
        related_type: '',
        is_can_claim: '',
        currency: '',
        status: '',
        display_start_at: '',
        display_end_at: ''
      },
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
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
                      this.promotionSettingForm.backstage_title = params.item.backstage_title
                      this.promotionSettingForm.codes = params.item.codes
                      this.promotionSettingForm.code = params.item.code
                      this.promotionSettingForm.is_can_claim = Number(params.item.is_can_claim)
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
            prop: 'backstage_title',
            label: 'Backstage Title'
          },
          {
            prop: 'currency',
            label: 'Currency'
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
          }
        ]
      },
      resInformation: {},
      dropList: {},
      promotionSettingDialog: {
        title: '',
        status: false
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
      promotionSettingForm: {
        promotion_type_code: 'new_members',
        is_agent: 1,
        code: '',
        is_can_claim: '',
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
    }
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
      var datalist = filter.formInlineFilterByEcho(formInline, [], ['per_page', 'page', 'is_agent'])
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
      value.is_agent = this.formInline.is_agent
      this.initPromotionSetting(value)
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
    // 清空数据
    clearForm () {
      this.promotionSettingForm = {
        promotion_type_code: 'new_members',
        is_agent: 1,
        code: '',
        is_can_claim: '',
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
        content: ''
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
    onEditorReady (editor) { // 准备编辑器
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
    // 添加或更新
    doStoreOrUpdate () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.promotionSettingForm.display_start_at = moment(this.promotionSettingForm.display_date[0]).format('YYYY-MM-DD')
        this.promotionSettingForm.display_end_at = moment(this.promotionSettingForm.display_date[1]).format('YYYY-MM-DD')
        if (this.promotionSettingID) {
          backstagePromotionSettingUpdateHttp(this.promotionSettingID, this.promotionSettingForm).then(res => {
            this.$message.success('success')
            this.promotionSettingDialog.status = false
            this.initPromotionSetting(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        } else {
          let check = filter.validationFilterByEcho(this.promotionSettingForm, ['promotion_type_code', 'title', 'display_start_at', 'display_end_at', 'web_img_id', 'mobile_img_id'])
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
  created () {
    this.initPromotionSetting(this.formInline)
    this.promotionSettingDropList()
  }
}
</script>

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
