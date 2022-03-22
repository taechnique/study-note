<template>
  <div class="author-info">
    <span class="author">{{ userInfoStore.name }}</span>
    <span class="author-says">세상에 기여하고 싶어요.</span>
  </div>
</template>


<script>
import { userInfoStore } from "@/store";

export default {
  data () {
    return {
      userInfoStore
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>