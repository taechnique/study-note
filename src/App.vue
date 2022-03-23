<template >
  <div class="app-container">
    <MainHeader />
    <div class="progress-area">
      <span class="progress-bar"></span>
    </div>
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

    const handleForScroll = () => {
      const currentScroll = window.scrollY
      const winHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const percent = (100.000 * currentScroll / (docHeight - winHeight)).toFixed(4) + '%'

      const element = document.querySelector('.app-container .progress-area .progress-bar')
      element.style.width = percent

    }
    window.addEventListener('scroll', handleForScroll)

    return {
      handleForScroll
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

  .progress-area {
    position: fixed;
    top: 44px;
    left: 0;
    width: 100%;
    height: 7px;

    .progress-bar {
      display: block;
      background-color: #0a66c2;
      width: 0%;
      height: 100%;
      transition: none;
    }
  }
}
</style>