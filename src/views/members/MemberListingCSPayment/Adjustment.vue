<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="Adjustment">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    ></form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange = callbacks
    ></table-comp>
    <add-adjustment
      :addAdjustmentInfo = addAdjustmentInfo
      :user_name = formInlineConfig[0].value
      @refersh="refersh"
    ></add-adjustment>
  </div>
</template>

<script>
import TableComp from '../../../components/table/tableComp'
import FormInlineComp from '../../../components/form/formInlineComp'
import AddAdjustment from './AddAdjustment'
import filter from '../../../util/filter'
import element from '../../../config/element'
import {
  backstageAdjustmentsHttp,
  backstageDropListAdjustmentsHttp,
  patchBackstageAdjustments,
  deleteBackstageAdjustments
} from '../../../api/adjustments/initAxios'
export default {
  name: 'Adjustment',
  components: {AddAdjustment, FormInlineComp, TableComp},
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'created_at',
            label: 'DATE'
          },
          {
            prop: 'type',
            label: 'TYPE'
          },
          {
            prop: 'amount',
            label: 'Amount'
          },
          {
            prop: 'category',
            label: 'CATEGORY'
          },
          {
            prop: 'product_code',
            label: 'Product'
          },
          {
            prop: 'reason',
            label: 'REASON'
          },
          {
            prop: 'remark',
            label: 'REMARKS'
          },
          {
            prop: 'order_no',
            label: 'ADJUSTMENT ID',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.promptInfo(params.item)
                    }
                  }
                }, params.item.order_no)
              ])
            }
          },
          {
            prop: 'status',
            label: 'STATUS'
          }
        ]
      },
      resInformation: {},
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          placeholder: 'Member Code',
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
          type: 'select',
          label: 'Adjustment Category',
          formValue: 'category',
          placeholder: 'Select A Adjustment Category',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Transaction ID',
          formValue: 'id',
          placeholder: 'Transaction ID',
          value: ''
        },
        {
          type: 'input',
          label: 'Adjustment Reason',
          formValue: 'reason',
          placeholder: 'Adjustment Reason',
          value: ''
        },
        {
          type: 'date',
          label: 'Date',
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
      formInline: {
        id: '',
        user_name: '',
        status: '',
        type: '',
        category: '',
        reason: '',
        per_page: 50,
        page: 1
      },
      addAdjustmentInfo: {
        statusFormVisible: false,
        DropList: ''
      },
      DropList: {}
    }
  },
  methods: {
    refersh () {
      this.initHttp(this.formInline)
    },
    DropListHttp () {
      backstageDropListAdjustmentsHttp().then(res => {
        this.addAdjustmentInfo.DropList = res
        filter.formValueListFilter(this.formInlineConfig, res, ['status', 'category', 'type'])
      }).catch(() => {
      })
    },
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
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
      backstageAdjustmentsHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
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
    // 添加 Adjustment
    onAdd () {
      this.addAdjustmentInfo.statusFormVisible = true
    },
    // 修改状态
    promptInfo (item) {
      if (item.status === 'Successful' || item.status === 'Rejected') {
        element.message({
          type: 'error',
          message: 'Status modified'
        })
        return
      }
      this.$confirm('Successful？', 'Decision', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'APPROVE',
        cancelButtonText: 'CANCEL'
      })
        .then(() => {
          patchBackstageAdjustments(item.id).then(res => {
            this.initHttp(this.formInline)
            element.message({
              type: 'success',
              message: 'Successful already'
            })
          }).catch((error) => {
            console.log(error)
          })
        })
        .catch(action => {
          this.rejectReason(item.id)
        })
    },
    // 填写Reject Reason
    rejectReason (id) {
      this.$prompt('Please input the reject reason', 'Reject？', {
        inputType: 'textarea',
        confirmButtonText: 'APPROVE',
        cancelButtonText: 'CANCEL'
      }).then(({ value }) => {
        deleteBackstageAdjustments(id, {remark: value}).then(res => {
          this.initHttp(this.formInline)
          element.message({
            type: 'success',
            message: 'REJECT SUCCESS'
          })
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    }
  },
  created () {
    this.DropListHttp()
    this.initHttp(this.formInline)
  }
}
</script>
