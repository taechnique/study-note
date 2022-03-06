<template>
  <MainHeader />
  <div style="width: 100%; height: 2000px; background-color: #2c3e50"></div>
</template>

<script>
import MainHeader from "@/components/global/MainHeader";

export default {
  name: 'App',
  components: {
    MainHeader
  }
}
</script>

<style lang="scss">
@import "./styles/index.scss";
</style>
