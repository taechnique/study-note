<template>
  <MainHeader />
  <router-view/>
  <MainFooter />
</template>

<style lang="scss">
@import "@/styles/index.scss";
</style>
<script>

import MainFooter from "@/components/global/MainFooter";
import MainHeader from "@/components/global/MainHeader";

export default {
  components: {
    MainFooter,
    MainHeader
  }
}
</script>