<template>
  <div class="main-footer">
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
  height: 300px;
  background-color: #2c3e50;
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