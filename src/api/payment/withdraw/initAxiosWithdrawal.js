import axios from 'axios'
// import router from '../router'
// import store from '../vuex'
import qs from 'qs'
// import {axios} from './config'
import {
  backstagePaymentWithdrawalDropList,
  backstagePaymentWithdrawal,
  backstagePaymentWithdrawalOpenWithdrawal,
  receipt,
  withdrawalHold,
  withdrawalReleaseHold,
  withdrawalReview,
  withdrawalEscalate,
  withdrawalProcess,
  withdrawalDefer,
  withdrawalRemark,
  withdrawalReleaseDefer,
  withdrawalApprove,
  backstagePaymentWithdrawalRemarksList,
  backstagePaymentWithdrawalRemarksDropList,
  withdrawalRmApprove,
  withdrawalSecondApprove,
  withdrawalSecondReject,
  withdrawalRemarks,
  backstagePaymentWithdrawalWithdrawalRemarksList,
  withdrawalAddRecords,
  withdrawalLogs,
  backstagePaymentFastWithdrawal,
  backstagePaymentWithdrawalExportLogs,
  claim,
  unclaim
} from './apiMeunWithdrawal'
import {backstageExportDepositLogs} from '../deposit/apiMeun'
// payment >> Withdrawal Drop List
export const backstagePaymebtWithdrawalDropListHttp = () => {
  return axios.get(backstagePaymentWithdrawalDropList).then((res) => {
    return Promise.resolve(res)
  })
}
// Fast Withdrawal
export const backstagePaymentFastWithdrawalHttp = (data) => {
  return axios.get(backstagePaymentFastWithdrawal, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> Withdrawal 提现列表
export const backstagePaymentWithdrawalOpenWithdrawalHttp = (data) => {
  return axios.get(backstagePaymentWithdrawalOpenWithdrawal, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> Withdrawal 提现详情
export const backstagePaymentWithdrawalInfoHttp = (withdrawal, data) => {
  return axios.get(backstagePaymentWithdrawal + '/' + withdrawal, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> Withdrawal 上传凭证
export const backstagePaymentWithdrawalReceiptHttp = (withdrawal, data) => {
  return axios.post(backstagePaymentWithdrawal + '/' + withdrawal + receipt, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}
// payment >> Withdrawal 移除凭证
export const backstagePaymentWithdrawalReceiptRemoveHttp = (withdrawal, image) => {
  return axios.delete(backstagePaymentWithdrawal + '/' + withdrawal + receipt + image).then((res) => {
    return Promise.resolve(res)
  })
}
// payment >> Withdrawal HOLD
export const backstagePaymentWithdrawalHoldHttp = (withdrawal, data) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + withdrawalHold + '?include=bank,user.info,user.account,images',
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// payment >> Withdrawal 解除 HOLD
export const backstagePaymentWithdrawalReleaseHoldHttp = (withdrawal) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + withdrawalReleaseHold + '?include=bank,user.info,user.account,images'
  ).then((res) => {
    return Promise.resolve(res)
  })
}
export const backstagePaymentWithdrawalClaimHttp = (withdrawal) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + claim + '?include=bank,user.info,user.account,images'
  ).then((res) => {
    return Promise.resolve(res)
  })
}
export const backstagePaymentWithdrawalUnclaimHttp = (withdrawal) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + unclaim + '?include=bank,user.info,user.account,images'
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// payment >> Withdrawal 初步审核 Review
export const backstagePaymentWithdrawalReviewHttp = (withdrawal) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + withdrawalReview + '?include=bank,user.info,user.account,images'
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// payment >> Withdrawal 提升RM审核 Escalate
export const backstagePaymentWithdrawalEscalateHttp = (withdrawal, data) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + withdrawalEscalate + '?include=bank,user.info,user.account,images',
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// payment >> Withdrawal 拒绝
export const backstagePaymentWithdrawalRejectHttp = (withdrawal, data) => {
  return axios.delete(
    backstagePaymentWithdrawal + '/' + withdrawal + '?include=bank,user.info,user.account,images',
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// payment >> Withdrawal 复审 Process
export const backstagePaymentWithdrawalProcessHttp = (withdrawal) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + withdrawalProcess + '?include=bank,user.info,user.account,images'
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// payment >> Withdrawal 延缓提现 Defer
export const backstagePaymentWithdrawalDeferHttp = (withdrawal) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + withdrawalDefer + '?include=bank,user.info,user.account,images'
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// payment >> Withdrawal remark 添加备注
export const backstagePaymentWithdrawalRemarkHttp = (withdrawal, data) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + withdrawalRemark,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// payment >> Withdrawal ReleaseDefer 解除延缓提现
export const backstagePaymentWithdrawalReleaseDeferHttp = (withdrawal) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + withdrawalReleaseDefer + '?include=bank,user.info,user.account,images'
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// payment >> Withdrawal Approve 完成出款
export const backstagePaymentWithdrawalApproveHttp = (withdrawal) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + withdrawalApprove + '?include=bank,user.info,user.account,images'
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Remark列表
export const backstagePaymentWithdrawalRemarksListHttp = (user, data) => {
  return axios.get(
    backstagePaymentWithdrawalWithdrawalRemarksList + '/' + user + withdrawalRemarks,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// remark Drop List
export const backstagePaymentWithdrawalRemarksDropListHttp = () => {
  return axios.get(
    backstagePaymentWithdrawalRemarksDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 添加Remarks
export const backstagePaymentWithdrawalRemarksAddHttp = (data) => {
  return axios.post(
    backstagePaymentWithdrawalRemarksList,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 删除Remarks
export const backstagePaymentWithdrawalRemarksDeleteHttp = (remark, data) => {
  return axios.delete(
    backstagePaymentWithdrawalRemarksList + '/' + remark,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// RM 审核通过
export const backstagePaymentWithdrawalRmApproveHttp = (withdrawal) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + withdrawalRmApprove + '?include=bank,user.info,user.account,images'
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 二次审核通过
export const backstagePaymentWithdrawalSecondApproveHttp = (withdrawal) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + withdrawalSecondApprove + '?include=bank,user.info,user.account,images'
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 二次审核拒接
export const backstagePaymentWithdrawalSecondRejectHttp = (withdrawal) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + withdrawalSecondReject + '?include=bank,user.info,user.account,images'
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 添加 Record
export const backstagePaymentWithdrawalAddRecords = (withdrawal, data) => {
  return axios.patch(
    backstagePaymentWithdrawal + '/' + withdrawal + withdrawalAddRecords + '?include=bank,user.info,user.account,images',
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Log列表
export const backstagePaymentWithdrawalLogsHttp = (id) => {
  return axios.get(
    backstagePaymentWithdrawal + '/' + id + withdrawalLogs
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 提现导出
export const backstagePaymentWithdrawalExportLogsHttp = (data) => {
  return axios.get(
    backstagePaymentWithdrawalExportLogs, {
      params: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      'responseType': 'blob'
    }
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
