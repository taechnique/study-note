<template>
  <div class="post-container">
    {{ post_content }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      post_content: ''
    }
  },
  mounted() {
    this.getPostData()
  },
  methods: {
    getPostData: () => {
      const url = 'https://github.com/Dev-Phantom/study-note'
      axios.get(url).then(res => {
        console.log(res)
        this.post_content = res.data
      })
    }
  }
}
</script>