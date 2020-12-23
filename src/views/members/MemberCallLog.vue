<template>
  <div class="MemberCallLog">
    <div class="childrenNav">
      <ul class="childrenNav">
        <li>
          <el-button
            :type="$route.name==='members_profile' ? 'success': null"
            @click="$router.push({name: 'members_profile', query:{id:id}})">
            Members Profile
          </el-button>
        </li>
        <li>
          <el-button
            :type="$route.name==='members_call_log' ? 'success': null"
            @click="$router.push({name: 'members_call_log', query:{id:id}})">
            Members Call Log
          </el-button>
        </li>
      </ul>
    </div>
    <div>Member Listing (CS) >> Members Profile</div>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
    ></table-comp>
    <div class="FlexColumnCenterCenter">
      <el-button type="danger" @click="$router.go(-1)">Back previous page</el-button>
    </div>
  </div>
</template>

<script>
import TableComp from '../../components/table/tableComp'
export default {
  name: 'MemberCallLog',
  components: {TableComp},
  data () {
    return {
      id: '',
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'created_at',
            label: 'Date and Time'
          },
          {
            prop: '',
            label: 'Chat Log'
          },
          {
            prop: 'agent_name',
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
            prop: 'status',
            label: 'Status'
          }
        ]
      },
      resInformation: {}
    }
  },
  created () {
    this.id = this.$route.query.id
    this.initCallLog()
  },
  methods: {
    // 初始化 Call Log
    initCallLog () {
      this.tableConfig.loading = true
      this.tableConfig.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
  .childrenNav{
    margin-top: 20px;
    margin-bottom: 10px;
    .childrenNav{
      border-bottom: none;
      li{
        margin-right: 10px;
        display: inline-block;
      }
    }
  }
  .FlexColumnCenterCenter{
    margin-top: 20px;
  }
</style>
