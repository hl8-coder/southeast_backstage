<template>
<div class="CrmCallLog">
  <el-dialog
    :visible.sync="dialog.status"
    :title="name"
    @close="clearForm"
  >
    <el-form
      label-width="150px"
    >
      <el-form-item
        label="Channel"
      >
        <el-select
          v-model="form.channel"
          placeholder="Channel">
          <el-option
            v-for="item in dropList.channel"
            :key="item.value"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Call Status"
      >
        <el-select
          v-model="form.call_status"
          placeholder="Call Status">
          <el-option
            v-for="item in dropList.call_log_status"
            :key="item.value"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Purpose"
        v-if="item"
      >
        <el-select
          v-model="form.purpose"
          placeholder="Purpose">
          <el-option
            v-for="item in dropList.purpose"
            :key="item.value"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Prefer product"
        v-if="item"
      >
        <el-select
          v-model="form.prefer_product"
          placeholder="Prefer product">
          <el-option
            v-for="item in dropList.prefer_product"
            :key="item.value"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Source"
        v-if="item"
      >
        <el-select
          v-model="form.source"
          placeholder="Source">
          <el-option
            v-for="item in dropList.source"
            :key="item.value"
            :label="item.value"
            :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Prefer bank"
        v-if="item"
      >
        <el-select
          v-model="form.prefer_bank"
          @change="preferBankChange"
          placeholder="Prefer bank">
          <el-option
            v-for="item in dropList.prefer_bank"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          v-if="preferBankShow"
          style="max-width: 200px"
          v-model="otherBank"
          placeholder="Prefer bank"
        />
      </el-form-item>
      <el-form-item
        label="Reason"
        v-if="!item"
      >
        <el-input
          v-model="form.reason"
          placeholder="Reason"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Comment"
      >
        <el-input
          type="textarea"
          :rows="3"
          v-model="form.comment"
          placeholder="Comment"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="storeCallLog">submit</el-button>
      <el-button type="danger" @click="dialog.status = false">close</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  backstageCrmResourceCallLogsHttp,
  backstageCrmStoreCallLogHttp
} from '../../api/crm/initAxios'
import filter from '../../util/filter'
import element from '../../config/element'

export default {
  name: 'CrmCallLog',
  props: ['dropList', 'dialog', 'order', 'item', 'api'],
  data () {
    return {
      form: {
        channel: '',
        crm_order_id: '',
        crm_resource_id: '',
        call_status: '',
        purpose: '',
        prefer_product: '',
        prefer_bank: '',
        source: '',
        reason: '',
        comment: ''
      },
      loadingStatus: true,
      preferBankShow: false,
      name: '',
      otherBank: ''
    }
  },
  methods: {
    // 设置value
    setValue (val) {
      if (val.hasOwnProperty('id')) {
        if (val.hasOwnProperty('user')) {
          this.form.crm_order_id = val.id
          this.name = val.user.name
        } else {
          this.form.crm_resource_id = val.id
          this.name = val.phone
        }
      }
      this.loadingStatus = false
    },
    // 生成call log
    storeCallLog () {
      if (this.otherBank) {
        this.form.prefer_bank = this.otherBank
      }
      var form = filter.removeTheNullValue(this.form)
      if (this.api) {
        backstageCrmResourceCallLogsHttp(form).then(res => {
          element.message({
            type: 'success',
            message: 'success'
          })
          this.dialog.status = false
          this.refresh()
        }).catch((error) => {
          console.log(error)
        })
        return
      }
      backstageCrmStoreCallLogHttp(form).then(res => {
        element.message({
          type: 'success',
          message: 'success'
        })
        this.dialog.status = false
        this.refresh()
      }).catch((error) => {
        console.log(error)
      })
    },
    // 让父组件刷新
    refresh () {
      this.$emit('refresh')
    },
    // 清除表单
    clearForm () {
      this.form = {
        channel: '',
        crm_order_id: '',
        call_status: '',
        purpose: '',
        prefer_product: '',
        prefer_bank: '',
        source: '',
        reason: '',
        comment: ''
      }
    },
    preferBankChange (val) {
      if (val === 'Other') {
        this.preferBankShow = true
      } else {
        this.otherBank = ''
        this.preferBankShow = false
      }
    }
  },
  watch: {
    'order' (val) {
      this.setValue(val)
    }
  },
  mounted () {
    this.setValue(this.order)
  }
}
</script>

<style scoped>

</style>
