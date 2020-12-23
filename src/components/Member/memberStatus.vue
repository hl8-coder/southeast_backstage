<style lang="scss" scoped type="text/scss">
 #memberStatus {
   margin-bottom: 10px;
   .name{
     margin: 0 35px 0 5px;
   }
 }
</style>

<template>
    <div id="memberStatus">
      <el-row class="FlexRowFlexStartFlexStart">
        <div v-for="item in StatusList" :key="item.value">
          <el-button
            icon="el-icon-star-off"
            disabled
            size="medium"
            :style="{backgroundColor: item.color,color: 'white'}"
            circle>
          </el-button>
          <span>:</span>
          <span class="name">{{item.value}}</span>
        </div>
      </el-row>
    </div>
</template>

<script>
import colorFilter from '../../config/colorFilter'
export default {
  name: 'memberStatus',
  data () {
    return {
      StatusList: colorFilter.membersStatusList
    }
  },
  created () {
    console.log()
  }
}
</script>
