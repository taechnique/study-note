<template>
  <div class="main-body">
    <div class="main-container">
      <div class="post-card-wrapper">
        <div class="post-preview-header">
          <div class="profile-image">
            <img :src="this.post[0].profile.image" />
          </div>
          <div class="author-info">
            <span class="author-name">Dev-Phantom</span>
            <span class="author-work-at">Server developer, Herit Corperation</span>
            <span class="posting-date">1시간</span>
          </div>
        </div>
        <div class="post-preview-body">
          <div class="post-contents">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: [
        {
          profile: {
            image: 'https://github.com/Dev-Phantom/study-node/blob/main/src/assets/images/profile.png?raw=true'
          }
        }
      ]
    }
  }

}
</script>

<style lang="scss">
@import "@/styles/index.scss";

.main-body {
  display: flex;
  max-width: 786px;
  min-height: 800px;
  margin: 20px auto;


  & .main-container {
    width: 100%;

    & .post-card-wrapper {
      width: 60%;
      margin: 20px auto;
      height: 600px;
      background-color: $main-light-color;
      border-radius: 15px;

      & .post-preview-header {
        padding: 20px 30px;
        display: flex;

        & .profile-image {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          margin: 5px 5px;

          & img {
            width: 100%;
            height: 100%;
          }
        }

        & .author-info {

          & .span {
            display: block;
          }
        }
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