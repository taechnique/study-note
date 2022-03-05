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
      <div class="author-info">
        <span class="author">Dev-Phantom</span>
        <span class="author-says">세상에 기여하고 싶어요.</span>
      </div>
      <div class="menu-item">
        <ul class="spread-items">
          <li><span>Home</span></li>
          <li>Categories</li>
          <li>Tags</li>
          <li>About</li>
        </ul>
      </div>
      <div class="search-layer"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    console.log(process.env)
    return {
      me: {
        profile_image: 'https://github.com/Dev-Phantom/study-node/blob/main/src/assets/profile.png?raw=true'
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/index.scss";

.main-header {
  width: 70%;
  height: 200px;
  margin: 40px auto 20px auto;
  background-color: $main-light-color;
  border-radius: 15px;
  box-shadow: 0px 1px 30px 0 rgb(32 33 36 / 34%);

  & .header-item-layer {
    display: flex;

    & .profile-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: #f9c6c6 4.45px solid;
      overflow: hidden;
      display: inline-block;
      margin: 20px 20px;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:hover {
        border-color: #f35d5d;

        & img {
          -webkit-transform:scale(1.1);
          -moz-transform:scale(1.1);
          -o-transform:scale(1.1);
          transform:scale(1.1);
        }
      }

    }

    & .author-info {
      display: inline-block;
      padding: 20px 40px;
      height: inherit;
      vertical-align: middle;

      & .author {
        font-size: 1.72rem;
        font-weight: bold;
      }

      & .author-says {
        font-style: italic !important;
      }

      & span {
        display: block;
        margin: 20px 0;
      }
    }

    & .menu-item {
      display: inline-block;
      padding: 20px 60px;
      width: 40%;

      & .spread-items {
        list-style: none;
        display: flex;
        height: 100%;
        justify-content: space-between;

        & li {
          display: inline-block;
          color: #717171;
          font-size: 1.787rem;
          cursor: pointer;
          margin: 10px 10px;
          padding: 0px 7px;

          & span {
            margin: auto 0px;
          }
        }
      }

    }

    & .search-layer {
      display: inline-block;
      background-color: #2c3e50;
      flex: 1;
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