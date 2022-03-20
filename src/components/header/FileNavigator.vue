<template>
  <div></div>
<!--  <div class="header-file-navigator">-->
<!--    <div class="nav-wrapper">-->
<!--      <ul>-->
<!--        <li v-bind:key="idx" v-for="(dir, idx) in this.dirMapStore.directories">-->
<!--          <div class="directory" v-on:click="activeFolder(idx)">-->
<!--            <div class="folder-icon">-->
<!--              <font-awesome-icon :icon="dir.icon"/>-->
<!--            </div>-->
<!--            <span class="directory-title">{{ dir.directory_name }} ({{ dir.files.length }})</span>-->
<!--          </div>-->
<!--          <div class="files" :class="{ opened : dir.is_opened }" v-bind:id="idx">-->
<!--            <ul>-->
<!--              <li v-for="(file, index) in dir.files" v-bind:key="index" ><router-link v-bind:to="`/docs/${file.file_path}`">{{ file.file_title }}</router-link></li>-->
<!--            </ul>-->
<!--            <div class ="more-post">-->
<!--              <span>더보기</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script lang="ts">

import { dirMapStore, userInfoStore, fileListStore } from "@/store";

export default {
  setup() {

    const activeFolder = (idx: number) => {
      dirMapStore.directories.forEach((e, i) => {

          if(i === idx && ( ! e.is_opened)) {
            e.is_opened = true
            e.icon = 'folder-open'
          } else if(i === idx && e.is_opened) {
            e.is_opened = false
            e.icon = 'folder'
          }

          if(i !== idx) {
            e.is_opened = false
            e.icon = 'folder'
          }
      })
    }

    return {
      userInfoStore,
      dirMapStore,
      fileListStore,
      activeFolder,
      rendered: {
        latest_index: 0,
        postList: []
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';

.header-file-navigator {
  display: block;
  position: absolute;
  height: 100%;
  width: 200px;
  top: 0;

  & .nav-wrapper {
    position: fixed;
    min-height: 200px;
    width: inherit;
    top: 270px;
    border-radius: 15px;
    background-color: $main-light-color;
    padding: 20px 0px;
    border: 1.29px solid #e0dfdc;

    & li {
      list-style: none;
      position: relative;

      & .directory {
        padding: 7px;
        cursor: pointer;
        display: flex;

        & .folder-icon {
          margin: 0 5px;
          width: 20px;
          display: inline;
          text-align: center;
        }

        & .directory-title {
          flex: 1;
        }
      }

      & .files {
        padding: 0 15px;
        font-size: .83rem;
        overflow: hidden;
        max-height: 0;
        transition: max-height 1s;

        &.opened {
          max-height: 480px;
          overflow-y: auto;
          padding-bottom: 26px;
          transition: max-height 1s;

          & .more-post {
            position: absolute;
            bottom: 0;

            &:hover {
              background-color: $point-light-color;
              cursor: pointer;
              transition: .1s;
            }
          }
        }

        & li {
          border-top: 1.22px solid $point-light-color;
          padding: 10px 0px;

          &:before {
            content: "•";
            padding-right: 5px;
          }

          &:hover {
            text-decoration: underline;
            color: #2c3e50;
            border-radius: 10px;
            background-color: $point-light-color;
          }
        }

        & .more-post {
          height: 20px;
          padding: 3px 5px;
          background-color: $main-light-color;
          width: 160px;
          text-align: center;

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

  .header-file-navigator {
    display: none;
  }
  .progress-area {
    top: 50px !important;
  }
}

@include tablet {

  .header-file-navigator {
    display: none;
  }

}
</style>