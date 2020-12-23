<style lang="scss" scoped type="text/scss">
  .Login {
    padding: 0 !important;
    overflow-y: hidden !important;
    @extend %NowScreenHeight;
    background: url("../assets/img/Background/loginBG.jpg") no-repeat center center;
    background-size: 100% 100%;
    .MinWidthContain {
      .loginContain {
        background: rgba(0,0,0,.4);
        padding: 10px 20px;
        border-radius: 10px;
        > h2{
          font-size: 24px;
          color: white;
          text-align: center;
        }
      }
    }
  }
</style>
<style lang="scss" type="text/scss">
  .Login .el-form-item--mini.el-form-item,.Login .el-form-item--small.el-form-item {
    margin-bottom: 20px !important;
  }
</style>
<template>
  <div class="Login">
    <el-row class="FlexRowSpaceBetweenCenter" >
      <el-col class="MinWidthContain" :span="12">
        <div class="FlexColumnCenterCenter">
          <div class="loginContain">
            <h2>{{windowTitle}}平台</h2>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
              <el-form-item  prop="name">
                <el-input autofocus placeholder="Please input username" style="width: 300px;border-radius: 20px" size="large" type="name" v-model="ruleForm.name" autocomplete="off">
                  <i slot="prefix" style="font-size: 20px" class="el-input__icon el-icon-user"></i>
                </el-input>
              </el-form-item>
              <el-form-item  prop="password">
                <el-input
                  @keyup.enter.native="submitForm"
                  placeholder="Please input password" style="width: 300px" size="large" type="password"  v-model="ruleForm.password" autocomplete="off">
                  <i slot="prefix" style="font-size: 20px"  class="el-input__icon el-icon-lock"></i>
                </el-input>
              </el-form-item>

              <el-form-item>
                <el-button style="width: 300px" type="primary" :loading="loginLoading" @click="submitForm">
                  {{ loginLoading ? 'loading' : 'Login'}}
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import storejs from 'storejs'
import {loginInHttp, backstagDropListGlobalHttp, backstagedminsMenuHttp, backstageGeOoperationIdHttp} from '../api/initAxios'
import router from '../router'
import {mapActions} from 'vuex'
import element from '../config/element'
import routerFilter from '../util/routerFilter'

export default {
  name: 'Login',
  data () {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input username'))
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please input password'))
      }
    }

    return {
      securityCodeImg: '',
      loginLoading: false,
      rememberPassword: true,
      ruleForm: {
        name: '',
        password: ''
      },
      windowTitle: 'EG',
      rules: {
        name: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  activated () {
    backstageGeOoperationIdHttp().then(res => {
      this.windowTitle = res
      document.title = res + '平台'
    })
  },
  methods: {
    ...mapActions([
      'SetGlobalDropList',
      'SetHeaderMenu'
    ]),
    // 登录请求
    submitForm () {
      if (!this.ruleForm.name) {
        element.message({
          type: 'error',
          message: 'Please input username'
        })
        return false
      }
      if (!this.ruleForm.password) {
        element.message({
          type: 'error',
          message: 'Please input password'
        })
        return false
      }
      this.loginLoading = true
      loginInHttp(this.ruleForm).then(res => {
        this.ruleForm = {
          name: '',
          password: ''
        }
        storejs.set('access_token', res.access_token)
        storejs.set('admin_name', res.admin.name)
        this.loginLoading = false
        setTimeout(() => {
          if (storejs.get('access_token')) {
            this.moreRequist()
          }
        }, 500)
      }).catch(() => {
        this.loginLoading = false
      })
    },
    async moreRequist () {
      let isDropListGlobalHttp = await this.dropListGlobalHttp()
      let isAdminsMenuHttp = await this.adminsMenuHttp()
      if (isDropListGlobalHttp && isAdminsMenuHttp) {
        router.push({name: 'home'})
      } else {
        router.push({name: 'login'})
      }
    },
    // 全局droplist请求
    dropListGlobalHttp () {
      return backstagDropListGlobalHttp().then(res => {
        this.SetGlobalDropList(res)
        return true
      }).catch(error => {
        return false
      })
    },
    // 全局menu请求
    adminsMenuHttp () {
      return backstagedminsMenuHttp().then(res => {
        this.SetHeaderMenu(res)
        router.addRoutes(routerFilter.addRouterMethod(res).concat([{ // 这里调用addRoutes方法，动态添加符合条件的路由
          path: '*',
          redirect: '/404' // 所有不匹配路径(*)都重定向到404，为什么写在这里而不放到静态路由表里可以查看“前端路上”的文章
        }]))
        return true
      }).catch(error => {
        return false
      })
    }
  }
}
</script>
