<template lang="pug">
#app
  .container
    ResultForm(@addItem="addItem")
    ResultStat(:results="results")
  ResultList(:results="results" @deleteItem="deleteItem")
</template>

<script>
import _ from 'lodash'
import storage from './storage'
import ResultForm from './components/ResultForm'
import ResultStat from './components/ResultStat'
import ResultList from './components/ResultList'

export default {
  name: 'app',
  components: {
    ResultForm,
    ResultStat,
    ResultList
  },
  data() {
    return {
      results: storage.fetch()
    }
  },
  watch: {
    results: {
      handler(results) {
        storage.save(results)
      },
      deep: true
    }
  },
  methods: {
    addItem(result) {
      this.results.push(result)
    },
    deleteItem(timestamp) {
      let index = _.findIndex(this.results, item => {
        return item.timestamp === timestamp
      })
      if (index >= 0) {
        this.results.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: $content-width;
  margin: 30px auto;

  > .container {
    display: flex;
  }
  > .container > .result-form,
  > .container > .result-stat {
    flex: 1;
    padding: $content-padding;
  }

  > .result-list {
    padding: $content-padding;
  }
}
</style>
