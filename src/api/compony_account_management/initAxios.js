import axios from 'axios'
// import router from '../router'
// import store from '../vuex'
import qs from 'qs'
// import {axios} from './config'
import {
  backstageBanks,
  backstageDropListBank,
  backstagePaymentGroups,
  backstageCompanyBankAccounts,
  backstageCompanyBankAccountsAudits,
  backstageCompanyBankAccountsRemarks,
  backstageDropListCompanyBankAccount,
  backstageCompanyBankAccountAdjust,
  backstageCompanyBankAccountInternalTransfer,
  backstageCompanyBankAccountBufferTransfer,
  backstageCompanyBankAccountReports,
  backstageCompanyBankAccountTransactions,
  backstageBankManagementPGManagement,
  backstageBankManagementPGManagementDropList,
  backstagePgAccountTransactions,
  backstagePgAccountManagement,
  pgRemarks,
  pgRemark,
  backstagePgAccountManagementAdjust,
  backstagePgAccountManagementInternalTransfer,
  backstagePgAccountManagementReports,
  backstagePgAccountManagementDropList,
  paymentPlatformsSearch,
  backstagePaymentGroupsAudit,
  backstagePgAccountTransactionsExport,
  backstageCompanyBankAccountTransactionsExport,
} from './apiMeun'
// 银行 列表
export const backstageBanksHttp = (data) => {
  return axios.get(backstageBanks, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 搜索
export const paymentPlatformsSearchHttp = (data) => {
  return axios.get(paymentPlatformsSearch, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 银行列表 droplist
export const backstageDropListBankHttp = () => {
  return axios.get(backstageDropListBank, {})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加 银行
export const postBackstageBanksHttp = (data) => {
  return axios.post(backstageBanks, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 更新 银行
export const patchBackstageBanksHttp = (id, data) => {
  return axios.patch(backstageBanks + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 支付组别 列表
export const backstagePaymentGroupsAuditHttp = (id, data) => {
  return axios.get(backstagePaymentGroupsAudit + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 支付组别 列表
export const backstagePaymentGroupsHttp = (data) => {
  return axios.get(backstagePaymentGroups, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加 支付组别
export const postBackstagePaymentGroupsHttp = (data) => {
  return axios.post(backstagePaymentGroups, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 更新 支付组别
export const patchBackstagePaymentGroupsHttp = (id, data) => {
  return axios.patch(backstagePaymentGroups + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 公司银行卡 列表
export const backstageCompanyBankAccountsHttp = (data) => {
  return axios.get(backstageCompanyBankAccounts, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 公司银行卡 详情
export const backstageCompanyBankAccountsDetailHttp = (id, data) => {
  return axios.get(backstageCompanyBankAccounts + '/' + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加 公司银行卡
export const postBackstageCompanyBankAccountsHttp = (data) => {
  return axios.post(backstageCompanyBankAccounts, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 更新 公司银行卡
export const patchBackstageCompanyBankAccountsHttp = (id, data) => {
  return axios.patch(backstageCompanyBankAccounts + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}

// 公司银行卡 修改记录
export const backstageCompanyBankAccountsAuditsHttp = (id, data) => {
  return axios.get(backstageCompanyBankAccounts + '/' + id + backstageCompanyBankAccountsAudits, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 公司银行卡 备注
export const getbackstageCompanyBankAccountsAuditsHttp = (id, data) => {
  return axios.get(backstageCompanyBankAccounts + '/' + id + backstageCompanyBankAccountsRemarks, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 公司银行卡 备注
export const backstageCompanyBankAccountsRemarksHttp = (id, data) => {
  return axios.post(backstageCompanyBankAccounts + '/' + id + backstageCompanyBankAccountsRemarks, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 公司银行卡 droplist
export const backstageDropListCompanyBankAccountHttp = () => {
  return axios.get(backstageDropListCompanyBankAccount, {})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 调整银行卡余额
export const backstageCompanyBankAccountAdjustHttp = (data) => {
  return axios.patch(backstageCompanyBankAccountAdjust, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 内部转账
export const backstageCompanyBankAccountInternalTransferHttp = (data) => {
  return axios.patch(backstageCompanyBankAccountInternalTransfer, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 外部转账
export const backstageCompanyBankAccountBufferTransferHttp = (data) => {
  return axios.patch(backstageCompanyBankAccountBufferTransfer, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 公司银行卡报表
export const backstageCompanyBankAccountReportsHttp = (data) => {
  return axios.get(backstageCompanyBankAccountReports, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 公司银行卡交易明细
export const backstageCompanyBankAccountTransactionsHttp = (data) => {
  return axios.get(backstageCompanyBankAccountTransactions, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 支付通道列表
export const backstageBankManagementPGManagementHttp = (data) => {
  return axios.get(backstageBankManagementPGManagement, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 支付通道列表 添加
export const backstageBankManagementPGManagementStoreHttp = (data) => {
  return axios.post(backstageBankManagementPGManagement, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 支付通道列表 更新
export const backstageBankManagementPGManagementUpdateHttp = (id, data) => {
  return axios.patch(backstageBankManagementPGManagement + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 支付通道列表
export const backstageBankManagementPGManagementDropListHttp = () => {
  return axios.get(backstageBankManagementPGManagementDropList)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 第三方支付通道帐变明细
export const backstagePgAccountTransactionsHttp = (data) => {
  return axios.get(backstagePgAccountTransactions, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// pg account 列表
export const backstagePgAccountManagementHttp = (data) => {
  return axios.get(backstagePgAccountManagement, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// pg account 详情
export const backstagePgAccountManagementDetailHttp = (id, data) => {
  return axios.get(backstagePgAccountManagement + '/' + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// pg account 详情
export const patchBackstagePgAccountManagementDetailHttp = (id, data) => {
  return axios.patch(backstagePgAccountManagement + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Pg Account 执行备注
export const postBackstagePgAccountManagementRemarkHttp = (id, data) => {
  return axios.post(backstagePgAccountManagement + '/' + id + pgRemark, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// pg account 备注列表
export const backstagePgAccountManagementRemarkHttp = (id, data) => {
  return axios.get(backstagePgAccountManagement + '/' + id + pgRemarks, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 调整第三方余额
export const backstagePgAccountManagementAdjustHttp = (data) => {
  return axios.patch(backstagePgAccountManagementAdjust, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 从第三方支付通道转账到公司银行卡
export const backstagePgAccountManagementInternalTransferHttp = (data) => {
  return axios.patch(backstagePgAccountManagementInternalTransfer, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 第三方支付通道报表
export const backstagePgAccountManagementReportsHttp = (data) => {
  return axios.get(backstagePgAccountManagementReports, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
export const backstagePgAccountManagementDropListHttp = () => {
  return axios.get(backstagePgAccountManagementDropList)
    .then((res) => {
      return Promise.resolve(res)
    })
}
export const backstagePgAccountTransactionsExportHttp = (data) => {
  return axios.get(
    backstagePgAccountTransactionsExport, {
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
export const backstageCompanyBankAccountTransactionsExportHttp = (data) => {
  return axios.get(
    backstageCompanyBankAccountTransactionsExport, {
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
