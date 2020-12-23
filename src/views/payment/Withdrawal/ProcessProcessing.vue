<template>
  <el-dialog
    title="Internal remarks"
    :visible.sync="processProcessingFormStatus"
  >
    <el-form
      class="demo-form-inline"
    >
      <el-form-item
        label="Fund out Account"
      >
        <el-input
          v-model="processingForm.account"
          placeholder="Fund out Account" />
      </el-form-item>
      <el-form-item
        label="Amount"
      >
        <el-input
          v-model="processingForm.amount"
          placeholder="Amount" />
      </el-form-item>
      <el-form-item
        label="Fee"
      >
        <el-input
          v-model="processingForm.fee"
          placeholder="Fee" />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="processingForm.remark"
          type="textarea"
          row="4"
          placeholder="INTERNAL REMARKS FOR PAYMENT AND CS" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="processingForm.cancel_reason"
          :clearable="true"
          placeholder="CANCEL REASON">
          <el-option
            v-for="i in 10"
            :label="i"
            :key="i"
            :value="i" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="clickDeferred">DEFERRED</el-button>
        <el-button type="warning" @click="clickCancel">CANCEL</el-button>
        <el-button type="success" @click="clickAprrove">APRROVE</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'ProcessProcessing',
  props: ['processProcessingFormStatus'],
  data () {
    return {
      processingForm: {}
    }
  },
  methods: {
    // DEFERRED 点击事件
    clickDeferred () {
      this.$confirm('Are you sure to proceed?', 'Prompt', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // CANCEL 点击事件
    clickCancel () {
      if (!this.processingForm.cancel_reason) {
        this.$confirm('Please select  Cancel Reason', 'Prompt', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // APRROVE 点击事件
    clickAprrove () {
      this.$confirm('Please put Fund Out Account Amount must be tally.', 'Prompt', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
