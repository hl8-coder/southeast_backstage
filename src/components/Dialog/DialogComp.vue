<template>
  <div class="DialogComp">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.status"
      @close="handleClose"
      :width="dialog.width"
    >
      <el-form
        :label-width="dialog.labelWidth"
      >
        <el-form-item
          v-for="(item, key) in dialog.itemConfig"
          :key="key"
          :label="item.label"
        >
          <el-input
            v-if="item.type === 'input'"
            style="max-width: 220px"
            v-model="item.value"
            :placeholder="item.label"
            clearable
          />
          <el-select
            v-if="item.type === 'select'"
            v-model="item.value"
            :placeholder="item.label"
            clearable
            :multiple = item.multiple
          >
            <el-option
              v-for="option in item.list"
              :key="option.value"
              :label="option.value"
              :value="option.key"
            />
          </el-select>
          <el-button
            v-if="item.type === 'multiple'"
            type="primary"
            @click="addItem(key, item)"
          >Add</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogComp',
  props: ['dialog'],
  data () {
    return {}
  },
  methods: {
    // 弹窗关闭事件
    handleClose () {
      this.$emit('handleClose')
    },
    // 添加一栏
    addItem (key, item) {
      this.dialog.itemConfig[key].value.push(item.attributes)
    }
  }
}
</script>

<style scoped>

</style>
