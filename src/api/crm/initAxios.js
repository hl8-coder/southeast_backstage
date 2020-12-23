import axios from 'axios'
import qs from 'qs'
import {
  backstageCrmList,
  backstageCrmDropList,
  backstageCrmStoreCallLog,
  backstageCrmExcelExport,
  backstageCallLogsExcelExport,
  backstageCrmMemberCallLogs,
  backstageCrmTagSetting,
  backstageCrmResourceExcelTemplate,
  backstageCrmResource,
  backstageCrmResourceDropList,
  backstageCrmResourceCallLogs,
  backstageCrmExcludeUsers,
  backstageCrmExcludeUsersDropList,
  backstageCrmBoAdminAudits,
  callLogs,
  crmResourceCallLogs,
  crmOrdersImportTemplate
} from './apiMeun'
// CRM List
export const backstageCrmListHttp = (data) => {
  return axios.get(backstageCrmList, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// CRM List Member Call Logs
export const backstageCrmMemberCallLogsHttp = (id, data) => {
  return axios.get(backstageCrmList + '/' + id + backstageCrmMemberCallLogs, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// CRM List Member Update Call Logs
export const backstageCrmMemberUpdateCallLogsHttp = (data) => {
  return axios.patch(backstageCrmList, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// CRM tag setting
export const backstageCrmTagSettingHttp = () => {
  return axios.get(backstageCrmTagSetting)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// CRM tag setting
export const backstageCrmTagSettingPatchHttp = (data) => {
  return axios.patch(backstageCrmTagSetting, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// CRM Drop List
export const backstageCrmDropListHttp = () => {
  return axios.get(backstageCrmDropList)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// CRM Drop List
export const backstageCrmResourceDropListHttp = () => {
  return axios.get(backstageCrmResourceDropList)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// CRM Store Call Log
export const backstageCrmStoreCallLogHttp = (data) => {
  return axios.post(backstageCrmStoreCallLog, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// CRM Resource Store Call Log
export const backstageCrmResourceCallLogsHttp = (data) => {
  return axios.post(backstageCrmResourceCallLogs, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 下载报表
export const backstageCrmExcelExportHttp = (data, type) => {
  const api = type === 1 ? backstageCrmExcelExport : backstageCallLogsExcelExport;
  return axios.get(api, {
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

// crm resource 列表
export const backstageCrmResourceHttp = (data) => {
  return axios.get(backstageCrmResource, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// crm resource 提交资源
export const backstageCrmResourcePatchHttp = (data) => {
  return axios.patch(backstageCrmResource, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 下载模板报表
export const backstageCrmResourceExcelTemplateHttp = (data) => {
  return axios.get(backstageCrmResourceExcelTemplate, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    'responseType': 'blob'
  })
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Crm Exclude User Index
export const backstageCrmExcludeUserIndexHttp = (data) => {
  return axios.get(backstageCrmExcludeUsers, {
    params: data
  })
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Crm Exclude User Store
export const backstageCrmExcludeUserStoreHttp = (data) => {
  return axios.post(backstageCrmExcludeUsers, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Crm Exclude User Update
export const backstageCrmExcludeUserUpdateHttp = (id, data) => {
  return axios.patch(backstageCrmExcludeUsers + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Crm Exclude User Delete
export const backstageCrmExcludeUserDeleteHttp = (id) => {
  return axios.delete(backstageCrmExcludeUsers + '/' + id)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Crm Exclude User Drop List
export const backstageCrmExcludeUsersDropListHttp = () => {
  return axios.get(backstageCrmExcludeUsersDropList)
    .then((res) => {
      return Promise.resolve(res)
    })
}
// Crm Bo Admin Audit
export const backstageCrmBoAdminAuditsHttp = (data) => {
  return axios.get(backstageCrmBoAdminAudits, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// CRM List Member Call Logs
export const backstageCrmCallLogsHttp = (id, data) => {
  return axios.get(backstageCrmList + '/' + id + callLogs, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// CRM List Member Call Logs
export const backstageCrmResourceCallLogDetailHttp = (id, data) => {
  return axios.get(backstageCrmResource + '/' + id + crmResourceCallLogs, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
export const crmOrdersImportTemplatetHttp = (data, type) => {
  return axios.get(crmOrdersImportTemplate, {
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
