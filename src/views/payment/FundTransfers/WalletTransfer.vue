<template>
  <div class="WalletTransfer">
    <el-dialog
      title="Wallet Transfer"
      :visible.sync="walletTransferInfo.statusFormVisible"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="Username">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="From">
          <el-select v-model="form.fromWallet" placeholder="Select a wallet">
            <el-option label="wallet1" value="shanghai"></el-option>
            <el-option label="wallet2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="From Wallet">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="To">
          <el-select v-model="form.toWallet" placeholder="Select a wallet">
            <el-option label="wallet1" value="shanghai"></el-option>
            <el-option label="wallet2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="To Wallet">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="Amount">
          <el-input v-model="form.amount"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">submit</el-button>
          <el-button>cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'WalletTransfer',
  props: ['walletTransferInfo'],
  data () {
    return {
      form: {}
    }
  }
}
</script>

<style scoped>

</style>
