// 充值详情
export const backstageDeposit = '/api/backstage/deposits'
// 下拉菜单
export const backstageDropListDeposit = '/api/backstage/drop_list/deposit'
export const backstageUserMpayNumber = '/api/backstage/user_mpay_numbers/user_index'
// payment >> open deposit
export const backstageDepositsOpenDeposit = '/api/backstage/deposits/open_deposit'
// payment >> deposit TxnInqVbs 银行交易记录
export const backstageBankTransactions = '/api/backstage/bank_transactions'
// payment >> deposit TxnInqVbs 银行交易记录详情
export const backstageBankTransactionsDetail = '/api/backstage/deposits/bank_transactions'
// payment >> deposit TxnInqVbs 修改credit的值
export const backstageBankTransactionsCredit = '/credit'
// payment >> deposit TxnInqVbs 备注银行交易记录
export const backstageBankTransactionsRemark = '/remark'
// payment >> deposit TxnInqVbs 银行交易记录匹配日志
export const backstageBankTransactionsLogs = '/audit'
// payment >> deposit TxnInqVbs 导入银行交易记录text
export const backstageBankTransactionsText = '/api/backstage/bank_transactions/text'
// payment >> deposit TxnInqVbs 获取excel表重复记录
export const backstageBankTransactionsDuplicateTransactions = '/api/backstage/bank_transactions/duplicate_transactions'
// payment >> deposit TxnInqVbs 银行字段信息drop_list
export const backstageDropListBankTransactions = '/api/backstage/drop_list/bank_transaction'
// payment >> fast deposit 网银充值下拉单FastDeposit DropList
export const backstageDropListFastDeposit = '/api/backstage/deposits/fast_deposit'
// payment >> gateway 第三方充值单
export const backstageDepositGateway = '/api/backstage/deposits/gateway'
// payment >> AdvanceCredit 信贷充值单
export const backstageDepositAdvanceCredit = '/api/backstage/deposits/advance_credit'
// payment >> fund_in_account 更改金额细节
export const amountDetail = '/amount_detail'
// payment >> fund_in_account 更改实际收款账号
export const fundInAccount = '/fund_in_account'
// payment >> internal_remarks 更改内部备注
export const internalRemarks = '/internal_remarks'
// payment >> external_remarks 更改外部备注
export const Remarks = '/remarks'
// payment >> reject 拒绝
export const reject = '/reject'
// payment >> hold 保留
export const hold = '/hold'
// payment >> release_hold 取消保留
export const releaseHold = '/release_hold'
// payment >> bank_transactions 充值领取银行交易记录
export const matchBankTransactions = '/match/bank_transactions'
// payment >> unmatch 取消充值领取银行交易记录
export const unmatch = '/unmatch'
// payment >> approve 批淮
export const approve = '/approve'
// payment >> approve_adv 请求全额上分
export const approveAdv = '/approve_adv'
// payment >> approve_partial 请求部份上分
export const approvePartial = '/approve_partial'
// payment >> revert_action 取消请求
export const revertAction = '/revert_action'
// payment >> approve_advance_credit 完整上分
export const approveAdvanceCredit = '/approve_advance_credit'
// payment >> approve_advance_credit 部分上分
export const approvePartialAdvanceCredit = '/approve_partial_advance_credit'
// payment >> receipt 上传凭证
export const receipt = '/receipt'
// payment >> approve_changes 二次批准
export const approveChanges = '/approve_changes'
// payment >> request_advance 请求
export const requestAdvance = '/request_advance'
// payment >> final_approve
export const finalApprove = '/final_approve'
// payment >> request_advance 请求
export const cancel = '/cancel'
// payment >> lose 遗失
export const lose = '/lose'
// 手动充值 Menu 选项
export const backstageManualDepositMenu = '/api/backstage/payment_platform/menu'
// 手动充值 渠道 Eg. 网银列表，充值卡列表
export const backstageManualDepositPaymentPlatform = '/api/backstage/payment_platform/index'
// 下拉菜单 充值渠道
export const backstageManualDepositPaymentPlatformDropList = '/api/backstage/drop_list/payment_platform_channel'
// 获取充值银行 下拉菜单
export const backstageManualDepositBankDropList = '/api/backstage/drop_list/manual_deposit_bank'
// 手动充值 充值
export const backstageManualDeposit = '/api/backstage/manual/deposits'
// 检查会员名是否存在
export const backstageManualDepositCheckUsername = '/api/backstage/check/username'
// 获取会员银行卡
export const backstageGetUserBank = '/api/backstage/get/user/bank'
// 充值访问记录
export const backstageDepositLogs = '/logs'
// 充值访问记录
export const backstageExportDepositLogs = '/api/backstage/export/deposit/log'
export const backstageCompanyBankAccountsCode = '/api/backstage/company_bank_accounts/code'
