<style  lang="scss" scoped type="text/scss">
  #headContain{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-width: $Min-Full-Screen;
    z-index: 1000;
    background: white;
    .Header{
      overflow: hidden;
      .logout{
        float: right;
        margin-right: 10px;
        line-height: 45px;
      }
    }
    .bodyContain{
      padding: 0 10px;
      overflow-y: scroll;
    }
    .breadcrumbNow {
      background: #1d5289;
      color: white;
      width: 100%;
      text-align: center;
      font-size: 16px;
      line-height: 22px;
    }
  }
</style>
<style lang="scss" type="text/scss">
  #headContain .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 45px;
    line-height: 45px;
    padding: 0 10px;
  }
  #headContain .el-tabs__header {
    margin: 5px 0;
  }
  #headContain {
    .el-breadcrumb {
      padding: 5px 10px;
      background: white;
      .el-breadcrumb__inner {
        font-size: 14px;
        color: #999;
      }
      .el-breadcrumb__separator {
        font-size: 14px;
        color: #999;
      }
      .el-breadcrumb__item:last-child {
        .el-breadcrumb__inner {
          color: #333;
          font-weight: 600;
        }
      }
    }
  }
</style>
<template>
  <div id="headContain">
    <div class="Header">
      <el-menu
        :default-active="activeIndex"
        :collapse-transition="collapseTransition"
        class="el-menu-demo"
        id="el_menu_demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu
          v-for="item in headerMenu"
          :index="item.code"
          :key="item.code"
          v-if="item.is_show"
          :show-timeout="10"
          :hide-timeout="10"
        >
          <template slot="title">{{item.name}}</template>
          <el-menu-item
            v-for="item1 in item.children"
            v-if="(item1.is_show && item1.children.length == 0) || item1.code == 'members_member_listing_cs_payment'"
            :index="item1.code"
            :key="item1.name" >
            <div @click="routerTo(item1.code, $event, item.name, item1.name)">{{item1.name}}</div>
          </el-menu-item>
          <el-submenu
            v-for="item2 in item.children"
            v-if="item2.is_show && item2.children.length != 0"
            :index="item2.code"
            :key="item2.code"
            :show-timeout="10"
            :hide-timeout="10"
          >
            <template slot="title">⭐️{{item2.name}}</template>
            <el-menu-item
              v-for="item3 in item2.children"
              v-if="item3.is_show"
              :index="item3.code"
              :key="item3.name"
            >
              <div @click="routerTo(item3.code, $event, item.name, item2.name, item3.name)">{{item3.name}}</div>
            </el-menu-item>
          </el-submenu>
        </el-submenu>
        <div class="logout">
          <span @click="dialog.status = true">
            <span style="color: #fff">{{ admin_name }}</span>
          </span>
          <el-popover
            placement="top"
            width="160"
            v-model="visible">
            <p>Are you sure？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">cancel</el-button>
              <el-button type="primary" size="mini" @click="LogoutHttp">Submit</el-button>
            </div>
            <el-button slot="reference"  size="mini" type="info" icon="el-icon-switch-button">Exit</el-button>
          </el-popover>
        </div>
      </el-menu>
    </div>
    <el-breadcrumb separator=">>">
      <el-breadcrumb-item v-for="item in breadcrumb" :key="item">
        {{item}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="breadcrumbNow" v-for="(item, key) in breadcrumb" :key="item" v-if="key === Number(breadcrumb.length-1)">{{item}}</div>
    <el-dialog
      title="Change Password"
      append-to-body
      :visible.sync="dialog.status"
    >
      <el-form
        label-width="150px"
      >
        <el-form-item
          label="Password"
        >
          <el-input
            v-model="form.password"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item
          label="Confirm Password"
        >
          <el-input
            v-model="form.password_confirmation"
            style="max-width: 220px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePwd">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--<div class="HeaderTabs" @contextmenu.prevent="onmousedown($event)">-->
    <!--<el-tabs v-model="editableTabsValue" ref="HeaderTabs" type="card" closable @tab-click="tabClick" @tab-remove="removeTab">-->
    <!--<el-tab-pane-->
    <!--v-for="item in editableTabs"-->
    <!--:key="item.name"-->
    <!--:label="item.name"-->
    <!--:name="item.code"-->
    <!--&gt;-->
    <!--</el-tab-pane>-->
    <!--</el-tabs>-->
    <!--</div>-->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {
  logoutHttp,
  backstageAdminChangePasswordHttp
} from '../../api/initAxios'
import avatar from '../../assets/img/avatar/avatar.jpg'
import storejs from 'storejs'
import element from '../../config/element'
export default {
  name: 'Header',
  data () {
    return {
      collapseTransition: false,
      activeIndex: 'sop_user_listing',
      editableTabsValue: 'sop_user_listing',
      visible: false,
      code: '',
      push: true,
      avatar: avatar,
      dialog: {
        status: false
      },
      form: {
        password: '',
        password_confirmation: ''
      },
      breadcrumb: [],
      admin_name: ''
    }
  },
  computed: {
    ...mapGetters([
      'editableTabs',
      'headerMenu'
    ])
  },
  mounted () {
    this.admin_name = storejs.get('admin_name')
    this.$nextTick(() => {
      if (this.$route.query.breadcrumb) {
        let breadcrumb = this.$route.query.breadcrumb
        this.breadcrumb = JSON.parse(breadcrumb)
        this.activeIndex = this.$route.name
        document.title = JSON.parse(breadcrumb)[JSON.parse(breadcrumb).length - 1]
      }
      // this.bodyContainSelfAdaption()
    })
    // console.log(this.$route.query.breadcrumb)
    // this.editableTabsValue = this.$route.name
  },
  updated () {
    // 内容自适应
    this.$nextTick(() => {
      this.bodyContainSelfAdaption()
      window.onresize = () => {
        this.bodyContainSelfAdaption()
      }
    })
  },
  watch: {
    '$route.name' () {
      if (this.$route.query.breadcrumb) {
        let breadcrumb = this.$route.query.breadcrumb
        this.breadcrumb = JSON.parse(breadcrumb)
        this.activeIndex = this.$route.name
        document.title = JSON.parse(breadcrumb)[JSON.parse(breadcrumb).length - 1]
      }
    }
  },
  methods: {
    ...mapActions([
      'SetHeaderMenu',
      'SetEditAbleTabs'
    ]),
    // 内容自适应
    bodyContainSelfAdaption () {
      let Header = document.getElementById('headContain').offsetHeight
      let bodyContain = document.getElementById('bodyContain')
      if (Header < 100 && Header > 45) {
        bodyContain.style.paddingTop = '100px'
      } else if (Header < 170 && Header >= 100) {
        bodyContain.style.paddingTop = '145px'
      }
    },
    // 退出登录
    LogoutHttp () {
      logoutHttp().then(res => {
        this.$router.push({name: 'login'})
        storejs.remove('access_token')
      }).catch(() => {
      })
    },
    // 菜单事件
    handleSelect (key, keyPath) {
      // this.push = true
      // var flag = false
      // this.editableTabs.forEach((item) => {
      //   if (item.code === key) {
      //     flag = true
      //   }
      // })
      // if (!flag) {
      //   this.code = key
      //   this.push = false
      // }
      // this.editableTabsValue = key
    },
    // tab事件
    // tabClick (targetName) {
    //   this.$router.push({path: targetName.name})
    //   this.activeIndex = targetName.name
    // },
    // 菜单事件跳转
    routerTo (name, event, item1, item2, item3) {
      let breadcrumb = []
      breadcrumb.push(item1, item2)
      if (item3) {
        breadcrumb.push(item3)
      }
      if (event.altKey || event.ctrlKey || event.metaKey) {
        let routeData = this.$router.resolve({
          name: name,
          query: {breadcrumb: JSON.stringify(breadcrumb)}
        })
        window.open(routeData.href, '_blank')
      } else {
        this.$router.push({
          name: name,
          query: {breadcrumb: JSON.stringify(breadcrumb)}
        })
        this.breadcrumb = breadcrumb
      }
    },
    changePwd () {
      backstageAdminChangePasswordHttp(this.form).then(res => {
        element.message({
          type: 'success',
          message: 'success'
        })
        this.dialog.status = false
        this.form = {
          password: '',
          password_confirmation: ''
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    // tab移除事件
    // removeTab (targetName) {
    //   let tabs = this.editableTabs
    //   let activeName = this.editableTabsValue
    //   if (activeName === targetName) {
    //     tabs.forEach((tab, index) => {
    //       if (tab.code === targetName) {
    //         let nextTab = tabs[index + 1] || tabs[index - 1]
    //         if (nextTab) {
    //           activeName = nextTab.code
    //           this.$router.push({name: activeName})
    //         }
    //       }
    //     })
    //   }
    //   this.editableTabsValue = activeName
    //   if (tabs.length > 1) {
    //     this.SetEditAbleTabs(tabs.filter(tab => tab.code !== targetName))
    //   } else {
    //     Message.error('不能删除所有标签')
    //   }
    // },
    // 菜单处理
    // routerName (item1, item2, item3) {
    //   let breadcrumb = []
    //   breadcrumb.push(item1, item2)
    //   if (item3) {
    //     breadcrumb.push(item3)
    //   }
    //   this.breadcrumb = breadcrumb
    //   // if (!this.push) {
    //   //   this.editableTabs.push({name: name, code: this.code})
    //   //   document.title = name
    //   //   console.log(name)
    //   //   this.SetEditAbleTabs(this.editableTabs)
    //   // }
    // },
    // onmousedown () {
    //   console.log('aaaaaaaaa')
    // }
  }
}
</script>
