import axios from 'axios'
import qs from 'qs'
import {
  backstageGameManagementGameProductsDropList,
  backstageGameManagementGameProducts
} from '../apiMeun'
// 下拉菜单 Game Products Drop List
export const backstageGameManagementGameProductsDropListHttp = () => {
  return axios.get(
    backstageGameManagementGameProductsDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 获取游戏产品列表 Game Products List
export const backstageGameManagementGameProductsHttp = (data) => {
  return axios.get(
    backstageGameManagementGameProducts,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 更新游戏产品 Update Game Products
export const backstageGameManagementGameProductUpdateHttp = (gameProduct, data) => {
  return axios.patch(
    backstageGameManagementGameProducts + '/' + gameProduct,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
