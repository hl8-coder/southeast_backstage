<style lang="scss" scoped>
  .FlexRowFlexStartFlexStart{
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
<style lang="scss">
  .GamePlatforms {
    .form_inline_comp{
      .el-form-item {
        width: 45%;
      }
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
    .border {
      padding: 5px 0;
      border: 1px solid #eee;
      .el-form-item {
        width: auto;
      }
    }
  }
</style>

<template>
  <div class="GamePlatforms">
    <form-inline-comp
      :formInlineConfig="formInlineConfig"
      @onSubmit = callbacks
    ></form-inline-comp>
    <table-comp
      :tableConfig="tableConfig"
      :resInformation="resInformation"
      @handleSizePageChange = callbacks
    ></table-comp>
    <el-dialog
      title="Update Game Platform"
      :visible.sync="updateDialogStatus"
      width="1200px"
      @close="close"
    >
      <div class="FlexRowFlexStartFlexStart">
        <div class="title">icon</div>
        <file-upload
          ref="fileUpload"
          :fileConfig = fileConfig
          @handleRemove = handleRemove
          @handleChange = handleChange
        />
      </div>
      <el-form
        class="form_inline_comp"
        label-width="155px"
        inline
      >
        <el-form-item label="Name">
          <el-input
            v-model="gamePlatformsForm.name"
            style="max-width: 220px"
            placeholder="Name"
          />
        </el-form-item>
        <el-form-item label="Interval">
          <el-input
            v-model="gamePlatformsForm.interval"
            style="max-width: 220px"
            placeholder="Interval"
          />
        </el-form-item>
        <el-form-item label="Request Url">
          <el-input
            v-model="gamePlatformsForm.request_url"
            style="max-width: 220px"
            placeholder="Request Url"
          />
        </el-form-item>
        <el-form-item label="Delay">
          <el-input
            v-model="gamePlatformsForm.delay"
            style="max-width: 220px"
            placeholder="Delay"
          />
        </el-form-item>
        <el-form-item label="Report Request Url">
          <el-input
            v-model="gamePlatformsForm.report_request_url"
            style="max-width: 220px"
            placeholder="Report Request Url"
          />
        </el-form-item>
        <el-form-item label="Offset">
          <el-input
            v-model="gamePlatformsForm.offset"
            style="max-width: 220px"
            placeholder="Offset"
          />
        </el-form-item>
        <el-form-item label="Launcher Request Url">
          <el-input
            v-model="gamePlatformsForm.launcher_request_url"
            style="max-width: 220px"
            placeholder="Launcher Request Url"
          />
        </el-form-item>
        <el-form-item label="Limit">
          <el-input
            v-model="gamePlatformsForm.limit"
            style="max-width: 220px"
            placeholder="Limit"
          />
        </el-form-item>
        <el-form-item label="Rsa Our Private Key">
          <el-input
            v-model="gamePlatformsForm.rsa_our_private_key"
            style="max-width: 220px"
            placeholder="Rsa Our Private Key"
          />
        </el-form-item>
        <el-form-item label="Status">
          <el-select
            v-model="gamePlatformsForm.status"
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
        <el-form-item label="Rsa Our Public Key">
          <el-input
            v-model="gamePlatformsForm.rsa_our_public_key"
            style="max-width: 220px"
            placeholder="Rsa Our Public Key"
          />
        </el-form-item>
        <el-form-item label="Sort">
          <el-input
            v-model="gamePlatformsForm.sort"
            style="max-width: 220px"
            placeholder="Sort"
          />
        </el-form-item>
        <el-form-item label="Rsa Public Key">
          <el-input
            v-model="gamePlatformsForm.rsa_public_key"
            style="max-width: 220px"
            placeholder="Rsa Public Key"
          />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
            type="textarea"
            v-model="gamePlatformsForm.remark"
            style="max-width: 220px"
            placeholder="Remark"
          />
        </el-form-item>
        <el-form-item label="Account">
          <el-input
            type="textarea"
            v-model="gamePlatformsForm.account"
            style="width: 300px"
            :rows="5"
            placeholder="Account"
          />
        </el-form-item>
        <el-form-item label="Update Odds">
          <el-switch
            v-model="gamePlatformsForm.is_update_odds"
            active-color="#13ce66"
            :active-value=1
            :inactive-value=0
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item label="Is Games Maintain">
          <el-switch
            v-model="gamePlatformsForm.is_maintain"
            active-color="#13ce66"
            :active-value=1
            :inactive-value=0
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item label="Is Wallet Maintain">
          <el-switch
            v-model="gamePlatformsForm.is_wallet_maintain"
            active-color="#13ce66"
            :active-value=1
            :inactive-value=0
            inactive-color="#ff4949"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="updateDialogStatus = false">Close</el-button>
        <el-button type="primary" @click="updateForGamePlatform">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstageGameManagementGamePlatformsDropListHttp,
  backstageGameManagementGamePlatformsHttp,
  backstageGameManagementGamePlatformUpdateHttp
} from '../../api/game_management/GamePlatforms/initAxios'
import FileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
import element from '../../config/element'
export default {
  name: 'GamePlatforms',
  components: {FileUpload, TableComp, FormInlineComp},
  data () {
    return {
      formInline: {
        per_page: 50,
        page: 1,
        code: '',
        status: ''
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Code',
          formValue: 'code',
          placeholder: 'Code',
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
          type: 'search'
        }
      ],
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'name',
            label: 'Name'
          },
          {
            prop: 'code',
            label: 'Code',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      if (params.item.icon) {
                        this.fileConfig.fileList.push({name: 'Icon', url: params.item.icon})
                      }
                      this.icon = params.item.icon
                      this.updateDialogStatus = true
                      this.gamePlatformsForm = {
                        name: params.item.name,
                        is_update_odds: Number(params.item.is_update_odds),
                        is_maintain: Number(params.item.is_maintain),
                        is_wallet_maintain: Number(params.item.is_wallet_maintain),
                        request_url: params.item.request_url,
                        report_request_url: params.item.report_request_url,
                        launcher_request_url: params.item.launcher_request_url,
                        rsa_our_private_key: params.item.rsa_our_private_key,
                        rsa_our_public_key: params.item.rsa_our_public_key,
                        rsa_public_key: params.item.rsa_public_key,
                        account: JSON.stringify(params.item.account),
                        interval: params.item.interval,
                        delay: params.item.delay,
                        offset: params.item.offset,
                        limit: params.item.limit,
                        remark: params.item.remark,
                        status: Number(params.item.status),
                        sort: params.item.sort
                      }
                      this.gamePlatformsId = params.item.id
                    }
                  }
                }, params.item.code)
              ])
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
            prop: 'sort',
            label: 'Sort'
          },
          {
            prop: 'display_status',
            label: 'Status'
          }
        ]
      },
      resInformation: {},
      updateDialogStatus: false,
      fileConfig: {
        disabled: false,
        autoUpload: false,
        url: '/api/backstage/game_platforms/',
        fileHeaders: resourcesList.fileHeaders,
        name: 'icon',
        limit: 1,
        data: {},
        accept: 'image/*', // 文件上传类型
        fileList: []
      },
      icon: '',
      dropList: {},
      gamePlatformsId: '',
      gamePlatformsForm: {
        name: '',
        request_url: '',
        report_request_url: '',
        launcher_request_url: '',
        rsa_our_private_key: '',
        rsa_our_public_key: '',
        rsa_public_key: '',
        account: [],
        is_update_odds: '',
        is_maintain: '',
        is_wallet_maintain: '',
        interval: '',
        delay: '',
        offset: '',
        limit: '',
        remark: '',
        status: '',
        sort: ''
      }
    }
  },
  methods: {
    // 分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initGamePlatforms(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initGamePlatforms(this.formInline)
        return
      }
      this.initGamePlatforms(value)
    },
    // 数据初始化
    initGamePlatforms (formInline) {
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
      backstageGameManagementGamePlatformsHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    gamePlatformsDropList () {
      backstageGameManagementGamePlatformsDropListHttp().then(res => {
        this.dropList = res
        filter.formValueListFilter(this.formInlineConfig, res, ['status'])
      }).catch((error) => {
        console.log(error)
      })
    },
    // uploadSuc (res) {
    //   this.form.web_img_id = res.id
    // },
    // // 文件改动
    handleChange (file) {
      filter.getBase64(file.file.raw).then((res) => {
        this.icon = res
      })
    },
    handleRemove () {
      this.icon = ''
    },
    // 窗口关闭回调
    close () {
      this.fileConfig.fileList = []
    },
    // 添加数组
    addArr () {
      this.gamePlatformsForm.account.push({
        lobby: '',
        md5_key: '',
        secret_key: '',
        encrypt_key: ''
      })
    },
    // 删除数组
    deleteArr (key) {
      this.gamePlatformsForm.account.splice(key, 1)
    },
    // 更新
    updateForGamePlatform () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        let datalist = {
          name: this.gamePlatformsForm.name,
          request_url: this.gamePlatformsForm.request_url,
          report_request_url: this.gamePlatformsForm.report_request_url,
          launcher_request_url: this.gamePlatformsForm.launcher_request_url,
          rsa_our_private_key: this.gamePlatformsForm.rsa_our_private_key,
          rsa_our_public_key: this.gamePlatformsForm.rsa_our_public_key,
          rsa_public_key: this.gamePlatformsForm.rsa_public_key,
          account: JSON.parse(this.gamePlatformsForm.account),
          interval: this.gamePlatformsForm.interval,
          is_update_odds: this.gamePlatformsForm.is_update_odds,
          is_maintain: this.gamePlatformsForm.is_maintain,
          is_wallet_maintain: this.gamePlatformsForm.is_wallet_maintain,
          delay: this.gamePlatformsForm.delay,
          offset: this.gamePlatformsForm.offset,
          limit: this.gamePlatformsForm.limit,
          remark: this.gamePlatformsForm.remark,
          status: this.gamePlatformsForm.status,
          sort: this.gamePlatformsForm.sort
        }
        datalist.icon = this.icon
        backstageGameManagementGamePlatformUpdateHttp(this.gamePlatformsId, datalist).then((res) => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.updateDialogStatus = false
          this.initGamePlatforms(this.formInline)
        }).catch(() => {
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.initGamePlatforms(this.formInline)
    this.gamePlatformsDropList()
  }
}
</script>
