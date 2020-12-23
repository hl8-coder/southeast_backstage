<style lang="scss" scoped type="text/scss">

</style>

<template>
    <div class="ticketButton">
      <el-popover
        placement="top"
        width="160"
        v-model="visible">
        <p>这是一段内容这是一段内容确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="affirm">确定</el-button>
        </div>
        <el-button @click="buttonMethod" slot="reference">{{ticketButtonConfig.buttonName}}</el-button>
      </el-popover>
    </div>
</template>

<script>
export default {
  name: 'ticketButton',
  props: ['ticketButtonConfig'],
  data () {
    return {
      visible: false
    }
  },
  methods: {
    buttonMethod () {
      this.visible = true
    },
    affirm () {
      this.$emit('affirm', {ticketButtonConfig: this.ticketButtonConfig})
    }
  }
}
</script>
