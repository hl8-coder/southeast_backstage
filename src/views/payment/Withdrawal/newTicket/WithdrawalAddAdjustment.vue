<style scoped>
  .el-dialog {
    margin-top: 10rem !important;
  }
</style>
<template>
  <div class="WithdrawalAddAdjustment">
    <el-dialog
      append-to-body
      class=""
      title="Add Adjustment"
      :visible.sync="addAdjustment.statusFormVisible"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="">
          <el-radio-group v-model="form.resource">
            <el-radio label="Deposit"></el-radio>
            <el-radio label="Withdrawal"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Amount">
          <el-input v-model="form.amount"></el-input>
        </el-form-item>
        <el-form-item label="Category">
          <el-select v-model="form.category" placeholder="Select a category">
            <el-option label="test" value="shanghai"></el-option>
            <el-option label="test" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Product">
          <el-select v-model="form.product" placeholder="Select a product">
            <el-option label="test" value="shanghai"></el-option>
            <el-option label="test" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Remarks">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Approve</el-button>
          <el-button @click="addAdjustment.statusFormVisible = false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'WithdrawalAddAdjustment',
  props: ['addAdjustment'],
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      console.log(this.form)
    }
  }
}
</script>
