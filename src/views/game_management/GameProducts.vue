<template>
  <div class="GameProducts">
    <form-inline-comp
      :formInlineConfig="formInlineConfig"
      @onSubmit = callbacks
    />
    <table-comp
      :resInformation="resInformation"
      :table-config="tableConfig"
      @handleSizePageChange = callbacks
    />
    <el-dialog
      title="Update Game Product"
      :visible.sync="updateDialogStatus"
      width="1200px"
      @close="close"
    >
      <el-form
        ref="form"
        class="form_inline_comp"
        :model="form"
        label-width="150px"
        inline
      >
        <el-form-item label="Code">
          <el-input
            v-model="form.code"
            style="max-width: 220px"
            readonly
          />
        </el-form-item>
        <el-form-item label="Close Bonus">
          <el-switch
            v-model="form.is_close_bonus"
            active-color="#13ce66"
            :active-value=1
            :inactive-value=0
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item label="Platform Code">
          <el-input
            v-model="form.platform_code"
            style="max-width: 220px"
            readonly
          />
        </el-form-item>
        <el-form-item label="Close Cash Back">
          <el-switch
            v-model="form.is_close_cash_back"
            active-color="#13ce66"
            :active-value=1
            :inactive-value=0
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item label="Devices">
          <el-select v-model="form.devices" multiple placeholder="Please select device">
            <el-option
              v-for="item in dropList.device"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Calculate Reward">
          <el-switch
            v-model="form.is_calculate_reward"
            active-color="#13ce66"
            :active-value=1
            :inactive-value=0
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item label="Type">
          <el-input
            v-model="form.type"
            style="max-width: 220px"
            readonly
          />
        </el-form-item>
        <el-form-item label="Calculate Cash Back">
          <el-switch
            v-model="form.is_calculate_cash_back"
            active-color="#13ce66"
            :active-value=1
            :inactive-value=0
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item label="Sort">
          <el-input
            v-model="form.sort"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item label="Calculate Rebate">
          <el-switch
            v-model="form.is_calculate_rebate"
            active-color="#13ce66"
            :active-value=1
            :inactive-value=0
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="form.status" placeholder="Status">
            <el-option
              v-for="item in dropList.status"
              :label="item.value"
              :key="item.key"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Can try">
          <el-switch
            v-model="form.is_can_try"
            active-color="#13ce66"
            :active-value=1
            :inactive-value=0
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item label="Currencies">
          <el-select v-model="form.currencies" multiple placeholder="Please select Currencies">
            <el-option
              v-for="item in dropList.currency"
              :key="item.value"
              :label="item.value"
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
              <el-form-item label="Name">
                <el-input
                  v-model="item.name"
                  placeholder="Name"
                />
              </el-form-item>
              <el-form-item label="Description">
                <el-input
                  v-model="item.description"
                  placeholder="Description"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="deleteArr">Delete</el-button>
              </el-form-item>
              <el-form-item label="Content">
                <quill-editor
                  v-model="item.content"
                  ref="myQuillEditor"
                  :options="{}">
                </quill-editor>
              </el-form-item>
              <el-form-item style="width: 350px" v-for="item1 in imgArray" :key="item1.key" :label="GoString(item1.key)">
                <file-upload
                  :fileConfig="{
                    url: '/api/backstage/images',
                    name: 'image',
                    accept: 'image/*',
                    fileHeaders: fileHeaders,
                    fileList: item[item1.value] ? [{name: GoString(item1.key), url: item[item1.value]}] : [],
                    limit: 1,
                    type: 'Games'
                  }"
                  :item="item"
                  :key1="item1.key"
                  @Success="handleWebSuccess"
                ></file-upload>
              </el-form-item>
            </el-form>
            <div class="clear"></div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="updateDialogStatus = false">Close</el-button>
        <el-button type="primary" @click="updateGameProduct">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import FormInlineComp from '../../components/form/formInlineComp'
  import filter from '../../util/filter'
  import {
    backstageGameManagementGameProductsDropListHttp,
    backstageGameManagementGameProductsHttp,
    backstageGameManagementGameProductUpdateHttp
  } from '../../api/game_management/GameProducts/initAxios'
  import TableComp from '../../components/table/tableComp'
  import resourcesList from '../../util/static'
  import FileUpload from '../../components/file/fileUpload'
  export default {
    name: 'GameProducts',
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
            type: 'input',
            label: 'Unique code',
            formValue: 'code',
            placeholder: 'Unique code',
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
            type: 'select',
            label: 'Type',
            formValue: 'type',
            placeholder: 'Select A Type',
            clearable: true,
            value: '',
            list: ''
          },
          {
            type: 'search'
          }
        ],
        fileHeaders: resourcesList.fileHeaders,
        formInline: {
          per_page: 50,
          page: 1,
          code: '',
          platform_code: '',
          type: '',
          status: ''
        },
        tableConfig: {
          border: true,
          loading: true,
          tableColumn: [
            {
              prop: 'code',
              label: 'Code',
              render: (h, params) => {
                let self = this
                return h('div', [
                  h('el-Link', {
                    props: {
                      size: 'small',
                      type: 'primary'
                    },
                    on: {
                      click: () => {
                        self.updateDialogStatus = true
                        self.form.currencies = params.item.currencies
                        self.form.languages = params.item.languages
                        params.item.devices.forEach((item, key) => {
                          self.form.devices[key] = Number(item)
                        })
                        self.form.is_close_bonus = Number(params.item.is_close_bonus)
                        self.form.is_close_cash_back = Number(params.item.is_close_cash_back)
                        self.form.is_calculate_reward = Number(params.item.is_calculate_reward)
                        self.form.is_calculate_cash_back = Number(params.item.is_calculate_cash_back)
                        self.form.is_calculate_rebate = Number(params.item.is_calculate_rebate)
                        self.form.sort = params.item.sort
                        self.form.is_can_try = Number(params.item.is_can_try)
                        self.form.status = params.item.status
                        self.form.id = params.item.id
                        self.form.platform_code = params.item.platform_code
                        self.form.code = params.item.code
                        self.form.type = params.item.type
                        console.log(self.form)
                      }
                    }
                  }, params.item.code)
                ])
              }
            },
            {
              prop: 'platform_code',
              label: 'Platform Code'
            },
            {
              prop: 'display_type',
              label: 'Type'
            },
            {
              prop: 'display_devices',
              label: 'Devices',
              render: (h, params) => {
                return h('span', {}, params.item.display_devices.join(','))
              }
            },
            {
              prop: 'icon',
              label: 'Icon',
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
            },
            {
              prop: 'display_is_close_bonus',
              label: 'Close Bonus'
            },
            {
              prop: 'display_is_close_cash_back',
              label: 'Close Cash Back'
            },
            {
              prop: 'display_is_calculate_reward',
              label: 'Calculate reward'
            },
            {
              prop: 'display_is_calculate_cash_back',
              label: 'Calculate Cash Back'
            },
            {
              prop: 'display_is_calculate_rebate',
              label: 'Calculate Rebate'
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
        updateDialogStatus: false,
        dropList: {},
        form: {
          currencies: [],
          languages: [],
          devices: [],
          is_close_bonus: 1,
          is_can_try: 1,
          is_close_cash_back: 1,
          is_calculate_reward: 1,
          is_calculate_cash_back: 1,
          is_calculate_rebate: 1,
          sort: 0,
          status: 1,
          id: ''
        },
        imgObject: {},
        imgArray: [],
        uploadConfigWebOne: {
          url: '/api/backstage/images',
          name: 'image',
          accept: 'image/*',
          fileHeaders: resourcesList.fileHeaders,
          fileList: [],
          type: 'Games',
          limit: 1
        },
        uploadConfigWebTwo: {
          url: '/api/backstage/images',
          name: 'image',
          accept: 'image/*',
          fileHeaders: resourcesList.fileHeaders,
          fileList: [],
          type: 'Games',
          limit: 1
        },
        uploadConfigMobile: {
          url: '/api/backstage/images',
          name: 'image',
          accept: 'image/*',
          fileHeaders: resourcesList.fileHeaders,
          fileList: [],
          type: 'Games',
          limit: 1
        }
      }
    },
    methods: {
      GoString(key) {
        let str = ''
        key.split('_').map(item => {
          if (item !== 'id' && item !== 'path') {
            str = str + ' ' + item.substring(0, 1).toUpperCase() + item.substring(1)
          }
        })
        return str
      },
      // 文件改动
      handleWebSuccess (response, file, item, key1) {
        item[key1] = response.id
        console.log(item);
      },
      // 窗口关闭回调
      close () {
        this.uploadConfigWebOne.fileList = []
        this.uploadConfigWebTwo.fileList = []
        this.uploadConfigMobile.fileList = []
      },
      // 分页回调
      callbacks (value) {
        if (value.hasOwnProperty('page')) {
          this.formInline.page = value.page
          this.initGameProducts(this.formInline)
          return
        } else if (value.hasOwnProperty('per_page')) {
          this.formInline.per_page = value.per_page
          this.initGameProducts(this.formInline)
          return
        }
        this.initGameProducts(value)
      },
      // 数据初始化
      initGameProducts (formInline) {
        this.tableConfig.loading = true
        if (!formInline) {
          return this.$message.error('There is no request')
        }
        if (!formInline.include || !formInline.per_page || !formInline.page) {
          formInline.per_page = this.formInline.per_page
          formInline.page = this.formInline.page
        }
        this.formInline = formInline
        var datalist = filter.formInlineFilter(formInline)
        backstageGameManagementGameProductsHttp(datalist).then(res => {
          this.resInformation = res
          this.tableConfig.loading = false
        }).catch((error) => {
          this.tableConfig.loading = false
          console.log(error)
        })
      },
      // Drop List
      gameProductsDropListHttp () {
        let imgObject = {}
        backstageGameManagementGameProductsDropListHttp().then(res => {
          res.img.map(item => {
            imgObject[item.key] = ''
          })
          this.imgObject = imgObject
          this.imgArray = res.img
          filter.formValueListFilter(this.formInlineConfig, res, ['status', 'platform_code', 'type', 'device'])
          this.dropList = res
        }).catch((error) => {
          console.log(error)
        })
      },
      // 添加数组
      addArr () {
        this.gameID = ''
        this.form.languages.push({
          currency: '',
          name: '',
          description: '',
          content: ''
        });
      },
      // 删除数组
      deleteArr (key) {
        this.form.languages.splice(key, 1)
      },
      // 更新
      updateGameProduct () {
        this.$confirm('Are you sure?', 'Prompt', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          if (!filter.validationFilterByEcho(this.form, ['currencies', 'devices'])) {
            return
          }
          let objectPath = Object.assign({}, this.form)
          objectPath.languages.map(item => {
            console.log(item)
          })
          backstageGameManagementGameProductUpdateHttp(this.form.id, this.form).then(res => {
            this.$message.success('success')
            this.updateDialogStatus = false
            this.initGameProducts(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        }).catch(() => {
        })
      },
      handleMobileSuccess (response, file, fileList) {
        this.form.mobile_img_id = response.id
      }
    },
    created () {
      this.initGameProducts(this.formInline)
      this.gameProductsDropListHttp()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .GameProducts{
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
      margin-bottom: .2rem;
    }
    .el-dialog {
      margin-top: 8vh !important;
    }
    .form_inline_comp {
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
