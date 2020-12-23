<template>
  <div class="Remark">
    <search-navs
      :user_name="formInline.user_name"
      @searchMemberCode="callbacks"
    />
    <form-inline-comp
      :form-inline-config="selfFormInlineConfig"
      @onSubmit = selfSearch
      @onAdd = onAdd
    />
    <table-comp
      v-if="formInline.user_name"
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  selfSearch
    ></table-comp>
    <el-dialog
      title="Add Remark"
      :visible.sync="addRemarkForm.statusFormVisible">
      <el-form ref="form" label-width="120px">
        <el-form-item label="TYPE">
          <el-select v-model="form.type" placeholder="Select a type">
            <el-option
              v-for="item in dropList.type"
              :label="item.value"
              :key="item.key"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="CATEGORY">
          <el-select
            v-model="form.category"
            placeholder="Select a category"
            @change="form.sub_category = ''"
          >
            <el-option
              v-for="item in dropList.category"
              :label="item.value"
              :key="item.key"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="(item, key) in dropList.sub_category"
          :key="key"
          v-if="form.category === item.key"
          label="SUB CATEGORY"
        >
          <el-select
            v-model="form.sub_category"
            placeholder="Select a SUB CATEGORY"
          >
            <el-option
              v-for="item in dropList.sub_category[key].value"
              v-if="item.value"
              :key="item.key"
              :value="item.key"
              :label="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="REASON">
          <el-input
            v-model="form.reason"
            type="textarea"
            :row="5"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="memberListingAddRemark">Add Remark</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import FormInlineComp from '../../components/form/formInlineComp'
import {
  backstageRemarksHttp, backstageAddRemarksHttp
} from '../../api/remark/initAxios'
import filter from '../../util/filter'
import {
  backstagePaymentWithdrawalRemarksDeleteHttp,
  backstagePaymentWithdrawalRemarksDropListHttp
} from '../../api/payment/withdraw/initAxiosWithdrawal'
import element from '../../config/element'
import SearchNavs from './FundTransfers/SearchNavs'
export default {
  name: 'Remark',
  components: {SearchNavs, FormInlineComp, TableComp},
  data () {
    return {
      selfFormInlineConfig: [
        {
          type: 'defaultSelect',
          label: 'Type',
          formValue: 'type',
          placeholder: 'Select A Type',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'defaultMonth',
          formValue: 'date',
          value: ''
        },
        {
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      tableConfig: {
        border: true,
        loading: false,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID',
            fixWidth: '50px'
          },
          {
            prop: '',
            label: '',
            fixWidth: '50px',
            render: (h, params) => {
              if (!params.item.is_removed) {
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
                        this.$prompt('REMOVE REASON', 'Prompt', {
                          confirmButtonText: 'Remove',
                          cancelButtonText: 'cancel'
                        }).then(({ value }) => {
                          if (!value) {
                            this.$message.error('REMOVE REASON field is required')
                            return
                          }
                          this.backstagePaymentWithdrawalRemarksDeleteHttp(params.item.id, {remove_reason: value})
                        }).catch(() => {
                        })
                      }
                    }
                  })
                ])
              }
            }
          },
          {
            prop: 'created_at',
            label: 'DATE'
          },
          {
            prop: 'type',
            label: 'TYPE'
          },
          {
            prop: 'category',
            label: 'CATEGORY'
          },
          {
            prop: 'sub_category',
            label: 'SUB CATEGORY'
          },
          {
            prop: 'reason',
            label: 'REASON'
          },
          {
            prop: 'admin_name',
            label: 'ADMIN'
          },
          {
            prop: 'remove_reason',
            label: 'REMOVE REASON'
          },
          {
            prop: 'remove_admin_name',
            label: 'REMOVE ADMIN'
          },
          {
            prop: 'deleted_at',
            label: 'REMOVE DATE'
          }
        ]
      },
      resInformation: {},
      addRemarkForm: {
        statusFormVisible: false
      },
      formInline: {
        per_page: 50,
        page: 1,
        user_name: ''
      },
      dropList: {},
      form: {
        type: '',
        category: '',
        sub_category: '',
        name: '',
        reason: ''
      }
    }
  },
  methods: {
    // 提交表单与分页回调
    callbacks (value) {
      this.formInline.user_name = value
      this.form.name = value
      this.initRemarks(this.formInline)
    },
    selfSearch (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initRemarks(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initRemarks(this.formInline)
        return
      }
      value.user_name = this.formInline.user_name
      this.initRemarks(value)
    },
    // 数据初始化
    initRemarks (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.include = this.formInline.include
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageRemarksHttp(datalist).then(res => {
        this.resInformation = res
        // if (res.data.length) {
        //   this.formInline.user_id = res.data[0].user_id
        // }
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 下拉菜单
    dropListOfRemarks () {
      backstagePaymentWithdrawalRemarksDropListHttp().then(res => {
        filter.formValueListFilter(this.selfFormInlineConfig, res, ['type'])
        this.dropList = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // 添加备注
    memberListingAddRemark () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        backstageAddRemarksHttp(this.form).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.initRemarks(this.formInline)
          this.addRemarkForm.statusFormVisible = false
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {})
    },
    // 添加
    onAdd () {
      this.form = {
        type: '',
        category: '',
        reason: '',
        sub_category: '',
        name: this.form.name
      }
      this.addRemarkForm.statusFormVisible = true
    },
    // 删除Remark
    backstagePaymentWithdrawalRemarksDeleteHttp (id, value) {
      backstagePaymentWithdrawalRemarksDeleteHttp(id, value).then(res => {
        this.$message.success('Success!')
        this.initRemarks(this.formInline)
      }).catch(() => {
        this.$message.error('Error!')
      })
    }
  },
  activated () {
    console.log('asdasdasdasd')
    let name = this.$route.query.name
    if (name) {
      this.formInline.user_name = name
      this.form.name = name
      this.initRemarks(this.formInline)
    }
    this.dropListOfRemarks()
  }
}
</script>

<style scoped>

</style>
