import axios from 'axios'
import qs from 'qs'
import {
  backstageBalanceBatchAdjustment,
  indexBatchAdjustment,
  showBatchAdjustment,
  storeBatchAdjustment,
  exportTemplate,
  backstageBalanceBatchRemark,
  batchRemarkFails
} from './apiMeun'
// Balance Batch Adjustment Index
export const backstageBalanceBatchAdjustmentIndexHttp = (data) => {
  return axios.get(backstageBalanceBatchAdjustment + indexBatchAdjustment, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
export const batchRemarkFailsHttp = (id, data) => {
  return axios.get(batchRemarkFails + '/' + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Balance Batch Adjustment Index
export const backstageBalanceBatchRemarkIndexHttp = (data) => {
  return axios.get(backstageBalanceBatchRemark + indexBatchAdjustment, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// backstageBalanceBatchRemark Store
export const backstageBalanceBatchAdjustmentStoreHttp = (data) => {
  return axios.post(backstageBalanceBatchAdjustment + storeBatchAdjustment, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Balance Batch Adjustment Store
export const backstageBalanceBatchRemarkStoreHttp = (data) => {
  return axios.post(backstageBalanceBatchRemark + storeBatchAdjustment, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Balance Batch Adjustment Show
export const backstageBalanceBatchAdjustmentShowHttp = (id, data) => {
  return axios.get(backstageBalanceBatchAdjustment + showBatchAdjustment + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Balance Batch Remark Show
export const backstageBalanceBatchRemarkShowHttp = (id, data) => {
  return axios.get(backstageBalanceBatchRemark + showBatchAdjustment + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Balance Batch Adjustment Export
export const backstageBalanceBatchAdjustmentExportHttp = () => {
  return axios.get(backstageBalanceBatchAdjustment + exportTemplate, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    'responseType': 'blob'
  })
    .then((res) => {
      return Promise.resolve(res)
    })
}
// backstageBalanceBatchRemark Export
export const backstageBalanceBatchRemarkExportHttp = () => {
  return axios.get(backstageBalanceBatchRemark + exportTemplate, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    'responseType': 'blob'
  })
    .then((res) => {
      return Promise.resolve(res)
    })
}
