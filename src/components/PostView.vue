<template>
  <div class="post-container">
    {{ post_content }}
  </div>
</template>

<script>
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

    }
  }
}
</script>