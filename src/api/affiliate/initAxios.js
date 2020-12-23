import axios from 'axios'
import qs from 'qs'
import {
  backstageAffiliateListingList,
  backstageAffiliateListingDropList,
  remarks,
  subUsers,
  profitInfo,
  commissions,
  backstageAffiliatesRequests,
  requestApprove,
  requestReject,
  backstageAffiliatesFunds,
  backstageAffiliatesSubs,
  backstageAffiliatesCommissionsPending,
  backstageAffiliatesCommissionsPayout,
  backstageAffiliateListingCommissionsDropList,
  backstageAffiliateListingAnnouncementDropList,
  backstageUserAffiliateAnnouncements,
  backstageAffiliateReportPendingDownload,
  backstageAffiliateReportPayoutDownload,
  backstageAffiliateCreativeResources,
  backstageAffiliateCreativeResourceDropList,
  backstageAffiliateRequestDropList,
  backstageAffiliateBankHistory,
  auditBankHistory,
  backstageAffiliateTrackingStatistic,
  backstageAffiliateTrackingStatisticDropList,
  backstageAffiliateMailboxTemplate,
  backstageAffiliatesRelaseCommissions,
  backstageAffiliateBankHistoryList,
  backstageAffiliateResetPassword,
  resetPassword,
  backstageAffiliateTopUp,
  backstageAffiliateTopUpDropList,
  backstageAffiliateLink,
  backstageAffiliateLinkDropList
} from './apiMeun'
// 代理资源链接
export const backstageAffiliateCreativeResourcesHttp = (data) => {
  return axios.get(
    backstageAffiliateCreativeResources,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 添加代理资源链接
export const backstageAffiliateCreativeResourcesStoreHttp = (data) => {
  return axios.post(
    backstageAffiliateCreativeResources,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 更新代理资源链接
export const backstageAffiliateCreativeResourcesUpdateHttp = (id, data) => {
  return axios.patch(
    backstageAffiliateCreativeResources + '/' + id,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 删除代理资源链接
export const backstageAffiliateCreativeResourcesDeleteHttp = (id) => {
  return axios.delete(
    backstageAffiliateCreativeResources + '/' + id
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 代理资源链接 下拉列表
export const backstageAffiliateCreativeResourceDropListHttp = (data) => {
  return axios.get(
    backstageAffiliateCreativeResourceDropList,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// request 下拉列表
export const affiliateRequestDropListHttp = (data) => {
  return axios.get(
    backstageAffiliateRequestDropList,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// affiliate
// 代理列表
export const backstageAffiliateListingListHttp = (data) => {
  return axios.get(
    backstageAffiliateListingList,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 代理列表
export const backstageAffiliateListingListDetailHttp = (id, data) => {
  return axios.get(
    backstageAffiliateListingList + '/' + id,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 下拉菜单
export const backstageGameManagementGamePlatformsDropListHttp = () => {
  return axios.get(
    backstageAffiliateListingDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 下拉菜单 Commissions
export const backstageAffiliateListingCommissionsDropListHttp = () => {
  return axios.get(
    backstageAffiliateListingCommissionsDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 下拉菜单 Announcement
export const backstageAffiliateListingAnnouncementDropListHttp = () => {
  return axios.get(
    backstageAffiliateListingAnnouncementDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 更新代理信息
export const updateBackstageGameManagementGamePlatformsDropListHttp = (id, data) => {
  return axios.patch(
    backstageAffiliateListingList + '/' + id,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 由于updateBackstageGameManagementGamePlatformsDropListHttp 默认使用application/x-www-form-urlencoded，
// 公共代码也不能随意修改，
// 所以只能重新定制化一遍代码
export const updateBackstageGameManagementGamePlatformsDropListHttpForDescribe = (id, data) => {
  return axios.patch(
    backstageAffiliateListingList + '/' + id,
    data,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 备注列表
export const backstageGameManagementGamePlatformsDropListRemarksHttp = (id, data) => {
  return axios.get(
    backstageAffiliateListingList + '/' + id + remarks,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 添加备注
export const addBackstageGameManagementGamePlatformsDropListRemarksHttp = (id, data) => {
  return axios.post(
    backstageAffiliateListingList + '/' + id + remarks,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 代理的会员
export const backstageGameManagementGamePlatformsDropListSubUsersHttp = (id, data) => {
  return axios.get(
    backstageAffiliateListingList + '/' + id + subUsers,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 代理的盈亏资讯
export const backstageGameManagementGamePlatformsDropListProfitInfoHttp = (id, data) => {
  return axios.get(
    backstageAffiliateListingList + '/' + id + profitInfo,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 奖历列表
export const backstageGameManagementGamePlatformsCommissionsHttp = (id, data) => {
  return axios.get(
    backstageAffiliateListingList + '/' + id + commissions,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 代理申請列表
export const backstageAffiliatesRequestsHttp = (data) => {
  return axios.get(
    backstageAffiliatesRequests,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 代理申請同意
export const backstageAffiliateListingListRequestApproveHttp = (id, data) => {
  return axios.patch(
    backstageAffiliateListingList + '/' + id + requestApprove,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 代理申请拒绝
export const backstageAffiliateListingListRequestRejectHttp = (id, data) => {
  return axios.patch(
    backstageAffiliateListingList + '/' + id + requestReject,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 代理转帐列表 Fund Management
export const backstageAffiliatesFundsHttp = (data) => {
  return axios.get(
    backstageAffiliatesFunds,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 子代理列表 Sub affiliate
export const backstageAffiliatesSubsHttp = (data) => {
  return axios.get(
    backstageAffiliatesSubs,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 奖历发布列表 affiliate report Release
export const backstageAffiliatesCommissionsPendingHttp = (data) => {
  return axios.get(
    backstageAffiliatesCommissionsPending,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 奖历发布列表 affiliate report Release
export const backstageAffiliatesReleaseCommissionsHttp = (data) => {
  return axios.patch(
    backstageAffiliatesRelaseCommissions,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 奖历支付列表 affiliate report Payout
export const backstageAffiliatesCommissionsPayoutHttp = (data) => {
  return axios.get(
    backstageAffiliatesCommissionsPayout,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 消息通知 列表
export const backstageUserAffiliateAnnouncementsHttp = (data) => {
  return axios.get(backstageUserAffiliateAnnouncements, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 追踪链接 列表
export const backstageAffiliateTrackingStatisticHttp = (data) => {
  return axios.get(backstageAffiliateTrackingStatistic, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 追踪链接详情 列表
export const backstageAffiliateTrackingStatisticDetailHttp = (id, data) => {
  return axios.get(backstageAffiliateTrackingStatistic + '/' + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 消息通知 列表
export const backstageAffiliateTrackingStatisticDropListHttp = (data) => {
  return axios.get(backstageAffiliateTrackingStatisticDropList)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加 消息通知
export const addBackstageUserAffiliateAnnouncementsHttp = (data) => {
  return axios.post(backstageUserAffiliateAnnouncements, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加 消息通知
export const updateBackstageUserAffiliateAnnouncementsHttp = (id, data) => {
  return axios.patch(backstageUserAffiliateAnnouncements + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 下载报表 affiliate report Release
export const backstageAffiliateReportPendingDownloadHttp = (data) => {
  return axios.get(
    backstageAffiliateReportPendingDownload,
    {
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
// 下载报表 affiliate report Payout
export const backstageAffiliateReportPayoutDownloadHttp = (data) => {
  return axios.get(
    backstageAffiliateReportPayoutDownload,
    {
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
// 邮件模板 列表
export const backstageAffiliateMailboxTemplateHttp = (data) => {
  return axios.get(backstageAffiliateMailboxTemplate)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 邮件模板 列表
export const backstageAffiliateMailboxTemplateStoreHttp = (data) => {
  return axios.post(backstageAffiliateMailboxTemplate, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 银行卡修改记录 列表
export const backstageAffiliateBankHistoryHttp = (id, data) => {
  return axios.get(
    backstageAffiliateBankHistory + '/' + id + auditBankHistory,
    {params: data}
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 银行卡修改记录 列表
export const backstageAffiliateBankHistoryListHttp = (id) => {
  return axios.get(
    backstageAffiliateBankHistoryList + '/' + id
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 更改密码
export const backstageAffiliateResetPasswordHttp = (id, data) => {
  return axios.patch(
    backstageAffiliateResetPassword + '/' + id + resetPassword,
    qs.stringify(data)
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Affiliate Top Up
export const backstageAffiliateTopUpHttp = (data) => {
  return axios.get(
    backstageAffiliateTopUp, {params: data}
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Affiliate Top Up Drop List
export const backstageAffiliateTopUpDropListHttp = () => {
  return axios.get(
    backstageAffiliateTopUpDropList
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
// AFF Link Drop List
export const backstageAffiliateLinkDropListHttp = () => {
  return axios.get(backstageAffiliateLinkDropList).then((res) => {
    return Promise.resolve(res)
  })
}
// AFF Link Index
export const backstageAffiliateLinkIndexHttp = (data) => {
  return axios.get(backstageAffiliateLink, {params: data}).then((res) => {
    return Promise.resolve(res)
  })
}
// AFF Link Store
export const backstageAffiliateLinkStoreHttp = (data) => {
  return axios.post(backstageAffiliateLink, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}
// AFF Link Update
export const backstageAffiliateLinkUpdateHttp = (id, data) => {
  return axios.patch(backstageAffiliateLink + '/' + id, qs.stringify(data)).then((res) => {
    return Promise.resolve(res)
  })
}
