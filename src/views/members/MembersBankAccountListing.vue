<template>
  <div class="BankAccountListing">
    <form-inline-comp
      :form-inline-config="formInlineConfig"
      @onSubmit = callbacks
    />
    <table-comp
      :table-config="tableConfig"
      :res-information="resInformation"
      @handleSizePageChange = callbacks
    />
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
import {backstageMemberBankAccountHttp, backstageMemberBankAccountUpdateStatusHttp, deleteBackstageMemberBankAccountHttp} from '../../api/members/initAxios'
import filter from '../../util/filter'
import FormInlineComp from '../../components/form/formInlineComp'
import element from '../../config/element'
import {mapGetters} from 'vuex'
export default {
  name: 'BankAccountListing',
  components: {FormInlineComp, TableComp},
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'user_name',
            label: 'Username',
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'bank_name',
            label: 'Bank Name',
          },
          {
            prop: 'branch',
            label: 'Branch Name',
          },
          {
            prop: 'city',
            label: 'City',
          },
          {
            prop: 'account_no',
            label: 'Account Number',
          },
          {
            prop: 'account_name',
            label: 'Account Name',
          },
          {
            prop: 'last_used_at',
            label: 'Last Updated',
          },
          {
            prop: 'status',
            label: 'Status',
          },
          {
            prop: 'user_name',
            label: 'Action',
            fixWidth: 200,
            render: (h, params) => {
              return h('div', [
                h('el-button', {
                  props: {
                    size: 'small',
                    type: 'warning'
                  },
                  style: {
                    marginRight: '5px',
                    color: '#fff',
                    border: 'none'
                  },
                  on: {
                    click: () => {
                      this.$confirm('Are you sure you want to edit?', 'Prompt', {
                        confirmButtonText: 'YES',
                        cancelButtonText: 'NO',
                        type: 'warning'
                      }).then(() => {
                        backstageMemberBankAccountUpdateStatusHttp(params.item.id, {status: 2}).then(res => {
                          element.message({
                            type: 'success',
                            message: 'success'
                          })
                          this.initBankAccountListing(this.formInline)
                        }).catch(error => {
                          console.log(error)
                        })
                      }).catch(() => {
                        console.log('cancel')
                      })
                    }
                  }
                }, 'Update'),
                h('el-button', {
                  props: {
                    size: 'small',
                    type: 'danger'
                  },
                  style: {
                    marginRight: '5px',
                    color: '#fff',
                    border: 'none'
                  },
                  on: {
                    click: () => {
                      this.$confirm('Are you sure you want to delete?', 'Prompt', {
                        confirmButtonText: 'YES',
                        cancelButtonText: 'NO',
                        type: 'warning'
                      }).then(() => {
                        deleteBackstageMemberBankAccountHttp(params.item.id).then(res => {
                          element.message({
                            type: 'success',
                            message: 'success'
                          })
                          this.initBankAccountListing(this.formInline)
                        }).catch(error => {
                          console.log(error)
                        })
                      }).catch(() => {
                        console.log('cancel')
                      })
                    }
                  }
                }, 'Delete')
              ])
            }
          }
        ]
      },
      resInformation: {},
      formInline: {
        page: 1,
        per_page: 50,
        currency: '',
        user_name: '',
        account_no: '',
        account_name: ''
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
          type: 'select',
          label: 'Currency',
          formValue: 'currency',
          placeholder: 'Select A Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'input',
          label: 'Bank account number',
          formValue: 'account_no',
          placeholder: 'Bank account number',
          value: ''
        },
        {
          type: 'input',
          label: 'Account Name',
          formValue: 'account_name',
          placeholder: 'Account Name',
          value: ''
        },
        {
          type: 'search'
        }
      ],
      updateDialogStatus: false
    }
  },
  methods: {
    initBankAccountListing (formInline) {
      this.tableConfig.loading = true
      if (!formInline) {
        return
      }
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageMemberBankAccountHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch(error => {
        console.log(error)
        this.tableConfig.loading = false
      })
    },
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initBankAccountListing(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initBankAccountListing(this.formInline)
        return
      }
      this.formInline.page = 1; // 点击formInline search带查询条件，必须重置分页页码
      this.initBankAccountListing(value)
    }
  },
  created () {
    filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
    this.initBankAccountListing(this.formInline)
  }
}
</script>

<style scoped>

</style>
