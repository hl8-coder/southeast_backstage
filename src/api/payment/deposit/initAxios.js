import qs from 'qs'
import axios from 'axios'
import {
  backstageDepositsOpenDeposit,
  backstageBankTransactions,
  backstageBankTransactionsRemark,
  backstageBankTransactionsCredit,
  backstageBankTransactionsLogs,
  backstageDropListBankTransactions,
  backstageBankTransactionsText,
  backstageBankTransactionsDuplicateTransactions,
  backstageDropListDeposit,
  backstageDropListFastDeposit,
  backstageDeposit,
  backstageDepositGateway,
  backstageDepositAdvanceCredit,
  fundInAccount,
  internalRemarks,
  backstageUserMpayNumber,
  Remarks,
  reject,
  hold,
  releaseHold,
  matchBankTransactions,
  unmatch,
  approve,
  approveAdv,
  approvePartial,
  revertAction,
  approveAdvanceCredit,
  approvePartialAdvanceCredit,
  receipt,
  finalApprove,
  approveChanges,
  amountDetail,
  requestAdvance,
  cancel,
  lose,
  backstageBankTransactionsDetail,
  backstageManualDepositPaymentPlatform,
  backstageManualDepositPaymentPlatformDropList,
  backstageManualDeposit,
  backstageManualDepositBankDropList,
  backstageManualDepositCheckUsername,
  backstageGetUserBank,
  backstageManualDepositMenu,
  backstageDepositLogs,
  backstageExportDepositLogs,
  backstageCompanyBankAccountsCode
} from './apiMeun'
import {backstageCrmWelcomeExcel} from '../../crm/apiMeun'
// 充值详情
export const backstageDepositDetailHttp = (id, data) => {
  return axios.get(backstageDeposit + '/' + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 充值详情
export const backstageUserMpayNumberHttp = (data) => {
  return axios.get(backstageUserMpayNumber, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}

// payment >> open deposit
export const backstageDropListDepositHttp = (data) => {
  return axios.get(backstageDropListDeposit, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> open deposit
export const backstageDepositsOpenDepositHttp = (data) => {
  return axios.get(backstageDepositsOpenDeposit, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> deposit  银行交易记录
export const backstageBankTransactionsHttp = (data) => {
  return axios.get(backstageBankTransactions, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> deposit  银行交易记录详情
export const backstageBankTransactionsDetialHttp = (id, data) => {
  return axios.get(backstageBankTransactionsDetail + '/' + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> deposit  删除银行交易记录
export const deleteBackstageBankTransactionsHttp = (id) => {
  return axios.delete(backstageBankTransactions + '/' + id)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> deposit  银行交易记录
export const backstageBankTransactionsLogsHttp = (id, data) => {
  return axios.get(backstageBankTransactions + '/' + id + backstageBankTransactionsLogs, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  payment >> deposit  备注银行交易记录
export const backstageBankTransactionsRemarkHttp = (id, data) => {
  return axios.patch(backstageBankTransactions + '/' + id + backstageBankTransactionsRemark, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  payment >> deposit  修改credit的值
export const backstageBankTransactionsCreditHttp = (id, data) => {
  return axios.patch(backstageBankTransactions + '/' + id + backstageBankTransactionsCredit, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  payment >> deposit  备注银行交易记录
export const backstageDropListBankTransactionsHttp = (data) => {
  return axios.get(backstageDropListBankTransactions, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> deposit  导入银行交易记录text
export const backstageBankTransactionsTextHttp = (data) => {
  return axios.post(backstageBankTransactionsText, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> deposit  获取excel表重复记录
export const backstageBankTransactionsDuplicateTransactionsHttp = (data) => {
  return axios.get(backstageBankTransactionsDuplicateTransactions, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> deposit  删除excel表重复记录
export const backstageBankTransactionsDuplicateTransactionsDelectHttp = (data) => {
  return axios.delete(backstageBankTransactionsDuplicateTransactions, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> fast deposit
export const backstageDropListFastDepositHttp = (data) => {
  return axios.get(backstageDropListFastDeposit, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> geteway记录  geteway记录
export const backstageDepositGatewayHttp = (data) => {
  return axios.get(backstageDepositGateway, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> AdvanceCredit  AdvanceCredit记录
export const backstageDepositAdvanceCreditHttp = (data) => {
  return axios.get(backstageDepositAdvanceCredit, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}

// payment >> fund_in_account  更改实际收款账号
export const backstageAmountDetailHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + amountDetail, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> fund_in_account  更改实际收款账号
export const backstageFundInAccountHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + fundInAccount, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> internal_remarks  更改内部备注
export const backstageInternalRemarksHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + internalRemarks, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> external_remarks  更改外部备注
export const backstageRemarkstHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + Remarks, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// button
// button
// button
// button
// button 以下是按钮操作
// payment >> reject 拒绝
export const rejectHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + reject, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> hold 保留
export const holdHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + hold, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> release_hold 取消保留
export const releaseHoldHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + releaseHold, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> bank_transactions 充值领取银行交易记录
export const matchBankTransactionsHttp = (id, bankTransaction, data) => {
  return axios.patch(backstageDeposit + '/' + id + matchBankTransactions + '/' + bankTransaction, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> unmatch 取消充值领取银行交易记录
export const unmatchHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + unmatch, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> approve 批淮
export const approveHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + approve, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}

export const finalApproveHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + finalApprove, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> approve_adv 请求全额上分
export const approveAdvHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + approveAdv, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> approve_partial 请求部份上分
export const approvePartialHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + approvePartial, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> revert_action 取消请求
export const revertActionHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + revertAction, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> approve_advance_credit 完整上分
export const approveAdvanceCreditHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + approveAdvanceCredit, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> approve_advance_credit 部分上分
export const approvePartialAdvanceCreditHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + approvePartialAdvanceCredit, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> approveChanges 二次批准
export const approveChangesHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + approveChanges, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> receipt 上传凭证
export const receiptHttp = (id, data) => {
  return axios.post(backstageDeposit + '/' + id + receipt, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> delete receipt 删除凭证
export const deleteReceiptHttp = (id, imgId, data) => {
  return axios.delete(backstageDeposit + '/' + id + receipt + '/' + imgId, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> cancel 取消
export const cancelHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + cancel, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> requestAdvance
export const requestAdvanceHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + requestAdvance, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> requestAdvance
export const loseHttp = (id, data) => {
  return axios.patch(backstageDeposit + '/' + id + lose, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 手动充值 Menu 选项
export const backstageManualDepositMenuHttp = (data) => {
  return axios.get(backstageManualDepositMenu, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 手动充值 渠道 Eg. 网银列表，充值卡列表
export const backstageManualDepositPaymentPlatformHttp = (data) => {
  return axios.get(backstageManualDepositPaymentPlatform, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 下拉菜单 充值渠道
export const backstageManualDepositPaymentPlatformDropListHttp = (data) => {
  return axios.get(backstageManualDepositPaymentPlatformDropList)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> ManualDeposit 检查用户名
export const backstageManualDepositCheckUsernameHttp = (data) => {
  return axios.post(backstageManualDepositCheckUsername, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> 获取会员银行卡
export const backstageGetUserBankHttp = (id, data) => {
  return axios.get(backstageGetUserBank + '/' + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 获取充值银行 下拉菜单
export const backstageManualDepositBankDropListHttp = (data) => {
  return axios.get(
    backstageManualDepositBankDropList,
    {
      headers: {
        'currency': data
      }
    }
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
// payment >> ManualDeposit
export const backstageManualDepositHttp = (data) => {
  return axios.post(backstageManualDeposit, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 充值访问记录
export const backstageDepositLogsHttp = (id) => {
  return axios.get(
    backstageDeposit + '/' + id + backstageDepositLogs
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 充值访问记录
export const backstageExportDepositLogsHttp = (data) => {
  return axios.get(
    backstageExportDepositLogs, {
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
export const backstageCompanyBankAccountsCodeHttp = (data) => {
  return axios.get(backstageCompanyBankAccountsCode, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
