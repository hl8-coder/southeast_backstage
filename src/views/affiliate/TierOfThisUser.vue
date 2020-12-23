<style lang="scss">
  .TierOfThisUser {
    .el-dialog {
      width: 1200px;
    }
  }
</style>

<template>
  <div class="TierOfThisUser">
    <el-dialog
      :title="'Tier Of' + tierOfThisUserForm.data.name"
      :visible.sync="tierOfThisUserForm.formStatus"
    >
      <ul>
        <li>Name: {{ tierOfThisUserForm.data.name }}</li>
        <li v-for="(item, key) in tierOfThisUserForm.data.commission_setting" :key="key">
          Tier:
          <el-input
            clearable
            style="max-width: 200px"
            v-model="item.tier"
            suffix-icon="el-icon-edit"
            placeholder="Title"
          />
          Title:
          <el-input
            clearable
            style="max-width: 200px"
            v-model="item.title"
            suffix-icon="el-icon-edit"
            placeholder="Title"
          />
          Value:
          <el-input
            clearable
            style="max-width: 200px"
            v-model="item.value"
            suffix-icon="el-icon-edit"
            placeholder="Value"
          />
          Profit:
          <el-input
            clearable
            style="max-width: 200px"
            v-model="item.profit"
            suffix-icon="el-icon-edit"
            placeholder="Profit"
          />
        </li>
        <li>
          <el-button type="success" @click="backstageAffiliateListingListRequestApproveHttp">Approve</el-button>
          <el-button type="warning" @click="backstageAffiliateListingListRequestRejectHttp">Reject</el-button>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import {
  backstageAffiliateListingListRequestApproveHttp,
  backstageAffiliateListingListRequestRejectHttp
} from '../../api/affiliate/initAxios'
import element from '../../config/element'
export default {
  name: 'TierOfThisUser',
  props: ['tierOfThisUserForm'],
  methods: {
    backstageAffiliateListingListRequestApproveHttp () {
      var data = {
        commission_setting: this.tierOfThisUserForm.data.commission_setting
      }
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        backstageAffiliateListingListRequestApproveHttp(this.tierOfThisUserForm.data.id, data).then(res => {
          element.message({
            type: 'success',
            message: 'Approve success'
          })
          this.tierOfThisUserForm.formStatus = false
          this.$emit('refresh')
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    backstageAffiliateListingListRequestRejectHttp () {
      this.$confirm('Are you sure?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        backstageAffiliateListingListRequestRejectHttp(this.tierOfThisUserForm.data.id).then(res => {
          element.message({
            type: 'success',
            message: 'Reject success'
          })
          this.tierOfThisUserForm.formStatus = false
          this.$emit('refresh')
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    }
  }
}
</script>
