<template>
  <div class="main-header">
    <ul class="window-controller">
      <li class="window window-close"></li>
      <li class="window window-minimize"></li>
      <li class="window window-maximize"></li>
    </ul>
    <div class="header-item-layer">
      <div class="profile-image">
        <img :src="me.profile_image" />
      </div>
      <ul class="spread-items">
        <li>Home</li>
        <li>Categories</li>
        <li>Tags</li>
        <li>About</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    console.log(process.env)
    return {
      me: {
        profile_image: ''
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/index.scss";

.main-header {
  width: 70%;
  height: 140px;
  margin: 40px auto 20px auto;
  background-color: $main-light-color;
  border-radius: 15px;
  box-shadow: 0px 1px 30px 0 rgb(32 33 36 / 34%);

  & .header-item-layer {

    & .spread-items {
      list-style: none;
    }
  }
}

.main-header:hover {
  margin-top: 20px;
  box-shadow: 0px 10px 30px 0 rgb(32 33 36 / 34%);
}


@mixin mobile {
  @media (max-width: 767px) {
    @content;
  }
}

@mixin tablet {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}

@include mobile {
  .main-header {
    width: 95%;
  }
}

@include tablet {
  .main-header {
    width: 95%;
  }

}
</style>