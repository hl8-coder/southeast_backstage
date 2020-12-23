<template>
  <div class="KindEditor">
    <textarea
      class="form-control"
      ref="kindeditor"
      v-model="localValue"
      name="content"
      v-loaded-callback='initKindEditor'
    ></textarea>
  </div>
</template>

<script>
import '../../../node_modules/kindeditor/kindeditor-all.js'
import '../../../node_modules/kindeditor/lang/en.js'
import '../../../node_modules/kindeditor/themes/default/default.css'
import resourcesList from '../../util/static'

export default {
  name: 'KindEditor',
  props: ['options', 'value', 'listKey'],
  data () {
    return {
      localValue: ''
    }
  },
  watch: {
    localValue: 'updateValue',
    value: 'setDefault'
  },
  created () {
    this.setDefault()
  },
  methods: {
    initKindEditor () {
      var _this = this
      // 默认参数
      var options = {
        uploadJson: '/api/backstage/images',
        filePostName: 'image',
        width: '100%',
        extraFileUploadParams: resourcesList.fileHeaders,
        height: '600px',
        afterChange () {
          _this.localValue = this.html()
        },
        filterMode: false
      }
      // 调用外部参数
      if (_this.options) {
        for (var i in _this.options) {
          options[i] = _this.options[i]
        }
      }
      KindEditor.create(_this.$refs.kindeditor, options)
    },
    // 设置初始值
    setDefault () {
      this.localValue = this.value
    },
    // 修改父件的值
    updateValue () {
      this.$emit('input', this.localValue, this.listKey)
    }
  }
}
</script>

<style scoped>

</style>
