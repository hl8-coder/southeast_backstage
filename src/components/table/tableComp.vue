<style lang="scss" scoped type="text/scss">
  .pagination{
    margin-top: 10px;
  }
</style>
<style lang="scss">
  .tableComp
    .el-table th>.cell {
      -webkit-user-select: all; -moz-user-select: all; -ms-user-select: all; user-select: all;
    }
    .table-header-color {
      background: #5782af !important;
      color: #eff1f5 !important;
    }
    .has-gutter .cell {
      text-align: center;
    }
</style>
<template>
  <div class="tableComp">
    <el-pagination
      v-if="resInformation.meta && tableConfig.paginationPosition === 'top'"
      class="pagination"
      style="text-align: right;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="tableConfig.pageArray ? tableConfig.pageArray : [50, 100, 200, 250]"
      :page-size="resInformation.meta.pagination.per_page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="resInformation.meta.pagination.total">
    </el-pagination>
    <el-table
      ref="multipleTable"
      header-cell-class-name="table-header-color"
      v-loading="tableConfig.loading"
      :stripe="tableConfig.stripe"
      size="small"
      :border="tableConfig.border"
      lazy
      :summary-method="getSummaries"
      :show-summary="tableConfig.summary"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
      :highlight-current-row = tableConfig.radio
      @current-change="handleRowCurrentChange"
      current-row-key
      :header-cell-style="headercellstyle"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :data="resInformation.data"
      @cell-click="addGoodsHandler"
      @sort-change="sortChange"
      style="width: 100%">
      <el-table-column
        v-if="tableConfig.selection ? tableConfig.selection : false"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        v-if="tableConfig.autoNum"
        type="index"
        fixed="left"
        width="50">
      </el-table-column>
      <el-table-column
        v-for="item in tableConfig.tableColumn"
        :key="item.label"
        :type="item.type ? item.type : null"
        :prop="item.prop"
        :label="item.label"
        :sortable="item.sortable"
        :min-width="item.width"
        :width="item.fixWidth"
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <div v-if="item.render" class="FlexColumnCenterCenter">
            <Cell  :render="item.render" :item="scope.row" :head="item.label" :index="scope.$index"  :value="item.prop"></Cell>
          </div>
          <div class="FlexColumnCenterCenter" v-else-if="item.prop.split('.')[2] && scope.row[item.prop.split('.')[0]][item.prop.split('.')[1]]">
            {{scope.row[item.prop.split('.')[0]][item.prop.split('.')[1]][item.prop.split('.')[2]]}}
          </div>
          <div class="FlexColumnCenterCenter" v-else>
            {{item.prop.split('.')[1] ? scope.row[item.prop.split('.')[0]][item.prop.split('.')[1]] : scope.row[item.prop]}}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="resInformation.meta && !tableConfig.paginationPosition"
      class="pagination"
      style="text-align: right;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="tableConfig.pageArray ? tableConfig.pageArray : [50, 100, 200, 250]"
      :page-size="resInformation.meta.pagination.per_page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="resInformation.meta.pagination.total">
    </el-pagination>
  </div>
</template>

<script>
import Cell from './Cell'
import colorFilter from '../../config/colorFilter'
import numeral from 'numeral'
export default {
  name: 'tableComp',
  props: [
    'tableConfig', 'resInformation'
  ],
  components: { Cell },
  data () {
    return {
      search: '',
      currentPage: 1
    }
  },
  methods: {
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Total';
          return;
        }
        const values = data.map(item => item[column.property].replace(/,/g,''));
        console.log(values)
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return Number(prev) + Number(curr);
            } else {
              return Number(prev);
            }
          }, 0);
          sums[index] = numeral(sums[index]).format('0,0.00');
        }
      });
      return sums;
    },
    toggleSelection () {
      this.$refs.multipleTable.clearSelection()
    },
    handleSizeChange (val) {
      this.$emit('handleSizePageChange', {per_page: val})
    },
    handleCurrentChange (val) {
      this.$emit('handleSizePageChange', {page: val})
    },
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', {page: val})
    },
    rowStyle (row, column, rowIndex) {
      if (!this.tableConfig.hasOwnProperty('rowStyle')) {
        if (row.row.color) {
          if (this.isColor(row.row.color)) {
            if (row.row.cell_color) {
              return
            }
            return {backgroundColor: row.row.color}
          }
          return {backgroundColor: colorFilter.depositStatusListColorFiter('value', row.row.color)}
        }
      }
    },
    cellStyle (row, column, rowIndex) {
      if (row.column.property === 'balance') {
        return {backgroundColor: row.row.balance_color}
      } else if (row.column.property === 'daily_fund_out') {
        return {backgroundColor: row.row.daily_fund_out_color}
      } else if (row.column.property === 'daily_fund_in') {
        return {backgroundColor: row.row.daily_fund_in_color}
      } else if (row.column.property === 'daily_transaction') {
        return {backgroundColor: row.row.daily_transaction_color}
      } else if (row.column.label === 'TransactionType' && row.row.cell_color) {
        return {backgroundColor: row.row.cell_color}
      }
    },
    headercellstyle () {
      return {textAlign: 'center'}
    },
    rowClick (row, column, event) {
      this.$emit('rowClick', {row, column, event})
    },
    clearCheckBox () {
      this.$refs.multipleTable.clearSelection()
    },
    isColor (color) {
      var reg = /^#[0-9a-fA-F]{6}$/
      return reg.test(color)
    },
    addGoodsHandler (row, column, event, cell) {
      this.$emit('addGoodsHandler', {row: row, column: column, event: event, cell: cell})
    },
    sortChange (row) {
      let order = row.prop + '_'
      if (row.order === 'ascending') {
        order = order + 'asc'
      } else {
        order = order + 'desc'
      }
      this.$emit('sortChange', {order: order.toString()})
    },
    handleRowCurrentChange (val) {
      this.$emit('handleRowCurrentChange', val)
    }
  }
}
</script>
