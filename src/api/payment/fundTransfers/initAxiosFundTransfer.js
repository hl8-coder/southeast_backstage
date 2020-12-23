import axios from 'axios'
import {
  backstagePaymentFundTransferWithdrawalHistory,
  backstagePaymentFundTransferMemberListing,
  backstagePaymentFundTransferDepositHistory,
  backstagePaymentFundTransferAccountSummary,
  backstagePaymentFundTransferAccountSummaryTotal,
  backstagePaymentFundTransferAccountSummaryProductTotal,
  backstagePaymentFundTransferTotalBet,
  backstagePaymentFundTransferAffiliateTopUp,
  backstagePaymentFundTransferAffiliateTopUpDropList,
  backstageGamePlatforms,
  backstageBalance,
  backstageMemberUserRebatePrizes
} from './apiMeunFundTransfer'
export const backstageMemberUserRebatePrizesHttp = (data) => {
  return axios.get(
    backstageMemberUserRebatePrizes,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 提现历史 Withdrawal History
export const backstageGamePlatformsBalance = (id, data) => {
  return axios.get(
    backstageGamePlatforms + '/' + id + backstageBalance,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 提现历史 Withdrawal History
export const backstagePaymentFundTransferWithdrawalHistoryHttp = (data) => {
  return axios.get(
    backstagePaymentFundTransferWithdrawalHistory,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 提现历史 Withdrawal History
export const backstagePaymentFundTransferDepositHistoryHttp = (data) => {
  return axios.get(
    backstagePaymentFundTransferDepositHistory,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 个人详情
export const backstagePaymentFundTransferMemberListingHttp = (data) => {
  return axios.get(
    backstagePaymentFundTransferMemberListing,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 个人详情
export const backstagePaymentFundTransferAccountSummaryHttp = (data) => {
  return axios.get(
    backstagePaymentFundTransferAccountSummary,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 个人详情
export const backstagePaymentFundTransferAccountSummaryTotalHttp = (data) => {
  return axios.get(
    backstagePaymentFundTransferAccountSummaryTotal,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
export const backstagePaymentFundTransferAccountSummaryProductTotalHttp = (data) => {
  return axios.get(
    backstagePaymentFundTransferAccountSummaryProductTotal,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Total bet
export const backstagePaymentFundTransferTotalBetHttp = (data) => {
  return axios.get(
    backstagePaymentFundTransferTotalBet,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Aff Top Up
export const backstagePaymentFundTransferAffiliateTopUpHttp = (data) => {
  return axios.get(
    backstagePaymentFundTransferAffiliateTopUp, {params: data}
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Aff Top Up Drop List
export const backstagePaymentFundTransferAffiliateTopUpDropListHttp = () => {
  return axios.get(
    backstagePaymentFundTransferAffiliateTopUpDropList
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
