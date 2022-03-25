<template>
  <div class="header-wrapper">
    <div class="main-header">
      <div class="menu-info">
        <div class="menu-item">
          <ul class="spread-items">
            <li v-for="menu in this.headers.menus" v-bind:key="menu.key">
              <router-link v-bind:to="menu.link_to">{{ menu.item_name }}</router-link>
            </li>
            <li>
              <div class="search-layer">
                <div class="search-box" :class="{ focus : this.headers.search_box.is_focus }">
                  <input type="search" placeholder="검색어 입력" size="18" @focus="this.headers.search_box.is_focus = true" @blur="this.headers.search_box.is_focus = false"/>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="search-list-area" :class="{ focus : this.headers.search_box.is_focus }">
        <div class="search-list">
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
    <div class="progress-area">
      <span class="progress-bar"></span>
    </div>
  </div>
</template>

<script>
import { userInfoStore } from "@/store";

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
      handleForScroll,
      is_hide: false,
      me: {
        profile_image: 'https://github.com/Dev-Phantom/study-node/blob/main/src/assets/images/profile.png?raw=true'
      },
      userInfoStore,
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
          {key: '3', item_name: 'Tags', link_to: '/tags'},
          {key: '4', item_name: 'About', link_to: '/about'},
        ]
      }
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="scss">
@import "@/styles/index.scss";
.header-wrapper {

  .mobile-header {
    display: none;
  }

  .main-header {
    width: 100%;
    margin: 0 auto;
    background-color: #0a66c2;
    display: grid;
    position: fixed;
    top: 0;
    //box-shadow: 0px 1px 30px 0 rgb(32 33 36 / 34%);

    & .menu-info {
      display: flex;
      flex-direction: column;

      & .menu-item {
        width: 100%;
        padding: 4px 0;

        & .spread-items {
          list-style: none;
          display: flex;
          justify-content: space-between;
          width: 60%;
          margin: 0 auto;

          & li {
            display: inline-block;
            color: #717171;
            font-size: 1.14rem;
            cursor: pointer;
            text-align: center;

            a {
              color:white;
              vertical-align: middle;
            }

            & .search-layer {
              flex: 1;

              & .search-box {
                width: 120px;
                height: 100%;
                padding: 2px;
                border-radius: 15px;
                justify-content: center;
                background-color: #fcfcfc;
                overflow: hidden;

                & input {
                  border: 0px;
                  width: 100%;
                  padding: 3px 5px;
                  margin: 3px 0;
                  background-color: #fcfcfc;
                  font-size: 0.92em;

                  &:focus {
                    outline: none;
                    background-color: white;
                  }
                }

                &.focus {
                  border-color: #2c3e50;
                  background-color: white;
                  width: 250px;
                }
              }
            }
          }
        }
      }
    }

    & .search-list-area {
      width: 100%;
      top: 44px;
      position: fixed;

      &.focus {
        height: 100%;
        background: rgb(0 0 0 / 40%);
        backdrop-filter: blur(5px);
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

  .header-wrapper {
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
          background: rgb(0 0 0 / 40%);
          backdrop-filter: blur(5px);
          height: 100%;
        }

      }

      & .mobile-navigator-wrapper {
        position: fixed;
        top: 0;
        left: -1999px;
        height: 100%;
        width: 77%;
        transition: 2s;

        &.active {
          left: 0;
          z-index: 2;
          transition: .6s;
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
      display: none;
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

    .progress-area {

      &.hide {
        display: none;
      }
    }
  }
}

@include tablet {

  .header-wrapper {
    .main-header {
      max-width: 80%;
      height: 380px;
      margin: 0 auto;
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
}
</style>