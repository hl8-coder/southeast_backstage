<template>
  <div class="AffiliateFundTransfers">
    <affiliate-fund-transfer-nav
      :user_name="formInline.user_name"
      @searchMemberCode = searchMemberCode
    />
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    />
    <div class="TheTotalInfo">
      <el-tag>{{totalInfo.transactions}} transactions</el-tag>
      <el-tag type="success">(+) {{totalInfo.amount_add}}</el-tag>
      <el-tag type="danger">(-) {{totalInfo.amount_dec}}</el-tag>
    </div>
    <table-comp
      v-if="formInline.user_name"
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange = callbacks
    />
    <el-dialog
      title="Add Adjustment"
      :visible.sync="addAdjustmentInfo.statusFormVisible"
      @close="handleClose"
    >
      <el-form
        ref="form"
        label-width="150px"
      >
        <el-form-item label="">
          <el-radio-group
            v-model="form.type"
          >
            <el-radio
              @change="radioChange"
              v-for="item in addAdjustmentInfo.dropList.type"
              :label="item.key"
              :key="item.key"
            >
              {{item.value}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Member code">
          <el-input
            v-model="formInline.user_name"
            readonly
          />
        </el-form-item>
        <el-form-item label="Amount">
          <el-input
            v-model="form.amount"
          />
        </el-form-item>
<!--        <el-form-item-->
<!--          label="Turnover"-->
<!--          v-if="withdrawalOrDeposit"-->
<!--        >-->
<!--          <el-input-->
<!--            v-model="turnover"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Turnover Amt" v-if="withdrawalOrDeposit">-->
<!--          <el-input readonly v-model="form.turnover_closed_value"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="Related Txn ID" v-if="!withdrawalOrDeposit">
          <el-input v-model="form.related_order_no"></el-input>
        </el-form-item>
        <el-form-item label="Category">
          <el-select v-model="form.category" placeholder="Select a category">
            <el-option v-for="item in addAdjustmentInfo.dropList.affiliate_category" :value="item.key" :label="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="Platform">-->
<!--          <el-select v-model="form.platform_code" placeholder="Select a product">-->
<!--            <el-option v-for="item in addAdjustmentInfo.dropList.platform_code" :value="item.key" :label="item.value" :key="item.value"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="Reason">
          <el-input type="textarea" v-model="form.reason"></el-input>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary">Approve</el-button>
          <el-button @click="addAdjustmentInfo.statusFormVisible = false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import AffiliateFundTransferNav from '../../components/nav/AffiliateFundTransferNav'
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import numeral from 'numeral'
import {
  backstageAdjustmentsHttp,
  backstageDropListAdjustmentsHttp,
  patchBackstageAdjustments,
  deleteBackstageAdjustments,
  backstageUsersAdjustments
} from '../../api/adjustments/initAxios'
import element from '../../config/element'
export default {
  name: 'AffiliateFundTransfers',
  components: {
    TableComp,
    FormInlineComp,
    AffiliateFundTransferNav
  },
  data () {
    return {
      formInlineConfig: [
        {
          type: 'defaultMonth',
          formValue: 'date',
          label: 'Date',
          value: ''
        },
        {
          type: 'defaultSelect',
          formValue: 'status',
          placeholder: 'Select A Status',
          clearable: true,
          label: 'Transaction Status',
          value: '',
          list: ''
        },
        {
          type: 'defaultSelect',
          formValue: 'type',
          placeholder: 'Select A Type',
          label: 'Type',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'defaultSelect',
          formValue: 'category',
          placeholder: 'Select A Adjustment Category',
          label: 'Adjustment Category',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          formValue: 'id',
          placeholder: 'Transaction ID',
          value: ''
        },
        {
          type: 'input',
          formValue: 'reason',
          placeholder: 'Adjustment Reason',
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
        is_agent: 1,
        category: '',
        reason: '',
        start_at: '',
        end_at: '',
        per_page: 50,
        page: 1
      },
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
            label: 'TYPE',
            render: (h, params) => {
              if (params.item.type === 'Deposit') {
                return h('div', [
                  h('span', {}, '+')
                ])
              } else {
                return h('div', [
                  h('span', {}, '-')
                ])
              }
            }
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'amount',
            label: 'AMOUNT'
          },
          {
            prop: 'category',
            label: 'CATEGORY'
          },
          {
            prop: 'platform_code',
            label: 'PLATFORM'
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
            prop: 'id',
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
      totalInfo: {
        transactions: 0,
        amount_dec: '0.00',
        amount_add: '0.00'
      },
      form: {
        type: 1,
        amount: '',
        category: '',
        is_agent: 1,
        platform_code: '',
        reason: '',
        remark: '',
        related_order_no: '',
        turnover_closed_value: ''
      },
      addAdjustmentInfo: {
        statusFormVisible: false,
        dropList: ''
      },
      withdrawalOrDeposit: true,
      turnover: ''
    }
  },
  methods: {
    // 顶部搜索
    searchMemberCode (val) {
      this.formInline.user_name = val
      this.initHttp(this.formInline)
    },
    // 获取列表
    initHttp (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilterByEcho(formInline, [], ['per_page', 'page'])
      this.tableConfig.loading = true
      backstageAdjustmentsHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
        this.totalInfo = res.meta.total
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 下拉菜单
    dropListHttp () {
      backstageDropListAdjustmentsHttp().then(res => {
        this.addAdjustmentInfo.dropList = res
        filter.formValueListFilter(this.formInlineConfig, res, ['status', 'category', 'type'])
      }).catch(() => {
      })
    },
    // 回调
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
      this.name = this.formInline.user_name
      value.user_name = this.formInline.user_name
      value.is_agent = this.formInline.is_agent
      this.initHttp(value)
    },
    // 添加
    onAdd () {
      this.addAdjustmentInfo.statusFormVisible = true
    },
    // 关闭弹窗
    handleClose () {
      this.turnover = ''
      this.withdrawalOrDeposit = true
      this.form = {
        type: 1,
        amount: '',
        category: '',
        is_agent: 1,
        platform_code: '',
        reason: '',
        remark: '',
        turnover_closed_value: ''
      }
    },
    // 提交
    onSubmit () {
      if (!this.formInline.user_name) {
        element.message({
          type: 'error',
          message: 'Please enter the Member Code'
        })
        return
      }
      backstageUsersAdjustments(this.formInline.user_name, this.form).then(res => {
        element.message({
          type: 'success',
          message: 'add success'
        })
        this.addAdjustmentInfo.statusFormVisible = false
        this.form = {
          type: 1,
          amount: '',
          category: '',
          platform_code: '',
          is_agent: 1,
          reason: '',
          remark: '',
          turnover_closed_value: ''
        }
        this.initHttp(this.formInline)
      }).catch((error) => {
        console.log(error)
      })
    },
    // 单选
    radioChange (val) {
      if (val === 2) {
        this.withdrawalOrDeposit = false
      } else {
        this.withdrawalOrDeposit = true
      }
    },
    // 修改状态
    promptInfo (item) {
      if (item.status === 'Successful') {
        const h = this.$createElement
        this.$msgbox({
          customClass: 'memberListing-table',
          message: h('div', null, [
            h('el-table', {
              props: {
                data: [
                  item
                ]
              }
            }, [
              h('el-table-column', {
                props: {
                  property: 'verified_admin_name',
                  label: 'Update By'
                }
              }),
              h('el-table-column', {
                props: {
                  property: 'turnover_closed_value',
                  label: 'Turnover Amt'
                }
              }),
              h('el-table-column', {
                props: {
                  property: 'turnover_current_value',
                  label: 'Current Turnover Amt'
                }
              }),
              h('el-table-column', {
                props: {
                  property: 'display_is_turnover_closed',
                  label: 'Meet Rollover'
                }
              }),
              h('el-table-column', {
                props: {
                  property: 'related_order_no',
                  label: 'Related Txn ID'
                }
              }),
              h('el-table-column', {
                props: {
                  property: 'verified_at',
                  label: 'Update At'
                }
              })
            ])
          ]),
          showCancelButton: false,
          beforeClose: (action, instance, done) => {
            done()
          }
        }).then(action => {
          console.log(action)
        })
        return
      } else if (item.status === 'Rejected') {
        const h = this.$createElement
        this.$msgbox({
          customClass: 'memberListing-table',
          message: h('div', null, [
            h('el-table', {
              props: {
                data: [
                  item
                ]
              }
            }, [
              h('el-table-column', {
                props: {
                  property: 'verified_admin_name',
                  label: 'Update By'
                }
              }),
              h('el-table-column', {
                props: {
                  property: 'verified_at',
                  label: 'Update At'
                }
              }),
              h('el-table-column', {
                props: {
                  property: 'remark',
                  label: 'Remark'
                }
              })
            ])
          ]),
          showCancelButton: false,
          beforeClose: (action, instance, done) => {
            done()
          }
        }).then(action => {
          console.log(action)
        })
        return
      }
      this.$confirm('Successful？', 'Decision', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'APPROVE',
        cancelButtonText: 'CANCEL',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = 'Loading...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      })
        .then(() => {
          patchBackstageAdjustments(item.id).then(res => {
            this.initHttp(this.formInline)
            element.message({
              type: 'success',
              message: 'Successful already'
            })
          }).catch((error) => {
            this.initHttp(this.formInline)
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
  activated () {
    this.dropListHttp()
    let name = this.$route.query.name
    if (name) {
      this.formInline.user_name = name
      this.initHttp(this.formInline)
    } else {
      this.tableConfig.loading = false
    }
  },
  watch: {
    'form.amount' (newvalue, oldvalue) {
      if (this.addAdjustmentInfo.statusFormVisible) {
        this.form.amount = filter.numeralChange(newvalue, oldvalue)
      }
    }
  }
}
</script>

<style scoped>

</style>
