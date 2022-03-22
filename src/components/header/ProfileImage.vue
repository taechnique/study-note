<template>
  <div class="profile-image">
    <router-link v-bind:to="'/'"><img :src="userInfoStore.profile_image" /></router-link>
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