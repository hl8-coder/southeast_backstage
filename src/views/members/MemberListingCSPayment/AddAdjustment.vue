<template>
  <div class="AddAdjustment">
    <el-dialog
      title="Add Adjustment"
      @close="handleClose"
      :visible.sync="addAdjustmentInfo.statusFormVisible"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="">
          <el-radio-group v-model="form.type">
            <el-radio v-for="item in addAdjustmentInfo.DropList.type" :label="item.key" :key="item.key">{{item.value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Member code">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="Amount">
          <el-input v-model="form.amount"></el-input>
        </el-form-item>
        <el-form-item label="Category">
          <el-select v-model="form.category" placeholder="Select a category">
            <el-option v-for="item in addAdjustmentInfo.DropList.category" :value="item.key" :label="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Product">
          <el-select v-model="form.product_code" placeholder="Select a product">
            <el-option v-for="item in addAdjustmentInfo.DropList.product_code" :value="item.key" :label="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Reason">
          <el-input type="textarea" v-model="form.reason"></el-input>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary">Approve</el-button>
          <el-button @click="addAdjustmentInfo.statusFormVisible = false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  backstageUsersAdjustments
} from '../../../api/adjustments/initAxios'
import element from '../../../config/element'
import filter from '../../../util/filter'
export default {
  name: 'AddAdjustment',
  props: ['addAdjustmentInfo', 'user_name'],
  data () {
    return {
      name: '',
      form: {
        type: 1,
        amount: '',
        category: '',
        product_code: '',
        reason: '',
        remark: '',
      }
    }
  },
  watch: {
    'form.amount' (newvalue, oldvalue) {
      this.form.amount = filter.numeralChange(newvalue, oldvalue)
    }
  },
  methods: {
    handleClose () {
      this.name = ''
      this.form = {
        type: 1,
        amount: '',
        category: '',
        product_code: '',
        reason: '',
        remark: '',
      }
    },
    onSubmit () {
      if (!this.name) {
        element.message({
          type: 'error',
          message: 'Please enter the Member Code'
        })
        return
      }
      backstageUsersAdjustments(this.name, this.form).then(res => {
        element.message({
          type: 'success',
          message: 'add success'
        })
        this.addAdjustmentInfo.statusFormVisible = false
        this.$emit('refersh')
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
