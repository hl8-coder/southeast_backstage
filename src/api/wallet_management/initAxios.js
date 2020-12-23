import axios from 'axios'
import qs from 'qs'
import {
  backstageWalletManagementMemberTransferManagement,
  backstageManualSuccess,
  backstageManualFail,
  backstageManualChecking,
  backstageWalletManagementMemberTransferManagementDropList,
  backstageWalletManagementMemberTransferManagementStore
} from './apiMeun'

export const backstageWalletManagementMemberTransferManagementHttp = (data) => {
  return axios.get(backstageWalletManagementMemberTransferManagement,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}

export const backstageWalletManagementMemberTransferManagementStoreHttp = (data) => {
  return axios.post(backstageWalletManagementMemberTransferManagementStore,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 下拉菜单
export const backstageWalletManagementMemberTransferManagementDropListHttp = (data) => {
  return axios.get(backstageWalletManagementMemberTransferManagementDropList,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// approve
export const backstageManualSuccessHttp = (id, data) => {
  return axios.patch(backstageWalletManagementMemberTransferManagement + '/' + id + backstageManualSuccess,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// reject
export const backstageManualFailHttp = (id, data) => {
  return axios.patch(backstageWalletManagementMemberTransferManagement + '/' + id + backstageManualFail,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}

export const backstageCheckingHttp = (id) => {
  const url = backstageManualChecking.replace('{game_platform_transfer_detail}', id);
  return axios.patch(url).then(res => Promise.resolve(res))
}
