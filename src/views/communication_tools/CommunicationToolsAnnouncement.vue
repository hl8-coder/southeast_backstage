<style lang="scss" scoped type="text/scss">
  .content{
    padding:10px 30px;
    border: 1px solid #eee;
    border-radius: 10px;
    margin-bottom: 10px;
  }
</style>

<template>
  <div class="Announcement">
    <form-inline-comp
      :formInlineConfig = formInlineConfig
      @onSubmit = callbacks
      @onAdd = onAdd
    />
    <table-comp
      :tableConfig = tableConfig
      :resInformation = resInformation
      @handleSizePageChange =  callbacks
    />
    <el-dialog :title="title" :visible.sync="Visible">
      <el-form :model="form" class="demo-form-inline">
        <el-form-item label="Name" prop="Name" :label-width="formLabelWidth">
          <el-input placeholder="Name" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Content Type" prop="content_type" :label-width="formLabelWidth">
          <el-select v-model="form.content_type" placeholder="Select A Content Type">
            <el-option v-for="item in DropListAnnouncement.content_type" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Is Agent" prop="is_agent" :label-width="formLabelWidth">
          <el-select v-model="form.is_agent" placeholder="Select A agent">
            <el-option v-for="item in DropListAnnouncement.is_agent" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Currencies" :label-width="formLabelWidth">
          <el-select v-model="form.currencies" multiple placeholder="Please select Currencies">
            <el-option
              v-for="item in DropListAnnouncement.currency"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Mobile Redirect Url" prop="mobile_redirect_url" :label-width="formLabelWidth">
          <el-input placeholder="Mobile Redirect Url" v-model="form.pop_up_setting.mobile_redirect_url"></el-input>
        </el-form-item>
        <el-form-item label="Web Redirect Url" prop="web_redirect_url" :label-width="formLabelWidth">
          <el-input placeholder="Web Redirect Url" v-model="form.pop_up_setting.web_redirect_url"></el-input>
        </el-form-item>
        <el-form-item label="Frequency(s)" prop="frequency" :label-width="formLabelWidth">
          <el-input placeholder="Frequency" v-model="form.pop_up_setting.frequency"></el-input>
        </el-form-item>
        <el-form-item label="Delay Sec(s)" prop="delay_sec" :label-width="formLabelWidth">
          <el-input placeholder="Delay Sec" v-model="form.pop_up_setting.delay_sec"></el-input>
        </el-form-item>
        <el-form-item label="Is Game" prop="is_game" :label-width="formLabelWidth">
          <el-select v-model="form.is_game" placeholder="Select A Is Game">
            <el-option label="YES" value="1"></el-option>
            <el-option label="No" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Is Login Pop Up" prop="is_login_pop_up" :label-width="formLabelWidth">
          <el-select v-model="form.is_login_pop_up" placeholder="Select A Category">
            <el-option label="YES" value="1"></el-option>
            <el-option label="No" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Show Type" prop="show_type" :label-width="formLabelWidth">
          <el-select v-model="form.show_type" placeholder="Select A Show Type">
            <el-option v-for="item in DropListAnnouncement.show_type" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Payment Group" prop="payment_group_ids" :label-width="formLabelWidth">
          <el-select collapse-tags multiple v-model="form.payment_group_ids" placeholder="Select A Category">
            <el-option v-for="item in globalDropList.payment_group_id" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Category" prop="category" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="Select A Category">
            <el-option v-for="item in DropListAnnouncement.category" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Vip" prop="Vip" :label-width="formLabelWidth">
          <el-select collapse-tags multiple v-model="form.vip_ids" placeholder="Select A Vip">
            <el-option v-for="item in globalDropList.vip_id" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="Status" prop="Status" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="Select A Status">
            <el-option v-for="item in DropListAnnouncement.status" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="PopUp" prop="PopUp" :label-width="formLabelWidth">
          <el-select v-model="form.pop_up">
            <el-option v-for="item in DropListAnnouncement.pop_up" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Sort" prop="Sort" :label-width="formLabelWidth">
          <el-input placeholder="Sort" v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="Date" prop="Date" :label-width="formLabelWidth">
          <el-date-picker type="datetimerange" placeholder="select date" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>

        <el-form-item label="Content" prop="" :label-width="formLabelWidth">
          <el-button type="primary" @click="AddContent">Add content</el-button>
        </el-form-item>
        <div class="content" v-for="(item, key) in form.content" :key="key">
          <el-form-item label="Languages" prop="Languages" :label-width="formLabelWidth">
            <el-select v-model="item.language" placeholder="Select A Languages">
              <el-option v-for="(item, key1) in DropListAnnouncement.language" :key="key1"  :label="item.value" :value="item.key"></el-option>
            </el-select>
            <el-button type="danger" @click="removeMessage(key)">remove this message</el-button>
          </el-form-item>
          <el-form-item label="Title" prop="Title" :label-width="formLabelWidth">
            <el-input v-model="item.title"></el-input>
          </el-form-item>
          <el-form-item label="Message" prop="Message" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="6" v-model="item.message"></el-input>
          </el-form-item>
          <el-form-item label="Mobile Img" :label-width="formLabelWidth">
            <file-upload
              :fileConfig="uploadConfig"
              :item="item"
              @Success="handleSuccess"
            ></file-upload>
          </el-form-item>
          <el-form-item label="Web Img" :label-width="formLabelWidth">
            <file-upload
              :fileConfig="uploadConfig"
              :item="item"
              @Success="handleSuccess1"
            ></file-upload>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="Visible = false">Close</el-button>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  backstageAnnouncementsHttp,
  backstageDropListAnnouncementHttp,
  addBackstageBonusGroupsHttp,
  updateBackstageAnnouncementsHttp
} from '../../api/communication_tools/initAxios'
import formInlineComp from '../../components/form/formInlineComp'
import filter from '../../util/filter'
import moment from 'moment'
import fileUpload from '../../components/file/fileUpload'
import resourcesList from '../../util/static'
import tableComp from '../../components/table/tableComp'
import { mapGetters } from 'vuex'
import element from '../../config/element'
export default {
  name: 'Announcement',
  data () {
    return {
      contentVisible: false,
      Visible: false,
      formLabelWidth: '150px',
      DropListAnnouncement: {},
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'id',
          label: 'Announcement ID',
          width: '80',
          render: (h, params) => {
            let _this = this
            return h('div', [
              h('a', {
                style: {
                  color: '#409EFF',
                  cursor: 'pointer'
                },
                on: {
                  click () {
                    _this.title = 'Update Annoucement'
                    _this.Visible = true
                    var paymentGroupIds = []
                    var vipIds = []
                    if (params.item.payment_group_ids) {
                      if (params.item.payment_group_ids.length) {
                        params.item.payment_group_ids.forEach(item => {
                          paymentGroupIds.push(Number(item))
                        })
                      }
                    }
                    if (params.item.vip_ids) {
                      if (params.item.vip_ids.length !== 0) {
                        params.item.vip_ids.forEach(item => {
                          vipIds.push(Number(item))
                        })
                      }
                    }
                    _this.clearForm()

                    _this.form = {
                      name: params.item.name,
                      is_agent: Number(params.item.is_agent),
                      currencies: params.item.currencies,
                      content_type: Number(params.item.content_type),
                      content: params.item.content,
                      pop_up_setting: params.item.pop_up_setting,
                      is_login_pop_up: Number(params.item.is_login_pop_up).toString(),
                      is_game: Number(params.item.is_game).toString(),
                      show_type: params.item.show_type,
                      payment_group_ids: paymentGroupIds,
                      vip_ids: vipIds,
                      date: [params.item.start_at, params.item.end_at] || [],
                      category: params.item.category,
                      start_at: params.item.start_at,
                      end_at: params.item.end_at,
                      sort: params.item.sort,
                      status: Number(params.item.status),
                      pop_up: params.item.pop_up
                    }
                    _this.AnnouncementID = params.item.id
                  }
                }
              }, params.item.id)
            ])
          }
        }, {
            prop: 'currency',
            label: 'Currency'
        }, {
          prop: 'start_at',
          label: 'Start Date',
          width: '100'
        }, {
          prop: 'end_at',
          label: 'End Date',
          width: '100'
        }, {
          prop: 'name',
          label: 'Name',
          width: '80'
        }, {
          prop: 'display_category',
          label: 'Category',
          width: '80'
        }, {
          prop: 'display_status',
          label: 'Status',
          width: '100'
        }, {
          prop: 'display_pop_up',
          label: 'Pop Up',
          width: '100'
        }, {
          prop: 'admin_name',
          label: 'Admin',
          width: '150'
        }]
      },
      formInlineConfig: [
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
          type: 'select',
          label: 'Status',
          formValue: 'status',
          placeholder: 'Select A Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'is Aagent',
          formValue: 'is_agent',
          placeholder: 'Select A Status',
          clearable: true,
          value: '',
          list: ''
        },
        {
          type: 'select',
          label: 'Pop Up',
          formValue: 'pop_up',
          placeholder: '',
          clearable: true,
          value: '',
          list: ''
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
        pop_up: '',
        category: '',
        status: '',
        currency: ''
      },
      form: {
        name: '',
        is_agent: '',
        currencies: [],
        content_type: '',
        content: [],
        pop_up_setting: {
          mobile_redirect_url: '',
          web_redirect_url: '',
          frequency: '',
          delay_sec: ''
        },
        is_login_pop_up: '',
        is_game: '',
        show_type: '',
        payment_group_ids: [],
        vip_ids: [],
        category: '',
        start_at: '',
        end_at: '',
        sort: '',
        status: '',
        pop_up: ''
      },
      formConfig: [
        {
          type: 'select',
          label: 'Display',
          formValue: 'display',
          placeholder: 'Select A Display',
          clearable: true,
          value: '',
          list: ''
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
          type: 'input',
          label: 'Name',
          formValue: 'name',
          placeholder: 'Name',
          value: ''
        },
        {
          type: 'select',
          label: 'Status',
          formValue: 'status',
          placeholder: 'Select A Status',
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
          type: 'textarea',
          label: 'Message',
          formValue: 'message',
          placeholder: 'Message',
          value: ''
        },
        {
          type: 'date'
        },
        {
          type: 'Submit'
        }
      ],
      title: 'New Annoucement',
      AnnouncementID: '',
      uploadConfig: {
        url: '/api/backstage/images',
        name: 'image',
        accept: 'image/*',
        fileHeaders: resourcesList.fileHeaders,
        fileList: [],
        limit: 1,
        type: 'Games'
      }
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
    doSomething () {
      console.log('aaaaa')
    },
    removeMessage (key) {
      this.form.content.splice(key, 1)
    },
    AddContent () {
      this.form.content.push({
        language: '',
        title: '',
        message: '',
        mobile_img_id: '',
        web_img_id: ''
      })
    },
    handleSuccess (response, file, item) {
      item.mobile_img_id = response.id
      console.log(this.form.content)
    },
    handleSuccess1 (response, file, item) {
      item.web_img_id = response.id
      console.log(this.form.content)
    },
    change () {
      this.form.display_ids = []
    },
    // 会员信息请求
    initHttp (formInline) {
      if (!formInline) {
        return this.$message.error('There is no request')
      }
      if (!formInline.per_page || !formInline.page) {
        formInline.per_page = this.formInline.per_page
        formInline.page = this.formInline.page
      }
      this.formInline = formInline
      var datalist = filter.formInlineFilter(formInline)
      this.tableConfig.loading = true
      backstageAnnouncementsHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    onSubmit () {
      this.form.start_at = moment(this.form.date[0]).format('YYYY-MM-DD hh:mm:ss')
      this.form.end_at = moment(this.form.date[1]).format('YYYY-MM-DD hh:mm:ss')
      // var datalist = {
      //   show_type: this.form.display_type,
      //   display_ids: this.form.display_ids,
      //   category: this.form.category,
      //   name: this.form.name,
      //   pop_up: Number(this.form.pop_up),
      //   currencies: this.form.currencies,
      //   start_at: moment(this.form.date[0]).format('YYYY-MM-DD HH:mm:ss'),
      //   end_at: moment(this.form.date[1]).format('YYYY-MM-DD HH:mm:ss'),
      //   status: this.form.status,
      //   content: this.form.content,
      //   payment_group_ids: this.form.payment_group_ids,
      //   vip_ids: this.form.vip_ids,
      //   sort: this.form.sort,
      // }
      if (this.title === 'New Annoucement') {
        addBackstageBonusGroupsHttp(this.form).then(res => {
          this.Visible = false
          element.message({
            type: 'success',
            message: 'Add Success'
          })
          this.initHttp(this.formInline)
        }).catch(() => {
        })
      } else {
        updateBackstageAnnouncementsHttp(this.AnnouncementID, this.form).then(res => {
          this.Visible = false
          element.message({
            type: 'success',
            message: 'Update Success'
          })
          this.initHttp(this.formInline)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    Submit (form) {
      console.log(this.form)
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
    onAdd () {
      this.title = 'New Annoucement'
      this.Visible = true
      this.clearForm()

    },
    formcallbacks () {

    },
    affirmStatus () {

    },
    clearForm () {
      this.form = {
        name: '',
        is_agent: '',
        currencies: [],
        content_type: '',
        content: [
          {
            language: '',
            title: '',
            message: '',
            mobile_img_id: '',
            web_img_id: ''
          }
        ],
        pop_up_setting: {
          mobile_redirect_url: '',
          web_redirect_url: '',
          frequency: '',
          delay_sec: ''
        },
        is_login_pop_up: '',
        is_game: '',
        show_type: '',
        payment_group_ids: [],
        vip_ids: [],
        category: '',
        start_at: '',
        end_at: '',
        sort: '',
        status: '',
        pop_up: ''
      }
    },
    DropListHttp () {
      filter.formValueListFilter(this.formInlineConfig, this.globalDropList, ['currency'])
      backstageDropListAnnouncementHttp().then(res => {
        this.DropListAnnouncement = res
        filter.formValueListFilter(this.formInlineConfig, res, ['status', 'category', 'pop_up', 'is_agent'])
      }).catch(() => {
      })
    }
  }
}
</script>
