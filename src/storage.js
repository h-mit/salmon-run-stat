const STORAGE_KEY = 'salmon-run-stat-1.0'

export default {
  fetch() {
    let results = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return results
  },
  save(results) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results))
  }
}
