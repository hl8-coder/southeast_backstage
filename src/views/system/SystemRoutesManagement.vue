<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="SystemRoutesManagement">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
      @onRefresh = onRefresh
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
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import {backstageRoutesHttp, backstageRoutesUpdateHttp} from '../../api/system/initAxios'
import filter from '../../util/filter'
import element from '../../config/element'
export default {
  name: 'SystemRoutesManagement',
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
          prop: 'name',
          label: 'Name',
          width: '200'
        }, {
          prop: 'method',
          label: 'Method',
          width: '80'
        }, {
          prop: 'action',
          label: 'Action',
          width: '150'
        }, {
          prop: 'remark',
          label: 'Remark',
          width: '200'
        }, {
          prop: 'url',
          label: 'URL',
          width: '200'
        }, {
          prop: 'created_at',
          label: 'Created At',
          width: '160'
        }, {
          prop: 'updated_at',
          label: 'Updated At',
          width: '160'
        }, {
          prop: 'version',
          label: 'Version',
          width: '50'
        }, {
          prop: 'location',
          label: 'Location',
          width: '100'
        }]
      },
      resInformation: {},
      formInlineConfig: [
        {
          type: 'input',
          label: 'URL',
          formValue: 'url',
          placeholder: 'URL',
          value: ''
        },
        {
          type: 'input',
          label: 'Name',
          formValue: 'name',
          placeholder: 'Name',
          value: ''
        },
        {
          type: 'search'
        },
        {
          type: 'refresh'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        url: '',
        name: ''
      }
    }
  },
  components: {
    tableComp, formInlineComp
  },
  created () {
    this.initHttp(this.formInline)
  },
  methods: {
    onRefresh () {
      backstageRoutesUpdateHttp().then(res => {
        element.message({
          type: 'success',
          message: 'success'
        })
        this.initHttp(this.formInline);
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
      backstageRoutesHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    }
  }
}
</script>
