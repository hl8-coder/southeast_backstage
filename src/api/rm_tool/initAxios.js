import axios from 'axios'
import qs from 'qs'
import {
  backstageRMIPMonitorActivityMember,
  backstageRMIPMonitorActivityAffiliate,
  backstageRMMemberDataQuery,
  backstageRMRiskCategoryListing,
  backstageRMRiskCategoryListingDropList,
  backstageRMIPMonitorActivityMemberByIp,
  backstageRMMemberDataQueryAccountSummary,
  backstageRMMemberDataQueryAccountSummaryByMonth,
  backstageRMRiskPlayerWinner,
  backstageRMRiskPlayerWinnerDetails,
  backstageRMRiskPlayerWinnerDetailsPerDate,
  backstageRMRiskMembersTagRemark,
  backstageRMRiskPlayerWinnerDropList,
  backstageRMRiskPlayerWinnerDownload,
  backstageRiskGroups,
  backstageRiskGroupRulesDropList,
  backstageRiskGroupDropList,
  backstageRiskGroupAudis,
  backstageRiskGroupTemplate
} from './apiMeun'
export const backstageRiskGroupAudisHttp = (id, data) => {
  return axios.get(
    backstageRiskGroupAudis + '/' + id,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
export const getBackstageRiskGroupsHttp = (data) => {
  return axios.get(
    backstageRiskGroups,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
export const postBackstageRiskGroupsHttp = (data) => {
  return axios.post(
    backstageRiskGroups,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
export const patchackstageRiskGroupsHttp = (id, data) => {
  return axios.patch(backstageRiskGroups + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 会员登录日志 IP Monitor Activity Member
export const backstageRMIPMonitorActivityMemberHttp = (data) => {
  return axios.get(
    backstageRMIPMonitorActivityMember,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 会员登录日志 IP Monitor Activity Member
export const backstageRMIPMonitorActivityMemberByIpHttp = (data) => {
  return axios.get(
    backstageRMIPMonitorActivityMemberByIp,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 代理登录日志 IP Monitor Activity affiliate
export const backstageRMIPMonitorActivityAffiliateHttp = (data) => {
  return axios.get(
    backstageRMIPMonitorActivityAffiliate,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Member Data Query
export const backstageRMMemberDataQueryHttp = (data) => {
  return axios.get(
    backstageRMMemberDataQuery,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Member Data Query
export const backstageRMMemberDataQueryAccountSummaryHttp = (data) => {
  return axios.get(
    backstageRMMemberDataQueryAccountSummary,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Member Data Query By
export const backstageRMMemberDataQueryAccountSummaryByMonthHttp = (data) => {
  return axios.get(
    backstageRMMemberDataQueryAccountSummaryByMonth,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Risk Category Listing
export const backstageRMRiskCategoryListingHttp = (data) => {
  return axios.get(
    backstageRMRiskCategoryListing,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Risk Category Listing
export const backstageRMRiskCategoryListingDropListHttp = () => {
  return axios.get(
    backstageRMRiskCategoryListingDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Risk Category Listing
export const backstageRMRiskCategoryListingShowHttp = (id, data) => {
  return axios.get(
    backstageRMRiskCategoryListing + '/' + id,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Risk Category Listing
export const backstageRMRiskCategoryStoreHttp = (data) => {
  return axios.post(
    backstageRMRiskCategoryListing,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Player Winner
export const backstageRMRiskPlayerWinnerHttp = (data) => {
  return axios.get(
    backstageRMRiskPlayerWinner,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Player Winner Download
export const backstageRMRiskPlayerWinnerDownloadHttp = (data) => {
  return axios.get(
    backstageRMRiskPlayerWinnerDownload,
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
export const backstageRiskGroupTemplateHttp = (data) => {
  return axios.get(
    backstageRiskGroupTemplate,
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

// Player Winner Details
export const backstageRMRiskPlayerWinnerDetailsHttp = (data) => {
  return axios.get(
    backstageRMRiskPlayerWinnerDetails,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Player Winner Details Per Date
export const backstageRMRiskPlayerWinnerDetailsPerDateHttp = (data) => {
  return axios.get(
    backstageRMRiskPlayerWinnerDetailsPerDate,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Player Winner Details Per Date
export const backstageRMRiskMembersTagRemarkHttp = (data) => {
  return axios.get(
    backstageRMRiskMembersTagRemark,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Player Winner Details & Player Winner Details Per Date Drop List
export const backstageRMRiskPlayerWinnerDropListHttp = () => {
  return axios.get(
    backstageRMRiskPlayerWinnerDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
export const backstageRiskGroupRulesDropListHttp = () => {
  return axios.get(
    backstageRiskGroupRulesDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
export const backstageRiskGroupDropListHttp = () => {
  return axios.get(
    backstageRiskGroupDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
