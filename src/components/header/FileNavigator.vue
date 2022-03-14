<template>
  <div class="header-file-navigator">
    <div class="nav-wrapper">
      <ul>
        <li v-bind:key="dir.id" v-for="dir in dirState.directories">
          <div class="directory" v-on:click="activeFolder(dir.id)">
            <span>
              <font-awesome-icon :icon="dir.icon"/>
            </span>
            <span class="directory-title">{{dir.dir_name }} ({{ dir.files.length }})</span>
          </div>
          <div class="files" :class="{ closed : dir.is_closed }" v-bind:id="dir.sha">
            <ul>
              <li v-for="file in dir.files" v-bind:key="file.id">{{ file.title }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { reactive } from "vue";

export default {
  setup() {
    const dirState = reactive({
      directories: [
        {
          id: 0,
          sha: 'lfe221ksdSs1gbc',
          icon: 'folder',
          dir_name: 'Spring',
          is_closed: true,
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
          is_closed: true,
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
          is_closed: true,
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
      ]
    })

    const activeFolder = (key) => {
      dirState.directories.forEach(e => {
        e.icon = 'folder'
        e.is_closed = true

        if(e.id === key) {
          e.icon = 'folder-open'
          e.is_closed = false
        }
      })
    }
    return {
      dirState,
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

        & span {
          margin: 0 5px;
        }

        & .directory-title {

        }
      }

      & .files {
        padding: 0 15px;
        font-size: .83rem;
        overflow: hidden;

        &.closed {
          height: 0px;
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