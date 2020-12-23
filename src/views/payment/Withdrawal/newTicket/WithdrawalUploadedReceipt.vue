<template>
  <div class="member upload WithdrawalUploadedReceipt" style="padding: 10px 0">
    <el-row>
      <el-col :span="24" align="center">
        <file-upload
          :fileConfig="uploadConfig"
        >
        </file-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FileUpload from '../../../../components/file/fileUpload'
import resourcesList from '../../../../util/static'
export default {
  name: 'WithdrawalUploadedReceipt',
  props: ['uploadReceiptInfo'],
  components: {FileUpload},
  data () {
    return {
      uploadConfig: {
        url: '/api/backstage/withdrawals/' + this.uploadReceiptInfo.id + '/images',
        name: 'image',
        accept: 'image/*',
        fileHeaders: resourcesList.fileHeaders,
        fileList: this.uploadReceiptInfo.images.data,
        type: 'withdrawalTicket',
        id: this.uploadReceiptInfo.id
      }
    }
  }
}
</script>

<style lang="scss">
  .WithdrawalUploadedReceipt{
    .el-upload-list {
      .el-upload-list__item{
        width: 20%;
        float: left;
      }
    }
    .el-upload-list__item:first-child {
      margin-top: 5px;
    }
    .fileUpload {
      height: 6rem;
      overflow: hidden;
      overflow-y: auto;
    }
  }
</style>
