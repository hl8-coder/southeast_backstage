<template>
  <div class="CreativeResources">
    <form-inline-comp
      :formInlineConfig="formInlineConfig"
      @onSubmit = callbacks
      @onAdd = onAdd
    />
    <table-comp
      :resInformation="resInformation"
      :table-config="tableConfig"
      @handleSizePageChange = callbacks
    />
    <el-dialog
      :title= dialog.title
      :visible.sync= dialog.status
    >
      <el-form
        ref="form"
        :model="form"
        class="form_inline_comp"
        label-width="150px"
      >
        <el-form-item label="Code">
          <el-input
            v-model="form.code"
            style="max-width: 220px"
            placeholder="Code"
          />
        </el-form-item>
        <el-form-item label="Type">
          <el-select
            v-model="form.type"
            placeholder="Type"
          >
            <el-option
              v-for="item in dropList.type"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Group">
          <el-select
            v-model="form.group"
            placeholder="Group"
          >
            <el-option
              v-for="item in dropList.group"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Size">
          <el-select
            v-model="form.size"
            placeholder="Size"
          >
            <el-option
              v-for="item in dropList.size"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Currency" prop="Currency">
          <el-select v-model="form.currency" multiple placeholder="Select A Currency">
            <el-option
              v-for="item in dropList.currency"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Banner Url">
          <el-input
            v-model="form.banner_url"
            style="max-width: 220px"
            placeholder="Banner Url"
          />
        </el-form-item>
        <el-form-item label="Banner Img">
          <file-upload
            :fileConfig="uploadConfig"
            @Success="handleSuccess"
          ></file-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doStoreOrUpdate">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import filter from '../../util/filter'
import {
  backstageAffiliateCreativeResourceDropListHttp,
  backstageAffiliateCreativeResourcesHttp,
  backstageAffiliateCreativeResourcesStoreHttp,
  backstageAffiliateCreativeResourcesUpdateHttp,
  backstageAffiliateCreativeResourcesDeleteHttp
} from '../../api/affiliate/initAxios'
import TableComp from '../../components/table/tableComp'
import FileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
export default {
  name: 'CreativeResources',
  components: {FileUpload, TableComp, FormInlineComp},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'select',
          label: 'Currency',
          formValue: 'currency',
          placeholder: 'Select Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Group',
          formValue: 'group',
          placeholder: 'Select A Group',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Size',
          formValue: 'size',
          placeholder: 'Select A Size',
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
      formInline: {
        per_page: 50,
        page: 1,
        currency: '',
        group: '',
        size: '',
        type: ''
      },
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID',
            fixWidth: '133px'
          },
          {
            prop: 'currency',
            label: 'Currency',
            render: (h, params) => {
              let currency = ''
              if (params.item.currency.length) {
                params.item.currency.forEach((item) => {
                  currency += item
                  currency += ', '
                })
              }
              currency = currency.substring(0, currency.lastIndexOf(','))
              return h('div', [
                h('span', {}, currency)
              ])
            }
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
                      this.dialog.status = true
                      this.dialog.title = 'Update'
                      this.uploadConfig.fileList = []
                      if (params.item.banner_path) {
                        this.uploadConfig.fileList.push({name: 'banner', url: params.item.banner_path})
                      }
                      this.creativeResourcesID = params.item.id
                      this.form.code = params.item.code
                      this.form.type = params.item.type
                      this.form.group = params.item.group
                      this.form.size = params.item.size
                      this.form.tracking_id = params.item.tracking_id
                      this.form.banner_url = params.item.banner_url
                      this.form.currency = params.item.currency
                      this.form.banner_id = params.item.banner_id
                    }
                  }
                }, params.item.code)
              ])
            }
          },
          {
            prop: 'display_type',
            label: 'Type'
          },
          {
            prop: 'banner_path',
            label: 'Banner',
            render: (h, params) => {
              if (!params.item.banner_path) {
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
                    src: params.item.banner_path
                  },
                  on: {
                    click: () => {
                      this.$msgbox({
                        title: 'img',
                        message: h('div', null, [
                          h('el-image', {
                            props: {
                              src: params.item.banner_path
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
            prop: 'banner_url',
            label: 'Banner Url'
          },
          {
            prop: 'display_group',
            label: 'Group'
          },
          {
            prop: 'display_size',
            label: 'Size'
          },
          {
            prop: 'last_update_by',
            label: 'Updated By'
          },
          {
            prop: 'created_at',
            label: 'Created At'
          },
          {
            prop: '',
            label: '',
            render: (h, params) => {
              return h('div', [
                h('el-button', {
                  props: {
                    size: 'small',
                    type: 'danger'
                  },
                  on: {
                    click: () => {
                      let id = params.item.id
                      this.$confirm('Are you sure?', 'Prompt', {
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        type: 'warning'
                      }).then(() => {
                        backstageAffiliateCreativeResourcesDeleteHttp(id).then(res => {
                          this.$message.success('success')
                          this.initCreativeResources(this.formInline)
                        }).catch((error) => {
                          console.log(error)
                        })
                      }).catch(() => {})
                    }
                  }
                }, 'Delete')
              ])
            }
          }
        ]
      },
      resInformation: {},
      form: {
        type: '',
        group: '',
        size: '',
        code: '',
        tracking_id: '',
        banner_url: '',
        currency: '',
        banner_id: ''
      },
      dropList: {},
      uploadConfig: {
        url: '/api/backstage/images',
        name: 'image',
        accept: 'image/*',
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        limit: 1,
        type: 'banner'
      },
      creativeResourcesID: '',
      dialog: {
        status: false,
        title: ''
      }
    }
  },
  methods: {
    // 分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initCreativeResources(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initCreativeResources(this.formInline)
        return
      }
      this.initCreativeResources(value)
    },
    // 数据初始化
    initCreativeResources (formInline) {
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
      backstageAffiliateCreativeResourcesHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // drop list
    creativeResourcesDropList () {
      backstageAffiliateCreativeResourceDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'group', 'size', 'tracking_name', 'type'])
        this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // onAdd
    onAdd () {
      this.dialog.status = true
      this.dialog.title = 'Add'
      this.creativeResourcesID = ''
      this.uploadConfig.fileList = []
      this.form = {
        type: '',
        group: '',
        size: '',
        tracking_id: '',
        banner_url: '',
        currency: '',
        banner_id: ''
      }
    },
    // 文件改动
    handleSuccess (response, file, fileList) {
      this.form.banner_id = response.id
    },
    doStoreOrUpdate () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if (this.creativeResourcesID) {
          backstageAffiliateCreativeResourcesUpdateHttp(this.creativeResourcesID, this.form).then(res => {
            this.$message.success('success')
            this.dialog.status = false
            this.initCreativeResources(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        } else {
          backstageAffiliateCreativeResourcesStoreHttp(this.form).then(res => {
            this.$message.success('success')
            this.dialog.status = false
            this.initCreativeResources(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        }
      }).catch(() => {})
    }
  },
  created () {
    this.initCreativeResources(this.formInline)
    this.creativeResourcesDropList()
  }
}
</script>
