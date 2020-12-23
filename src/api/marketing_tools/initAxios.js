import axios from 'axios'
// import router from '../router'
// import store from '../vuex'
import qs from 'qs'
// import {axios} from './config'
import {
  backstageBonusGroups,
  backstageBonuses,
  backstageDropListBonus,
  backstageDropListRebate,
  backstageRebates,
  bonusPrizes,
  backstagebonusPrizes,
  backstageDropListBonusPrize,
  backstageBonusesExcelDownload,
  backstagePromotionSettingDropList,
  backstagePromotionSettingList,
  backstagePromotionTypeSettingList,
  backstagePromotionTypeSettingDropList,
  backstageBanners,
  backstageDropListBanner,
  backstageMarketingToolsBonusCodeSettingUsers,
  bonusCodeSettingUsers
} from './apiMeun'
// 红利分组列表
export const backstageBonusGroupsHttp = (data) => {
  return axios.get(backstageBonusGroups, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加分红分组
export const addBackstageBonusGroupsHttp = (data) => {
  return axios.post(backstageBonusGroups, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 红利分组列表
export const backstageBonusesHttp = (data) => {
  return axios.get(backstageBonuses, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加红利
export const addbackstageBonusesHttp = (data) => {
  return axios.post(
    backstageBonuses,
    qs.stringify(data)
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 更新红利
export const patchBackstageBonusesHttp = (id, data) => {
  return axios.post(
    backstageBonuses + '/' + id,
    qs.stringify(data)
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 红利DropList
export const backstageDropListBonusHttp = (data) => {
  return axios.get(backstageDropListBonus, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 返点DropList
export const backstageDropListRebateHttp = (data) => {
  return axios.get(backstageDropListRebate, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 返点列表
export const backstageRebatesHttp = (data) => {
  return axios.get(backstageRebates, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加返点
export const addbackstageRebatesHttp = (data) => {
  return axios.post(backstageRebates, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  更新红利奖励
export const patchBackstageRebatesHttp = (id, data) => {
  return axios.patch(backstageRebates + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加红利奖励
export const addbackstageBonusesbonusPrizesHttp = (id, data) => {
  return axios.post(backstageBonuses + '/' + id + bonusPrizes, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  更新红利奖励
export const patchBackstagebonusPrizesHttp = (id, data) => {
  return axios.patch(backstagebonusPrizes + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 红利奖励DropList
export const backstageDropListBonusPrizeHttp = (data) => {
  return axios.get(backstageDropListBonusPrize, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 红利 模板下载
export const backstageBonusesExcelDownloadHttp = (data) => {
  return axios.get(backstageBonusesExcelDownload, {
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
// 下拉菜单 Promotion Setting Drop List
export const backstagePromotionSettingDropListHttp = () => {
  return axios.get(
    backstagePromotionSettingDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 优惠活动列表 Promotion Setting List
export const backstagePromotionSettingListHttp = (data) => {
  return axios.get(
    backstagePromotionSettingList,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 添加优惠活动 Promotion Setting Store
export const backstagePromotionSettingStoreHttp = (data) => {
  return axios.post(
    backstagePromotionSettingList,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 删除优惠活动 Promotion Setting Store
export const backstagePromotionSettingDeleteHttp = (promotion) => {
  return axios.delete(
    backstagePromotionSettingList + '/' + promotion
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// Copy Promotion Setting Copy
export const backstagePromotionSettingCopyHttp = (promotion) => {
  return axios.post(
    backstagePromotionSettingList + '/' + promotion
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 更新优惠活动 Promotion Setting Update
export const backstagePromotionSettingUpdateHttp = (promotion, data) => {
  return axios.patch(
    backstagePromotionSettingList + '/' + promotion,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 优惠类型列表 Promotion Setting List
export const backstagePromotionTypeSettingListHttp = (data) => {
  return axios.get(
    backstagePromotionTypeSettingList,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 添加优惠类型 Promotion Setting Store
export const backstagePromotionTypeSettingStoreHttp = (data) => {
  return axios.post(
    backstagePromotionTypeSettingList,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 更新优惠类型 Promotion Setting Store
export const backstagePromotionTypeSettingUpdateHttp = (promotion, data) => {
  return axios.patch(
    backstagePromotionTypeSettingList + '/' + promotion,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 优惠类型下拉菜单 Promotion Setting Drop List
export const backstagePromotionTypeSettingDropListHttp = () => {
  return axios.get(
    backstagePromotionTypeSettingDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 轮播图列表
export const backstageBannersHttp = (data) => {
  return axios.get(backstageBanners, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加轮播图
export const addBackstageBannersHttp = (data) => {
  return axios.post(backstageBanners, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 删除轮播图
export const deleteBackstageBannersHttp = (id) => {
  return axios.delete(backstageBanners + '/' + id)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 更新轮播图
export const updateBackstageBannersHttp = (id, data) => {
  return axios.patch(
    backstageBanners + '/' + id,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 获取优惠Codes下拉列表
export const backstageDropListBannerHttp = (data) => {
  return axios.get(
    backstageDropListBanner,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 红利获取所有会员 Marketing Tools Bonus Code Bonus Code Setting
export const backstageMarketingToolsBonusCodeSettingUsersHttp = (user, data) => {
  return axios.get(
    backstageMarketingToolsBonusCodeSettingUsers + '/' + user + bonusCodeSettingUsers,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
