<template>
  <div class="main-header">
    <ul class="window-controller">
      <li class="window window-close"></li>
      <li class="window window-minimize"></li>
      <li class="window window-maximize"></li>
    </ul>
    <div class="header-item-layer">
      <div class="author-profile">
        <div class="profile-image">
          <img :src="me.profile_image" />
        </div>
        <div class="author-info">
          <span class="author">Dev-Phantom</span>
          <span class="author-says">세상에 기여하고 싶어요.</span>
        </div>
      </div>
      <div class="menu-info">
        <div class="menu-item">
          <ul class="spread-items">
            <li v-for="menu in this.headers.menus" v-bind:key="menu.key">
              <router-link v-bind:to="menu.link_to">{{ menu.item_name }}</router-link>
            </li>
          </ul>
        </div>
        <div class="search-layer">
          <div class="search-box" :class="{ focus : this.headers.search_box.is_focus }">
            <input type="search" placeholder="검색어 입력" size="18" @focus="this.headers.search_box.is_focus = true" @blur="this.headers.search_box.is_focus = false"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mobile-header">
    <div class="burger" >
      <font-awesome-icon icon="bars" v-on:click="this.headers.mobile.is_navi_active = true" />
      <img :src="this.headers.mobile.vue_image" />
    </div>
    <div class="mobile-navigator-wrapper" :class="{ active : this.headers.mobile.is_navi_active }">
      <div class="nav-panel-box">
        <div class="nav-items">
          <ul>
            <li v-for="menu in this.headers.menus" v-bind:key="menu.key">
              <router-link v-bind:to="menu.link_to" v-on:click="this.headers.mobile.is_navi_active = false">{{ menu.item_name }}</router-link>
            </li>
          </ul>
        </div>
        <div class="search-items">
          <div class="search-box" :class="{ focus : this.headers.search_box.is_focus }">
            <input type="search" placeholder="검색어 입력" size="18" @focus="this.headers.search_box.is_focus = true" @blur="this.headers.search_box.is_focus = false"/>
          </div>
        </div>
      </div>
    </div>
    <div class="background" :class="{ active : this.headers.mobile.is_navi_active }" v-on:click="this.headers.mobile.is_navi_active = false"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      me: {
        profile_image: 'https://github.com/Dev-Phantom/study-node/blob/main/src/assets/images/profile.png?raw=true'
      },
      headers: {
        search_box: {
          is_focus: false
        },
        mobile: {
          vue_image: 'https://github.com/Dev-Phantom/study-node/blob/main/src/assets/logo.png?raw=true',
          is_navi_active: false
        },
        menus: [
          {key: '0', item_name: 'Home', link_to: '/'},
          {key: '1', item_name: 'Categories', link_to: '/categories'},
          {key: '3', item_name: 'Tags', link_to: 'tags'},
          {key: '4', item_name: 'About', link_to: 'about'},
        ]
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import "@/styles/index.scss";

.mobile-header {
  display: none;
}

.main-header {
  max-width: 1080px;
  height: 200px;
  margin: 40px auto 20px auto;
  background-color: $main-light-color;
  border-radius: 15px;
  box-shadow: 0px 1px 30px 0 rgb(32 33 36 / 34%);

  & .header-item-layer {
    display: flex;

    & .author-profile {
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
    }
    & .menu-info {
      display: flex;
      flex-direction: column;

      & .menu-item {
        padding: 5px 20px;
        width: 100%;

        & .spread-items {
          list-style: none;
          display: flex;
          justify-content: space-between;

          & li {
            display: inline-block;
            color: #717171;
            font-size: 1.787rem;
            cursor: pointer;
            margin: 4px 10px;
            padding: 7px 21px;
            text-align: center;
            border-radius: 30px;


            &:hover {
              box-shadow: 0px 1px 15px 0 rgb(32 33 36 / 34%);

            }
          }
        }

      }

      & .search-layer {
        display: inline-block;
        flex: 1;

        & .search-box {
          margin: 4px 20px 4px auto;
          width: 150px;
          padding: 10px 10px;
          border-radius: 15px;
          border: 2px lightgray solid;
          overflow: hidden;

          & input {
            border: 0px;
            padding: 3px 5px;
            background-color: $main-light-color;
            font-size: .92rem;

            &:focus {
              outline: none;
            }
          }

          &.focus {
            border-color: #2c3e50;
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
  .mobile-header {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    background-color: $main-light-color;
    border-bottom: $point-light-color 1px solid;
    width: 100%;
    height: 50px;
    font-size: 1.7rem;

    & .burger {
      padding: 2px 20px;
      margin: 2px auto;
      background-color: $main-light-color;

      & img {
        width: 40px;
        position: absolute;
        top: 5px;
        left: 45%;
      }

      & svg {
        -webkit-tap-highlight-color:transparent;

      }

    }

    & .background {
      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      transition: height 0s, background-color .6s;

      &.active {
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.71);
        height: 100%;
      }

    }

    & .mobile-navigator-wrapper {
      position: fixed;
      top: 0;
      left: -500px;
      height: 100%;
      width: 77%;

      &.active {
        left: 0;
        z-index: 2;
      }

      & .nav-panel-box {
        display: flex;
        background-color: $main-light-color;
        width: 100%;
        height: 100%;
        padding: 20px 10px;
        flex-direction: column;

        & .nav-items {
          padding: 20px 40px;

          ul {
            list-style: none;

            li {
              height: 40px;
            }
          }
        }

        & .search-items {

          width: 100%;

          & .search-box {
            margin: 4px auto;
            height: 40px;
            padding: 3px 5px;
            border-radius: 15px;
            border: 3.34px lightgray solid;
            overflow: hidden;

            & input {
              line-height: 32px;
              border: 0px;
              width: 100%;
              height: 100%;
              padding: 3px 5px;
              margin: 3px 0;
              background-color: $main-light-color;
              font-size: .92rem;

              &:focus {
                outline: none;
              }
            }

            &.focus {
              border-color: #2c3e50;
            }
          }

        }
      }
    }
  }
  .main-header {
    width: 90%;
    height: 400px;
    margin-top: 80px;


    & .header-item-layer {

      & .author-profile {
        flex-direction: column;
        width: 100%;

        & .profile-image {
          width: 150px;
          height: 150px;
          margin: 20px auto;
        }

        & .author-info {
          padding: 6px 20px;

          & .author {
            margin: 3px auto;
          }

          & .author-says {
            margin: 6px 0;
          }

          &:before {
            content: "";
            display: block;
            width: 100%;
            border-top: 1px solid #bcbcbc;
            margin: 20px 0px;
          }
        }
      }


      & .menu-info {
        display: none;
      }
    }
  }
}

@include tablet {

  .main-header {
    max-width: 80%;
    height: 380px;
    margin: 40px auto 20px auto;
    background-color: $main-light-color;
    border-radius: 15px;
    box-shadow: 0px 1px 30px 0 rgb(32 33 36 / 34%);


    & .header-item-layer {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: 100%;

      & .author-profile {
        display: grid;

        & .profile-image {
          width: 150px;
          height: 150px;
          margin: 7px auto;
        }

        & .author-info {
          display: inline-block;
          padding: 7px 20%;
          text-align: center;

          & .author {
            margin: 3px auto;
            font-size: 1.45rem;
          }

          & .author-says {
            font-size: 0.92rem;
          }
        }
      }

      & .menu-info {
        display: grid;

        & .menu-item {
          padding: 4px 10px;
          margin: 20px auto;

          & .spread-items {
            display: grid;
            grid-template-columns: 80%;
            grid-template-rows: 25% 25% 25% 25%;
            height: 200px;

            & li {
              height: 40px;
              margin: 0px;
              padding: 0px;
            }
          }
        }

        & .search-layer {

          & .search-box {
            margin: 10px auto;
          }
        }

      }
    }
  }
}
</style>