<style lang="scss">
  .formInlineComp {
    .el-picker-panel__sidebar {
      width: 115px;
    }
    .search-center {
      width: 98%;
      text-align: center;
      margin-top: 5px;
      .el-button--small {
        width: 200px;
      }
    }
    .el-form--inline {
      .el-input--small .el-input__inner {
        height: 25px;
        line-height: 25px;
      }
      .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 0 !important;
      }
      .el-range-editor--small.el-input__inner {
        height: 25px;
      }
      .el-button--small, .el-button--small.is-round {
        padding: 5px 15px;
      }
      .el-range-editor.el-input__inner {
        padding: 0 10px;
      }
    }
  }
  .el-picker-panel [slot=sidebar], .el-picker-panel__sidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 115px;
    border-right: 1px solid #e4e4e4;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 6px;
    background-color: #FFF;
    overflow: auto;
  }
</style>
<template>
    <div class="formInlineComp">
      <el-form
        :inline="inline? false : true"
        :model="form" class="demo-form-inline"
        @submit.native.prevent
      >
        <el-form-item
          v-for="item in formInlineConfig"
          :label="item.label"
          :label-width="formLabelWidth ? formLabelWidth : ''"
          :class="item.class"
          :key="item.label">
          <!--input-->
          <el-input
            v-if="item.type === 'input'"
            v-model="item.value"
            :readonly="item.readonly"
            :disabled="item.disabled"
            clearable
            @keyup.enter.native="onSubmit"
            @change="inputChange(item.value, item.change,item.formValue)"
            style="max-width: 220px"
            :placeholder="item.placeholder" />
          <!--select-->
          <el-select
            v-if="item.type === 'select'"
            @change="selectChange(item.value, item.change,item.formValue)"
            v-model="item.value"
            :multiple="item.multiple"
            :collapse-tags="item.collapseTags"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :placeholder="item.placeholder">
            <el-option
              v-for="item1 in item.list"
              :label="item1.value"
              :key="item1.key"
              :value="item1.key" />
          </el-select>
          <!--加默认值select-->
          <el-select
            v-if="item.type === 'defaultSelect'"
            @change="selectChange(item.value, item.change,item.formValue)"
            v-model="item.value"
            :multiple="item.multiple"
            :disabled="item.disabled"
            :collapse-tags="item.collapseTags"
            :clearable="item.clearable"
            :placeholder="item.placeholder">
            <el-option
              label="all"
              value=""
              key=""
            />
            <el-option
              v-for="item1 in item.list"
              :label="item1.value"
              :key="item1.key"
              :value="item1.key" />
          </el-select>
          <!--el-date-picker-->
          <el-date-picker
            v-if="item.type === 'date'"
            v-model="item.value"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="|"
            start-placeholder="From"
            end-placeholder="To"
            :default-time="['00:00:00', '23:59:59']"
            :picker-options="pickerOptions"
          />
          <!--el-default-date-picker-->
          <el-date-picker
            v-if="item.type === 'defaultMonth'"
            v-model="defaultMonth"
            type="datetimerange"
            align="right"
            unlink-panels
            range-separator="|"
            start-placeholder="From"
            end-placeholder="To"
            :picker-options="pickerOptions"
            :default-time="['00:00:00', '23:59:59']"
            @focus="pickerFocus"
          />
          <!--el-date-picker-->
          <el-date-picker
            v-if="item.type === 'oneDate'"
            :type="item.pickerType"
            v-model="item.value"
          />
          <!--el-date-picker-->
          <el-date-picker
            v-if="item.type === 'month'"
            v-model="item.value"
            type="month">
          </el-date-picker>
          <!--el-date-time-picker-->
          <el-date-picker
            unlink-panels
            v-if="item.type === 'dateTime'"
            v-model="item.value"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="|"
            start-placeholder="From"
            end-placeholder="To"
            align="right"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
          <el-time-picker
            v-if="item.type === 'timeSelect'"
            v-model="item.value"
          >
          </el-time-picker>
          <!--el-input-->
          <el-input
            v-if="item.type === 'textarea'"
            type="textarea"
            :rows="6"
            :placeholder="item.placeholder ? item.placeholder : 'Please enter content'"
            v-model="item.value">
          </el-input>
          <!--el-switch-->
          <el-switch
            v-if="item.type === 'switch'"
            v-model="item.value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
          <!--el-button-->
          <el-button
            v-if="item.type === 'search'"
            type="primary"
            @click="onSubmit">
            Search
          </el-button>
          <el-button
            v-if="item.type === 'refresh'"
            type="success"
            @click="refresh">
            Refresh
          </el-button>
          <el-button
            v-if="item.type === 'export'"
            type="success"
            @click="downloadExcel">
            {{item.buttonName ? item.buttonName : 'Export'}}
          </el-button>
          <el-button
            v-if="item.type === 'Submit' && !item.popover"
            type="primary"
            @click="onSubmit">
            Submit
          </el-button>
          <el-popover
            v-if="item.type === 'Submit' && item.popover"
            placement="top"
            width="160"
            v-model="popoverVisible">
            <p>Are you sure？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="popoverVisible = false">No</el-button>
              <el-button type="primary" size="mini" @click="onSubmit">yes</el-button>
            </div>
            <el-button slot="reference" type="primary" >Submit</el-button>
          </el-popover>
          <el-button v-if="item.type === 'add'" icon="el-icon-plus" type="warning" @click="onAdd"></el-button>
        </el-form-item>
        <el-form-item>
          <slot name="content"></slot>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'formInlineComp',
  props: ['formInlineConfig', 'inline', 'formLabelWidth'],
  data () {
    return {
      popoverVisible: false,
      form: {},
      defaultMonth: [],
      pickerOptions: {
        shortcuts: [
          {
            text: 'Today',
            onClick (picker) {
              let today = new Date()
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1)
              const start = today.getTime() - today.getHours() * 60 * 60 * 1000 - today.getMinutes() * 60 * 1000 - today.getSeconds() * 1000 - today.getMilliseconds()

              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Yesterday',
            onClick (picker) {
              let today = new Date()
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1) - 3600 * 1000 * 24
              const start = today.getTime() - today.getHours() * 60 * 60 * 1000 - today.getMinutes() * 60 * 1000 - today.getSeconds() * 1000 - today.getMilliseconds() - 3600 * 1000 * 24

              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'Last 7 Days',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'Last 30 Days',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'Current month',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setDate(1)
              end.setMonth(start.getMonth() + 1)
              end.setDate(0)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'Last month',
            onClick (picker) {
              const start = moment().month(moment().month() - 1).startOf('month').valueOf();
              const end = moment().month(moment().month() - 1).endOf('month').valueOf();
              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'Three months',
            onClick (picker) {
              const start = moment().month(moment().month() - 3).startOf('month').valueOf();
              const end = moment().month(moment().month() - 1).endOf('month').valueOf();
              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'This year',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setFullYear(start.getFullYear())
              start.setMonth(0)
              start.setDate(1)
              end.setFullYear(end.getFullYear())
              end.setMonth(11)
              end.setDate(31)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  methods: {
    refresh () {
      this.$emit('onRefresh')
    },
    onSubmit () {
      var form = {} // 返回的搜索字段对象
      var TimeStart = 'start_at'// type为data TimeStart
      var TimeEnd = 'end_at'// type为data TimeEnd
      var lastLoginStartAt = 'last_login_start_at'// type为data TimeStart
      var lastLoginEndAt = 'last_login_end_at'// type为data TimeEnd
      this.formInlineConfig.forEach((item) => {
        // 没有特殊情况下处理
        if (item.type === 'search' || item.type === 'Submit' || item.type === 'add') {
          return
        }
        // type为data 做处理
        if (item.type === 'date' || item.type === 'dateTime') {
          if (item.formKey1) {
            TimeStart = item.formKey1
            TimeEnd = item.formKey2
          }
          if (item.formValue === 'last_login_time') {
            if (item.value) {
              form[lastLoginStartAt] = moment(item.value[0]).format('YYYY-MM-DD HH:mm:ss')
              form[lastLoginEndAt] = moment(item.value[1]).format('YYYY-MM-DD HH:mm:ss')
            } else {
              form[lastLoginStartAt] = ''
              form[lastLoginEndAt] = ''
            }
          } else {
            if (item.value) {
              form[TimeStart] = moment(item.value[0]).format('YYYY-MM-DD HH:mm:ss')
              form[TimeEnd] = moment(item.value[1]).format('YYYY-MM-DD HH:mm:ss')
            } else {
              form[TimeStart] = ''
              form[TimeEnd] = ''
            }
          }
          return
        }
        if (item.type === 'oneDate') {
          if (item.value) {
            form[item.formValue] = moment(item.value).format('YYYY-MM-DD')
          } else {
            form[item.formValue] = ''
          }
          return
        }
        if (item.type === 'defaultMonth') {
          if (this.defaultMonth && this.defaultMonth.length) {
            form[TimeStart] = moment(this.defaultMonth[0]).format('YYYY-MM-DD HH:mm:ss')
            form[TimeEnd] = moment(this.defaultMonth[1]).format('YYYY-MM-DD HH:mm:ss')
          } else {
            form[TimeStart] = ''
            form[TimeEnd] = ''
          }
          return
        }
        // 没有特殊情况下处理
        form[item.formValue] = item.value
      })
      this.popoverVisible = false
      this.$emit('onSubmit', form)
    },
    downloadExcel () {
      var form = {} // 返回的搜索字段对象
      var TimeStart = 'start_at'// type为data TimeStart
      var TimeEnd = 'end_at'// type为data TimeEnd
      this.formInlineConfig.forEach((item) => {
        // 没有特殊情况下处理
        if (item.type === 'search' || item.type === 'Submit' || item.type === 'add') {
          return
        }
        // type为data 做处理
        if (item.type === 'date' || item.type === 'dateTime') {
          if (item.formKey1) {
            TimeStart = item.formKey1
            TimeEnd = item.formKey2
          }
          if (item.value) {
            form[TimeStart] = moment(item.value[0]).format('YYYY-MM-DD HH:mm:ss')
            form[TimeEnd] = moment(item.value[1]).format('YYYY-MM-DD HH:mm:ss')
          } else {
            form[TimeStart] = ''
            form[TimeEnd] = ''
          }
          return
        }
        if (item.type === 'defaultMonth') {
          if (this.defaultMonth.length) {
            form[TimeStart] = moment(this.defaultMonth[0]).format('YYYY-MM-DD HH:mm:ss')
            form[TimeEnd] = moment(this.defaultMonth[1]).format('YYYY-MM-DD HH:mm:ss')
          } else {
            form[TimeStart] = ''
            form[TimeEnd] = ''
          }
          return
        }
        // 没有特殊情况下处理
        form[item.formValue] = item.value
      })
      this.popoverVisible = false
      this.$emit('downloadExcel', form)
    },
    onAdd () {
      this.$emit('onAdd')
    },
    selectChange (value, change, formValue) {
      if (change) {
        this.$emit('changeEvent', {formValue: formValue, value: value})
      }
    },
    inputChange (value, change, formValue) {
      if (change) {
        this.$emit('inputEvent', {formValue: formValue, value: value})
      }
    },
    pickerFocus (picker) {
      this.defaultMonth = []
      const end = new Date()
      const start = new Date()
      start.setDate(1)
      start.setHours(0)
      start.setMinutes(0)
      start.setSeconds(0)
      end.setMonth(start.getMonth() + 1)
      end.setDate(0)
      end.setHours(23)
      end.setMinutes(59)
      end.setSeconds(59)
      this.defaultMonth.push(start)
      this.defaultMonth.push(end)
      // picker.$emit('pick', [start, end])
    }
  },
  activated () {
    this.pickerFocus()
  }
}
</script>
