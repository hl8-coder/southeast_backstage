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
        <el-form-item label="Category" prop="Category" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="Select A Category">
            <el-option v-for="item in DropListAnnouncement.category" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Name" prop="Name" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Status" prop="Status" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="Select A Status">
            <el-option v-for="item in DropListAnnouncement.status" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Sort" prop="Sort" :label-width="formLabelWidth">
          <el-input placeholder="Sort" v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="Date" prop="Date" :label-width="formLabelWidth">
          <el-date-picker type="datetimerange" placeholder="select date" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="PopUp" prop="PopUp" :label-width="formLabelWidth">
          <el-select v-model="form.pop_up">
            <el-option v-for="item in DropListAnnouncement.pop_up" :key="item.key" :label="item.value" :value="item.key"></el-option>
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
        <el-form-item label="Languages" prop="" :label-width="formLabelWidth">
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
  backstageUserAffiliateAnnouncementsHttp,
  backstageAffiliateListingAnnouncementDropListHttp,
  addBackstageUserAffiliateAnnouncementsHttp,
  updateBackstageUserAffiliateAnnouncementsHttp
} from '../../api/affiliate/initAxios'
import formInlineComp from '../../components/form/formInlineComp'
import filter from '../../util/filter'
import moment from 'moment'
import tableComp from '../../components/table/tableComp'
import { mapGetters } from 'vuex'
import element from '../../config/element'
export default {
  name: 'Announcement',
  data () {
    return {
      contentVisible: false,
      Visible: false,
      title: '',
      formLabelWidth: '120px',
      DropListAnnouncement: {},
      resInformation: {},
      tableConfig: {
        border: true,
        loading: true,
        tableColumn: [{
          prop: 'start_at',
          label: 'Start Date',
          width: '100'
        }, {
          prop: 'end_at',
          label: 'End Date',
          width: '100'
        }, {
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
                    _this.form = {
                      category: params.item.category,
                      name: params.item.name,
                      pop_up: params.item.pop_up,
                      currencies: params.item.currencies,
                      date: [params.item.start_at, params.item.end_at] || [],
                      status: Number(params.item.status),
                      start_at: params.item.start_at,
                      end_at: params.item.end_at,
                      sort: params.item.sort,
                      content: params.item.content
                    }
                    _this.AnnouncementID = params.item.id
                  }
                }
              }, params.item.id)
            ])
          }
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
        // {
        //   type: 'select',
        //   label: 'Currency:',
        //   formValue: 'currency',
        //   placeholder: 'Select A Currency:',
        //   clearable: true,
        //   value: '',
        //   list: ''
        // },
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
        category: '',
        pop_up: '',
        status: ''
      },
      form: {
        currencies: [],
        category: '',
        name: '',
        sort: '',
        date: '',
        status: '',
        pop_up: '',
        content: []
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
      AnnouncementID: ''
    }
  },
  created () {
    this.DropListHttp()
    this.initHttp(this.formInline)
  },
  components: {
    tableComp, formInlineComp
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
        message: ''
      })
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
      backstageUserAffiliateAnnouncementsHttp(datalist).then(res => {
        this.resInformation = res
        this.tableConfig.loading = false
      }).catch((error) => {
        this.tableConfig.loading = false
        console.log(error)
      })
    },
    onSubmit () {
      var datalist = {
        currencies: this.form.currencies,
        category: this.form.category,
        name: this.form.name,
        pop_up: Number(this.form.pop_up),
        start_at: moment(this.form.date[0]).format('YYYY-MM-DD'),
        end_at: moment(this.form.date[1]).format('YYYY-MM-DD'),
        status: this.form.status,
        sort: this.form.sort,
        content: this.form.content
      }
      if (!this.AnnouncementID) {
        addBackstageUserAffiliateAnnouncementsHttp(datalist).then(res => {
          this.Visible = false
          element.message({
            type: 'success',
            message: 'Success'
          })
          this.initHttp(this.formInline)
        }).catch(() => {
        })
      } else {
        updateBackstageUserAffiliateAnnouncementsHttp(this.AnnouncementID, datalist).then(res => {
          this.Visible = false
          element.message({
            type: 'success',
            message: 'Success'
          })
          this.initHttp(this.formInline)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    //
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
      this.Visible = true
      this.title = 'add'
      this.AnnouncementID = ''
      this.clearForm()
    },
    // 清除表单
    clearForm () {
      this.form = {
        currencies: [],
        category: '',
        name: '',
        date: '',
        sort: '',
        status: '',
        pop_up: '',
        content: []
      }
    },
    DropListHttp () {
      backstageAffiliateListingAnnouncementDropListHttp().then(res => {
        this.DropListAnnouncement = res
        filter.formValueListFilter(this.formInlineConfig, res, ['status', 'category', 'pop_up'])
      }).catch(() => {
      })
    }
  }
}
</script>
