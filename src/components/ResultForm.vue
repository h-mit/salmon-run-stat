<template lang="pug">
.result-form
  el-form(
    :model="result"
    ref="result"
    label-position="left"
    label-width="100px"
  )
    el-form-item(label="達成Wave")
      el-input(v-model.number="result.wave" type="number" min="0" max="3")
    el-form-item(label="金イクラ")
      el-input(v-model.number="result.goldenIkura" type="number" min="0")
    el-form-item(label="イクラ")
      el-input(v-model.number="result.ikura" type="number" min="0")
    el-form-item(label="救助")
      el-input(v-model.number="result.rescue" type="number" min="0")
    el-form-item(label="デス")
      el-input(v-model.number="result.death" type="number" min="0")
    el-form-item
      el-button(
        type="primary"
        :disabled="!checkForm"
        @click="addItem"
      ) 追加
</template>

<script>
import moment from 'moment'
import _ from 'lodash'

export default {
  data() {
    return {
      result: {
        id: 0,
        timestamp: '',
        wave: 0,
        goldenIkura: 0,
        ikura: 0,
        rescue: 0,
        death: 0
      }
    }
  },
  computed: {
    checkForm() {
      let keys = ['wave', 'goldenIkura', 'ikura', 'rescue', 'death']
      return _.every(keys, key => {
        return this.result[key] !== ''
      })
    }
  },
  methods: {
    addItem() {
      this.result.timestamp = moment().format('x')
      this.$emit('addItem', _.cloneDeep(this.result))
      this.initValue()
    },
    initValue() {
      this.result.timestamp = ''
      let keys = ['wave', 'goldenIkura', 'ikura', 'rescue', 'death']
      keys.forEach(key => {
        this.result[key] = 0
      })
    }
  }
}
</script>

