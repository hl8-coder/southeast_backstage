import axios from 'axios'
// import router from '../router'
// import store from '../vuex'
import qs from 'qs'
// import {axios} from './config'
import {
  backstageRemarks,
  backstageDropListRemark, backstageAddRemarks
} from './apiMeun'
// 备注列表
export const backstageRemarksHttp = (data) => {
  return axios.get(backstageRemarks, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 备注DropList
export const backstageDropListRemarkHttp = (data) => {
  return axios.get(backstageDropListRemark, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加备注
export const postBackstageRemarksHttp = (data) => {
  return axios.post(backstageRemarks, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加备注
export const backstageAddRemarksHttp = (data) => {
  return axios.post(backstageAddRemarks, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 删除备注
export const deleteBackstageRemarksHttp = (id, data) => {
  return axios.delete(backstageRemarks + '/' + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
