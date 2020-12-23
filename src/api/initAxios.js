import axios from 'axios'
// import router from '../router'
// import store from '../vuex'
import qs from 'qs'
// import {axios} from './config'
import {
  backstagedminsMenu,
  backstageAuthorizations,
  backstageAuthorizationsCurrent,
  backstagDropListGlobal,
  backstageAdminChangePassword,
  backstageGeOoperationId
} from './apiMeun'
// 菜单
export const backstagedminsMenuHttp = () => {
  return axios.get(backstagedminsMenu, {})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 登陆
export const loginInHttp = (data) => {
  return axios.post(backstageAuthorizations, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 登出
export const logoutHttp = () => {
  return axios.delete(backstageAuthorizationsCurrent, {})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 菜单
export const backstagDropListGlobalHttp = () => {
  return axios.get(backstagDropListGlobal, {})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 修改admin密码
export const backstageAdminChangePasswordHttp = (data) => {
  return axios.patch(backstageAdminChangePassword, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 平台名称
export const backstageGeOoperationIdHttp = () => {
  return axios.get(backstageGeOoperationId, {})
    .then((res) => {
      return Promise.resolve(res)
    })
}
