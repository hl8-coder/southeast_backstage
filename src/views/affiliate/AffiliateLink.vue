<template>
  <div class="AffiliateLink">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange = callbacks
    />
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.status"
    >
      <el-form
        label-width="150px"
      >
        <el-form-item
          label="Type"
        >
          <el-select
            v-model="form.type"
            placeholder="Type"
          >
            <el-option
              v-for="item in dropList.type"
              :value="item.key"
              :label="item.value"
              :key="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Platform"
        >
          <el-select
            v-model="form.platform"
            placeholder="Platform"
          >
            <el-option
              v-for="item in dropList.platform"
              :value="item.key"
              :label="item.value"
              :key="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Status"
        >
          <el-select
            v-model="form.status"
            placeholder="Status"
          >
            <el-option
              v-for="item in dropList.status"
              :value="item.key"
              :label="item.value"
              :key="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Link">
          <el-input
            v-model="form.link"
          />
        </el-form-item>
        <el-form-item
          label="Sort">
          <el-input
            v-model="form.sort"
          />
        </el-form-item>
        <el-form-item
          label="Currencies"
        >
          <el-select
            v-model="form.currencies"
            multiple
            placeholder="Please select Currencies"
          >
            <el-option
              v-for="item in dropList.currency"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Languages"
        >
          <el-button
            type="primary"
            @click="addLanguages"
          >Add</el-button>
        </el-form-item>
        <div style="border: #eee 1px solid; padding: 5px" v-if="form.languages.length">
          <el-row
            v-for="(item, key) in form.languages"
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
              <el-form-item>
                <el-button
                  type="danger"
                  @click="deleteLanguages(key)"
                >Delete</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.status = false">cancel</el-button>
        <el-button type="primary" @click="doStoreOrUpdate">submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstageAffiliateLinkIndexHttp,
  backstageAffiliateLinkDropListHttp, backstageAffiliateLinkUpdateHttp, backstageAffiliateLinkStoreHttp
} from '../../api/affiliate/initAxios'
import FormInlineComp from '../../components/form/formInlineComp'
import element from '../../config/element'
export default {
  name: 'AffiliateLink',
  components: {FormInlineComp, TableComp},
  data () {
    return {
      tableConfig: {
        loading: true,
        border: true,
        tableColumn: [
          {
            prop: 'display_type',
            label: 'Product Type',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.ID = params.item.id
                      this.form.type = params.item.type
                      this.form.platform = params.item.platform
                      this.form.link = params.item.link
                      this.form.sort = params.item.sort
                      this.form.status = Number(params.item.status)
                      this.form.currencies = params.item.currencies
                      this.form.languages = params.item.languages
                      this.dialog.title = 'Update'
                      this.dialog.status = true
                    }
                  }
                }, params.item.display_type)
              ])
            }
          },
          {
            prop: 'display_platform',
            label: 'Platform'
          },
          {
            prop: 'display_status',
            label: 'Status'
          },
          {
            prop: 'admin_name',
            label: 'Update Admin'
          }
        ]
      },
      resInformation: {},
      formInlineConfig: [
        {
          type: 'select',
          label: 'Type',
          formValue: 'type',
          placeholder: 'Type',
          clearable: true,
          value: '',
          list: []
        },
        {
          type: 'select',
          label: 'Platform',
          formValue: 'platform',
          placeholder: 'Platform',
          clearable: true,
          value: '',
          list: []
        },
        {
          type: 'select',
          label: 'Status',
          formValue: 'status',
          placeholder: 'Status',
          clearable: true,
          value: '',
          list: []
        },
        {
          type: 'date',
          label: 'Date'
        },
        {
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      formInline: {
        page: 1,
        type: '',
        platform: '',
        start_at: '',
        end_at: '',
        status: '',
        per_page: 50
      },
      ID: '',
      dialog: {
        status: false,
        title: ''
      },
      form: {
        type: '',
        platform: '',
        link: '',
        sort: '',
        currencies: [],
        languages: [],
        status: ''
      },
      dropList: {}
    }
  },
  methods: {
    // 列表
    initHttp (formInline) {
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageAffiliateLinkIndexHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 下拉菜单
    initDropList () {
      backstageAffiliateLinkDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['status', 'type', 'platform'])
        this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // 分页
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
    onAdd () {
      this.ID = ''
      this.clearForm()
      this.dialog.title = 'Add'
      this.dialog.status = true
    },
    // 添加元素
    addLanguages () {
      this.form.languages.push(
        {
          language: '',
          title: ''
        }
      )
    },
    // 删除元素
    deleteLanguages (key) {
      this.form.languages.splice(key, 1)
    },
    // 清除表单
    clearForm () {
      this.form = {
        type: '',
        platform: '',
        link: '',
        sort: '',
        currencies: [],
        languages: [],
        status: ''
      }
    },
    // 添加或更新
    doStoreOrUpdate () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if (this.ID) {
          backstageAffiliateLinkUpdateHttp(this.ID, this.form).then(res => {
            element.message({
              type: 'success',
              message: 'success'
            })
            this.dialog.status = false
            this.initHttp(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        } else {
          backstageAffiliateLinkStoreHttp(this.form).then(res => {
            element.message({
              type: 'success',
              message: 'success'
            })
            this.dialog.status = false
            this.initHttp(this.formInline)
          }).catch((error) => {
            console.log(error)
          })
        }
      }).catch(() => {
      })
    }
  },
  activated () {
    this.initHttp(this.formInline)
    this.initDropList()
  }
}
</script>

<style scoped>

</style>
