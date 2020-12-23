<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="SystemBoAdminManagement">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    >
      <!--<template v-slot:content>-->
      <!--sss-->
      <!--</template>-->
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog :title="dialogConfig.title" width="600px" :visible.sync="dialogConfig.visible">
      <form-inline-comp
        inline="false"
        formLabelWidth="140px"
        :formInlineConfig = dialogConfig.formConfig
        @onSubmit = Submit
      />
    </el-dialog>
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import moment from 'moment'
import tableComp from '../../components/table/tableComp'
import {backstageCrmBoAdminsHttp, postBackstageCrmBoAdminsHttp, patchBackstageCrmBoAdminsHttp, deleteBackstageCrmBoAdminsHttp, dropListCrmAdminHttp} from '../../api/system/initAxios'
import filter from '../../util/filter'
export default {
  name: 'SystemBoAdminManagement',
  data () {
    return {
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'id',
          label: 'ID',
          width: '60'
        }, {
          prop: 'admin_id',
          label: 'Admin ID',
          width: '60'
        }, {
          prop: 'admin_name',
          label: 'Admin Name',
          width: '80',
          render: (h, params) => {
            return h('el-link', {
              style: {
                color: '#409EFF'
              },
              on: {
                click: () => {
                  this.dialogConfig = {
                    visible: true,
                    title: 'Update',
                    id: params.item.id,
                    formConfig: [
                      {
                        type: 'input',
                        label: 'Name',
                        formValue: 'admin_id',
                        placeholder: 'Name',
                        disabled: true,
                        value: params.item.admin_id
                      },
                      {
                        type: 'select',
                        label: 'Status',
                        formValue: 'status',
                        placeholder: 'Select A Status',
                        clearable: true,
                        value: params.item.status,
                        list: this.dropList.status
                      },
                      {
                        type: 'timeSelect',
                        label: 'Start Worked At',
                        formValue: 'start_worked_at',
                        value: params.item.start_worked_at
                      },
                      {
                        type: 'timeSelect',
                        label: 'End Worked At',
                        formValue: 'end_worked_at',
                        value: params.item.end_worked_at
                      },
                      {
                        type: 'Submit'
                      }
                    ]
                  }
                }
              }
            }, params.item.admin_name)
          }
        }, {
          prop: 'display_status',
          label: 'Status',
          width: '80'
        }, {
          prop: 'start_worked_at',
          label: 'Start Worked At',
          width: '160'
        }, {
          prop: 'end_worked_at',
          label: 'End Worked At',
          width: '160'
        }, {
          prop: 'created_at',
          label: 'Created At',
          width: '160'
        }, {
          prop: 'updated_at',
          label: 'Updated At',
          width: '160'
        }, {
          prop: 'delect',
          label: 'Delect',
          width: '60',
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
                      deleteBackstageCrmBoAdminsHttp(params.item.id).then(res => {
                        this.initHttp(this.formInline)
                      })
                    }).catch(() => {
                    })
                  }
                }
              })
            ])
          }
        }]
      },
      resInformation: {},
      formInlineConfig: [
        {
          type: 'input',
          label: 'Name',
          formValue: 'admin_name',
          placeholder: 'Products',
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
        per_page: 50,
        page: 1,
        admin_name: ''
      },
      dialogConfig: {
        visible: false,
        title: '',
        formConfig: [
          {
            type: 'input',
            label: 'Name',
            formValue: 'admin_id',
            placeholder: 'Name',
            value: ''
          },
          {
            type: 'select',
            label: 'Status',
            formValue: 'status',
            placeholder: 'Select A Status',
            clearable: true,
            value: '',
            list: []
          },
          {
            type: 'timeSelect',
            label: 'Start Worked At',
            formValue: 'start_worked_at',
            value: ''
          },
          {
            type: 'timeSelect',
            label: 'Start Worked At',
            formValue: 'end_worked_at',
            value: ''
          },
          {
            type: 'Submit'
          }
        ]
      },
      dropList: {}
    }
  },
  components: {
    tableComp, formInlineComp
  },
  created () {
    this.dropListCrmAdminHttp()
    this.initHttp(this.formInline)
  },
  methods: {
    dropListCrmAdminHttp () {
      dropListCrmAdminHttp().then(res => {
        this.dropList = res
        // filter.formValueListFilter(this.formInlineConfig, res, ['menu_id', 'method'])
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
    },
    // memberDropList下拉菜单
    onAdd () {
      this.dialogConfig = {
        visible: true,
        title: 'Create',
        formConfig: [
          {
            type: 'input',
            label: 'Name',
            formValue: 'admin_id',
            placeholder: 'Name',
            value: ''
          },
          {
            type: 'select',
            label: 'Status',
            formValue: 'status',
            placeholder: 'Select A Status',
            clearable: true,
            value: '',
            list: this.dropList.status
          },
          {
            type: 'timeSelect',
            label: 'Start Worked At',
            formValue: 'start_worked_at',
            value: ''
          },
          {
            type: 'timeSelect',
            label: 'End Worked At',
            formValue: 'end_worked_at',
            value: ''
          },
          {
            type: 'Submit'
          }
        ]
      }
    },
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      this.tableConfig.loading = true
      var datalist = filter.formInlineFilter(formInline)
      backstageCrmBoAdminsHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    Submit (form) {
      form.start_worked_at = moment(form.start_worked_at).format('hh:mm:ss')
      form.end_worked_at = moment(form.end_worked_at).format('hh:mm:ss')
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'YES',
        cancelButtonText: 'NO',
        type: 'warning'
      }).then(() => {
        if (this.dialogConfig.title === 'Update') {
          patchBackstageCrmBoAdminsHttp(this.dialogConfig.id, form).then(res => {
            this.initHttp(this.formInline)
            this.dialogConfig.visible = false
          })
        } else {
          postBackstageCrmBoAdminsHttp(form).then(res => {
            this.initHttp(this.formInline)
            this.dialogConfig.visible = false
          })
        }
      })
    }
  }
}
</script>
