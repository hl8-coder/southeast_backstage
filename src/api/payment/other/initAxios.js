import axios from 'axios'
import {
  backstagePaymentOtherRebateSettlement,
  backstagePaymentTransactionSearch,
  backstagePaymentTransactionSearchExport,
  backstagePaymentUserRebatePrizesDownload,
  backstagePaymentTransactionDropList
} from './apiMeun'
import {backstagePaymentFundTransferAffiliateTopUpDropList} from "../fundTransfers/apiMeunFundTransfer";
/**
 * ------------------------------------------------------------
 * payment
 * ------------------------------------------------------------
 * Other
 */
// Rebate Settlement
export const backstagePaymentOtherRebateSettlementHttp = (data) => {
  return axios.get(
    backstagePaymentOtherRebateSettlement,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Rebate Settlement
export const backstagePaymentTransactionSearchHttp = (data) => {
  return axios.get(
    backstagePaymentTransactionSearch,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
export const backstagePaymentTransactionSearchExportHttp = (data) => {
  return axios.get(
    backstagePaymentTransactionSearchExport, {
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
export const backstagePaymentUserRebatePrizesDownloadHttp = (data) => {
  return axios.get(
    backstagePaymentUserRebatePrizesDownload, {
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
export const backstagePaymentTransactionDropListHttp = () => {
  return axios.get(
    backstagePaymentTransactionDropList
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
