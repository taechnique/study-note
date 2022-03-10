<template>
  <div class="markdown-text">
    {{ this.result }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      result: ''
    }
  },
  mounted() {
    this.getResultData()
  },
  methods: {
    getResultData: () => {
      const targetURL = 'https://github.com/Dev-Phantom/study-note/tree/main/src/docs'
      axios.get(targetURL).then(res => {
        console.log(res)
        this.result = res.data
      })
    }
  }
}
</script>