<template >
  <div class="app-container">
    <MainHeader />
    <router-view/>
    <MainFooter />
  </div>
</template>

<style lang="scss">
@import "@/styles/index.scss";
</style>
<script>

import MainFooter from "@/components/global/MainFooter";
import MainHeader from "@/components/global/MainHeader";

export default {
  setup() {
    return {
    }
  },
  components: {
    MainFooter,
    MainHeader
  }
}
</script>

<style lang="scss">
.app-container {
  padding-top: 40px;

  .progress-area {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 7px;

    .progress-bar {
      display: block;
      height: 100%;
    }
  }
}
</style>