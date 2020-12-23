import axios from 'axios'
import qs from 'qs'
import {
  backstageActions,
  dropListAction,
  backstageAdmins,
  backstageCrmBoAdmins,
  dropListCrmAdmin,
  dropListAdmin,
  backstageRoutes,
  backstageRoutesUpdate,
  backstageMenu,
  backstageRoutesList,
  adminRoles,
  backstageAdminsChangePassord,
  backstageAdminsRoles,
  backstage,
  actionList,
  backstageAdminRoles,
  apiBackstageMenu,
  actions,
  actionsMenuRoute
} from './apiMeun'
// 管理员操作列表
export const backstageActionsHttp = (data) => {
  return axios.get(backstageActions, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加管理员操作列表
export const postBackstageActionsHttp = (data) => {
  return axios.post(backstageActions, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 更新管理员操作列表
export const patchtBackstageActionsHttp = (id, data) => {
  return axios.patch(backstageActions + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 更新管理员操作列表
export const deleteBackstageActionsHttp = (id, data) => {
  return axios.delete(backstageActions + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// dropList
export const dropListActionHttp = (data) => {
  return axios.get(dropListAction, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 管理员列表
export const backstageAdminsHttp = (data) => {
  return axios.get(backstageAdmins, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
actionsMenuRoute
// 创建 管理员列表
export const postBackstageAdminsHttp = (data) => {
  return axios.post(backstageAdmins, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 关联
export const actionsMenuRouteHttp = (data) => {
  return axios.post(actionsMenuRoute, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 创建 管理员列表
export const deleteBackstageAdminsHttp = (id) => {
  return axios.delete(backstageAdmins + '/' + id)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// BO 管理员列表
export const backstageCrmBoAdminsHttp = (data) => {
  return axios.get(backstageCrmBoAdmins, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 创建 BO 管理员列表
export const postBackstageCrmBoAdminsHttp = (data) => {
  return axios.post(backstageCrmBoAdmins, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 更新 BO 管理员列表
export const patchBackstageCrmBoAdminsHttp = (id, data) => {
  return axios.patch(backstageCrmBoAdmins + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 更新 BO 管理员列表
export const deleteBackstageCrmBoAdminsHttp = (id) => {
  return axios.delete(backstageCrmBoAdmins + '/' + id)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// bo dropList
export const dropListCrmAdminHttp = (data) => {
  return axios.get(dropListCrmAdmin, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Admin dropList
export const dropListAdminHttp = (data) => {
  return axios.get(dropListAdmin, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 管理员操作列表
export const backstageRoutesHttp = (data) => {
  return axios.get(backstageRoutes, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 管理员操作列表
export const backstageRoutesIdHttp = (id, data) => {
  return axios.get(backstageRoutes + '/' + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 管理员操作列表 更新操作
export const backstageRoutesUpdateHttp = (data) => {
  return axios.patch(backstageRoutesUpdate, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 菜单列表
export const backstageMenuHttp = (data) => {
  return axios.get(backstageMenu, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 菜单列表
export const apiBackstageMenuHttp = (id, data) => {
  return axios.get(apiBackstageMenu + '/' + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}

// 管理员操作列表
export const backstageRoutesListHttp = (data) => {
  return axios.get(backstageRoutesList, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 更新roles
export const backstageAdminsRolesHttp = (id, data) => {
  return axios.patch(backstageAdmins + '/' + id + adminRoles, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 修改管理员登陆密码
export const backstageAdminsChangePassordHttp = (id, data) => {
  return axios.patch(backstageAdminsChangePassord + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 管理员角色列表
export const getBackstageAdminsRolesHttp = (data) => {
  return axios.get(backstageAdminsRoles, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 更新管理员角色
export const putBackstageAdminsRolesHttp = (id, data) => {
  return axios.post(backstageAdminRoles + '/' + id + actions, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 创建管理员角色
export const postBackstageAdminsRolesHttp = (data) => {
  return axios.post(backstageAdminsRoles, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 创建管理员角色
export const patchBackstageAdminsRolesHttp = (id, data) => {
  return axios.patch(backstageAdminsRoles + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//
// 删除管理员角色
export const deleteBackstageAdminsRolesHttp = (id) => {
  return axios.delete(backstageAdminsRoles + '/' + id)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 可用权限列表
export const backstageActionListHttp = (id) => {
  return axios.get(backstage + '/' + id + actionList)
    .then((res) => {
      return Promise.resolve(res)
    })
}
