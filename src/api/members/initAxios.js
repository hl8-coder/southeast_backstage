import axios from 'axios'
// import router from '../router'
// import store from '../vuex'
import qs from 'qs'
// import {axios} from './config'
import {
  backstageUsers,
  backstageUsersStatus,
  claimVerifyPrize,
  backstageUsersResetPassword,
  backstageUsersDropList,
  backstageGamePlatformUsers,
  BalanceStatus,
  ProfileRemarks,
  backstageProfileRemarksDropList,
  VerifyPhone,
  VerifyEmail,
  Audit,
  backstageUsersRiskGroup,
  backstageUsersPaymentGroup,
  backstageUsersReward,
  backstageUserBonusPrizes,
  backstageWithdrawals,
  backstageAdjustments,
  UsersBonusPrizes,
  backstageUsersPlatformReports,
  backstageUsersDepositsUser,
  backstageMemberPromotionCheckingTool,
  userIndex,
  resetSecurityQuestion,
  backstageMemberBankAccount,
  memberBankAccount,
  backstageMemberMPayAccountList,
  VerifyBankAccount,
  backstageUserBonusPrizesExport
} from './apiMeun'
// 字段列表
export const backstageUsersDropListHttp = () => {
  return axios.get(backstageUsersDropList, {})
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  会员列表
export const backstageUsersHttp = (data) => {
  return axios.get(backstageUsers, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  会员详情
export const backstageUsersDetailHttp = (user, data) => {
  return axios.get(backstageUsers + '/' + user, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  会员更改信息
export const backstageUsersUserUpdateHttp = (user, data) => {
  return axios.patch(backstageUsers + '/' + user, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  重置会员密保问题
export const resetSecurityQuestionHttp = (user, data) => {
  return axios.patch(backstageUsers + '/' + user + resetSecurityQuestion, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  会员更改状态
export const backstageUsersStatusHttp = (user, data) => {
  return axios.patch(backstageUsers + '/' + user + backstageUsersStatus, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  会员领取奖励
export const claimVerifyPrizeHttp = (user, data) => {
  return axios.post(backstageUsers + '/' + user + claimVerifyPrize, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  会员更改风控状态
export const backstageUsersRiskGroupHttp = (user, data) => {
  return axios.patch(backstageUsers + '/' + user + backstageUsersRiskGroup, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  会员更改支付组别
export const backstageUsersPaymentGroupHttp = (user, data) => {
  return axios.patch(backstageUsers + '/' + user + backstageUsersPaymentGroup, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  会员更改积分组别
export const backstageUsersRewardHttp = (user, data) => {
  return axios.patch(backstageUsers + '/' + user + backstageUsersReward, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  会员重置密码
export const backstageUsersResetPasswordHttp = (user, data) => {
  return axios.patch(backstageUsers + '/' + user + backstageUsersResetPassword, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}

//  会员更改第三方钱包状态
export const backstageGamePlatformUsersHttp = (user, data) => {
  return axios.patch(backstageGamePlatformUsers + '/' + user + BalanceStatus, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  会员profile_remarks
export const backstageUsersProfileRemarksHttp = (user, data) => {
  return axios.get(backstageUsers + '/' + user + ProfileRemarks, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  会员profile_remarks_Droplist
export const backstageProfileRemarksDroplistHttp = (data) => {
  return axios.get(backstageProfileRemarksDropList, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  添加会员profile_remarks
export const addBackstageUsersProfileRemarksHttp = (user, data) => {
  console.log(data)
  return axios.post(backstageUsers + '/' + user + ProfileRemarks, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  后台验证手机
export const backstageGamePlatformUsersVerifyPhoneHttp = (user, data) => {
  return axios.patch(backstageUsers + '/' + user + VerifyPhone, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  后台验证邮箱
export const backstageGamePlatformUsersVerifyEmailHttp = (user, data) => {
  return axios.patch(backstageUsers + '/' + user + VerifyEmail, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  后台验证邮箱
export const backstageGamePlatformUsersVerifyBankAccountHttp = (user, data) => {
  return axios.patch(backstageUsers + '/' + user + VerifyBankAccount, qs.stringify(data))
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  会员信息修改记录
export const backstageUsersAuditHttp = (user, data) => {
  return axios.get(backstageUsers + '/' + user + Audit, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
//  会员红利列表 backstageUserBonusPrizes
export const backstageUserBonusPrizesHttp = (data) => {
  return axios.get(backstageUserBonusPrizes, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 提现列表 backstageWithdrawals
export const backstageWithdrawalsHttp = (data) => {
  return axios.get(backstageWithdrawals, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 调整列表
export const backstageAdjustmentsHttp = (data) => {
  return axios.get(backstageAdjustments, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 会员红利列表
export const backstageUsersBonusPrizesHttp = (data) => {
  return axios.get(UsersBonusPrizes, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 会员第三方平台报表
export const backstageUsersPlatformReportsHttp = (user, data) => {
  return axios.get(backstageUsers + '/' + user + backstageUsersPlatformReports, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 会员第三方平台报表
export const backstageUsersDepositsUserHttp = (user, data) => {
  return axios.get(backstageUsersDepositsUser + '/' + user, {params: data})
    .then((res) => {
      return Promise.resolve(res)
    })
}
// 红利奖励 Promotion Checking Tool
export const backstageMemberPromotionCheckingToolHttp = (data) => {
  return axios.get(
    backstageMemberPromotionCheckingTool + userIndex,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 关闭红利 Promotion Checking Tool Close
export const backstageMemberPromotionCheckingToolCloseHttp = (bonus, data) => {
  return axios.delete(
    backstageMemberPromotionCheckingTool + '/' + bonus,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 会员银行卡
export const backstageMemberBankAccountHttp = (data) => {
  return axios.get(
    backstageMemberBankAccount,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 会员银行卡
export const backstageMemberBankAccountUpdateStatusHttp = (bank, data) => {
  return axios.patch(
    backstageMemberBankAccount + '/' + bank + memberBankAccount,
    qs.stringify(data)
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 删除会员银行卡
export const deleteBackstageMemberBankAccountHttp = (bank) => {
  return axios.delete(
    backstageMemberBankAccount + '/' + bank
  ).then((res) => {
    return Promise.resolve(res)
  })
}
//
export const backstageMemberMPayAccountListHttp = (data) => {
  return axios.get(
    backstageMemberMPayAccountList,
    {params: data}
  ).then((res) => {
    return Promise.resolve(res)
  })
}
// 删除会员银行卡
export const deleteBackstageMemberMPayAccountListHttp = (id) => {
  return axios.delete(
    backstageMemberMPayAccountList + '/' + id
  ).then((res) => {
    return Promise.resolve(res)
  })
}
export const backstageUserBonusPrizesExportHttp = (data) => {
  return axios.get(
    backstageUserBonusPrizesExport, {
      params: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      'responseType': 'blob'
    }
  )
    .then((res) => {
      return Promise.resolve(res)
    })
}
