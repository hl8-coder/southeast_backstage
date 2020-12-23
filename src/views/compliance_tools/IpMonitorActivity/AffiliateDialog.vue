<template>
  <div class="AffiliateDialog">
    <el-dialog
      title="Affiliate Dialog"
      :visible.sync="AffiliateDialogForm.statusFormVisible"
    >
      <table-comp
        :tableConfig = tableConfig
        :resInformation = resInformation
        @handleSizePageChange =  callbacks
      ></table-comp>
    </el-dialog>
  </div>
</template>

<script>
import TableComp from '../../../components/table/tableComp'
export default {
  name: 'AffiliateDialog',
  components: {TableComp},
  props: ['AffiliateDialogForm'],
  data () {
    return {
      tableConfig: {
        border: true,
        tableColumn: [
          {
            prop: 'id',
            label: 'NO'
          },
          {
            prop: 'id',
            label: 'Operation ID'
          },
          {
            prop: 'sub_id',
            label: 'Sub Aff ID'
          },
          {
            prop: 'sub_id',
            label: 'Sub Aff ID'
          },
          {
            prop: 'currency',
            label: 'Currency'
          },
          {
            prop: 'ip',
            label: 'ip'
          }
        ]
      },
      resInformation: {}
    }
  },
  methods: {
    // 提交表单与分页回调
    callbacks () {}
  }
}
</script>

<style scoped>

</style>
