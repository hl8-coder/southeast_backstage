<style scoped>

</style>
<template>
  <div class="WithdrawalAddRemarks">
    <el-dialog
      append-to-body
      class="Remarks"
      title="Add Remark"
      :visible.sync="addRemarks.statusFormVisible">
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
        <el-form-item>
          <el-button
            @click="addWithdrawalRemarks"
            type="primary">
            Add Remark
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {backstagePaymentWithdrawalRemarksAddHttp} from '../../../../api/payment/withdraw/initAxiosWithdrawal'

export default {
  name: 'WithdrawalAddRemarks',
  props: ['addRemarks', 'remarkDropList'],
  data () {
    return {
      form: {
        user_id: this.addRemarks.user.id,
        type: '',
        category: '',
        reason: '',
        sub_category: ''
      }
    }
  },
  watch: {
    'addRemarks': function (val) {
      this.initValueForm(val)
    }
  },
  mounted () {
    this.initValueForm(this.addRemarks)
  },
  methods: {
    initValueForm (val) {
      this.form.user_id = val.user.id
    },
    addWithdrawalRemarks () {
      if (!this.form.type) {
        this.$message.error('Type field is required')
        return
      } else if (!this.form.category) {
        this.$message.error('Category field is required')
        return
      } else if (!this.form.reason) {
        this.$message.error('Reason field is required')
        return
      }
      if (!(this.form.category === 1 || this.form.category === 2)) {
        this.form.sub_category = ''
      }
      backstagePaymentWithdrawalRemarksAddHttp(this.form).then(res => {
        this.form = {
          user_id: this.addRemarks.user.id,
          type: '',
          category: '',
          reason: ''
        }
        this.form.sub_category = ''
        this.$message.success('Success!')
      }).catch(() => {
      })
      this.$emit('refreshRemarks')
      this.addRemarks.statusFormVisible = false
    }
  }
}
</script>
