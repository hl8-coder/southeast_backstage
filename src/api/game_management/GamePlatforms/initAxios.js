import axios from 'axios'
import qs from 'qs'
import {
  backstageGameManagementGamePlatformsDropList,
  backstageGameManagementGamePlatforms
} from '../apiMeun'
// Game Management
// 获取游戏平台列表 Game Platforms List
export const backstageGameManagementGamePlatformsHttp = (data) => {
  return axios.get(
    backstageGameManagementGamePlatforms,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 更新游戏平台 Update Game Platforms
export const backstageGameManagementGamePlatformUpdateHttp = (gamePlatform, data) => {
  return axios.patch(
    backstageGameManagementGamePlatforms + '/' + gamePlatform,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 下拉菜单 Game Platforms Drop List
export const backstageGameManagementGamePlatformsDropListHttp = () => {
  return axios.get(
    backstageGameManagementGamePlatformsDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
