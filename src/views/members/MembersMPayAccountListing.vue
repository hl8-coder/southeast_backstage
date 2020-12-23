<template>
  <div class="MembersMPayAccountListing">
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
import FormInlineComp from '../../components/form/formInlineComp'
import TableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import {mapGetters} from 'vuex'
import {backstageMemberMPayAccountListHttp, deleteBackstageMemberMPayAccountListHttp} from '../../api/members/initAxios'
export default {
  name: 'MembersMPayAccountListing',
  components: {TableComp, FormInlineComp},
  data () {
    return {
      tableConfig: {
        loading: true,
        border: true,
        tableColumn: [
          {
            prop: 'user_name',
            label: 'Member Code'
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'area_code',
            label: 'Country Code'
          },
          {
            prop: 'number',
            label: 'Number'
          },
          {
            prop: 'display_status',
            label: 'Status'
          },
          {
            prop: 'created_at',
            label: 'Create At'
          },
          {
            prop: 'last_used_at',
            label: 'Last Use At'
          },
          {
            prop: '',
            label: 'Delete',
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
                      this.$confirm('Are you sure you want to delete?', 'Prompt', {
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'Cancel',
                        type: 'warning'
                      }).then(() => {
                        deleteBackstageMemberMPayAccountListHttp(params.item.id).then(res => {
                          this.initHttp(this.formInline)
                        })
                      }).catch(() => {
                      })
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
        page: 1,
        per_page: 50,
        user_name: '',
        currency: ''
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
          label: 'Number',
          formValue: 'number',
          placeholder: 'Number',
          value: ''
        },
        {
          type: 'search'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  methods: {
    // 列表
    initHttp (formInline) {
      this.tableConfig.loading = true
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      backstageMemberMPayAccountListHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
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
    }
  },
  activated () {
    filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
    this.initHttp(this.formInline)
  }
}
</script>

<style scoped>

</style>
