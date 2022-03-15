<template>
  <div class="profile-image">
    <img :src="userInfoStore.profile_image" />
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
  methods: {

  }
}

</script>