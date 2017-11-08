<template lang="pug">
.result-list
  el-table(
    :data="results"
    :default-sort="{ prop: 'timestamp', order: 'descending' }"
    :row-class-name="tableRowClassName"
    v-if="results.length"
  )
    el-table-column(prop="timestamp" label="日付" :formatter="formattedDate" width="180")
    el-table-column(prop="wave" label="達成Wave" width="90")
    el-table-column(prop="goldenIkura" label="金イクラ")
    el-table-column(prop="ikura" label="イクラ")
    el-table-column(prop="rescue" label="救助")
    el-table-column(prop="death" label="デス")
    el-table-column(label="削除")
      template(slot-scope="scope")
        el-button(
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="deleteItem(scope.$index, scope.row)"
        )
</template>

<script>
import moment from 'moment'
import _ from 'lodash'

export default {
  props: {
    results: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteItem(index, row) {
      this.$emit('deleteItem', row.timestamp)
    },
    tableRowClassName({row, rowIndex}) {
      if (row.wave < 3) {
        return '-failure'
      }
    },
    formattedDate(row, column) {
      return moment.unix(_.round(row.timestamp / 1000)).format('YYYY/MM/DD HH:mm:ss')
    }
  }
}
</script>

<style lang="scss">
.result-list {
  .el-table .-failure {
    background: lighten($color-warning, 45%);
  }
}
</style>

