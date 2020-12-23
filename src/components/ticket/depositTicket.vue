<style lang="scss" scoped type="text/scss">
  .contain {
    padding-top: 5px;
    overflow: hidden;
    width: 1200px;
    margin: 0 auto;
    background: white;
    .display-status {
      margin-right: 25px;
    }
    ul:first-child li:first-child{
      border: none;
    }
    ul:first-child li:first-child p{
      text-align: center;
      padding-left: 0;
      font-weight: bold;
      font-size: 14px;
    }
    ul:nth-child(2) li:last-child{
      border: none;
    }
    ul {
      float: left;
      width: 500px;
      margin: auto 50px;
      li {
        overflow: hidden;
        position: relative;
        border: 1px solid #eee;
        border-radius: 5px;
        margin-bottom: 5px;
        padding: 2px 3px;
        .head {
          border-bottom: 1px solid #eee;
          padding-bottom: 2px;
          font-size: 14px;
          font-weight: 600;
        }
        .teshu{
          margin-bottom: 5px;
          height: 28px;
          line-height: 28px;
        }
        .buttonRight {
          margin-top: 5px;
          float: right;
        }
        .fileUploadButton{
          margin-top: 5px;
        }
        .Amount{
          margin-bottom: 5px;
          span{
            margin-right: 5px;
          }
        }
        .ajustmentTo {
          color: #409EFF;
        }
        .left {
          width: 170px;
          text-align: right;
          margin-right: 10px;
        }
        .name {
          min-width: 30px;
        }
        .scroll{
          width: 100%;
          height: 160px;
          overflow: scroll;
        }
      }
      &:first-child{
        border: none
      }
    }
  }
</style>
<style lang="scss" type="text/scss">
  .depositTicket .el-dialog{
    margin-top: 0 !important;
  }
  .depositTicket .el-dialog__body{
    padding: 0 20px 10px !important;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }
  .depositTicket .el-upload{
    margin-left: 190px;
    margin-top: 5px;
  }
  .depositTicket p {
    /*height: 18px;*/
    font-size: 12px;
    line-height: 18px;
    text-indent: 0;
    padding-left: 20px;
  }
  .depositTicket .el-dialog__header {
    padding: 3px 20px 10px;
  }
  .depositTicket .el-dialog__headerbtn{
    top: 10px
  }
  /*.depositTicket .el-input__inner{*/
    /*display: block;*/
  /*}*/
</style>
<template>
    <div class="depositTicket" v-if="ticketConfig">
      <div class="contain">
        <ul>
          <!--TRANSACTION ID-->
          <li>
            <p><span class="display-status">{{ticketConfig.display_status}}</span>TRANSACTION ID: {{ticketConfig.order_no}}</p>
          </li>
          <!--Member Details-->
          <li v-if="ticketConfig.payment_type === 1">
            <p class="head">Member Details</p>
            <p><span class="left">Member Full Name: </span> {{ticketConfig.user_bank_account_name}}</p>
            <p><span class="left">Bank Account Number: </span> {{ticketConfig.user_bank_account_no}}</p>
            <p><span class="left">Bank Name: </span> {{ticketConfig.userBank ? ticketConfig.userBank.name : null}}</p>
            <p><span class="left">Fund In Account: </span> {{ticketConfig.company_bank_code}}</p>
            <p><span class="left">Amount: </span> {{ticketConfig.amount | AllFilter('numeral')}}</p>
            <p><span class="left">Bank Reference:</span> {{ticketConfig.reference_id}}</p>
            <p><span class="left">Channel: </span> {{ticketConfig.display_online_banking_channel}}</p>
          </li>
          <li v-if="ticketConfig.payment_type === 2">
            <p class="head">Member Details</p>
            <p><span class="left">Member Code: </span> {{ticketConfig.user ? ticketConfig.user.name : null}}</p>
            <p><span class="left">Deposit ID: </span> {{ticketConfig.payment_platform_order_no}}</p>
            <p><span class="left">Bank Name: </span> {{ticketConfig.payment_bank_code}}</p>
            <p><span class="left">Amount: </span> {{ticketConfig.amount | AllFilter('numeral')}}</p>
            <p><span class="left">Bank Reference:</span> {{ticketConfig.payment_reference}}</p>
            <p><span class="left">Channel: </span> {{ticketConfig.display_payment_platform}}</p>
          </li>
          <li v-if="ticketConfig.payment_type === 3">
            <p class="head">Member Details</p>
            <p><span class="left">Member Code: </span> {{ticketConfig.user ? ticketConfig.user.name : null}}</p>
            <p><span class="left">Trading Code: </span> {{ticketConfig.mpay_trading_code}}</p>
            <p><span class="left">Amount: </span> {{ticketConfig.amount | AllFilter('numeral')}}</p>
            <p><span class="left">Phone Number:</span> {{ticketConfig.user_mpay_number}}</p>
            <p><span class="left">Channel: </span> Mpay</p>
          </li>
          <li v-if="ticketConfig.payment_type === 5">
            <p class="head">Member Details</p>
            <p><span class="left">Member Code: </span> {{ticketConfig.user ? ticketConfig.user.name : null}}</p>
            <p><span class="left">LINE ID: </span> {{ticketConfig.linepay_id}}</p>
            <p><span class="left">Amount: </span> {{ticketConfig.amount | AllFilter('numeral')}}</p>
            <p><span class="left">Channel: </span> LinePay</p>
          </li>
          <!--Fund In Account-->
          <li>
            <p><span class="left">Transation Date: </span> {{ticketConfig.created_at}}</p>
            <p><span class="left">Deposit Date: </span> {{ticketConfig.deposit_at}}</p>
            <p class=" layout teshu" v-if="!(ticketConfig.payment_type ===2 || ticketConfig.payment_type ===4)">
              <span class="left">Fund In Account: </span>
              <el-autocomplete
                :disabled="ticketConfig.status === 3"
                class="inline-input"
                v-model="ticketConfig.fund_in_account"
                trigger-on-focus
                :fetch-suggestions="querySearch"
                @select="handleSelect"
                clearable
                :style="valueWith"
              ></el-autocomplete>
            </p>
<!--            <p>-->
<!--              <span class="left">Current Balance: </span><span style="color: #66b1ff; font-weight: 600">{{balanceCompanyBank}}</span>-->
<!--            </p>-->
            <p v-show="ticketConfig.payment_type === 4">
              <span class="left">Pin Number: </span>{{ticketConfig.pin_number}}
            </p>
            <p v-show="ticketConfig.payment_type === 4">
              <span class="left">Serial Numbe: </span>{{ticketConfig.serial_number}}
            </p>
            <p>
              <span class="left">Network: </span>{{ticketConfig.card_type}}
            </p>
            <p class="layout teshu">
              <span class="left">Credit Amount: </span>
              <el-input
                :disabled="ticketConfig.status === 3 || ticketConfig.status === 4"
                v-model="ticketConfig.arrival_amount"
                :style="valueWith">
              </el-input>
            </p>
            <p class="layout teshu">
              <span class="left">Bank Fee: </span>
              <el-input
                :disabled="ticketConfig.status === 3 || ticketConfig.status === 4"
                v-model="ticketConfig.bank_fee"
                :style="valueWith">
              </el-input>
            </p>
            <p class="layout teshu">
              <span class="left">Reimbursement Fee: </span>
              <el-input
                :disabled="ticketConfig.status === 3 || ticketConfig.status === 4"
                v-model="ticketConfig.reimbursement_fee"
                :style="valueWith">
              </el-input>
              <el-button
                class="buttonRight"
                :disabled="ticketConfig.status === 3"
                @click="backstageAmountDetailHttp" type="primary">
                SAVE
              </el-button>
            </p>
          </li>
          <!--Operation Logs-->
          <li>
            <p class="head">Operation Logs</p>
            <div class="scroll">
              <p v-if="ticketConfig.operationLogs.data" v-for="(item) in ticketConfig.operationLogs.data" :key="item.id">
                <span class="left">{{item.type}} By: </span> <span class="name">{{item.admin_name}}</span> {{item.created_at}} {{item.reason}}
              </p>
            </div>
            <div v-if="ticketConfig.operationLogs.data" class="FlexRowCenterCenter layout">
              <el-link type="primary" @click="operationLogsVisible = true">VIEW ALL OPERATION LOGS</el-link>
            </div>
            <p v-else>none</p>
          </li>
          <!--HOLD REASON-->
          <li class="FlexRowFlexStartFlexStart"  v-if="!(ticketConfig.payment_type ===2 || ticketConfig.payment_type ===4)">
            <span class="left">HOLD REASON: </span>
            <el-select
              v-model="ticketConfig.hold_reason"
              :disabled="!ticketConfig.btn_hold_show"
              placeholder="Choose A fund_in_account">
              <el-option label="Please select" :value="0" />
              <el-option v-for="(item, key) in DropListDeposit.hold_reason" :label="item.value" :key="key" :value="item.key" />
            </el-select>
          </li>
          <!--REJECT REASON-->
          <li class="FlexRowFlexStartFlexStart">
            <span class="left">REJECT REASON:</span>
            <el-select
              v-model="ticketConfig.reject_reason"
              :disabled="!ticketConfig.btn_reject_show"
              placeholder="Choose A fund_in_account">
              <el-option label="Please select" :value="0" />
              <el-option v-for="(item, key) in DropListDeposit.reject_reason" :label="item.value" :key="key" :value="item.key" />
            </el-select>
          </li>
          <!--Remarks-->
          <li>
            <p class="head">Remarks</p>
            <el-input
              v-model="ticketConfig.remarks"
              :rows="3" type="textarea">
            </el-input>
            <el-button
              @click="backstageExternalRemarkstHttp"
              class="buttonRight"
              type="primary">
              Modify
            </el-button>
          </li>
        </ul>
        <ul>
          <!--Access Logs-->
          <li>
            <p class="head">Access Logs</p>
            <p v-if="ticketConfig.accessLogs.data" v-for="item in ticketConfig.accessLogs.data" :key="item.id">
              <span class="left">{{item.type}} By: </span> {{item.admin_name}} {{item.created_at}}
            </p>
            <p v-else>none</p>
          </li>
          <!--Member Profile-->
          <li>
            <p class="head">Member Profile</p>
            <div>
              <p>
                <span class="left">Member Code: </span>
                <a class="ajustmentTo" href="#" @click="ajustmentTo(ticketConfig.user.name)">{{ticketConfig.user.name}}</a>
              </p>
              <p>
                <span class="left">Member Status: </span>
                {{ticketConfig.user.status}}
              </p>
              <p>
                <span class="left">Member Full Name: </span>
                {{ticketConfig.userInfo.full_name}}
              </p>
              <p>
                <span class="left">Member Wallet: </span>
                {{ticketConfig.userAccount.available_balance}}
              </p>
              <p>
                <span class="left">Risk Category: </span>
                {{ticketConfig.user.display_risk_group_id}}
              </p>
              <p>
                <span class="left">Payment Group: </span>
                {{ticketConfig.user.display_payment_group_id}}
                <el-button
                  class="buttonRight"
                  @click="remarkMethod"
                  type="primary">
                  REMARKS
                </el-button>
              </p>
              <p>
                <span class="left">Affiliated Code: </span>
                {{ticketConfig.user.affiliated_code || '-'}}
              </p>
            </div>
          </li>
          <!--Update Credentials-->
          <li>
            <p class="head">Update Credentials</p>
            <file-upload
              ref="fileUpload"
              :fileConfig = fileConfig
            />
          </li>
          <!--Statement ID-->
          <li v-if="ticketConfig.payment_type ===1">
            <div v-if="ticketConfig.statement_id">
              <p class="head">{{ticketConfig.bankTransaction.fund_in_account}}</p>
              <p><span class="left">Statement ID:  </span>{{ticketConfig.bankTransaction.order_no}}</p>
              <p><span class="left">Fund In Account:  </span>  {{ticketConfig.bankTransaction.fund_in_account}}</p>
              <p><span class="left">Channel:  </span> {{ticketConfig.bankTransaction.channel}}</p>
              <p><span class="left">Bank Reference:  </span> {{ticketConfig.bankTransaction.bank_reference}}</p>
              <p><span class="left">Account No:  </span> {{ticketConfig.bankTransaction.account_no}}</p>
              <p><span class="left">Amount:  </span> {{ticketConfig.bankTransaction.credit}}</p>
              <p><span class="left">Date :  </span> {{ticketConfig.bankTransaction.transaction_date}}</p>
              <p><span class="left">Time :  </span> {{ticketConfig.bankTransaction.transaction_at}}</p>
              <p>
                <span class="left">Description:  </span>
                <span style="width: 280px;vertical-align: text-top;">{{matchInformation.description ? matchInformation.description : ticketConfig.bankTransaction.description}}</span>
              </p>
              <p class="FlexRowCenterCenter teshu">
                <el-button
                  v-if="ticketConfig.btn_unmatch_show"
                  @click="unmatchHttp" type="danger">
                  Unmatch
                </el-button>
              </p>
            </div>
            <div v-if="!ticketConfig.statement_id">
              <p class="FlexRowSpaceBetweenCenter teshu layout" v-if="!matchInformationShow">
                <span>STATEMENT ID:  <el-input v-model="bank_transaction" :style="valueWith"></el-input></span>
                <el-button
                  v-if="ticketConfig.btn_match_show"
                  @click="backstageBankTransactionsDetialHttp(bank_transaction)"
                  type="primary">
                  Match
                </el-button>
              </p>
              <div v-if="matchInformationShow">
                <p class="head">{{matchInformation.fund_in_account}}</p>
                <p><span class="left">Statement ID:  </span> {{matchInformation.order_no}}</p>
                <p><span class="left">Fund In Account:  </span>  {{matchInformation.fund_in_account}}</p>
                <p><span class="left">Channel:  </span> {{matchInformation.channel}}</p>
                <p><span class="left">Bank Reference:  </span> {{matchInformation.bank_reference}}</p>
                <p><span class="left">Account No:  </span> {{matchInformation.account_no}}</p>
                <p><span class="left">Amount:  </span> {{matchInformation.credit}}</p>
                <p><span class="left">Date : </span> {{matchInformation.transaction_date}}</p>
                <p><span class="left">Time : </span> {{matchInformation.transaction_at}}</p>
                <p>
                  <span class="left">Description:  </span>
                  <span style="width: 280px;vertical-align: text-top;">
                    {{matchInformation.description ? matchInformation.description : ticketConfig.hasOwnProperty('bankTransaction') ? ticketConfig.bankTransaction.hasOwnProperty('description') ? ticketConfig.bankTransaction.description : '' : ''}}
                  </span>
                </p>
                <div class="FlexRowCenterCenter teshu layout">
                  <el-button
                    @click="matchBankTransactionsHttp" type="primary">
                    Submit
                  </el-button>
                  <el-button
                    @click="matchInformationShow = !matchInformationShow" type="danger">
                    Cancel
                  </el-button>
                </div>
              </div>
            </div>
          </li>
          <!--Last 10 Transactions-->
          <li>
            <p class="head">Last 10 Transactions</p>
            <p v-for="(item, key) in ticketConfig.userDeposits.data"  v-if='key<10' :key="key">
              <span style="width: 20px;display: inline-block">{{key + 1}}.</span>
              <a  style="width: 80px;display: inline-block" class="ajustmentTo" :href="'/DepositTicket/' + item.id" @click="LinkTicket(item.id, $event)">{{item.order_no}}</a>
              <span style="width: 70px;display: inline-block">{{item.status}} </span>
              <span style="width: 90px;display: inline-block">{{item.amount}}</span>
              <span style="width: 80px;display: inline-block">{{item.display_payment_platform}}</span>
              <span>{{item.created_at}}</span>
            </p>
            <div class="FlexRowCenterCenter layout">
              <el-link type="primary" @click="ViewTransactions(ticketConfig.user.name)">VIEW ALL TRANSACTIONS</el-link>
            </div>
          </li>
          <!--button group-->
          <li>
            <div class="FlexRowFlexStartFlexStart Amount" v-if="ticketConfig.btn_approve_partial_show">
              <span>Amount:</span> <el-input style="width: 200px" v-model="partial_amount"></el-input>
            </div>
            <div class="FlexRowSpaceAroundCenter">
              <el-popover
                placement="top"
                width="160"
                v-for="(item, key) in ticketButtonConfig"
                :key="key"
                @hide="hide(item)"
                @show="show(item)"
                v-model="item.visible">
                <p>are you sure？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="item.visible = false">cancel</el-button>
                  <el-button type="primary" size="mini" @click="affirm(item)">Submit</el-button>
                </div>
                <el-button :type="item.buttonType" slot="reference">{{item.buttonName}}</el-button>
              </el-popover>
            </div>
          </li>
        </ul>
      </div>
      <el-dialog
        width="600px"
        title="Operation Logs"
        :visible.sync="operationLogsVisible"
        append-to-body>
        <div>
          <p v-for="(item, key) in ticketConfig.operationLogs.data" :key="key">
            {{key + 1}}. {{item.type}} By: {{item.admin_name}} {{item.created_at}}
          </p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="operationLogsVisible = false">close</el-button>
        </div>
      </el-dialog>
      <el-dialog
        width="600px"
        title="Transactions Dialog"
        :visible.sync="TransactionsVisible"
        append-to-body>
        <div>
          <p v-for="(item, key) in ticketConfig.userDeposits.data" :key="key">
            {{key + 1}}. {{item.order_no}}  {{item.status}}  {{item.payment_type}}  {{item.created_at}}
          </p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="TransactionsVisible = false">close</el-button>
        </div>
      </el-dialog>
      <el-dialog
        width="1200px"
        title="Remark"
        :visible.sync="Remark.RemarkShow"
        append-to-body>
        <el-button
          style="margin-bottom: 5px"
          type="success"
          @click="addRemark">
          Add Remarks
        </el-button>
        <table-comp
          :tableConfig = Remark.tableConfig
          :resInformation = Remark.resInformation
          @handleSizePageChange = callbacks
        />
        <el-dialog
          width="600px"
          title="Add Remark"
          :visible.sync="Remark.AddShow"
          append-to-body>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="TYPE">
              <el-select v-model="form.type" placeholder="Select a type">
                <el-option
                  v-for="item in remarkDropList.type"
                  v-if="item.value"
                  :key="item.key"
                  :value="item.key"
                  :label="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="CATEGORY">
              <el-select v-model="form.category" @change="form.sub_category = ''" placeholder="Select a category">
                <el-option
                  v-for="item in remarkDropList.category"
                  v-if="item.value"
                  :key="item.key"
                  :value="item.key"
                  :label="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-for="(item, key) in remarkDropList.sub_category" :key="key" v-if="form.category === item.key" label="SUB CATEGORY">
              <el-select v-model="form.sub_category" placeholder="Select a SUB CATEGORY">
                <el-option
                  v-for="item in remarkDropList.sub_category[key].value"
                  v-if="item.value"
                  :key="item.key"
                  :value="item.key"
                  :label="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="REMARK">
              <el-input v-model="form.reason"></el-input>
            </el-form-item>
            <!--<el-form-item>-->
              <!--<el-button-->
                <!--@click="addWithdrawalRemarks"-->
                <!--type="primary">-->
                <!--Add remark-->
              <!--</el-button>-->
            <!--</el-form-item>-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="onSubmit">Submit</el-button>
          </div>
        </el-dialog>
      </el-dialog>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {
  backstageAmountDetailHttp,
  backstageInternalRemarksHttp,
  backstageRemarkstHttp,
  rejectHttp,
  finalApproveHttp,
  holdHttp,
  releaseHoldHttp,
  matchBankTransactionsHttp,
  unmatchHttp,
  approveHttp,
  approveAdvHttp,
  approvePartialHttp,
  revertActionHttp,
  approveAdvanceCreditHttp,
  approvePartialAdvanceCreditHttp,
  backstageBankTransactionsDetialHttp,
  approveChangesHttp,
  cancelHttp,
  requestAdvanceHttp,
  backstageCompanyBankAccountsCodeHttp
} from '../../api/payment/deposit/initAxios'
import {
  backstageRemarksHttp,
  postBackstageRemarksHttp,
  backstageDropListRemarkHttp,
  deleteBackstageRemarksHttp
} from '../../api/remark/initAxios'

import fileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
import tableComp from '../../components/table/tableComp'
import formInlineComp from '../../components/form/formInlineComp'
import element from '../../config/element'
import filter from '../../util/filter'
import numeral from 'numeral'
export default {
  name: 'depositTicket',
  props: ['ticketConfig', 'DropListDeposit'],
  data () {
    return {
      restaurants: [],
      bank_transaction_id: '',
      partial_amount: '',
      operationLogsVisible: false,
      bank_transaction: '',
      matchInformationShow: false,
      matchInformation: {},
      TransactionsVisible: false,
      balanceCompanyBank: '',
      valueWith: {
        width: '180px'
      },
      visible: false,
      ticketButtonConfig: [],
      fileConfig: {
        disabled: false, // 是否禁用
        autoUpload: true, // 是否自动上传
        accept: '.jpg, .jpeg, .png', // 文件上传类型
        url: '', // 请求地址
        fileHeaders: resourcesList.fileHeaders, // 请求头
        name: 'image', // 请求文件字段
        limit: 5, // 限制文件数
        data: {}, // 额外请求参数
        fileList: [], // 文件列表
        type: 'depositTicket', // 自定义类型
        id: '', // 自定义id
        button: 'select bank image'
      },
      Remark: {
        RemarkShow: false,
        resInformation: {},
        tableConfig: {
          loading: false,
          stripe: false,
          border: true,
          tableColumn: [
            {
              prop: 'id',
              label: 'ID',
              fixWidth: '50px'
            },
            {
              prop: '',
              label: '',
              fixWidth: '50px',
              render: (h, params) => {
                if (!params.item.is_removed) {
                  return h('div', [
                    h('el-button', {
                      props: {
                        size: 'small',
                        circle: true,
                        icon: 'el-icon-delete'
                      },
                      style: {
                        marginRight: '5px',
                        background: '#409EFF',
                        color: '#fff',
                        border: 'none'
                      },
                      on: {
                        click: () => {
                          this.$prompt('remove reason :', 'Remove', {
                            confirmButtonText: 'affirm',
                            cancelButtonText: 'cancel'
                          }).then(({ value }) => {
                            deleteBackstageRemarksHttp(params.item.id, {remove_reason: value}).then(res => {
                              element.message({
                                type: 'success',
                                message: 'remove success'
                              })
                              this.initHttp(this.Remark.formInline)
                            }).catch((error) => {
                              console.log(error)
                            })
                          }).catch(() => {
                          })
                        }
                      }
                    })
                  ])
                }
              }
            },
            {
              prop: 'created_at',
              label: 'DATE'
            },
            {
              prop: 'type',
              label: 'TYPE'
            },
            {
              prop: 'category',
              label: 'CATEGORY'
            },
            {
              prop: 'sub_category',
              label: 'SUB CATEGORY'
            },
            {
              prop: 'reason',
              label: 'REASON'
            },
            {
              prop: 'admin_name',
              label: 'ADMIN'
            },
            {
              prop: 'remove_reason',
              label: 'REMOVE REASON'
            },
            {
              prop: 'remove_admin_name',
              label: 'REMOVE ADMIN'
            },
            {
              prop: 'deleted_at',
              label: 'REMOVE DATE'
            }
          ]
        },
        formInlineConfig: [
          {
            type: 'add'
          }
        ],
        formInline: {
          include: 'user',
          per_page: 50,
          page: 1,
          user_id: '',
          category: '',
          type: ''
        },
        AddShow: false,
        addFormInlineConfig: [
          {
            type: 'select',
            label: 'Type',
            formValue: 'type',
            placeholder: 'Select A Type',
            clearable: true,
            value: '',
            list: ''
          },
          {
            type: 'select',
            label: 'Category',
            change: true,
            formValue: 'category',
            placeholder: 'Select A Category',
            clearable: true,
            value: '',
            list: []
          },
          {
            type: 'select',
            label: 'Sub Category',
            formValue: 'sub_category',
            placeholder: 'Select A Sub Category',
            clearable: true,
            value: '',
            list: []
          },
          {
            type: 'textarea',
            label: 'Reason',
            formValue: 'reason',
            placeholder: 'Select A Reason',
            clearable: true,
            value: '',
            list: []
          },
          {
            type: 'Submit'
          }
        ]
      },
      oEvent: null,
      form: {
        type: '',
        category: '',
        sub_category: '',
        reason: ''
      },
      remarkDropList: {}
    }
  },
  components: {
    fileUpload, tableComp, formInlineComp
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  created () {
    this.backstageDropListRemarkHttp()

  },
  mounted () {
    this.init()
    // this.backstageCompanyBankAccountsHttp()
  },
  watch: {
    'ticketConfig.bank_fee' (newvalue, oldvalue) {
      if (numeral(newvalue).value() > numeral(this.ticketConfig.amount).value() || newvalue > 20) {
        this.ticketConfig.bank_fee = oldvalue
        return
      }
      this.ticketConfig.bank_fee = filter.numeralChange(newvalue, oldvalue)
      this.ticketConfig.arrival_amount = numeral(numeral(this.ticketConfig.amount).value() - numeral(this.ticketConfig.bank_fee).value()).format('0,0.00')
    },
    'ticketConfig.arrival_amount' (newvalue, oldvalue) {
      // if (numeral(newvalue).value() > numeral(this.ticketConfig.amount).value()) {
      //   this.ticketConfig.arrival_amount = oldvalue
      //   return
      // }
      this.ticketConfig.arrival_amount = filter.numeralChange(newvalue, oldvalue)
    },
    'ticketConfig.reimbursement_fee' (newvalue, oldvalue) {
      if (newvalue > 20) {
        this.ticketConfig.reimbursement_fee = oldvalue
        return
      }
      this.ticketConfig.reimbursement_fee = filter.numeralChange(newvalue, oldvalue)
    }
  },
  methods: {
    // backstageCompanyBankAccountsHttp () {
    //   backstageCompanyBankAccountsCodeHttp({code: this.ticketConfig.fund_in_account}).then(res => {
    //     this.balanceCompanyBank = res.balance
    //   })
    // },
    // 初始化配置还原
    init () {
      this.fileConfig.url = '/api/backstage/deposits/' + this.ticketConfig.id + '/receipt'
      document.title = this.ticketConfig.order_no
      this.fileConfig.fileList = this.ticketConfig.images.data
      this.fileConfig.id = this.ticketConfig.id
      this.restaurants = this.DropListDeposit.fund_in_account
      this.bank_transaction_id = ''
      this.partial_amount = ''
      if (this.ticketConfig.status === 3 || this.ticketConfig.status === 4) {
        this.fileConfig.disabled = true
      } else {
        this.fileConfig.disabled = false
      }
      this.matchInformationShow = false
      this.bank_transaction = null
      this.buttonShow(this.ticketConfig)
    },
    // 值再转换
    // numeral00 (value) {
    //   return numeral(value).format('0,0.00')
    // },
    hide () {
      document.removeEventListener('keydown', this.oEvent)
    },
    show (item) {
      document.removeEventListener('keydown', this.oEvent)
      this.oEvent = () => {
        var oEvent = window.event
        if (oEvent.keyCode === 32) {
          this.affirm(item)
        }
      }
      document.addEventListener('keydown', this.oEvent)
    },
    // ticket链接跳转
    LinkTicket (id, event) {
      if (!(event.ctrlKey || event.metaKey)) {
        event.returnValue = false
        let routeData = this.$router.resolve({
          name: 'DepositTicket',
          params: {id: id}
        })
        window.open(routeData.href, '_blank')
      }
      // var URL = document.URL.split('?')[0] + '?id=' + id
      // window.open(URL, '_blank')
    },
    // history链接跳转
    ViewTransactions (name) {
      var URL = window.location.protocol + '//' + window.location.host + '/payment_fund_transfers_deposit_history?name=' + name
      window.open(URL, '_blank')
    },
    // ajustment链接跳转
    ajustmentTo (name) {
      let breadcrumb = ['payment', 'Fund Transfers', 'Member Listing']
      let routeData = this.$router.resolve({
        name: 'payment_fund_transfers_member_listing',
        query: {breadcrumb: JSON.stringify(breadcrumb), name: name}
      })
      window.open(routeData.href, '_blank')
      // var URL = window.location.protocol + '//' + window.location.host + '/payment_fund_transfers_member_listing?name=' + name
      // window.open(URL, '_blank')
    },
    // Fund In Account 搜索
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      console.log(queryString, results)
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    handleSelect (item) {
      // backstageCompanyBankAccountsCodeHttp({code: item.key}).then(res => {
      //   this.balanceCompanyBank = res.balance
      // })
    },
    // 图片上传成功
    // Success (res) {
    //   this.fileConfig.fileList.push(res)
    // },
    // 重新刷新列表
    refresh () {
      this.$parent.refresh()
    },
    backstageDropListRemarkHttp () {
      backstageDropListRemarkHttp().then(res => {
        this.remarkDropList = res
        // filter.formValueListFilter(this.remark.formInlineConfig, res, ['category', 'type'])
        // filter.formValueListFilter(this.remark.addFormInlineConfig, res, ['category', 'type'])
      }).catch((error) => {
        console.log(error)
      })
    },
    // 添加remark
    onSubmit () {
      if (!(this.form.category === 1 || this.form.category === 2)) {
        this.form.sub_category = ''
      }
      this.form.user_id = this.ticketConfig.user_id
      postBackstageRemarksHttp(this.form).then(res => {
        element.message({
          type: 'success',
          message: 'add success'
        })
        this.form.sub_category = ''
        this.Remark.AddShow = false
        this.initHttp(this.Remark.formInline)
      }).catch((error) => {
        console.log(error)
      })
    },
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.Remark.formInline.page = value.page
        this.initHttp(this.Remark.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.Remark.formInline.per_page = value.per_page
        this.initHttp(this.Remark.formInline)
        return
      }
      this.initHttp(value)
    },
    addRemark () {
      this.Remark.AddShow = true
    },
    // 拉出remark弹出框
    remarkMethod () {
      this.Remark.RemarkShow = true
      this.Remark.formInline.user_id = this.ticketConfig.user_id
      this.initHttp(this.Remark.formInline)
    },
    // remark请求
    initHttp (formInline) {
      if (!formInline) {
        element.message({
          type: 'error',
          message: 'There is no request'
        })
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.include = 'user'
        formInline.per_page = this.Remark.formInline.per_page
        formInline.page = this.Remark.formInline.page
      }
      this.Remark.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.Remark.tableConfig.loading = true
      backstageRemarksHttp(datalist).then(res => {
        this.Remark.tableConfig.loading = false
        this.Remark.resInformation = res
      }).catch((error) => {
        this.Remark.tableConfig.loading = false
        console.log(error)
      })
    },
    // 操作后的状态值
    holdRejectReason (res) {
      this.ticketConfig.btn_hold_show = res.btn_hold_show
      this.ticketConfig.btn_final_approve_show = res.btn_final_approve_show
      this.ticketConfig.btn_approve_adv_show = res.btn_approve_adv_show
      this.ticketConfig.btn_approve_changes_show = res.btn_approve_changes_show
      this.ticketConfig.btn_reject_show = res.btn_reject_show
      this.ticketConfig.btn_approve_partial_show = res.btn_approve_partial_show
      this.ticketConfig.status = res.status
      this.ticketConfig.remarks = res.remarks
      this.ticketConfig.btn_request_advance_show = res.btn_request_advance_show
      this.ticketConfig.btn_cancel_show = res.btn_cancel_show
      this.ticketConfig.btn_approve_show = res.btn_approve_show
      this.ticketConfig.btn_approve_advance_credit_show = res.btn_approve_advance_credit_show
      this.ticketConfig.btn_release_hold_show = res.btn_release_hold_show
      this.ticketConfig.btn_revert_action_show = res.btn_revert_action_show
      this.ticketConfig.btn_unmatch_show = res.btn_unmatch_show
      this.ticketConfig.btn_match_show = res.btn_match_show
      this.ticketConfig.operationLogs = res.operationLogs
      this.ticketConfig.statement_id = res.statement_id
      if (res.status === 3 || res.status === 4) {
        this.fileConfig.disabled = true
      } else {
        this.fileConfig.disabled = false
      }
      if (res.tag === 2) {
        this.$emit('refresh')
      }
    },
    // 按钮确认后的请求
    affirm (item) {
      var include = {include: 'user,accessLogs,operationLogs,userBank,userAccount,userDeposits,bankTransaction,images'}
      item.visible = false
      let remarks = this.ticketConfig.remarks

      switch (item.type) {
        case 'approve_adv':
          approveAdvHttp(this.ticketConfig.id, include).then(res => {
            this.buttonShow(res)
            this.holdRejectReason(res)
            element.message({
              type: 'success',
              message: 'approve adv success'
            })
          }).catch((error) => {
            console.log(error)
          })
          break
        case 'final_approve':
          finalApproveHttp(this.ticketConfig.id, include).then(res => {
            this.buttonShow(res)
            this.holdRejectReason(res)
            element.message({
              type: 'success',
              message: 'final approve success'
            })
          }).catch((error) => {
            console.log(error)
          })
          break
        case 'approve_changes':
          approveChangesHttp(this.ticketConfig.id, include).then(res => {
            this.buttonShow(res)
            this.holdRejectReason(res)
            if (res.button_flow_code === '1.3.1') {
              element.message({
                type: 'success',
                message: 'The Ticket Has Been Rejected'
              })
            } else {
              element.message({
                type: 'success',
                message: 'approve changes success'
              })
            }
          }).catch((error) => {
            console.log(error)
          })
          break
        case 'approve_partial':
          approvePartialHttp(this.ticketConfig.id, {
            partial_amount: this.partial_amount,
            include: 'user,accessLogs,operationLogs,userBank,userAccount,userDeposits,bankTransaction,images'
          }).then(res => {
            this.buttonShow(res)
            this.holdRejectReason(res)
            element.message({
              type: 'success',
              message: 'approve partial success'
            })
          }).catch((error) => {
            console.log(error)
          })
          break
        case 'approve':
          approveHttp(this.ticketConfig.id, {
            bank_transaction_id: this.bank_transaction_id,
            include: 'user,accessLogs,operationLogs,userBank,userAccount,userDeposits,bankTransaction,images'
          }).then(res => {
            this.buttonShow(res)
            this.holdRejectReason(res)
            element.message({
              type: 'success',
              message: 'approve success'
            })
          }).catch((error) => {
            console.log(error)
          })
          break
        case 'apprvoe_advance_creadit':
          approveAdvanceCreditHttp(this.ticketConfig.id, include).then(res => {
            this.buttonShow(res)
            this.holdRejectReason(res)
            if (this.ticketConfig.payment_type === 3 || this.ticketConfig.payment_type === 1) {
              this.$emit('refresh')
            }
            element.message({
              type: 'success',
              message: 'approve advance credit success'
            })
          }).catch((error) => {
            console.log(error)
          })
          break
        case 'apprvoe_partial_advance_creadit':
          approvePartialAdvanceCreditHttp(this.ticketConfig.id, include).then(res => {
            this.buttonShow(res)
            this.holdRejectReason(res)
            if (this.ticketConfig.payment_type === 3 || this.ticketConfig.payment_type === 1) {
              this.$emit('refresh')
            }
            element.message({
              type: 'success',
              message: 'approve partial advance credit success'
            })
          }).catch((error) => {
            console.log(error)
          })
          break
        case 'hold':
          holdHttp(this.ticketConfig.id, {
            hold_reason: this.ticketConfig.hold_reason,
            include: 'user,accessLogs,operationLogs,userBank,userAccount,userDeposits,bankTransaction,images'
          }).then(res => {
            this.buttonShow(res)
            this.holdRejectReason(res)
            element.message({
              type: 'success',
              message: 'hold success'
            })
          }).catch((error) => {
            console.log(error)
          })
          break
        case 'reject':
          rejectHttp(this.ticketConfig.id, {
            reject_reason: this.ticketConfig.reject_reason,
            include: 'user,accessLogs,operationLogs,userBank,userAccount,userDeposits,bankTransaction,images'
          }).then(res => {
            this.buttonShow(res)
            this.holdRejectReason(res)
            element.message({
              type: 'success',
              message: 'reject success'
            })
          }).catch((error) => {
            console.log(error)
          })
          break
        case 'release_hold':
          releaseHoldHttp(this.ticketConfig.id, include).then(res => {
            this.buttonShow(res)
            this.holdRejectReason(res)
            element.message({
              type: 'success',
              message: 'release hold success'
            })
            if (remarks) {
              this.ticketConfig.remarks = remarks
              this.backstageExternalRemarkstHttp()
            }
          }).catch((error) => {
            console.log(error)
          })
          break
        case 'revert_action':
          revertActionHttp(this.ticketConfig.id, include).then(res => {
            this.buttonShow(res)
            this.holdRejectReason(res)
            element.message({
              type: 'success',
              message: 'revert action success'
            })
          }).catch((error) => {
            console.log(error)
          })
          break
        case 'request_advance':
          requestAdvanceHttp(this.ticketConfig.id, include).then(res => {
            this.buttonShow(res)
            this.holdRejectReason(res)
            element.message({
              type: 'success',
              message: 'request advance success'
            })
          }).catch((error) => {
            console.log(error)
          })
          break
        case 'cancel':
          cancelHttp(this.ticketConfig.id, include).then(res => {
            this.buttonShow(res)
            this.holdRejectReason(res)
            element.message({
              type: 'success',
              message: 'cancel success'
            })
          }).catch((error) => {
            console.log(error)
          })
          break
        default:
          console.log('approve_adv')
      }
    },
    // 按钮初始化
    buttonShow (buttonShow) {
      this.ticketButtonConfig = []
      var obj = {}
      if (buttonShow.btn_final_approve_show) {
        obj = {
          type: 'final_approve',
          buttonType: 'success',
          buttonName: 'Final Approve',
          visible: false
        }
        this.ticketButtonConfig.push(obj)
      }
      if (buttonShow.btn_approve_adv_show) {
        obj = {
          type: 'approve_adv',
          buttonType: 'success',
          buttonName: 'Approve Adv',
          visible: false
        }
        this.ticketButtonConfig.push(obj)
      }
      if (buttonShow.btn_approve_changes_show) {
        obj = {
          type: 'approve_changes',
          buttonType: 'success',
          buttonName: 'Approve Change',
          visible: false
        }
        this.ticketButtonConfig.push(obj)
      }
      if (buttonShow.btn_approve_partial_show) {
        obj = {
          type: 'approve_partial',
          buttonType: 'success',
          buttonName: 'Approve Partial',
          visible: false
        }
        this.ticketButtonConfig.push(obj)
      }
      if (buttonShow.btn_approve_show) {
        obj = {
          type: 'approve',
          buttonType: 'success',
          buttonName: 'Approve',
          visible: false
        }
        this.ticketButtonConfig.push(obj)
      }
      if (buttonShow.btn_approve_advance_credit_show) {
        obj = {
          type: 'apprvoe_advance_creadit',
          buttonType: 'success',
          buttonName: 'Approve Advance Credit',
          visible: false
        }
        this.ticketButtonConfig.push(obj)
      }
      if (buttonShow.btn_approve_partial_advance_credit_show) {
        obj = {
          type: 'apprvoe_partial_advance_creadit',
          buttonType: 'success',
          buttonName: 'Approve Partial Advance Credit',
          visible: false
        }
        this.ticketButtonConfig.push(obj)
      }
      if (buttonShow.btn_hold_show) {
        obj = {
          type: 'hold',
          buttonType: 'warning',
          buttonName: 'Hold',
          visible: false
        }
        this.ticketButtonConfig.push(obj)
      }
      if (buttonShow.btn_reject_show) {
        obj = {
          type: 'reject',
          buttonType: 'danger',
          buttonName: 'Reject',
          visible: false
        }
        this.ticketButtonConfig.push(obj)
      }
      if (buttonShow.btn_release_hold_show) {
        obj = {
          type: 'release_hold',
          buttonType: 'warning',
          buttonName: 'Release Hold',
          visible: false
        }
        this.ticketButtonConfig.push(obj)
      }
      if (buttonShow.btn_revert_action_show) {
        obj = {
          type: 'revert_action',
          buttonType: 'danger',
          buttonName: 'Revert Action',
          visible: false
        }
        this.ticketButtonConfig.push(obj)
      }
      if (buttonShow.btn_request_advance_show) {
        obj = {
          type: 'request_advance',
          buttonType: 'primary',
          buttonName: 'Request Advance',
          visible: false
        }
        this.ticketButtonConfig.push(obj)
      }
      if (buttonShow.btn_cancel_show) {
        obj = {
          type: 'cancel',
          buttonType: 'danger',
          buttonName: 'Cancel',
          visible: false
        }
        this.ticketButtonConfig.push(obj)
      }
    },
    // 保存 Fund In Account
    backstageAmountDetailHttp () {
      var datalist = {
        fund_in_account: this.ticketConfig.fund_in_account,
        receive_amount: this.ticketConfig.receive_amount,
        arrival_amount: this.ticketConfig.arrival_amount,
        bank_fee: this.ticketConfig.bank_fee,
        reimbursement_fee: this.ticketConfig.reimbursement_fee,
        include: 'user,accessLogs,operationLogs,userBank,userAccount,userDeposits,bankTransaction,images'
      }
      backstageAmountDetailHttp(this.ticketConfig.id, datalist).then(res => {
        element.message({
          type: 'success',
          message: 'save already'
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    // 保存 Internal Remarks
    backstageInternalRemarksHttp () {
      backstageInternalRemarksHttp(this.ticketConfig.id, {internal_remarks: this.ticketConfig.internal_remarks}).then(res => {
        element.message({
          type: 'success',
          message: 'remarks already'
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    // 保存 External Remarks
    backstageExternalRemarkstHttp () {
      backstageRemarkstHttp(this.ticketConfig.id, {
        remarks: this.ticketConfig.remarks,
        include: 'user,accessLogs,operationLogs,userBank,userAccount,userDeposits,bankTransaction,images'
      }).then(res => {
        element.message({
          type: 'success',
          message: 'remarks already'
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    // 取消充值领取银行交易记录
    unmatchHttp () {
      unmatchHttp(this.ticketConfig.id, {
        include: 'user,accessLogs,operationLogs,userBank,userAccount,userDeposits,bankTransaction,images'
      }).then(res => {
        this.buttonShow(res)
        this.holdRejectReason(res)
        this.ticketConfig.statement_id = null
        this.matchInformationShow = false
        element.message({
          type: 'success',
          message: 'success'
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    // 银行交易详细记录
    backstageBankTransactionsDetialHttp (id) {
      if (!id) {
        element.message({
          type: 'error',
          message: 'STATEMENT ID is required'
        })
        return
      }
      backstageBankTransactionsDetialHttp(id).then(res => {
        this.bank_transaction_id = res.id
        this.matchInformationShow = true
        this.matchInformation = res
      }).catch((error) => {
        console.log(error)
      })
    },
    // match充值领取银行交易记录
    matchBankTransactionsHttp () {
      matchBankTransactionsHttp(this.ticketConfig.id, this.matchInformation.id, {
        include: 'user,accessLogs,operationLogs,userBank,userAccount,userDeposits,bankTransaction,images'
      }).then(res => {
        this.buttonShow(res)
        this.holdRejectReason(res)
        this.ticketConfig.statement_id = this.matchInformation.id
        this.ticketConfig.bankTransaction = res.bankTransaction
        element.message({
          type: 'success',
          message: 'success'
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
