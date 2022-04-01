<template >
  <div class="app-container">
    <MainHeader />
      <router-view :key="$route.fullPath"/>
    <MainFooter />
    <LoadingBar />
  </div>
</template>

<style lang="scss">
@import "@/styles/index.scss";
</style>
<script>

import MainFooter from "@/components/global/MainFooter";
import MainHeader from "@/components/global/MainHeader";
import LoadingBar from "@/components/global/LoadingBar";

export default {
  data() {


    return {
    }
  },
  components: {
    LoadingBar,
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

/* Global Styles */


@font-face {

  font-family: 'AppleSDGothicNeoL';
  src: url('~@/assets/fonts/Apple_Sandol_Gothic_Neo/AppleSDGothicNeoL.ttf');
  font-weight: normal;
  font-style: normal;
}

body {

  background-color: #f3f2ef;

  & ::-webkit-scrollbar {
    width: 10px;
  }

  & ::-webkit-scrollbar-thumb {
    background-color: #e1e1e1;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

  & ::-webkit-scrollbar-track {
    background-color: $point-light-color;
    border-radius: 10px;
  }
}

#app {
  font-family: 'AppleSDGothicNeoL', serif;
  color: $main-font-color;
}

* {
  padding: 0px;
  margin: 0px;
  transition: .6s;
}

a {
  text-decoration: none;
  color: #2c3e50;
  -webkit-tap-highlight-color:transparent;
}

.window-controller {
  display: block;
  padding: 10px;
  background-color: $point-light-color;
  border-radius: 15px 15px 0px 0px;

  & .window {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin: 5px 4px;

  }

  & .window-close {
    background-color: #FF605C;
    border: 1.12px solid #f35854;
  }

  & .window-minimize {
    background-color: #FFBD44;
    border: 1.12px solid #f6b73b;
  }

  & .window-maximize {
    background-color: #00CA4E;
    border: 1.12px solid #02be4a;
  }

}


</style>