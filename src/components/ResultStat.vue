<template lang="pug">
.result-stat
  .result-average
    el-table(:data="statList")
      el-table-column(prop="key" label="項目")
      el-table-column(prop="value" label="平均値")
  .result-wave
    el-tooltip(content="Wave1成功率" placement="top")
      el-progress.success-rate-wave1(type="circle" :percentage="successRateWave(1)")
    el-tooltip(content="Wave2成功率" placement="top")
      el-progress.success-rate-wave2(type="circle" :percentage="successRateWave(2)")
    el-tooltip(content="Wave3成功率" placement="top")
      el-progress.success-rate-wave3(type="circle" :percentage="successRateWave(3)")
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    results: {
      type: Array,
      required: true
    }
  },
  computed: {
    statList() {
      return [
        { key: '金イクラ', value: this.getAverage('goldenIkura') },
        { key: 'イクラ', value: this.getAverage('ikura') },
        { key: '救助', value: this.getAverage('rescue') },
        { key: 'デス', value: this.getAverage('death') }
      ]
    }
  },
  methods: {
    successRateWave(wave) {
      let average = 0
      this.results.forEach(result => {
        if (result.wave >= wave) {
          average++
        }
      })
      if (this.results.length) {
        average = 100 * average / this.results.length
      }
      return _.round(average)
    },
    getAverage(key, precision = 1) {
      let average = 0
      this.results.forEach(result => {
        average += result[key]
      })
      if (this.results.length) {
        average = average / this.results.length
      }
      return _.round(average, precision)
    }
  }
}
</script>

<style lang="scss">
.result-stat {
  .result-average {
    margin-bottom: 10px;
  }
  .success-rate-wave1 .el-progress-circle__path {
    stroke: $color-success;
  }
  .success-rate-wave2 .el-progress-circle__path {
    stroke: $color-warning;
  }
  .success-rate-wave3 .el-progress-circle__path {
    stroke: $color-danger;
  }
}
</style>
