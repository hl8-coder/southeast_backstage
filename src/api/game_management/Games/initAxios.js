import axios from 'axios'
import qs from 'qs'
import {
  backstageGameManagementGameDropList,
  backstageGameManagementGames,
  backstageGameManagementAudit
} from '../apiMeun'
export const backstageGameManagementAuditHttp = (id, data) => {
  return axios.get(
    backstageGameManagementAudit + '/' + id,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 下拉菜单 Game Drop List
export const backstageGameManagementGameDropListHttp = () => {
  return axios.get(
    backstageGameManagementGameDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 获取游戏列表 Games List
export const backstageGameManagementGamesHttp = (data) => {
  return axios.get(
    backstageGameManagementGames,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 添加游戏 Game Store
export const backstageGameManagementGameStoreHttp = (data) => {
  return axios.post(
    backstageGameManagementGames,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 更新游戏 Game Update
export const backstageGameManagementGameUpdateHttp = (game, data) => {
  return axios.patch(
    backstageGameManagementGames + '/' + game,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 删除游戏 Game Delete
export const backstageGameManagementGameDeleteHttp = (game) => {
  return axios.delete(
    backstageGameManagementGames + '/' + game
  ).then((res) => {
    return Promise.resolve(res)
  })
}
