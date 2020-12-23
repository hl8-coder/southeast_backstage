import axios from 'axios'
// import router from '../router'
// import store from '../vuex'
import qs from 'qs'
// import {axios} from './config'
import {
  backstageDropListAdjustments,
  backstageAdjustments,
  backstageUsers,
  adjustments,
  approve,
  backstageGamePlatformProductRelation,
  backstageCloseAdjustment,
  backstageDownloadAdjustment
} from './apiMeun'
// adjustments 列表
export const backstageAdjustmentsHttp = (data) => {
  return axios.get(backstageAdjustments, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// adjustments DropList
export const backstageDropListAdjustmentsHttp = (data) => {
  return axios.get(backstageDropListAdjustments, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// download Excel
export const backstageDownloadExcel = (data) => {
  return axios.get(backstageDownloadAdjustment, {
    params: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    'responseType': 'blob'
  })
    .then((res) => {
      return Promise.resolve(res)
    })
}
// adjustments DropList
export const backstageGamePlatformProductRelationsHttp = (data) => {
  return axios.get(backstageGamePlatformProductRelation, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加 Adjustment
export const backstageUsersAdjustments = (user, data) => {
  return axios.post(backstageUsers + '/' + user + adjustments, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// delete adjustments
export const deleteBackstageAdjustments = (user, data) => {
  return axios.delete(backstageAdjustments + '/' +  user, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 同意 adjustments
export const patchBackstageAdjustments = (user, data) => {
  return axios.patch(backstageAdjustments + '/' + user + approve, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}

export const deleteBackstageCloseAdjustment = (id, data) => {
  const apiUrl = backstageCloseAdjustment.replace('{adjustment}', id);
  return axios.delete(apiUrl, {params: data}).then(res => Promise.resolve(res))
}
