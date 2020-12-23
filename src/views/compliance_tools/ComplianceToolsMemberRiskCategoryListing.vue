<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="MemberRistCategoryListing">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    >
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog
      title="Behavior History"
      :visible.sync="status"
    >
      <div style="text-align: right">
        <el-button icon="el-icon-plus" type="primary" @click="onAdd">Add Behaviour</el-button>
      </div>
      <table-comp
        :tableConfig = subTableConfig
        :resInformation = subResInformation
        @handleSizePageChange =  subCallbacks
      ></table-comp>
      <el-dialog
        title="Add Behavior"
        :visible.sync="subDialogStatus"
        append-to-body
      >
        <el-form
          label-width="150px"
        >
          <el-form-item label="Behavior" prop="Behavior">
            <el-select v-model="form.behaviour" placeholder="Select A Behavior">
              <el-option
                v-for="item in dropList.behaviour"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Risk" prop="Risk">
            <el-select v-model="form.risk" placeholder="Select A Risk">
              <el-option
                v-for="item in dropList.risk"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="Remark"
          >
            <el-input
              v-model="form.remark"
              style="max-width: 220px"
            />
          </el-form-item>
          <el-form-item style="margin-top: 10px">
            <el-button type="primary" @click="storeUserRisk">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstageRMRiskCategoryListingHttp,
  backstageRMRiskCategoryListingShowHttp,
  backstageRMRiskCategoryStoreHttp,
  backstageRMRiskCategoryListingDropListHttp
} from '../../api/rm_tool/initAxios'
import element from '../../config/element'
export default {
  name: 'MemberRistCategoryListing',
  data () {
    return {
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'name',
            label: 'Member Code',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.user = params.item.id
                      this.getUserRiskShow(this.subFormInline)
                      this.status = true
                    }
                  }
                }, params.item.name)
              ])
            }
          },
          {
            prop: 'currency',
            label: 'Currency',
            fixWidth: '75px'
          },
          {
            prop: '',
            label: 'Behaviour',
            render: (h, params) => {
              return h('div', [
                h('span', {}, params.item.userRisks.data[0].display_behaviour)
              ])
            }
          },
          {
            prop: '',
            label: 'Risk',
            render: (h, params) => {
              return h('div', [
                h('span', {}, params.item.userRisks.data[0].display_risk)
              ])
            }
          },
          {
            prop: '',
            label: 'Remarks',
            render: (h, params) => {
              return h('div', [
                h('span', {}, params.item.userRisks.data[0].remark)
              ])
            }
          },
          {
            prop: '',
            label: 'Admin',
            render: (h, params) => {
              return h('div', [
                h('span', {}, params.item.userRisks.data[0].updated_by)
              ])
            }
          },
          {
            prop: '',
            label: 'Updated Time',
            render: (h, params) => {
              return h('div', [
                h('span', {}, params.item.userRisks.data[0].created_at)
              ])
            }
          }
        ]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'name',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'select',
          label: 'Behaviour',
          formValue: 'behaviour',
          placeholder: 'Select A Behaviour',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Risk',
          formValue: 'risk',
          placeholder: 'Select A Risk',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'date',
          label: 'Date'
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
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        include: 'userRisks',
        name: '',
        behaviour: '',
        currency: '',
        end_at: '',
        start_at: ''
      },
      status: false,
      subDialogStatus: false,
      subTableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'created_at',
            label: 'Date'
          },
          {
            prop: 'updated_by',
            label: 'Admin'
          },
          {
            prop: 'display_behaviour',
            label: 'Behaviour'
          },
          {
            prop: 'display_risk',
            label: 'Risk'
          },
          {
            prop: 'remark',
            label: 'Remarks'
          }
        ]
      },
      subFormInline: {
        per_page: 50,
        page: 1
      },
      subResInformation: {},
      user: '',
      form: {
        behaviour: '',
        risk: '',
        remark: '',
        user_id: ''
      },
      dropList: {}
    }
  },
  created () {
    this.initDropList()
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp
  },
  methods: {
    // 数据初始化
    initHttp (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
        formInline.include = this.formInline.include
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilterByEcho(formInline, [], ['per_page', 'page', 'include'])
      backstageRMRiskCategoryListingHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
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
    // 下拉菜单
    initDropList () {
      backstageRMRiskCategoryListingDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currency', 'behaviour', 'risk'])
        this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // 添加behavior
    onAdd () {
      this.form = {
        behaviour: '',
        remark: '',
        user_id: this.user
      }
      this.subDialogStatus = true
    },
    // 弹出层回调
    subCallbacks  (value) {
      if (value.hasOwnProperty('page')) {
        this.subFormInline.page = value.page
        this.getUserRiskShow(this.subFormInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.subFormInline.per_page = value.per_page
        this.getUserRiskShow(this.subFormInline)
        return
      }
      this.getUserRiskShow(value)
    },
    // 弹出层数据
    getUserRiskShow (subFormInline) {
      backstageRMRiskCategoryListingShowHttp(this.user, subFormInline).then(res => {
        this.subResInformation = res
        this.subTableConfig.loading = false
      }).catch((error) => {
        this.subTableConfig.loading = false
        console.log(error)
      })
    },
    // 添加User Risk
    storeUserRisk () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        backstageRMRiskCategoryStoreHttp(this.form).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.subDialogStatus = false
          this.initHttp(this.formInline)
          this.getUserRiskShow(this.subFormInline)
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    }
  }
}
</script>
