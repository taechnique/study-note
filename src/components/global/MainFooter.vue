<template>
  <div class="main-footer">
    <div class="footer-text">
      <span>© 2022 <a href="https://github.com/taechnique">taechnique.</a> All rights reserved.</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }

}
</script>

<style lang="scss">
@import "@/styles/index.scss";

.main-footer {
  width: 100%;
  height: 40px;
  background-color: #2c3e50;
  padding-top: 20px;

  & .footer-text {
    margin: 0 auto;
    width: 80%;
    text-align: center;

    & span {
      color: #cecdcb;

      & a {
        text-decoration: underline;
        color: #cecdcb;
      }
    }
  }
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

}

@include tablet {

}
</style>