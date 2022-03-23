<template >
  <div class="app-container">
    <MainHeader />
    <router-view :key="$route.fullPath"/>
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
  data() {


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
@import "@/styles/index.scss";
.app-container {

  .progress-area {
    position: fixed;
    top: 44px;
    left: 0;
    width: 100%;
    height: 4px;

    .progress-bar {
      display: block;
      background-color: #0AC291FF;
      width: 0%;
      height: 100%;
      transition: none;
    }
  }
}

@include mobile {
  .app-container {

    .progress-area {
      top: 50px;
    }
  }
}
</style>