<template>
  <div class="AffiliateMemberDetail">
    <sub-nav
      :navs="navs"
    />
    <table-comp
      :tableConfig="tableConfig"
      :resInformation="resInformation"
      @handleSizePageChange =  callbacks
    ></table-comp>
  </div>
</template>

<script>
import SubNav from '../../components/nav/SubNav'
import TableComp from '../../components/table/tableComp'
import {
  backstageGameManagementGamePlatformsDropListSubUsersHttp
} from '../../api/affiliate/initAxios'
import filter from '../../util/filter'
export default {
  name: 'AffiliateMemberDetail',
  components: {TableComp, SubNav},
  data () {
    return {
      navs: [
        {
          name: 'affiliate Profile',
          routeName: 'affiliate_profile',
          parameter: 'id',
          param: 1
        },
        {
          name: 'affiliate Summary',
          routeName: 'affiliate_summary',
          parameter: 'id',
          param: 1
        },
        {
          name: 'affiliate Member Detail',
          routeName: 'affiliate_member_detail',
          parameter: 'id',
          param: 1
        },
        {
          name: 'Summary Of Comm',
          routeName: 'summary_of_comm',
          parameter: 'id',
          param: 1
        }
      ],
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'NO'
          },
          {
            prop: 'name',
            label: 'Member code',
            render: (h, params) => {
              return h('div', [
                h('el-Link', {
                  props: {
                    size: 'small',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'members_profile', query: {id: params.item.id}})
                    }
                  }
                }, params.item.name)
              ])
            }
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'display_status',
            label: 'Status'
          },
          {
            prop: 'display_risk_group_id',
            label: 'Risk Category'
          },
          {
            prop: 'display_payment_group_id',
            label: 'payment Group'
          },
          {
            prop: 'created_at',
            label: 'Registeration Date'
          },
          {
            prop: 'info.register_ip',
            label: 'Registrer IP'
          }
        ]
      },
      resInformation: {},
      formInline: {
        include: 'info',
        per_page: 50,
        page: 1
      }
    }
  },
  methods: {
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
    // 初始化
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.include = 'info'
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      delete formInline.auto_refresh
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageGameManagementGamePlatformsDropListSubUsersHttp(this.$route.query.id, datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
      // this.affiliateProfileData.data = list
    },
  },
  activated () {
    this.initHttp(this.formInline)
  }
}
</script>

<style scoped>

</style>
