<template>
  <div class="Games">
    <form-inline-comp
      :formInlineConfig="formInlineConfig"
      @onSubmit = callbacks
      @onAdd = onAdd
    >
    </form-inline-comp>
    <table-comp
      :resInformation="resInformation"
      :table-config="tableConfig"
      @handleSizePageChange = callbacks
    />
    <el-dialog
      :title="dialogTitle"
      width="1200px"
      :visible.sync="dialogStatus"
      @close="close"
    >
      <el-form
        ref="form"
        :model="form"
        class="form_inline_comp"
        label-width="200px"
        inline
      >
        <el-form-item label="Code">
          <el-input
            v-model="form.code"
            style="max-width: 220px"
            :disabled="disable"
            placeholder="Code"
          />
        </el-form-item>
        <el-form-item label="Hot">
          <el-switch
            v-model="form.is_hot"
            :active-value=1
            :inactive-value=0
          />
        </el-form-item>
        <el-form-item label="Platform Code">
          <el-select
            v-model="form.platform_code"
            placeholder="Platform Code"
            :disabled="disable"
          >
            <el-option
              v-for="item in dropList.platform_code"
              :label="item.value"
              :key="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="New">
          <el-switch
            v-model="form.is_new"
            :active-value=1
            :inactive-value=0
          />
        </el-form-item>
        <el-form-item label="Product Code">
          <el-select
            v-model="form.product_code"
            placeholder="Product Code"
            :disabled="disable"
          >
            <el-option
              v-for="item in dropList.product_code"
              :label="item.value"
              :key="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Close Bonus">
          <el-switch
            v-model="form.is_close_bonus"
            :active-value=1
            :inactive-value=0
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
        <el-form-item label="Close Cash Back">
          <el-switch
            v-model="form.is_close_cash_back"
            :active-value=1
            :inactive-value=0
          />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
            v-model="form.remark"
            style="max-width: 220px"
            placeholder="Remark"
          />
        </el-form-item>
        <el-form-item label="Calculate Reward">
          <el-switch
            v-model="form.is_calculate_reward"
            :active-value=1
            :inactive-value=0
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
        <el-form-item label="Calculate Cash Back">
          <el-switch
            v-model="form.is_calculate_cash_back"
            :active-value=1
            :inactive-value=0
          />
        </el-form-item>
        <el-form-item label="Sort">
          <el-input
            v-model="form.sort"
            style="max-width: 220px"
            placeholder="Sort"
          />
        </el-form-item>
        <el-form-item label="Is Soon">
          <el-switch
            v-model="form.is_soon"
            :active-value=1
            :inactive-value=0
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
        <el-form-item label="Calculate Rebate">
          <el-switch
            v-model="form.is_calculate_rebate"
            :active-value=1
            :inactive-value=0
          />
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="Is PC Iframe">
          <el-switch
            v-model="form.is_iframe"
            :active-value=1
            :inactive-value=0
          />
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="Is Mobile Iframe">
          <el-switch
            v-model="form.is_mobile_iframe"
            :active-value=1
            :inactive-value=0
          />
        </el-form-item>
        <el-form-item></el-form-item>
        <el-form-item label="Effective Bet">
          <el-switch
            v-model="form.is_effective_bet"
            :active-value=1
            :inactive-value=0
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
              label-width="145px"
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
        <el-button type="danger" @click="dialogStatus = false">Close</el-button>
        <el-button type="primary" @click="doStoreOrUpdate">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import FormInlineComp from '../../components/form/formInlineComp'
  import filter from '../../util/filter'
  import {
    backstageGameManagementGameDeleteHttp,
    backstageGameManagementGameDropListHttp,
    backstageGameManagementGamesHttp,
    backstageGameManagementGameStoreHttp,
    backstageGameManagementGameUpdateHttp,
    backstageGameManagementAuditHttp
  } from '../../api/game_management/Games/initAxios'
  import TableComp from '../../components/table/tableComp'
  import FileUpload from '../../components/file/fileUpload'
  import resourcesList from '../../util/static'
  export default {
    name: 'Games',
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
            type: 'select',
            label: 'Product Code',
            formValue: 'product_code',
            placeholder: 'Select A Product Code',
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
          },
          {
            type: 'add'
          }
        ],
        pagination: {
          currency: '',
          per_page: 50,
          total: 20,
          page: 1
        },
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
              fixWidth: '133px',
              render: (h, params) => {
                return h('div', [
                  h('el-Link', {
                    props: {
                      size: 'small',
                      type: 'primary'
                    },
                    on: {
                      click: () => {
                        this.onUpdate(params.item)
                      }
                    }
                  }, params.item.code)
                ])
              }
            },
            {
              prop: 'back_name',
              label: 'Name'
            },
            {
              prop: 'platform_code',
              label: 'Platform Code'
            },
            {
              prop: 'product_code',
              label: 'Product Code'
            },
            {
              prop: 'display_type',
              label: 'Type'
            },
            {
              prop: 'display_type',
              label: 'Devices',
              render: (h, params) => {
                return h('span', {}, params.item.display_devices.join(','))
              }
            },
            {
              prop: 'display_is_hot',
              fixWidth: '46px',
              label: 'Hot'
            },
            {
              prop: 'display_is_new',
              fixWidth: '46px',
              label: 'New'
            },
            {
              prop: 'display_is_soon',
              label: 'Is Soon'
            },
            {
              prop: 'display_is_close_bonus',
              fixWidth: '90px',
              label: 'Close Bonus'
            },
            {
              prop: 'display_is_close_cash_back',
              fixWidth: '115px',
              label: 'Close Cash Back'
            },
            {
              prop: 'display_is_calculate_reward',
              fixWidth: '118px',
              label: 'Calculate reward'
            },
            {
              prop: 'display_is_calculate_cash_back',
              fixWidth: '135px',
              label: 'Calculate Cash Back'
            },
            {
              prop: 'display_is_calculate_rebate',
              fixWidth: '113px',
              label: 'Calculate Rebate'
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
            // {
            //   prop: 'remark',
            //   label: 'Remark'
            // },
            {
              prop: 'last_save_admin',
              label: 'Last edited',
              width: '70',
              render: (h, params) => {
                var self = this
                return h('el-popover', {
                  props: {
                    placement: 'left',
                    width: '1220',
                    trigger: 'click'
                  }
                }, [
                  h('div', {}, 'Edit History' ),
                  h('el-table', {
                    props: {
                      data: self.gridData
                    }
                  }, [
                    h('el-table-column', {
                      props: {
                        width: '160',
                        property: 'created_at',
                        label: 'Date/Time'
                      }
                    }),
                    h('el-table-column', {
                      props: {
                        width: '60',
                        property: 'name',
                        label: 'Admin'
                      }
                    }),
                    h('el-table-column', {
                      props: {
                        width: '500',
                        property: 'old_value',
                        label: 'Previous Value'
                      }
                    }),
                    h('el-table-column', {
                      props: {
                        width: '500',
                        property: 'new_value',
                        label: 'New Value'
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
                        backstageGameManagementAuditHttp(params.item.id, {page: val, per_page: self.pagination.per_page}).then(res => {
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
                        backstageGameManagementAuditHttp(params.item.id, {page: self.pagination.page, per_page: self.pagination.per_page}).then(res => {
                          self.gridData = res.data
                          self.pagination.total = res.meta.pagination.total
                        }).catch((error) => {
                          console.log(error)
                        })
                      }
                    }
                  }, params.item.last_save_admin)
                ])
              }
            },
            {
              prop: '',
              label: 'Delete',
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
                          this.doDelete(params.item.id)
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
        gameAddFormInlineConfig: [
          {
            type: 'input',
            label: 'Platform Code',
            formValue: 'platform_code',
            placeholder: 'Platform Code',
            value: ''
          },
          {
            type: 'input',
            label: 'Product Code',
            formValue: 'product_code',
            placeholder: 'Product Code',
            value: ''
          },
          {
            type: 'input',
            label: 'Remark',
            formValue: 'remark',
            placeholder: 'Remark',
            value: ''
          },
          {
            type: 'input',
            label: 'Sort',
            formValue: 'sort',
            placeholder: 'Sort',
            value: ''
          },
          {
            type: 'select',
            label: 'Type',
            formValue: 'type',
            placeholder: 'Select A Type',
            value: '',
            list: ''
          },
          {
            type: 'input',
            label: 'Name',
            formValue: 'name',
            placeholder: 'Name',
            value: ''
          },
          {
            type: 'input',
            label: 'Code',
            formValue: 'code',
            placeholder: 'Code',
            value: ''
          },
          {
            type: 'input',
            label: 'Web Img Path',
            formValue: 'web_img_path',
            placeholder: 'Web Img Path',
            value: ''
          },
          {
            type: 'input',
            label: 'Mobile Img Path',
            formValue: 'mobile_img_path',
            placeholder: 'Mobile Img Path',
            value: ''
          },
          {
            type: 'switch',
            label: 'Web Show',
            formValue: 'is_web_show',
            placeholder: 'Web Show',
            value: true
          },
          {
            type: 'switch',
            label: 'Mobile Show',
            formValue: 'is_mobile_show',
            placeholder: 'Mobile Show',
            value: true
          },
          {
            type: 'switch',
            label: 'New',
            formValue: 'is_new',
            placeholder: 'New',
            value: true
          },
          {
            type: 'switch',
            label: 'Close Bonus',
            formValue: 'is_close_bonus',
            placeholder: 'Close Bonus',
            value: true
          },
          {
            type: 'switch',
            label: 'Close Cash Back',
            formValue: 'is_close_cash_back',
            placeholder: 'Close Cash Back',
            value: true
          },
          {
            type: 'switch',
            label: 'Calculate reward',
            formValue: 'is_calculate_reward',
            placeholder: 'Calculate reward',
            value: true
          },
          {
            type: 'switch',
            label: 'Calculate Cash Back',
            formValue: 'is_calculate_cash_back',
            placeholder: 'Calculate Cash Back',
            value: true
          },
          {
            type: 'switch',
            label: 'Calculate Rebate',
            formValue: 'is_calculate_rebate',
            placeholder: 'Calculate Rebate',
            value: true
          },
          {
            type: 'switch',
            label: 'Hot',
            formValue: 'is_hot',
            placeholder: 'Hot',
            value: true
          },
          {
            type: 'switch',
            label: 'Status',
            formValue: 'status',
            placeholder: 'Status',
            value: true
          },
          {
            type: 'Submit'
          }
        ],
        dialogTitle: '',
        dialogStatus: false,
        gameID: '',
        disable: false,
        form: {
          platform_code: '',
          product_code: '',
          code: '',
          devices: [],
          is_new: 1,
          is_soon: 1,
          is_hot: 1,
          is_iframe: 1,
          is_mobile_iframe: 1,
          is_close_bonus: 1,
          is_close_cash_back: 1,
          is_calculate_reward: 1,
          is_calculate_cash_back: 1,
          is_calculate_rebate: 1,
          is_effective_bet: 1,
          remark: '',
          status: 1,
          sort: 0,
          currencies: [],
          languages: []
        },
        is_add: false,
        dropList: {},
        imgObject: {},
        imgArray: [],
        fileHeaders: resourcesList.fileHeaders,
        uploadConfig: [
          {
            url: '/api/backstage/images',
            name: 'image',
            accept: 'image/*',
            fileHeaders: resourcesList.fileHeaders,
            fileList: [],
            limit: 1,
            type: 'Games'
          }
        ]
      }
    },
    methods: {
      GoString (key) {
        let str = ''
        key.split('_').map(item => {
          if (item !== 'id' && item !== 'path') {
            str = str + ' ' + item.substring(0, 1).toUpperCase() + item.substring(1)
          }
        })
        return str
      },
      // 窗口关闭回调
      close () {
      },
      // 分页回调
      callbacks (value) {
        if (value.hasOwnProperty('page')) {
          this.formInline.page = value.page
          this.initGames(this.formInline)
          return
        } else if (value.hasOwnProperty('per_page')) {
          this.formInline.per_page = value.per_page
          this.initGames(this.formInline)
          return
        }
        this.initGames(value)
      },
      // 数据初始化
      initGames (formInline) {
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
        backstageGameManagementGamesHttp(datalist).then(res => {
          this.resInformation = res
          this.tableConfig.loading = false
        }).catch((error) => {
          this.tableConfig.loading = false
          console.log(error)
        })
      },
      // 添加数组
      addArr () {
        let object = Object.assign({
          language: '',
          name: '',
          description: '',
          content: ''
        }, this.imgObject)
        this.form.languages.push(object)
        console.log(this.imgObject)
      },
      // 删除数组
      deleteArr (key) {
        this.form.languages.splice(key, 1)
      },
      onAdd () {
        this.disable = false
        this.gameID = ''
        this.dialogStatus = true
        this.dialogTitle = 'Add Game'
        this.clearForm()
      },
      // 清空数据
      clearForm () {
        this.form = {
          platform_code: '',
          product_code: '',
          code: '',
          small_img_path: '',
          devices: [],
          web_img_path: '',
          mobile_img_path: '',
          is_new: 1,
          is_hot: 1,
          is_soon: 1,
          is_iframe: 1,
          is_close_bonus: 1,
          is_close_cash_back: 1,
          is_calculate_reward: 1,
          is_calculate_cash_back: 1,
          is_calculate_rebate: 1,
          is_effective_bet: 1,
          remark: '',
          status: 1,
          sort: 0,
          currencies: [],
          languages: []
        }
      },
      // drop list
      gameDropList () {
        let imgObject = {}
        backstageGameManagementGameDropListHttp().then(res => {

          res.img.map(item => {
            imgObject[item.key] = ''
          })
          this.imgObject = imgObject
          this.imgArray = res.img
          filter.formValueListFilter(this.formInlineConfig, res, ['platform_code', 'product_code', 'type', 'device', 'status'])
          this.dropList = res
        }).catch((error) => {
          console.log(error)
        })
      },
      // 更新
      onUpdate (value) {
        this.gameID = value.id
        this.form = filter.assignmentObject(this.form, value)
        this.gameID = value.id
        this.disable = true
        this.dialogStatus = true
        this.is_add = false
        this.dialogTitle = 'Update Game'
      },
      // 添加和更新操作
      doStoreOrUpdate () {
        console.log(this.form)
        let self = this
        self.$confirm('Are you sure?', 'Prompt', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          if (!filter.validationFilterByEcho(self.form, [], ['droplist_img_path', 'web_img_path', 'mobile_img_path', 'small_img_path', 'languages', 'remark', 'small_img_id', 'web_img_id', 'mobile_img_id', 'droplist_img_path_id'])) {
            return
          }
          if (self.gameID) {
            let form = {
              devices: self.form.devices,
              is_new: self.form.is_new,
              is_hot: self.form.is_hot,
              is_soon: self.form.is_soon,
              languages: self.form.languages,
              is_iframe: self.form.is_iframe,
              is_close_bonus: self.form.is_close_bonus,
              is_close_cash_back: self.form.is_close_cash_back,
              is_calculate_reward: self.form.is_calculate_reward,
              is_calculate_cash_back: self.form.is_calculate_cash_back,
              is_calculate_rebate: self.form.is_calculate_rebate,
              is_mobile_iframe: self.form.is_mobile_iframe,
              remark: self.form.remark,
              status: self.form.status,
              sort: self.form.sort,
              is_effective_bet: self.form.is_effective_bet,
              currencies: self.form.currencies,
            }
            backstageGameManagementGameUpdateHttp(self.gameID, form).then(res => {
              self.$message.success('success')
              self.dialogStatus = false
              self.initGames(self.formInline)
            }).catch((error) => {
              console.log(error)
            })
          } else {
            backstageGameManagementGameStoreHttp(self.form).then(res => {
              self.$message.success('success')
              self.dialogStatus = false
              self.initGames(self.formInline)
            }).catch((error) => {
              console.log(error)
            })
          }
        }).catch(() => {
        })
      },
      // 删除
      doDelete (id) {
        this.$confirm('Are you sure?', 'Prompt', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          backstageGameManagementGameDeleteHttp(id).then(res => {
            this.$message.success('success')
            this.initGames(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        })
      },
      // 文件改动
      handleWebSuccess (response, file, item, key1) {
        item[key1] = response.id
      },
      // 文件改动
      handleMobileSuccess (response, file, fileList) {
        this.form.mobile_img_id = response.id
      },
      // 文件改动
      handleSmallSuccess (response, file, fileList) {
        this.form.small_img_id = response.id
      },
      handleDroplistSuccess (response, file, fileList) {
        this.form.droplist_img_path_id = response.id
      }
    },
    created () {
      this.initGames(this.formInline)
      this.gameDropList()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .Games{
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
      margin-bottom: .2rem;
    }
    .el-dialog {
      margin-top: 8vh !important;
    }
    .form_inline_comp{
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
            width: 830px !important;
            .ql-editor {
              height: 10rem;
            }
          }
        }
      }
    }
  }
</style>
