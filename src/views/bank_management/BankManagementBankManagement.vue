<style lang="scss" scoped>
  .title {
    text-align: right;
    float: left;
    font-size: 14px;
    width: 155px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
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
<style lang="scss" type="text/scss">
  .form-inline-comp-width100 .el-form-item.el-form-item--small{
    width: 100%;
    text-align: center;
  }
</style>
<template>
  <div class="bankManagement">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    >
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.status"
    >
      <el-form
        ref="form"
        :model="form"
        class="form_inline_comp"
        label-width="150px"
      >
        <el-form-item label="Currency">
          <el-select v-model="form.currency" placeholder="Please select Currencies">
            <el-option
              v-for="item in dropList.currency"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Bank Name">
          <el-input
            v-model="form.name"
            style="max-width: 220px"
            placeholder="Bank Name"
          />
        </el-form-item>
        <el-form-item label="Bank Code">
          <el-input
            v-model="form.code"
            style="max-width: 220px"
            placeholder="Bank Code"
          />
        </el-form-item>
        <el-form-item label="Upload Bank Img">
          <file-upload
            :fileConfig="uploadConfig"
            @Success="handleSuccess"
          ></file-upload>
        </el-form-item>
        <el-form-item label="Upload Icon">
          <file-upload
            :fileConfig="uploadConfigIcon"
            @Success="handleSuccessIcon"
          ></file-upload>
        </el-form-item>
        <el-form-item style="width: 100%" label="Is Auto Deposit">
          <el-select v-model="form.is_auto_deposit" placeholder="Is Auto Deposit">
            <el-option
              v-for="item in dropList.is_auto_deposit"
              :label="item.value"
              :key="item.key"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item style="width: 100%" label="Status">
          <el-select v-model="form.status" placeholder="Status">
            <el-option
              v-for="item in dropList.status"
              :label="item.value"
              :key="item.key"
              :value="item.key"
            />
          </el-select>
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
              label-width="170px"
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
              <el-form-item label="Front name">
                <el-input
                  v-model="item.front_name"
                  placeholder="Front name"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="deleteArr">Delete</el-button>
              </el-form-item>
              <el-form-item label="Maintenance Schedules">
                <el-input
                  type="textarea"
                  style="width: 350px"
                  v-model="item.maintenance_schedules"
                  placeholder="Maintenance Schedules"
                />
                <span>(Separate with;)</span>
              </el-form-item>

              <hr />
            </el-form>
            <div class="clear"></div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doStoreOrUpdate">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  backstageBanksHttp,
  postBackstageBanksHttp,
  patchBackstageBanksHttp,
  backstageDropListBankHttp
} from '../../api/compony_account_management/initAxios'
import formInlineComp from '../../components/form/formInlineComp'
import fileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import element from '../../config/element'
export default {
  name: 'bankManagement',
  data () {
    return {
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'currency',
          label: 'Currency',
          width: '80'
        }, {
          prop: 'name',
          label: 'Bank Name',
          width: '160',
          render: (h, params) => {
            return h('el-link', {
              props: {
                type: 'primary'
              },
              style: {
              },
              on: {
                click: () => {
                  if (params.item.image) {
                    this.uploadConfig.fileList = [{name: 'Image', url: params.item.image}]
                  }
                  if (params.item.icon) {
                    this.uploadConfigIcon.fileList = [{name: 'Icon', url: params.item.icon}]
                  }
                  this.bankID = params.item.id
                  this.form.currency = params.item.currency
                  this.form.is_auto_deposit = params.item.is_auto_deposit
                  this.form.name = params.item.name
                  this.form.code = params.item.code
                  this.form.min_balance = params.item.min_balance
                  this.form.daily_limit = params.item.daily_limit
                  this.form.annual_limit = params.item.annual_limit
                  this.form.status = params.item.status
                  this.form.languages = params.item.languages || []
                  this.dialog.title = 'Update'
                  this.dialog.status = true
                }
              }
            }, params.item.name)
          }
        }, {
          prop: 'code',
          label: 'Bank Code',
          width: '80'
        }, {
          prop: 'min_balance',
          label: 'Min Balance',
          width: '100'
        }, {
          prop: 'max_balance',
          label: 'Max Balance',
          width: '100'
        }, {
          prop: 'daily_limit',
          label: 'Daily Limit',
          width: '100'
        }, {
          prop: 'annual_limit',
          label: 'Annual Limit',
          width: '100'
        }, {
          prop: 'display_status',
          label: 'Status',
          width: '100'
        }, {
          prop: 'admin_name',
          label: 'Last Edited By',
          width: '100'
        }, {
          prop: '',
          label: 'Image',
          width: '100',
          render: (h, params) => {
            if (!params.item.image) {
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
                  src: params.item.image
                },
                on: {
                  click: () => {
                    this.$msgbox({
                      title: 'img',
                      message: h('div', null, [
                        h('el-image', {
                          props: {
                            src: params.item.image
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
        }, {
          prop: '',
          label: 'Icon',
          width: '100',
          render: (h, params) => {
            if (!params.item.icon) {
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
                  src: params.item.icon
                },
                on: {
                  click: () => {
                    this.$msgbox({
                      title: 'img',
                      message: h('div', null, [
                        h('el-image', {
                          props: {
                            src: params.item.icon
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
          type: 'input',
          label: 'Bank Name',
          formValue: 'name',
          placeholder: 'Bank Name',
          value: ''
        },
        {
          type: 'input',
          label: 'Bank Code',
          formValue: 'code',
          placeholder: 'Bank Code',
          value: ''
        },
        {
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      formInline: {
        include: 'images',
        currency: '',
        name: '',
        code: '',
        per_page: 50,
        page: 1
      },
      formConfig: [
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
          label: 'Bank Name',
          formValue: 'name',
          placeholder: 'Bank Name',
          value: ''
        },
        {
          type: 'input',
          label: 'Bank Code',
          formValue: 'code',
          placeholder: 'Bank Code',
          value: ''
        },
        {
          type: 'input',
          label: 'Min Balance',
          formValue: 'min_balance',
          placeholder: 'Min Balance',
          value: ''
        },
        {
          type: 'input',
          label: 'Daily Limit',
          formValue: 'daily_limit',
          placeholder: 'Daily Limit',
          value: ''
        },
        {
          type: 'input',
          label: 'Annual Limit',
          formValue: 'annual_limit',
          placeholder: 'Annual Limit',
          value: ''
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
          type: 'Submit'
        }
      ],
      image: '',
      dialog: {
        title: '',
        status: false
      },
      form: {
        currency: '',
        name: '',
        languages: [],
        code: '',
        min_balance: '',
        daily_limit: '',
        annual_limit: '',
        image: '',
        is_auto_deposit: '',
        icon: '',
        status: ''
      },
      dropList: {},
      bankID: '',
      uploadConfig: {
        url: '/api/backstage/images',
        name: 'image',
        accept: 'image/*',
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        limit: 1,
        type: 'Games'
      },
      uploadConfigIcon: {
        url: '/api/backstage/images',
        name: 'image',
        accept: 'image/*',
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        limit: 1,
        type: 'Games'
      }
    }
  },
  created () {
    this.DropListHttp()
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp, fileUpload
  },
  methods: {
    DropListHttp () {
      backstageDropListBankHttp().then(res => {
        filter.formValueListFilter(this.formConfig, res, ['status', 'currency'])
        filter.formValueListFilter(this.formInlineConfig, res, ['currency'])
        this.dropList = res
      }).catch(() => {
      })
    },
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.include = 'images'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageBanksHttp(datalist).then(res => {
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
    // 添加数组
    addArr () {
      this.form.languages.push({
        language: '',
        front_name: '',
        maintenance_schedules: ''
      })
    },
    // 删除数组
    deleteArr (key) {
      this.form.languages.splice(key, 1)
    },
    // 添加按钮
    onAdd () {
      this.bankID = ''
      this.uploadConfig.fileList = []
      this.uploadConfigIcon.fileList = []
      this.dialog.status = true
      this.dialog.title = 'Add'
      this.clearForm()
    },
    // 清空数据
    clearForm () {
      this.form = {
        currency: '',
        name: '',
        languages: [],
        code: '',
        min_balance: '',
        daily_limit: '',
        annual_limit: '',
        image: '',
        icon: '',
        status: ''
      }
    },
    // 文件改动
    handleSuccess (response, file, fileList) {
      this.form.image = response.id
    },
    handleSuccessIcon (response, file, fileList) {
      this.form.icon = response.id
    },
    // 添加和更新操作
    doStoreOrUpdate () {
      let self = this
      self.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if (self.bankID) {
          patchBackstageBanksHttp(this.bankID, self.form).then(res => {
            element.message({
              type: 'success',
              message: 'success'
            })
            self.dialog.status = false
            this.initHttp(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        } else {
          if (!filter.validationFilterByEcho(self.form, ['name', 'code', 'languages', 'currency'], [])) {
            return
          }
          postBackstageBanksHttp(self.form).then(res => {
            element.message({
              type: 'success',
              message: 'success'
            })
            self.dialog.status = false
            self.initHttp(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        }
      }).catch(() => {
      })
    }
  }
}
</script>
