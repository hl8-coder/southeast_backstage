<style lang="scss" scoped type="text/scss">
</style>

<template>
    <div class="fileUpload">
      <el-upload
        :disabled="fileConfig.disabled"
        class="upload-demo"
        ref="upload"
        :action="fileConfig.url"
        :headers="fileConfig.fileHeaders"
        :name="fileConfig.name"
        :limit="fileConfig.limit"
        :data="fileConfig.data"
        :accept="fileConfig.accept"
        :list-type="fileConfig.listType"
        :show-file-list="fileConfig.showFileList"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
        :before-remove = "handleBeforeRemove"
        :on-preview="handlePreview"
        :on-error="uploadFalse"
        :on-success="uploadSuccess"
        :file-list="fileConfig.fileList"
        :auto-upload="fileConfig.autoUpload">
        <i v-if="fileConfig.listType" class="el-icon-plus"></i>
        <el-button v-if="!fileConfig.listType" slot="trigger" size="small" type="primary">{{fileConfig.button? fileConfig.button :'Select File'}}</el-button>
        <slot name="content"></slot>
      </el-upload>
    </div>
</template>

<script>
import {
  deleteReceiptHttp
} from '../../api/payment/deposit/initAxios'
import {backstagePaymentWithdrawalReceiptRemoveHttp} from '../../api/payment/withdraw/initAxiosWithdrawal'
import element from '../../config/element'
export default {
  name: 'fileUpload',
  data () {
    return {
      fileDelect: true,
      isShow: true
    }
  },
  props: ['fileConfig', 'listKey', 'item', 'key1'],
  methods: {
    // 超过文件限制
    handleExceed () {
      element.message({
        type: 'warning',
        message: `Over file limit`
      })
    },
    // 文件移除之前
    handleBeforeRemove (file, fileList) {
      var id = file.id
      if (file.response) {
        id = file.response.id
      }
      switch (this.fileConfig.type) {
        case 'depositTicket':
          deleteReceiptHttp(this.fileConfig.id, id).then(res => {
            this.isShow = true
          }).catch((error) => {
            this.isShow = false
            console.log(error)
          })
          break
        case 'withdrawalTicket':
          backstagePaymentWithdrawalReceiptRemoveHttp(this.fileConfig.id, id).then(res => {
            console.log(res)
          }).catch((error) => {
            console.log(error)
          })

          break
      }
      return this.isShow
    },
    // 文件移除
    handleRemove (file, fileList) {
      this.$emit('handleRemove', {file: file, fileList: fileList})
    },
    // 文件改动
    handleChange (file, fileList) {
      this.$emit('handleChange', {file: file, fileList: fileList})
    },
    // 改动之前
    handlePreview (file, fileList) {
      const h = this.$createElement
      this.img = file.url
      if (file.hasOwnProperty('response')) {
        file.url = file.response.url
      }
      this.$msgbox({
        title: 'img',
        message: h('div', null, [
          h('el-image', {
            props: {
              src: file.url
            },
            style: {
              width: '100%',
              height: '100%'
            }
          })
        ]),
        showCancelButton: true,
        cancelButtonText: 'close'
      }).then(action => {
      })
      this.$emit('handleChange', {file: file, fileList: fileList})
    },
    // 上传文件错误
    uploadFalse (err) {
      this.$refs.upload.clearFiles()
      var errorMsg = JSON.parse(err.toString().replace('Error:', '')).message
      if (errorMsg) {
        element.message({
          type: 'error',
          message: errorMsg
        })
        this.$emit('Error', err)
      } else {
        element.message({
          type: 'error',
          message: 'error Updated'
        })
        this.$emit('Error', err)
      }
    },
    // 上传文件成功
    uploadSuccess (res) {
      if (res.status_code === 202) {
        element.message({
          type: 'error',
          message: res.message
        })
        return false
      }
      element.message({
        type: 'success',
        message: 'Success'
      })
      this.$emit('Success', res, this.listKey, this.item, this.key1)
    },
    uploadSubmit () {
      this.$refs.upload.submit()
    }
  }
}
</script>
