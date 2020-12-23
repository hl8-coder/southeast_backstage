<style scoped lang="scss">
.PromotionTypeSetting {
  .border{
    border: 1px solid #eee;
  }
  .content {
    padding: .2rem 0;
    .el-form-item {
      width: 25%;
      float: left;
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
}
</style>

<template>
  <div class="PromotionTypeSetting">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    />
    <table-comp
      :tableConfig="tableConfig"
      :resInformation="resInformation"
      @handleSizePageChange = callbacks
    ></table-comp>
    <el-dialog :visible.sync="dialogImageStatus">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.status"
      @close="clearForm"
    >
      <el-form
        label-width="150px"
      >
        <el-form-item label="Type Code" prop="code">
          <el-input
            v-model="form.code"
            :disabled="Boolean(promotionTypeSettingID)"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item label="Upload Web Image">
          <file-upload
            :fileConfig="uploadConfig"
            @Success="handleWebSuccess"
          ></file-upload>
        </el-form-item>
        <el-form-item label="Upload Mobile Image">
          <file-upload
            :fileConfig="uploadConfig"
            @Success="handleMobileSuccess"
          ></file-upload>
        </el-form-item>
        <el-form-item label="Status" prop="status">
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
        <el-form-item label="Sort" prop="sort">
          <el-input
            v-model="form.sort"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item label="Currencies" prop="currencies">
          <el-select v-model="form.currencies" multiple placeholder="Please select Currencies">
            <el-option
              v-for="item in dropList.currency"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Languages" prop="languages">
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
              <el-form-item label="Title" prop="title">
                <el-input
                  v-model="item.title"
                />
              </el-form-item>
              <el-form-item label="Description" prop="description">
                <el-input
                  v-model="item.description"
                />
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
import filter from '../../util/filter'
import {
  backstagePromotionTypeSettingDropListHttp,
  backstagePromotionTypeSettingListHttp,
  backstagePromotionTypeSettingStoreHttp,
  backstagePromotionTypeSettingUpdateHttp
} from '../../api/marketing_tools/initAxios'
import FileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
import FormInlineComp from '../../components/form/formInlineComp'
export default {
  name: 'PromotionTypeSetting',
  components: {FormInlineComp, FileUpload, TableComp},
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'code',
            label: 'Type Code',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.uploadConfig.fileList = []
                      let info = JSON.parse(JSON.stringify(params.item))
                      this.promotionTypeSettingID = info.id
                      this.form.code = info.code
                      this.form.web_img_id = info.web_img_id
                      this.form.mobile_img_id = info.mobile_img_id
                      this.form.status = Number(info.status)
                      this.form.sort = info.sort
                      this.form.currencies = info.currencies
                      this.form.languages = info.languages
                      this.dialog.status = true
                    }
                  }
                }, params.item.code)
              ])
            }
          },
          {
            prop: 'web_img_path',
            label: 'Web Image',
            render: (h, params) => {
              return h('div', {
                on: {
                  click: () => {
                    this.dialogImageStatus = true
                    this.dialogImageUrl = params.item.web_img_path
                  }
                }
              }, [
                h('el-avatar', {
                  props: {
                    size: 'large',
                    src: params.item.web_img_path
                  }
                })
              ])
            }
          },
          {
            prop: 'mobile_img_path',
            label: 'Mobile Image',
            render: (h, params) => {
              return h('div', {
                on: {
                  click: () => {
                    this.dialogImageStatus = true
                    this.dialogImageUrl = params.item.mobile_img_path
                  }
                }
              }, [
                h('el-avatar', {
                  props: {
                    size: 'large',
                    src: params.item.mobile_img_path
                  }
                })
              ])
            }
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'admin_name',
            label: 'Updated By'
          },
          {
            prop: 'display_status',
            label: 'Status'
          },
          {
            prop: 'sort',
            label: 'Sort'
          }
        ]
      },
      resInformation: {},
      formInline: {
        currency: '',
        per_page: 20,
        page: 1
      },
      promotionTypeSettingID: '',
      form: {
        code: '',
        web_img_id: '',
        mobile_img_id: '',
        status: '',
        sort: '',
        languages: [],
        currencies: []
      },
      uploadConfig: {
        url: '/api/backstage/images',
        name: 'image',
        accept: 'image/*',
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        type: 'Games'
      },
      dropList: {},
      dialog: {
        status: false,
        title: ''
      },
      dialogImageStatus: false,
      dialogImageUrl: '',
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
          type: 'search'
        },
        {
          type: 'add'
        }
      ]
    }
  },
  methods: {
    // 分页
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initPromotionTypeSetting(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initPromotionTypeSetting(this.formInline)
        return
      }
      this.initPromotionTypeSetting(value)
    },
    initPromotionTypeSetting (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstagePromotionTypeSettingListHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 文件改动
    handleWebSuccess (response, file, fileList) {
      this.form.web_img_id = response.id
    },
    // 文件改动
    handleMobileSuccess (response, file, fileList) {
      this.form.mobile_img_id = response.id
    },
    // 更新 添加
    doStoreOrUpdate () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if (this.promotionTypeSettingID) {
          backstagePromotionTypeSettingUpdateHttp(this.promotionTypeSettingID, this.form).then(res => {
            this.$message.success('success')
            this.dialog.status = false
            this.initPromotionTypeSetting(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        } else {
          backstagePromotionTypeSettingStoreHttp(this.form).then(res => {
            this.$message.success('success')
            this.dialog.status = false
            this.initPromotionTypeSetting(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        }
      }).catch(() => {
      })
    },
    // 下拉菜单
    getDropList () {
      backstagePromotionTypeSettingDropListHttp().then(res => {
        this.dropList = res
        filter.formValueListFilter(this.formInlineConfig, res, ['currency'])
      }).catch((error) => {
        console.log(error)
      })
    },
    // 添加数组
    addArr () {
      this.form.languages.push({
        currency: '',
        title: '',
        description: ''
      })
    },
    // 删除数组
    deleteArr (key) {
      this.form.languages.splice(key, 1)
    },
    // 添加按钮
    onAdd () {
      this.clearForm()
      this.promotionTypeSettingID = ''
      this.dialog.status = true
      this.dialog.title = 'Add'
    },
    clearForm () {
      this.$set(this.form, 'code', '')
      this.$set(this.form, 'web_img_id', '')
      this.$set(this.form, 'mobile_img_id', '')
      this.$set(this.form, 'status', '')
      this.$set(this.form, 'sort', '')
      this.$set(this.form, 'languages', [])
      this.$set(this.form, 'currencies', [])
    }
  },
  created () {
    this.initPromotionTypeSetting(this.formInline)
    this.getDropList()
  }
}
</script>

<style lang="scss">
.PromotionSetting {
  .el-form .el-form-item {
    margin-bottom: .2rem !important;
  }
}
</style>
