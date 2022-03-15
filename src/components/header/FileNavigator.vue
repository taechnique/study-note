<template>
  <div class="header-file-navigator">
    <div class="nav-wrapper">
      <ul>
        <li v-bind:key="dir.sha" v-for="dir in this.directoryStore.directories">
          <div class="directory" v-on:click="activeFolder(dir.sha)">
            <div class="folder-icon">
              <font-awesome-icon :icon="dir.icon"/>
            </div>
            <span class="directory-title">{{dir.name }} ({{ dir.files.length }})</span>
          </div>
          <div class="files" :class="{ opened : dir.is_opened }" v-bind:id="dir.sha">
            <ul>
              <li v-for="file in dir.files" v-bind:key="file.id">{{ file.title }}</li>
            </ul>
            <div class ="more-post">
              <span>더보기</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { reactive } from "vue";
import { userInfoStore } from "@/store";
import { directoryStore } from "@/store";

export default {
  setup() {
    const dirState = reactive({
      directories: [
        {
          id: 0,
          sha: 'lfe221ksdSs1gbc',
          icon: 'folder',
          dir_name: 'Spring',
          is_opened: false,
          files: [
            {
              id: 1,
              title: 'Spring Transactional With MySQL',
              link_to: '#'
            },
            {
              id: 2,
              title: 'Spring AOP With JDK Dynamic Proxy and CGRIB',
              link_to: '#'
            },
            {
              id: 3,
              title: 'What is MVC Pattern?',
              link_to: '#'
            },
          ]
        },
        {
          id: 1,
          sha: 'dk29ms21D7sl1klas123',
          icon: 'folder',
          dir_name: 'Java',
          is_opened: false,
          files: [
            {
              id: 4,
              title: 'Java Runtime data area (JVM 1)',
              link_to: '#'
            },
            {
              id: 5,
              title: 'Java Heap (JVM 2)',
              link_to: '#'
            },
            {
              id: 6,
              title: 'Java Collection Framework',
              link_to: '#'
            },
          ]
        },
        {
          id: 2,
          sha: '1ak1LS0vdsa132',
          icon: 'folder',
          dir_name: 'Database',
          is_opened: false,
          files: [
            {
              id: 7,
              title: 'Transaction versioning with log (MVCC)',
              link_to: '#'
            },
            {
              id: 8,
              title: 'Clustered Index, None Clustered Index with BTree',
              link_to: '#'
            }
          ]
        },
      ],
      userInfoStore
    })




    const activeFolder = (key) => {
      dirState.directories.forEach(e => {
        if(e.id != key) {
          e.icon = 'folder'
          e.is_opened = false
        } else {
          if(e.is_opened == false) {
            e.is_opened = true
            e.icon = 'folder-open'
          } else {
            e.is_opened = false
            e.icon = 'folder'
          }
        }
      })
    }
    return {
      directoryStore,
      userInfoStore,
      activeFolder
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
  padding: 0px 40px;

  & .nav-wrapper {
    position: fixed;
    min-height: 200px;
    width: inherit;
    top: 30%;
    border-radius: 15px;
    background-color: $main-light-color;
    padding: 20px 0px;

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
            cursor: pointer;
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
}

@include tablet {

  .header-file-navigator {
    display: none;
  }

}
</style>