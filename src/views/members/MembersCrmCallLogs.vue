<template>
  <div class="MembersCrmCallLogs">
    <member-profile-navs/>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange = callbacks
    />
  </div>
</template>

<script>
import MemberProfileNavs from '../../components/nav/MemberProfileNavs'
import TableComp from '../../components/table/tableComp'
import {backstageCrmMemberCallLogsHttp} from '../../api/crm/initAxios'
export default {
  name: 'MembersCrmCallLogs',
  components: {TableComp, MemberProfileNavs},
  data () {
    return {
      tableConfig: {
        loading: true,
        border: true,
        tableColumn: [
          {
            prop: 'created_at',
            label: 'Date and Time'
          },
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'crmOrder.admin_name',
            label: 'Agent'
          },
          {
            prop: 'channel',
            label: 'Channel'
          },
          {
            prop: 'category',
            label: 'Category'
          },
          {
            prop: 'comment',
            label: 'Comment'
          },
          {
            prop: 'call_status',
            label: 'Status'
          }
        ]
      },
      resInformation: {},
      id: '',
      formInline: {
        include: 'crmOrder',
        per_page: 50,
        page: 1
      }
    }
  },
  methods: {
    // 列表
    initHttp (formInline) {
      backstageCrmMemberCallLogsHttp(this.id, formInline).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    callbacks () {}
  },
  activated () {
    let id = this.$route.query.id
    if (id) {
      this.id = id
      this.initHttp(this.formInline)
    }
  }
}
</script>

<style scoped>

</style>
