<template>
  <div class="AffiliateMailboxTemplate">
    <form-inline-comp
      :form-inline-config="formInlineConfig"
      @onAdd = onAdd
    />
    <table-comp
      :table-config="tableConfig"
      :res-information="resInformation"
      @handleSizePageChange = callbacks
    />
    <el-dialog
      :title="mailboxTemplateDialog.title"
      :visible.sync="mailboxTemplateDialog.status"
      @close="clearThisForm"
    >
      <el-form
        label-width="150px"
      >
        <el-form-item label="Type:">
          <el-select
            v-model="mailboxTemplateForm.type"
          >
            <el-option
              v-for="item in dropList.type"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Currencies">
          <el-select v-model="mailboxTemplateForm.currencies" multiple placeholder="Please select Currencies">
            <el-option
              v-for="item in dropList.currency"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Languages:">
          <el-button
            type="primary"
            @click="addCurrencies"
          >Add</el-button>
        </el-form-item>
        <div class="border" v-if="mailboxTemplateForm.languages.length">
          <el-row
            v-for="(item, key) in mailboxTemplateForm.languages"
            :key="key"
          >
            <el-col :span="8">
              <el-form-item label="language:">
                <el-select
                  v-model="item.language"
                >
                  <el-option
                    v-for="item1 in dropList.language"
                    :key="item1.key"
                    :label="item1.value"
                    :value="item1.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Title:">
                <el-input
                  v-model="item.title"
                  style="max-width: 220px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Content Image">
                <file-upload
                  :fileConfig="uploadConfig"
                  :listKey="key"
                  @Success="uploadContentSuccess"
                ></file-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Body:">
                <kind-editor
                  :options="options"
                  v-model="item.body"
                  :listKey="key"
                  @input="changeTheBody"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button
                  type="danger"
                  @click="deleteCurrencies(key)"
                >Delete</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-form-item style="margin-top: 10px">
          <el-button type="primary" @click="storeOrUpdate">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import {
  backstageMailboxTemplateDropListHttp,
  backstageMailboxTemplateUpdateHttp,
  backstageMailboxTemplateDeleteHttp
} from '../../api/communication_tools/initAxios'
import KindEditor from '../../components/kindEditor/KindEditor'
import element from '../../config/element'
import resourcesList from '../../util/static'
import FileUpload from '../../components/file/fileUpload'
import {
  backstageAffiliateMailboxTemplateHttp,
  backstageAffiliateMailboxTemplateStoreHttp
} from '../../api/affiliate/initAxios'
export default {
  name: 'AffiliateMailboxTemplate',
  components: {FileUpload, KindEditor, TableComp, FormInlineComp},
  data () {
    return {
      formInlineConfig: [
        {
          type: 'add'
        }
      ],
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'display_type',
            label: 'Type',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.mailboxTemplateID = params.item.id
                      this.mailboxTemplateForm.type = params.item.type
                      this.mailboxTemplateForm.currencies = params.item.currencies
                      this.mailboxTemplateForm.languages = params.item.languages
                      this.mailboxTemplateDialog.title = 'Update Mailbox Template'
                      this.mailboxTemplateDialog.status = true
                    }
                  }
                }, params.item.display_type)
              ])
            }
          },
          {
            prop: 'last_update_by',
            label: 'Last Update By'
          },
          {
            prop: 'last_update_at',
            label: 'Last Update At'
          },
          {
            prop: 'created_at',
            label: 'Date'
          },
          {
            prop: '',
            label: '',
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
                      this.deleteMailboxTemplate(params.item.id)
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
        page: 1
      },
      dropList: {},
      mailboxTemplateDialog: {
        title: '',
        status: false
      },
      mailboxTemplateID: '',
      mailboxTemplateForm: {
        type: '',
        test: {
          label: '',
          value: ''
        },
        currencies: [],
        languages: []
      },
      options: [],
      uploadConfig: {
        url: '/api/backstage/images',
        name: 'image',
        accept: 'image/*',
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        type: 'Games'
      }
    }
  },
  methods: {
    // 初始化数据
    initMailboxTemplate (formInline) {
      backstageAffiliateMailboxTemplateHttp(formInline).then(res => {
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
        this.initMailboxTemplate(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initMailboxTemplate(this.formInline)
        return
      }
      this.initMailboxTemplate(value)
    },
    // 下拉菜单
    mailboxTemplateDropList () {
      backstageMailboxTemplateDropListHttp().then(res => {
        this.dropList = res
      }).catch(() => {
      })
    },
    // 添加邮箱模板
    onAdd () {
      this.mailboxTemplateID = ''
      this.mailboxTemplateDialog.title = 'Add Mailbox Template'
      this.mailboxTemplateDialog.status = true
      this.clearThisForm()
    },
    // 添加或更新
    storeOrUpdate () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if (this.mailboxTemplateID) {
          backstageMailboxTemplateUpdateHttp(this.mailboxTemplateID, this.mailboxTemplateForm).then(res => {
            element.message({
              type: 'success',
              message: 'success'
            })
            this.mailboxTemplateDialog.status = false
            this.initMailboxTemplate(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
          return
        }
        backstageAffiliateMailboxTemplateStoreHttp(this.mailboxTemplateForm).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.mailboxTemplateDialog.status = false
          this.initMailboxTemplate(this.formInline)
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    // 添加元素
    addCurrencies () {
      this.mailboxTemplateForm.languages.push(
        {
          language: '',
          title: '',
          image_id: '',
          body: ''
        }
      )
    },
    // 删除元素
    deleteCurrencies (key) {
      this.mailboxTemplateForm.languages.splice(key, 1)
    },
    // 清空表单
    clearThisForm () {
      this.mailboxTemplateForm = {
        type: '',
        currencies: [],
        languages: []
      }
    },
    // 删除数据
    deleteMailboxTemplate (id) {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        backstageMailboxTemplateDeleteHttp(id).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.initMailboxTemplate(this.formInline)
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    // 图片上传成功
    uploadContentSuccess (response, key) {
      // let str = '<img src="' + response.url + '" style="width: 100%">'
      this.mailboxTemplateForm.languages[key].image_id = response.id
      // this.mailboxTemplateForm.languages[key].body = str + this.mailboxTemplateForm.languages[key].body
    },
    // 更改body
    changeTheBody (val, key) {
      this.mailboxTemplateForm.languages[key].body = val
    }
  },
  created () {
    this.initMailboxTemplate(this.formInline)
    this.mailboxTemplateDropList()
  }
}
</script>

<style scoped>

</style>
