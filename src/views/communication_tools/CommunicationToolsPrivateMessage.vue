<style lang="scss" scoped type="text/scss">
  .FlexRowFlexStartFlexStart{
    margin-bottom: 10px;
    .title {
      text-align: right;
      float: left;
      font-size: 14px;
      width: 140px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
</style>
<style lang="scss">
  ul.chat_info {
    list-style: none;
    padding: 0;
    margin: 0;
    display: block;
    width: 100%;
    height: 700px;
    overflow: hidden;
    overflow-y: auto;
  }
  .chat_info {
    li{
      margin-top: 15px;
      overflow: hidden;
      i{
        display: block;
        margin-bottom: 10px;
      }
      div{
        text-align: left;
        padding: 5px;
        background-color: #D0D7DF;
        word-break: break-all;
      }
    }
    .left{
      text-align: left;
      div {
        float: left;
      }
    }
    .right{
      text-align: right;
      div {
        float: right;
      }
    }
    div {
      background: #eee;
      padding: 0 .5rem;
      border-radius: .5rem;
    }
  }
  .send-msg {
    .el-textarea__inner {
      padding: 2px 15px;
      line-height: 1;
    }
  }
</style>
<template>
  <div class="PrivateMessage">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    >
      <template v-slot:content>
        <el-button style="margin-right: 5px" type="danger" @click="downloadExcel">Download</el-button>
      </template>
    </form-inline-comp>
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog title="New Private Message" :visible.sync="Visible">
      <el-alert
        style="margin-bottom: 10px"
        title="Please download the excel file template"
        type="info"
        center
        :closable="false"
        show-icon>
      </el-alert>
      <el-form
        label-width="150px"
      >
        <el-form-item
          label="Member Code"
        >
          <el-row>
            <el-col :span="8">
              <el-input
                v-model="formToStore.name"
                style="width: 220px"
                :disabled="theMemberCodeStatus"
              />
            </el-col>
            <el-col :span="8">
              <file-upload
                ref="fileUpload"
                :fileConfig = fileConfig
                @handleChange = handleChange
                @handleRemove = handleRemove
                @Success = Success
                @Error = Error
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          label="Member Status"
        >
          <el-select
            v-model="formToStore.status"
            placeholder="Please select"
          >
            <el-option
              v-for="item in dropList.member_status"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Category"
        >
          <el-select
            v-model="formToStore.category"
            placeholder="Please select"
          >
            <el-option
              v-for="item in dropList.category"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
<!--        <el-form-item-->
<!--          label="Date"-->
<!--        >-->
<!--          <el-date-picker-->
<!--            v-model="formToStore.date"-->
<!--            type="daterange"-->
<!--            align="right"-->
<!--            unlink-panels-->
<!--            range-separator="|"-->
<!--            start-placeholder="From"-->
<!--            end-placeholder="To"-->
<!--            :picker-options="pickerOptions"-->
<!--          />-->
<!--        </el-form-item>-->
        <el-form-item
          label="Message"
        >
          <el-input
            type="textarea"
            :rows="6"
            placeholder="Please enter content"
            v-model="formToStore.message"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="userListStatus"
    >
      <table-comp
        :table-config="userListTableConfig"
        :res-information="userListTableData"
        @handleSizePageChange = userListCallbacks
      ></table-comp>
      <el-dialog
        :title="chatDialogInfo.title"
        :visible.sync="chatDialogInfo.status"
        :append-to-body="true"
      >
        <ul class="chat_info">
          <li
            v-for="reply in replies.data"
            :key="reply.id"
            :class="[reply.is_admin ? 'right' : 'left']"
          >
            <b>{{reply.is_admin ? 'Me' : chatDialogInfo.title}}</b>
            <i>{{reply.created_at}}</i>
            <div>{{reply.message}}</div>
          </li>
        </ul>
        <el-row style="margin-top: 10px">
          <el-col :span="20" class="send-msg">
            <el-input
              type="textarea"
              :row="1"
              v-model="message"
            />
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="sendReply">Submit</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import {
  backstageUserNotificationsHttp,
  addBackstageUserNotificationsHttp,
  backstageUserMessagesExcelDownloadHttp,
  backstageDropListNotificationHttp,
  detailBackstageUserNotificationsHttp,
  detailBackstageUserNotificationsReplyHttp,
  detailBackstageUserNotificationsDetailHttp
} from '../../api/communication_tools/initAxios'
import XLSX from 'xlsx'
import fileUpload from '../../components/file/fileUpload'
import formInlineComp from '../../components/form/formInlineComp'
import resourcesList from '../../util/static'
import tableComp from '../../components/table/tableComp'
import filter from '../../util/filter'
import element from '../../config/element'
import {mapGetters} from 'vuex'
export default {
  name: 'PrivateMessage',
  data () {
    return {
      Visible: false,
      theMemberCodeStatus: false,
      resInformation: {},
      pagination: {
        per_page: 50,
        total: 20,
        page: 1
      },
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'display_category',
          label: 'Category'
        }, {
          prop: 'message',
          label: 'Message Details',
          width: '300'
        }, {
          prop: 'number',
          label: 'Number Of Success',
          render: (h, params) => {
            if (params.item.successNum === 0) {
              return h('div', [
                h('span', {
                }, params.item.successNum)
              ])
            }
            return h('div', {}, [
              h('el-link', {
                slot: 'reference',
                props: {
                  type: 'primary',
                  icon: 'el-icon-view'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.userListID = params.item.id
                    this.detailBackstageUserNotificationsHttp(this.userListID, this.userListFormInline)
                    this.userListStatus = true
                  }
                }
              }, params.item.successNum)
            ])
          }
        }, {
          prop: 'failureNum',
          label: 'Number Of Failure'
        }, {
          prop: 'totalNum',
          label: 'Number Of Total'
        }, {
          prop: 'created_at',
          label: 'Date'
        }, {
          prop: 'sent_admin_name',
          label: 'Created By'
        }]
      },
      formInlineConfig: [
        {
          type: 'input',
          label: 'Member Code',
          formValue: 'user_name',
          placeholder: 'Member Code',
          disabled: false,
          value: ''
        },
        {
          type: 'select',
          label: 'Category',
          formValue: 'category',
          placeholder: 'Select A Category',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Currency',
          formValue: 'currency',
          placeholder: 'Select A Currency',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'date'
        },
        {
          type: 'search'
        },
        {
          type: 'add'
        }
      ],
      formInline: {
        per_page: 50,
        page: 1,
        category: '',
        user_name: '',
        currency: '',
        // start_at: '',
        // end_at: ''
      },
      fileConfig: {
        disabled: false,
        autoUpload: false,
        url: '/api/backstage/notifications',
        fileHeaders: resourcesList.fileHeaders,
        name: 'excel',
        limit: 1,
        data: {},
        accept: '.xls, .xlsx', // 文件上传类型
        fileList: []
      },
      formData: new FormData(),
      formToStore: {
        name: '',
        names: '',
        category: '',
        message: '',
        date: [],
        start_at: '',
        end_at: '',
        status: ''
      },
      gridData: [],
      dropList: {},
      pickerOptions: {
        shortcuts: [{
          text: 'Last week',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Last month',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'three months',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      userListID: '',
      userListFormInline: {
        include: 'user,replies',
        per_page: 50,
        page: 1
      },
      userListStatus: false,
      userListTableConfig: {
        border: true,
        loading: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'user.name',
            label: 'Member Code'
          },
          {
            prop: 'user.currency',
            label: 'Currency'
          },
          {
            prop: 'user.status',
            label: 'Status'
          },
          {
            prop: 'created_at',
            label: 'Date'
          },
          {
            prop: '',
            label: '',
            render: (h, params) => {
              return h('div', {}, [
                h('el-button', {
                  props: {
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.notificationID = params.item.id
                      this.chatDialogInfo.status = true
                      this.chatDialogInfo.title = params.item.user.name
                      this.detailBackstageUserNotificationsDetailHttp(this.notificationID, this.paramForm)
                    }
                  }
                }, 'chat')
              ])
            }
          }
        ]
      },
      userListTableData: {},
      // 消息回复
      replies: [],
      notificationID: '',
      paramForm: {
        include: 'user,replies'
      },
      chatDialogInfo: {
        title: '',
        status: false
      },
      message: ''
    }
  },
  created () {
    this.DropListHttp()
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp, fileUpload
  },
  computed: {
    ...mapGetters([
      'globalDropList'
    ])
  },
  methods: {
    Error () {
      this.fileConfig.fileList = []
    },
    Success (res) {
      this.fileConfig.fileList = []
      this.Visible = false
      element.message({
        type: 'success',
        message: 'add success'
      })
      this.initHttp(this.formInline)
    },
    handleRemove (file) {
      if (file.fileList.length === 0) {
        this.formToStore.excel = ''
        this.theMemberCodeStatus = false
        this.fileConfig.disabled = true
      }
    },
    handleChange (file) {
      if (file.fileList.length !== 0) {
        this.formToStore.names = ''
        this.theMemberCodeStatus = true
        this.fileConfig.disabled = false
        this.readExcel(file.file.raw)
      }
    },
    // 读取文件
    readExcel (file) {
      if (file.length < 1) {
        alert('Please select a file')
        return false
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        alert('Please select .xls, .xlsx file')
        return false
      }
      if (window.FileReader) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = e.target.result
            const workBook = XLSX.read(data, {
              type: 'binary'
            })
            const wsName = workBook.SheetNames[0]
            const ws = XLSX.utils.sheet_to_json(workBook.Sheets[wsName])
            let arr = []
            for (let i = 0; i < ws.length; i++) {
              let sheetData = ws[i].Member_code
              arr.push(sheetData)
            }
            this.formToStore.names = arr
          } catch (e) {
            console.log(e.message)
          }
        }
        reader.readAsBinaryString(file)
      } else {
        alert('Please update your Browser')
      }
    },
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
        return
      }
      if (!formInline.include || !formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageUserNotificationsHttp(datalist).then(res => {
        this.tableConfig.loading = false
        this.resInformation = res
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    // 提交表单与分页回调
    callbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.formInline.page = value.page
        this.initHttp(this.formInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.formInline.per_page = value.per_page
        this.initHttp(this.formInline)
        return
      }
      this.initHttp(value)
    },
    // memberDropList下拉菜单
    onAdd () {
      this.Visible = true
      this.fileConfig.fileList = []
      this.fileConfig.disabled = false
      this.formToStore = {
        name: '',
        excel: '',
        category: '',
        message: '',
        date: [],
        start_at: '',
        end_at: '',
        names: [],
        status: ''
      }
    },
    downloadExcel () {
      backstageUserMessagesExcelDownloadHttp().then((res) => {
        filter.downloadExcel(res)
      })
    },
    onSubmit () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        if (this.formToStore.date) {
          this.formToStore.start_at = this.formToStore.date[0]
          this.formToStore.end_at = this.formToStore.date[1]
        }
        addBackstageUserNotificationsHttp(this.formToStore).then(res => {
          this.Visible = false
          this.initHttp(this.formInline)
          element.message({
            type: 'success',
            message: 'success'
          })
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    DropListHttp () {
      backstageDropListNotificationHttp().then(res => {
        this.dropList = res
        filter.formValueListFilter(this.formInlineConfig, res, ['category', 'currency'])
      }).catch(() => {
      })
    },
    detailBackstageUserNotificationsHttp (id, formInline) {
      detailBackstageUserNotificationsHttp(id, formInline).then(res => {
        this.userListTableData = res
        this.userListTableConfig.loading = false
      }).catch((error) => {
        this.userListTableConfig.loading = false
        console.log(error)
      })
    },
    userListCallbacks (value) {
      if (value.hasOwnProperty('page')) {
        this.userListFormInline.page = value.page
        this.detailBackstageUserNotificationsHttp(this.userListID, this.userListFormInline)
        return
      } else if (value.hasOwnProperty('per_page')) {
        this.userListFormInline.per_page = value.per_page
        this.detailBackstageUserNotificationsHttp(this.userListID, this.userListFormInline)
        return
      }
      this.detailBackstageUserNotificationsHttp(this.userListID, this.userListFormInline)
    },
    // 获取回复列表
    detailBackstageUserNotificationsDetailHttp (id, param) {
      detailBackstageUserNotificationsDetailHttp(id, param).then(res => {
        this.replies = res.replies
      }).catch((error) => {
        console.log(error)
      })
    },
    // 发送消息
    sendReply () {
      detailBackstageUserNotificationsReplyHttp(this.notificationID, {message: this.message}).then(res => {
        element.message({
          type: 'success',
          message: 'success'
        })
        this.message = ''
        this.detailBackstageUserNotificationsDetailHttp(this.notificationID, this.paramForm)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
