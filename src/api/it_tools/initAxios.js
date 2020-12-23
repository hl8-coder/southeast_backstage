import axios from 'axios'
import qs from 'qs'
import {
  backstageGamePlatformPullReportSchedules,
  backstageGamePlatformPullReportSchedulesDropList,
  backstageITToolUserProductDailyReportDropList,
  backstageITToolUserProductDailyReport,
  backstageITToolLanguages,
  backstageITToolCurrencies,
  backstageITToolConfigSetting,
  backstageITToolChangingConfigSetting,
  backstageITToolDomainManagement,
  backstageITToolDomainManagementDropList,
  backstageTrackingStatisticLog,
  backstageTrackingStatisticLogDropList,
  backstageVerifiedPrizeBlackUserList,
  excelTemplate,
  backstageGameReportSchedulesByPlatform,
  backstageServerStatus
} from './apiMeun'
// 获取拉取游戏时刻表
export const backstageGamePlatformPullReportSchedulesHttp = (data) => {
  return axios.get(backstageGamePlatformPullReportSchedules, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}

// 更新拉去记录状态
export const patchBackstageGamePlatformPullReportSchedulesHttp = (id, data) => {
  return axios.patch(backstageGamePlatformPullReportSchedules + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 获取拉取游戏时刻表
export const backstageGamePlatformPullReportSchedulesDropListHttp = (data) => {
  return axios.get(backstageGamePlatformPullReportSchedulesDropList, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 会员产品日报表下拉
export const backstageITToolUserProductDailyReportDropListHttp = (data) => {
  return axios.get(backstageITToolUserProductDailyReportDropList)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 会员产品日报表
export const backstageITToolUserProductDailyReportHttp = (data) => {
  return axios.get(backstageITToolUserProductDailyReport, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 语言设置 index
export const backstageITToolLanguagesIndexHttp = (data) => {
  return axios.get(backstageITToolLanguages)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 语言设置 Update
export const backstageITToolLanguagesUpdateHttp = (id, data) => {
  return axios.patch(backstageITToolLanguages + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 币别设置 index
export const backstageITToolCurrenciesIndexHttp = (data) => {
  return axios.get(backstageITToolCurrencies)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 币别设置 Update
export const backstageITToolCurrenciesUpdateHttp = (id, data) => {
  return axios.patch(backstageITToolCurrencies + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 设置
export const backstageITToolConfigSettingIndexHttp = (data) => {
  return axios.get(backstageITToolConfigSetting)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 币别设置 Update
export const backstageITToolConfigSettingUpdateHttp = (id, data) => {
  return axios.patch(backstageITToolConfigSetting + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 高频设置
export const backstageITToolChangingConfigSettingHttp = (data) => {
  return axios.get(backstageITToolChangingConfigSetting)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 域名管理 列表
export const backstageITToolDomainManagementDropListHttp = () => {
  return axios.get(
    backstageITToolDomainManagementDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 域名管理 列表
export const backstageITToolDomainManagementIndexHttp = (data) => {
  return axios.get(
    backstageITToolDomainManagement,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 域名管理 添加
export const backstageITToolDomainManagementStoreHttp = (data) => {
  return axios.post(
    backstageITToolDomainManagement,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 域名管理 更新
export const backstageITToolDomainManagementUpdateHttp = (id, data) => {
  return axios.post(
    backstageITToolDomainManagement + '/' + id,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 域名管理 删除
export const backstageITToolDomainManagementDeleteHttp = (id) => {
  return axios.delete(
    backstageITToolDomainManagement + '/' + id
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// TrackingStatisticLogDropList
export const TrackingStatisticLogDropListHttp = () => {
  return axios.get(
    backstageTrackingStatisticLogDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// TrackingStatisticLog
export const backstageTrackingStatisticLogHttp = (data) => {
  return axios.get(
    backstageTrackingStatisticLog,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Verified Prize Black User List
export const backstageVerifiedPrizeBlackUserListHttp = (data) => {
  return axios.get(
    backstageVerifiedPrizeBlackUserList,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Verified Prize Black User Store
export const backstageVerifiedPrizeBlackUserStoreHttp = (data) => {
  return axios.post(
    backstageVerifiedPrizeBlackUserList, qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Verified Prize Black User Delete
export const backstageVerifiedPrizeBlackUserDeleteHttp = (id) => {
  return axios.delete(
    backstageVerifiedPrizeBlackUserList + '/' + id
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Verified Prize Black User Download
export const backstageVerifiedPrizeBlackUserDownloadHttp = (data) => {
  return axios.get(
    backstageVerifiedPrizeBlackUserList + excelTemplate, {
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
// Game Report Schedules By Platform
export const backstageGameReportSchedulesByPlatformHttp = (data) => {
  return axios.get(
    backstageGameReportSchedulesByPlatform,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Server Status
export const backstageServerStatusHttp = (data) => {
  return axios.get(
    backstageServerStatus,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
