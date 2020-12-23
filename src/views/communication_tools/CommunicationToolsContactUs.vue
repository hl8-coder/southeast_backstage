<template>
  <div class="ContactUS">
    <form-inline-comp
      :formInlineConfig="formInlineConfig"
      @onAdd = onAdd
      @onSubmit = callbacks
    />
    <table-comp
      :resInformation="resInformation"
      :table-config="tableConfig"
      @handleSizePageChange = callbacks
    />
    <el-dialog
      :title="dialogTitle"
      width="1200px"
      :visible.sync="dialogStatus"
    >
      <el-form
        ref="form"
        :model="form"
        class="form_inline_comp"
        label-width="150px"
      >
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
        <el-form-item label="Icon">
          <file-upload
            :fileConfig="uploadConfigWeb"
            @Success="handleWebSuccess"
          ></file-upload>
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
                  placeholder="Name"
                />
              </el-form-item>
              <el-form-item label="Content">
                <el-input
                  v-model="item.content"
                  placeholder="Description"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="deleteArr">Delete</el-button>
              </el-form-item>
            </el-form>
            <div class="clear"></div>
          </div>
        </div>
        <el-form-item label="Api Url">
          <el-input
            v-model="form.api_url"
            style="max-width: 220px"
            placeholder="Api Url"
          />
        </el-form-item>
        <el-form-item label="Is Affiliate">
          <el-switch
            v-model="form.is_affiliate"
            :active-value=1
            :inactive-value=0
          />
        </el-form-item>
        <el-form-item label="Is Enable">
          <el-switch
            v-model="form.is_enable"
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogStatus = false">Close</el-button>
        <el-button type="primary" @click="doStoreOrUpdate">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import {
  backstageContactUsDropListHttp,
  backstageContactUsHttp,
  backstageContactUsStoreHttp,
  backstageContactUsUpdateHttp
} from '../../api/communication_tools/initAxios'
import {mapGetters} from 'vuex'
import filter from '../../util/filter'
import FormInlineComp from '../../components/form/formInlineComp'
import resourcesList from '../../util/static'
import FileUpload from '../../components/file/fileUpload'
import element from '../../config/element'
export default {
  name: 'ContactUS',
  components: {FileUpload, FormInlineComp, TableComp},
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID',
            render: (h, params) => {
              let that = this
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      let info = JSON.parse(JSON.stringify(params.item))
                      that.dialogStatus = true
                      that.dialogTitle = 'Update'
                      that.contactUSID = info.id
                      that.form.currencies = info.currencies
                      that.form.languages = info.languages
                      that.form.api_url = info.api_url
                      that.form.is_affiliate = Number(info.is_affiliate)
                      that.form.is_enable = Number(info.is_enable)
                    }
                  }
                }, params.item.id)
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
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'display_is_affiliate',
            label: 'Is affiliate'
          },
          {
            prop: 'display_is_enable',
            label: 'Is Enable'
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
        per_page: 50,
        page: 1
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
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      dropList: {},
      dialogTitle: '',
      dialogStatus: false,
      contactUSID: '',
      form: {
        currencies: [],
        languages: [],
        icon_id: '',
        api_url: '',
        sort: '',
        is_affiliate: '',
        is_enable: ''
      },
      uploadConfigWeb: {
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
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  methods: {
    // 初始化
    initContactUS (formInline) {
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
      backstageContactUsHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initContactUS(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initContactUS(this.formInline)
        return
      }
      this.initContactUS(value)
    },
    // 下拉菜单
    initContactUSDropList () {
      filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
      backstageContactUsDropListHttp().then(res => {
        this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // 添加按钮
    onAdd () {
      this.dialogStatus = true
      this.dialogTitle = 'Add'
      this.form = {
        currencies: [],
        languages: [],
        icon_id: '',
        api_url: '',
        sort: '',
        is_affiliate: '',
        is_enable: ''
      }
    },
    // 添加数组
    addArr () {
      this.form.languages.push({
        language: '',
        title: '',
        content: ''
      })
    },
    // 删除数组
    deleteArr (key) {
      this.form.languages.splice(key, 1)
    },
    // 文件改动
    handleWebSuccess (response, file, fileList) {
      this.form.icon_id = response.id
    },
    // 添加或者更新
    doStoreOrUpdate () {
      let self = this
      self.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if (self.contactUSID) {
          backstageContactUsUpdateHttp(self.contactUSID, self.form).then(res => {
            element.message({
              message: 'success',
              type: 'success'
            })
            self.dialogStatus = false
            self.initContactUS(self.formInline)
          }).catch((error) => {
            console.log(error)
          })
        } else {
          backstageContactUsStoreHttp(self.form).then(res => {
            element.message({
              message: 'success',
              type: 'success'
            })
            self.dialogStatus = false
            self.initContactUS(self.formInline)
          }).catch((error) => {
            console.log(error)
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.initContactUS(this.formInline)
    this.initContactUSDropList()
  }
}
</script>

<style lang="scss">
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
          width: 90%;
          .ql-editor {
            height: 10rem;
          }
        }
      }
    }
  }
</style>
