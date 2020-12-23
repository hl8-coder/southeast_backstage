<style scoped>
</style>
<template>
  <div class="WithdrawalRemarks">
    <el-dialog
      append-to-body
      class="Remarks"
      title="Remarks"
      width="1200px"
      :visible.sync="remarks.formStatus"
    >
      <el-button
        style="margin-bottom: 10px"
        type="success"
        @click="addRemarks.statusFormVisible = true">
        Add Remarks
      </el-button>
      <table-comp
        :tableConfig = tableConfig
        :resInformation = resInformation
        @handleSizePageChange = callbacks
      ></table-comp>
      <withdrawal-add-remarks
        :addRemarks="addRemarks"
        :remarkDropList="remarkDropList"
        @refreshRemarks="refreshTheRemarks"
      />
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../../../components/table/tableComp'
import {
  backstagePaymentWithdrawalRemarksDeleteHttp,
  backstagePaymentWithdrawalRemarksDropListHttp,
  backstagePaymentWithdrawalRemarksListHttp
} from '../../../../api/payment/withdraw/initAxiosWithdrawal'
import WithdrawalAddRemarks from './WithdrawalAddRemarks'
export default {
  name: 'WithdrawalRemarks',
  components: {WithdrawalAddRemarks, TableComp},
  props: ['remarks', 'theWithdrawalTicketInfo'],
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        autoNum: false,
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
      formInline: {
        per_page: 50,
        page: 1,
        user_id: this.remarks.user.id
      },
      addRemarks: {
        statusFormVisible: false,
        user: {
          id: this.remarks.user.id
        }
      },
      remarkDropList: {}
    }
  },
  watch: {
    'remarks': function (val) {
      this.initRemarks(this.formInline)
      this.initRemarksValue(val)
    }
  },
  mounted () {
    this.initRemarksValue(this.remarks)
    this.initRemarks(this.formInline)
  },
  methods: {
    initRemarksValue (val) {
      this.addRemarks.user.id = val.user.id
      this.formInline.user_id = val.user.id
    },
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initRemarks(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initRemarks(this.formInline)
        return
      }
      this.initRemarks(value)
    },
    // 数据初始化
    initRemarks (formInline) {
      this.tableConfig.loading = true
      backstagePaymentWithdrawalRemarksListHttp(this.theWithdrawalTicketInfo.user.id, formInline).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // drop list
    backstagePaymentWithdrawalRemarksDropListHttp () {
      backstagePaymentWithdrawalRemarksDropListHttp().then(res => {
        this.remarkDropList = res
      }).catch(() => {
      })
    },
    // 删除Remark
    backstagePaymentWithdrawalRemarksDeleteHttp (id, value) {
      backstagePaymentWithdrawalRemarksDeleteHttp(id, value).then(res => {
        this.$message.success('Success!')
        this.refreshTheRemarks()
      }).catch(() => {
        this.$message.error('Error!')
      })
    },
    // refreshTheRemarks
    refreshTheRemarks () {
      this.initRemarks(this.formInline)
      this.remarks.formStatus = false
      this.$emit('refresh')
    }
  },
  created () {
    this.initRemarks(this.formInline)
    this.backstagePaymentWithdrawalRemarksDropListHttp()
  }
}
</script>
