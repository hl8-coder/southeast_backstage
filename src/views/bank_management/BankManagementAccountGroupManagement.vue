<style lang="scss" scoped type="text/scss">
</style>
<style lang="scss" type="text/scss">
  .form-inline-comp-width100 .el-form-item.el-form-item--small{
    width: 100%;
    text-align: center;
  }
</style>
<template>
  <div class="accountGroupManagement">
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
    <el-dialog :title="dailogConfig.title" width="700px" :visible.sync="dailogConfig.Visible">
      <el-form
        class="demo-form-inline"
      >
        <el-form
          ref="form"
          :model="form"
          class="form_inline_comp"
          label-width="150px"
        >
          <el-form-item label="Currency">
            <el-select style="width: 300px" v-model="form.currency" placeholder="Please select Currencies">
              <el-option
                v-for="item in globalDropList.currency"
                :key="item.value"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Payment Group">
            <el-input
              v-model="form.name"
              style="width: 300px"
              placeholder="Payment Group"
            />
          </el-form-item>

          <el-form-item label="Account Code">
            <el-select
              v-model="form.account_code"
              multiple
              filterable
              remote
              reserve-keyword
              style="width: 300px"
              placeholder="Account Code"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Risk group">
            <el-select style="width: 300px" v-model="form.preset_risk_group_id" placeholder="Please select risk group">
              <el-option
                v-for="item in globalDropList.risk_group_id"
                :key="item.value"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Account Description">
            <el-input
              style="width: 300px"
              type="textarea"
              v-model="form.remark"
              placeholder="Account Description"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doStoreOrUpdate">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  backstagePaymentGroupsHttp,
  postBackstagePaymentGroupsHttp,
  patchBackstagePaymentGroupsHttp,
  paymentPlatformsSearchHttp,
  backstagePaymentGroupsAuditHttp
} from '../../api/compony_account_management/initAxios'
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import element from '../../config/element'
import {mapGetters} from 'vuex'
export default {
  name: 'accountGroupManagement',
  data () {
    return {
      loading: false,
      options: [],
      pagination: {
        currency: '',
        per_page: 50,
        total: 20,
        page: 1
      },
      updateId: '',
      GroupVisible: false,
      formLabelWidth: '120px',
      RiskIdRequist: {
        category: '',
        remark: ''
      },
      Visible: false,
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'id',
          label: 'ID',
          width: '100'
        }, {
          prop: 'name',
          label: 'Payment Group',
          width: '150',
          render: (h, params) => {
            return h('div', [
              h('el-link', {
                props: {
                  size: 'small'
                },
                style: {
                  color: '#409EFF'
                },
                on: {
                  click: () => {
                    this.dailogConfig.Visible = true
                    this.dailogConfig.title = 'Update Account Group'
                    this.dailogConfig.id = params.item.id
                    this.form = {
                      currency: params.item.currency,
                      account_code: params.item.account_code,
                      name: params.item.name,
                      preset_risk_group_id: params.item.preset_risk_group_id,
                      remark: params.item.remark
                    }
                  }
                }
              }, params.item.name)
            ])
          }
        }, {
          prop: 'currency',
          label: 'Currency',
          width: '100'
        }, {
          prop: 'account_code',
          label: 'Accounts Code',
          width: '200',
          render: (h, params) => {
            return params.item.account_code.map(item => {
              return h('span', {}, item)
            })
          }
        }, {
          prop: 'remark',
          label: 'Account Description',
          width: '200'
        }, {
          prop: 'presetRiskGroup',
          label: 'Risk group',
          width: '150',
          render: (h, params) => {
            return h('span', {}, params.item.presetRiskGroup ? params.item.presetRiskGroup.name : '')
          }
        }, {
          prop: 'last_save_admin',
          label: 'Last edited',
          width: '200',
          render: (h, params) => {
            var self = this
            return h('el-popover', {
              props: {
                placement: 'left',
                width: '600',
                trigger: 'click'
              }
            }, [
              h('div', {}, 'Edit History' + '（' + params.item.name + '）'),
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
                    width: '80',
                    property: 'name',
                    label: 'Admin'
                  }
                }),
                h('el-table-column', {
                  props: {
                    width: '120',
                    property: 'old_value',
                    label: 'Previous Value'
                  }
                }),
                h('el-table-column', {
                  props: {
                    width: '200',
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
                    backstagePaymentGroupsAuditHttp(params.item.id, {page: val, per_page: self.pagination.per_page}).then(res => {
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
                    backstagePaymentGroupsAuditHttp(params.item.id, {page: self.pagination.page, per_page: self.pagination.per_page}).then(res => {
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
        }]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Account Code',
          formValue: 'account_code',
          placeholder: 'Account Code',
          value: ''
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
        account_code: ''
      },
      form: {
        currency: '',
        preset_risk_group_id: '',
        account_code: [],
        name: '',
        remark: ''
      },
      formConfig: [
        {
          type: 'select',
          label: 'Currency',
          formValue: 'currency',
          placeholder: 'Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'textarea',
          label: 'Account Code',
          formValue: 'account_code',
          placeholder: 'Please Enter Account Code, Separated By (;)',
          value: ''
        },
        {
          type: 'input',
          label: 'Account Group',
          formValue: 'name',
          placeholder: 'Account Group',
          value: ''
        },
        {
          type: 'textarea',
          label: 'Remarks',
          formValue: 'remark',
          placeholder: 'Remarks',
          value: ''
        },
        {
          type: 'Submit'
        }
      ],
      dailogConfig: {
        title: 'Add Account Group',
        Visible: false,
        id: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  created () {
    this.DropListHttp()
    this.initHttp(this.formInline)
    console.log(this.globalDropList)
  },
  components: {
    tableComp, formInlineComp
  },
  methods: {
    doStoreOrUpdate () {
      if (this.dailogConfig.id) {
        patchBackstagePaymentGroupsHttp(this.dailogConfig.id, this.form).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.dailogConfig.Visible = false
          this.initHttp(this.formInline)
        }).catch((error) => {
          console.log(error)
        })
      } else {
        postBackstagePaymentGroupsHttp(this.form).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.dailogConfig.Visible = false
          this.initHttp(this.formInline)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        paymentPlatformsSearchHttp({code: query}).then(res => {
          this.loading = false
          this.options = []
          res.data.map(item => {
            this.options.push({key: item.code, value: item.code})
          })
        })
        // setTimeout(() => {
        //   this.loading = false
        //   this.options = this.list.filter(item => {
        //     return item.label.toLowerCase()
        //       .indexOf(query.toLowerCase()) > -1
        //   })
        // }, 200)
      } else {
        this.options = []
      }
    },
    DropListHttp () {
      filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
      // backstageUsersDropListHttp().then(res => {
      //   filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'status', 'risk_group_id', 'payment_group_id'])
      // }).catch(() => {
      // })
    },
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
        element.message({
          type: 'error',
          message: 'There is no request'
        })
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        // formInline.include = 'user'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstagePaymentGroupsHttp(datalist).then(res => {
        // res.data.map(item => {
        //   if (!item.presetRiskGroup) {
        //     return item.presetRiskGroup.name = null
        //   }
        // })
        this.tableConfig.loading = false
        this.resInformation = res
        console.log(res)
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
    // memberDropList下拉菜单
    onAdd () {
      this.dailogConfig.Visible = true
      this.dailogConfig.title = 'Add Account Group'
      this.dailogConfig.id = ''
      this.form = {
        currency: '',
        account_code: [],
        name: '',
        remark: ''
      }
    },
    GroupSubmit (form) {

    },
    updateSubmit (form) {

    }
  }
}
</script>
