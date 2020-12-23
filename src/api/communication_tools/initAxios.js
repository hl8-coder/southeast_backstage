import axios from 'axios'
// import router from '../router'
// import store from '../vuex'
import qs from 'qs'
// import {axios} from './config'
import {
  backstageAnnouncements,
  backstageDropListAnnouncement,
  backstageDropListUserMessages,
  backstageUserMessages,
  backstageUserMessagesExcelDownload,
  backstageUserNotifications,
  backstageDropListNotification,
  backstageMailboxTemplate,
  backstageMailboxTemplateDropList,
  reply,
  detail,
  backstageContactUs,
  backstageContactUsDropList
} from './apiMeun'
// 公告DropList
export const backstageDropListAnnouncementHttp = (data) => {
  return axios.get(backstageDropListAnnouncement, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 公告列表
export const backstageAnnouncementsHttp = (data) => {
  return axios.get(backstageAnnouncements, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加公告
export const addBackstageBonusGroupsHttp = (data) => {
  return axios.post(backstageAnnouncements, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 更新 公告
export const updateBackstageAnnouncementsHttp = (id, data) => {
  return axios.patch(backstageAnnouncements + '/' + id, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// SMS DropList
export const backstageDropListUserMessagesHttp = (data) => {
  return axios.get(backstageDropListUserMessages, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// SMS 列表
export const backstageUserMessagesHttp = (data) => {
  return axios.get(backstageUserMessages, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加 SMS
export const addBackstageUserMessagesHttp = (data) => {
  return axios.post(backstageUserMessages, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 详情 SMS
export const detailBackstageUserMessagesHttp = (id, data) => {
  return axios.get(backstageUserMessages + '/' + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// download excel
export const backstageUserMessagesExcelDownloadHttp = (data) => {
  return axios.get(backstageUserMessagesExcelDownload, {
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
// 消息通知 列表
export const backstageUserNotificationsHttp = (data) => {
  return axios.get(backstageUserNotifications, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 添加 消息通知
export const addBackstageUserNotificationsHttp = (data) => {
  return axios.post(backstageUserNotifications, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 消息通知 DropList
export const backstageDropListNotificationHttp = (data) => {
  return axios.get(backstageDropListNotification, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 消息通知 详情
export const detailBackstageUserNotificationsHttp = (id, data) => {
  return axios.get(backstageUserNotifications + '/' + id, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 消息通知 详情
export const detailBackstageUserNotificationsDetailHttp = (id, data) => {
  return axios.get(backstageUserNotifications + '/' + id + detail, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 回复
export const detailBackstageUserNotificationsReplyHttp = (id, data) => {
  return axios.patch(backstageUserNotifications + '/' + id + reply, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 邮件模板 MailboxTemplateDropList
export const backstageMailboxTemplateDropListHttp = () => {
  return axios.get(
    backstageMailboxTemplateDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 邮件模板列表 MailboxTemplate
export const backstageMailboxTemplateHttp = (data) => {
  return axios.get(
    backstageMailboxTemplate,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 添加邮件模板 MailboxTemplateStore
export const backstageMailboxTemplateStoreHttp = (data) => {
  return axios.post(
    backstageMailboxTemplate,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 更新邮件模板 MailboxTemplateUpdate
export const backstageMailboxTemplateUpdateHttp = (id, data) => {
  return axios.patch(
    backstageMailboxTemplate + '/' + id,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 删除邮件模板 MailboxTemplateDelete
export const backstageMailboxTemplateDeleteHttp = (id) => {
  return axios.delete(
    backstageMailboxTemplate + '/' + id
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 联系我们 列表
export const backstageContactUsHttp = (data) => {
  return axios.get(
    backstageContactUs,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 联系我们 下拉
export const backstageContactUsDropListHttp = () => {
  return axios.get(
    backstageContactUsDropList
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 联系我们 添加
export const backstageContactUsStoreHttp = (data) => {
  return axios.post(
    backstageContactUs,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 联系我们 修改
export const backstageContactUsUpdateHttp = (id, data) => {
  return axios.patch(
    backstageContactUs + '/' + id,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
