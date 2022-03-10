<template>
  <MainHeader />
  <MainBody />
  <MainFooter />
</template>

<script>
import MainHeader from "@/components/global/MainHeader"
import MainBody from "@/components/global/MainBody"
import MainFooter from "@/components/global/MainFooter"

export default {
  name: 'App',
  components: {
    MainHeader,
    MainBody,
    MainFooter
  }
}
</script>

<style lang="scss">
@import "./styles/index.scss";
</style>
