<template>
  <div class="MemberProfileNavs">
    <ul class="FlexRowFlexStartFlexStart childrenNav">
      <li
        v-for="item in navs"
        :key="item.name"
      >
        <el-button
          :type="$route.name===item.routeName ? 'success': null"
          @click="buttonClick(item.routeName, id, item.breadcrumb)"
        >
          {{ item.name }}
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MemberProfileNavs',
  data () {
    return {
      navs: [
        {
          name: 'Members Profile',
          routeName: 'members_profile',
          breadcrumb: ['members', 'Member Listing (CS)', 'Members Profile']
        },
        {
          name: 'CRM Call Logs',
          routeName: 'members_crm_call_logs',
          breadcrumb: ['members', 'Member Listing (CS)', 'CRM Call Logs']
        }
      ],
      id: ''
    }
  },
  methods: {
    buttonClick (routeName, id, breadcrumb) {
      this.$router.push({name: routeName, query: {id: id, breadcrumb: JSON.stringify(breadcrumb)}})
    }
  },
  activated () {
    let id = this.$route.query.id
    if (id) {
      this.id = id
    }
  }
}
</script>

<style scoped>

</style>
