<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="PromotionClaimReports">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog
      title="Update Promotion Claim Reports Status"
      :visible.sync="visible"
    >
      <el-form label-width="100px">
        <el-form-item label="Status">
          <el-select v-model="form.status" placeholder="Status">
            <el-option
              v-for="item in dropList.status"
              :label="item.value"
              :key="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="updatePromotionStatus">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {
  backstageReportsMemberPromotionClaimReportsHttp,
  backstageReportsMemberPromotionClaimReportsDropListHttp,
  backstageReportsMemberUpdatePromotionClaimReportsStatusHttp
} from '../../api/report/initAxios'
import element from '../../config/element'
export default {
  name: 'PromotionClaimReports',
  data () {
    return {
      visible: false,
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'promotion_code',
            label: 'Promotion Code',
            width: '80'
          },
          {
            prop: 'user.name',
            label: 'Member Code',
            width: '80'
          },
          {
            prop: 'user.display_risk_group_id',
            label: 'Risk Category',
            width: '80'
          },
          {
            prop: 'user.currency',
            label: 'Currency',
            width: '80'
          },
          {
            prop: 'display_related_type',
            label: 'Related Type',
            width: '80'
          },
          {
            prop: 'related_code',
            label: 'Related Code',
            width: '80'
          },
          {
            prop: 'front_remark',
            label: 'Comments',
            width: '80'
          },
          {
            prop: 'created_at',
            label: 'Submission Date',
            width: '80'
          },
          {
            prop: '',
            label: 'Approve/ Reject',
            width: '80',
            render: (h, params) => {
              if (params.item.is_verified) {
                return h('div', [
                  h('el-button', {
                    props: {
                      size: 'small',
                      circle: true,
                      icon: 'el-icon-star-off'
                    },
                    on: {
                      click: () => {
                        this.promotionID = params.item.id
                        this.visible = true
                      }
                    }
                  })
                ])
              }
            }
          },
          {
            prop: 'admin_name',
            label: 'Update By',
            width: '80'
          },
          {
            prop: 'display_status',
            label: 'Status',
            width: '80'
          }
        ]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          placeholder: 'Member Code',
          value: ''
        },
        {
          type: 'input',
          label: 'Promo Code',
          formValue: 'promotion_code',
          placeholder: 'Promo Code',
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
          type: 'date',
          label: 'Submission Date',
          formValue: 'date',
          value: ''
        },
        {
          type: 'search'
        }
      ],
      formInline: {
        include: 'user',
        per_page: 50,
        page: 1,
        user_name: '',
        promotion_code: '',
        currency: '',
        start_at: '',
        end_at: ''
      },
      form: {
        status: '',
        remark: ''
      },
      dropList: {},
      promotionID: ''
    }
  },
  created () {
    this.DropListHttp()
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp
  },
  methods: {
    // 会员信息请求
    initHttp (formInline) {
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
      backstageReportsMemberPromotionClaimReportsHttp(datalist).then(res => {
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
    DropListHttp () {
      backstageReportsMemberPromotionClaimReportsDropListHttp().then(res => {
        filter.formValueListFilter(this.formInlineConfig, res, ['currency'])
        this.dropList = res
      }).catch(() => {
      })
    },
    // 更改状态
    updatePromotionStatus () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if (this.form.status) {
          backstageReportsMemberUpdatePromotionClaimReportsStatusHttp(this.promotionID, this.form).then(res => {
            this.$message.success('success')
            this.visible = false
            this.initHttp(this.formInline)
          }).catch((error) => {
            this.visible = false
            console.log(error)
          })
        } else {
          element.message({
            type: 'error',
            message: 'Status is required'
          })
        }
      }).catch(() => {
      })
    }
  }
}
</script>
