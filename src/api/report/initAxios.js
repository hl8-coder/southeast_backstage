import axios from 'axios'
import qs from 'qs'
import {
  backstageReportsMemberPromotionClaimReports,
  backstageReportsMemberPromotionClaimReportsDropList,
  backstageReportsMarketingPromotionReportsDropList,
  backstageReportsMarketingPromotionReports,
  backstageRebateComputationReports,
  backstageReportsAutoRebateInitiatePayoutReportDropList,
  backstageReportsAutoRebateInitiatePayoutReport,
  backstageRebateComputationReportsUserBonusPrizes,
  backstageUserRebatePrizesPaymentSend,
  backstageUserRebatePrizesMarketingSend,
  backstageReportsMemberBetHistoryByProductsDropList,
  backstageReportsMemberBetHistoryByProducts,
  status,
  backstageReportsMemberCRMReport,
  backstageReportsMemberCRMReportUserInfo,
  backstageRebateComputationReportsDropList,
  backstageReportsMemberBetHistoryByProductsExcel,
  backstageActiveMemberReports,
  backstageActiveMemberReportsByAffiliate,
  backstageActiveMemberReportsByProduct,
  backstageActiveMemberReportsDropList,
  backstageCrmReportWeekly,
  backstageCrmReportDaily,
  backstageCrmReportDropList,
  exportExcel,
  backstageMembersActivityReports,
  backstageMarktingUserRebatePrizesDownload,
  backstageUserBonusPrizesExport,
  backstageMembersKpiReport,
  backstageMembersKpiReportExcelReport
} from './apiMeun'
import {backstagePaymentWithdrawalExportLogs} from "../payment/withdraw/apiMeunWithdrawal";
// reports

/**
 * ---------------------------------------------------------------------------------
 * reports Marketing Start
 */

// Auto Rebate Initiate Payout report-----------------------------------------------
// 会员返点下拉 Auto Rebate Initiate Payout report Drop List
export const backstageReportsAutoRebateInitiatePayoutReportDropListHttp = () => {
  return axios.get(
    backstageReportsAutoRebateInitiatePayoutReportDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 会员返点列表 Auto Rebate Initiate Payout report List
export const backstageReportsAutoRebateInitiatePayoutReportHttp = (data) => {
  return axios.get(
    backstageReportsAutoRebateInitiatePayoutReport,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}

// Promotion reports----------------------------------------------------------------
// 报表红利下拉菜单 Promotion reports Drop List
export const backstageReportsMarketingPromotionReportsDropListHttp = () => {
  return axios.get(
    backstageReportsMarketingPromotionReportsDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 报表红利列表 Promotion reports
export const backstageReportsMarketingPromotionReportsHttp = (data) => {
  return axios.get(
    backstageReportsMarketingPromotionReports,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 会员有效流水报表 RebateComputation reports Drop List
export const backstageRebateComputationReportsDropListHttp = () => {
  return axios.get(
    backstageRebateComputationReportsDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 会员有效流水报表 RebateComputation reports
export const backstageRebateComputationReportsHttp = (data) => {
  return axios.get(
    backstageRebateComputationReports,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 会员有效流水报表对应的红利奖励
export const backstageRebateComputationReportsUserBonusPrizesHttp = (data) => {
  return axios.get(
    backstageRebateComputationReportsUserBonusPrizes,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Marketing派发返点
export const backstageUserRebatePrizesMarketingSendHttp = (data) => {
  return axios.patch(
    backstageUserRebatePrizesMarketingSend,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Payment派发返点
export const backstageUserRebatePrizesPaymentSendHttp = (data) => {
  return axios.patch(
    backstageUserRebatePrizesPaymentSend,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 活跃会员 Active Member reports Drop List
export const backstageActiveMemberReportsDropListHttp = () => {
  return axios.get(
    backstageActiveMemberReportsDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 活跃会员 Active Member reports
export const backstageActiveMemberReportsHttp = (data) => {
  return axios.get(
    backstageActiveMemberReports,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 活跃会员 Active Member reports By affiliate
export const backstageActiveMemberReportsByAffiliateHttp = (data) => {
  return axios.get(
    backstageActiveMemberReportsByAffiliate,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 活跃会员 Active Member reports By Product
export const backstageActiveMemberReportsByProductHttp = (data) => {
  return axios.get(
    backstageActiveMemberReportsByProduct,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// CRM Report Weekly
export const backstageCrmReportWeeklyHttp = (data) => {
  return axios.get(
    backstageCrmReportWeekly,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// CRM Report Weekly Export Excel
export const backstageCrmReportWeeklyExportExcelHttp = (data) => {
  return axios.get(
    backstageCrmReportWeekly + exportExcel,
    {
      params: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      'responseType': 'blob'
    }
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// CRM Report Daily
export const backstageCrmReportDailyHttp = (data) => {
  return axios.get(
    backstageCrmReportDaily,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// CRM Report Daily Export Excel
export const backstageCrmReportDailyExportExcelHttp = (data) => {
  return axios.get(
    backstageCrmReportDaily + exportExcel,
    {
      params: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      'responseType': 'blob'
    }
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// CRM Report Daily Drop List
export const backstageCrmReportDropListHttp = (data) => {
  return axios.get(
    backstageCrmReportDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Members Activity Reports
export const backstageMembersActivityReportsHttp = (data) => {
  return axios.get(
    backstageMembersActivityReports, {
      params: data
    }
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// KpiReports
export const backstageMembersKpiReportHttp = (data) => {
  return axios.get(
    backstageMembersKpiReport, {
      params: data
    }
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// KpiReports 导出
export const backstageMembersKpiReportExcelReportHttp = (data) => {
  return axios.get(
    backstageMembersKpiReportExcelReport, {
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
/**
 * reports Marketing End
 * ---------------------------------------------------------------------------------
 */

/**
 * ---------------------------------------------------------------------------------
 * reports Member Start
 */

// Promotion Claim reports----------------------------------------------------------------
// 红利下拉菜单 Promotion Claim reports Drop List
export const backstageReportsMemberPromotionClaimReportsDropListHttp = () => {
  return axios.get(
    backstageReportsMemberPromotionClaimReportsDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 红利申请列表 Promotion Claim reports
export const backstageReportsMemberPromotionClaimReportsHttp = (data) => {
  return axios.get(
    backstageReportsMemberPromotionClaimReports,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 更新红利状态 Update Promotion Claim report Status
export const backstageReportsMemberUpdatePromotionClaimReportsStatusHttp = (bonus, data) => {
  return axios.patch(
    backstageReportsMemberPromotionClaimReports + '/' + bonus + status,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 游戏投注列表 Bet History By Products Drop List
export const backstageReportsMemberBetHistoryByProductsDropListHttp = () => {
  return axios.get(
    backstageReportsMemberBetHistoryByProductsDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 游戏投注列表 Bet History By Products
export const backstageReportsMemberBetHistoryByProductsHttp = (data) => {
  return axios.get(
    backstageReportsMemberBetHistoryByProducts,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 下载游戏投注列表 Bet History By Products
export const backstageReportsMemberBetHistoryByProductsExcelHttp = (data) => {
  return axios.get(
    backstageReportsMemberBetHistoryByProductsExcel,
    {
      params: data,
      responseType: 'arraybuffer'
    }
  )
}
// crm 报表 crm report
export const backstageReportsMemberCRMReportHttp = (data) => {
  return axios.get(
    backstageReportsMemberCRMReport,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// crm 报表用户资料
export const backstageReportsMemberCRMReportUserInfoHttp = (data) => {
  return axios.get(
    backstageReportsMemberCRMReportUserInfo,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}

// 导出
export const backstageMarktingUserRebatePrizesDownloadHttp = (data) => {
  return axios.get(
    backstageMarktingUserRebatePrizesDownload, {
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
// 导出
export const backstageUserBonusPrizesExportHttp = (data) => {
  return axios.get(
    backstageUserBonusPrizesExport, {
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
/**
 * reports Member End
 * ---------------------------------------------------------------------------------
 */
