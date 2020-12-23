<style lang="scss" scoped type="text/scss">

</style>

<template>
  <div class="SystemActionManagement">
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
          {{ data.name }}
          <span>《</span>{{data.description}}<span>》</span>
        </span>
        <span>
          <el-button
            style="margin-left: 30px;color: #673AB7"
            type="text"
            size="mini"
            @click="() => update(data)">
            Update
          </el-button>
          <el-switch
            v-model="data.is_show"
            active-color="#13ce66"
            @change="() => isShowChange(data)"
            inactive-color="#ff4949">
          </el-switch>
        </span>
      </span>
    </el-tree>
    <el-dialog :title="dialogConfig.title" width="600px" :visible.sync="dialogConfig.visible">
      <form-inline-comp
        inline="false"
        formLabelWidth="140px"
        :formInlineConfig = dialogConfig.formConfig
        @onSubmit = Submit
      />
    </el-dialog>
  </div>
</template>

<script>
import formInlineComp from '../../components/form/formInlineComp'
import tableComp from '../../components/table/tableComp'
import {backstageMenuHttp, apiBackstageMenuHttp} from '../../api/system/initAxios'
export default {
  name: 'SystemActionManagement',
  data () {
    return {
      data: [],
      dialogConfig: {
        id: '',
        title: 'Update',
        visible: false,
        formConfig: [
          {
            type: 'input',
            label: 'ID',
            formValue: 'id',
            disabled: true,
            placeholder: 'ID',
            value: ''
          },
          {
            type: 'input',
            label: 'Name',
            formValue: 'name',
            placeholder: 'Name',
            value: ''
          },
          {
            type: 'textarea',
            label: 'Description',
            formValue: 'description',
            placeholder: 'Description',
            value: ''
          },
          {
            type: 'Submit'
          }
        ]
      }
    }
  },
  components: {
    tableComp, formInlineComp
  },
  created () {
    this.initHttp()
  },
  methods: {
    update (data) {
      this.dialogConfig.visible = true
      this.dialogConfig.id = data.id
      this.dialogConfig.formConfig[0].value = data.id
      this.dialogConfig.formConfig[1].value = data.name
      this.dialogConfig.formConfig[2].value = data.description
    },
    isShowChange (data) {
      apiBackstageMenuHttp(data.id, {is_show: Number(data.is_show)})
    },
    initHttp () {
      backstageMenuHttp().then(res => {
        this.data = res
      })
    },
    Submit (form) {
      apiBackstageMenuHttp(this.dialogConfig.id, form).then(res => {
        this.initHttp()
        this.dialogConfig.visible = false
      })
    }
  }
}
</script>
