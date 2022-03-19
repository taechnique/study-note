<template>
  <div class="main-body">
    <div class="main-container">
      <div class="post-card-wrapper" v-for="(post, idx) in getSortedPostList(this.postListStore.postDataList)" v-bind:key="post.sha">
        <div class="post-preview-header">
          <div class="profile-image">
            <img :src="getProfileOrDefault(post.markdownPost.profile_image)" />
          </div>
          <div class="author-info">
            <span class="author-name">{{ userInfoStore.name }}</span>
            <span class="author-work-at">{{ post.markdownPost.current_position }}, {{ post.markdownPost.current_company }}</span>
            <span class="posting-date">{{ calPostDate(post.markdownPost.date) }}</span>
          </div>
        </div>
        <div class="post-preview-body">
          <div class="post-contents">
            <span class="content-text">{{ post.markdownPost.description }}</span>
          </div>
          <a href="#" v-on:click="toMarkdown(idx)">
            <div class="post-default-image">
              <div class="default-image-wrapper" v-bind:style="{ backgroundImage: 'url('+changeDefaultIfNull(post.markdownPost.thumbnail) +')' }">
              </div>
              <div class="post-title-box">
                  <span class="post-title">{{ post.markdownPost.title }}</span>
                  <span class="post-path">dev-phantom.github.io</span>
              </div>
            </div>
          </a>
        </div>
        <div class="post-preview-footer">
          <div class="post-tag-area">
            <span v-for="tag in post.markdownPost.tags" v-bind:key="tag" >{{ tag }}</span>
          </div>
          <div class="footer-button button-recommend">
            <font-awesome-icon icon="heart" />
            <span>추천</span>
          </div>
          <div class="footer-button button-comment">
              <font-awesome-icon icon="message" />
              <span>댓글</span>
          </div>
        </div>
      </div>
      <div class="post-card-wrapper content-loader" :class="{ active : postCallStore.is_calling }">
        <svg viewBox="0 0 400 480" preserveAspectRatio="xMidYMid meet" style="background-color: rgb(252, 252, 252); border-radius: 15px; display: block;">
          <rect clip-path="url(#7salfztor6n)" x="0" y="0" width="100%" height="100%" style="fill: url('#7z37ry5fwrh');"></rect>
          <defs>
            <clipPath id="7salfztor6n">
              <circle cx="40" cy="40" r="20"></circle>
              <rect x="75" y="25" rx="4" ry="4" width="200" height="13"></rect>
              <rect x="75" y="45" rx="4" ry="4" width="145" height="8"></rect>
              <rect x="20" y="100" rx="4" ry="4" width="360" height="13"></rect>
              <rect x="20" y="120" rx="4" ry="4" width="360" height="13"></rect>
              <rect x="20" y="140" rx="4" ry="4" width="300" height="13"></rect>
              <rect x="20" y="180" rx="5" ry="5" width="360" height="260"></rect>
            </clipPath>
            <linearGradient id="7z37ry5fwrh">
              <stop offset="0%" stop-color="#eaeaea" stop-opacity="1">
                <animate attributeName="offset" values="-2; 1" dur="2s" repeatCount="indefinite"></animate>
              </stop>
              <stop offset="50%" stop-color="#d7d6d6" stop-opacity="1">
                <animate attributeName="offset" values="-2; 1.5 " dur="2s" repeatCount="indefinite"></animate>
              </stop>
              <stop offset="100%" stop-color="#eaeaea" stop-opacity="1">
                <animate attributeName="offset" values="-1; 2" dur="2s" repeatCount="indefinite"></animate>
              </stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { callPostList } from "@/api/GithubAPI";
import {postListStore, postCallStore, userInfoStore, fileListStore} from "@/store";
import { parse } from "jekyll-markdown-parser";
import { setPostContent } from "@/components/header/settingUtils";

export default {
  data() {
    callPostList(null)

    return {
      postListStore,
      userInfoStore,
      fileListStore,
      postCallStore,
      scroll: {
        current: 0
      },
      content_loader: {
        is_active: postCallStore.is_calling,
        style: {
          width: '60%',
          margin: '20px auto',
          backgroundColor: '#fcfcfc',
          borderRadius: '15px',
          display: 'block'

        }
      }
    }
  },
  mounted() {
    const callNextPost = () => {
      callPostList(postListStore.latest_index + 1)

    }
    const handleForScroll = () => {
      const currentScroll = window.scrollY
      const winHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      const percent = (100.000 * currentScroll / (docHeight - winHeight)).toFixed(3)

      const scrollPer = parseFloat(percent)

      if(( ! postCallStore.is_calling) && scrollPer > 80 && !(fileListStore.file_list.length == postListStore.postDataList.length)) {
        postCallStore.is_calling = true
        callNextPost()
      }

    }

    window.addEventListener('scroll', handleForScroll)

  },
  methods: {
    toMarkdown: (index) => {
      const content = postListStore.postDataList[index].content
      const md = parse(content)
      setPostContent(md.markdown)
    },
    changeDefaultIfNull: (path) => {
      const defaultImages = ['default1.JPG', 'default2.jpeg', 'default3.jpeg', 'default4.jpeg', 'default5.JPG']
      const r = Math.floor(Math.random() * defaultImages.length)
      const baseImagePath = 'https://raw.githubusercontent.com/Dev-Phantom/study-note/main/src'

      const returnPath = path == undefined || path == null ? baseImagePath + '/assets/blogging/default/'+defaultImages[r] : baseImagePath + path

      return returnPath
    },
    getProfileOrDefault: (path) => {
      const defaultPath = 'https://avatars.githubusercontent.com/u/65699391?v=4'
      const basePath = 'https://raw.githubusercontent.com/Dev-Phantom/study-note/main/src'

      const returnPath = path == undefined || path == null ? defaultPath : basePath + path

      return returnPath
    },
    calPostDate: (date) => {
      const timeValue = Date.parse(date)
      const milliSeconds = new Date() - timeValue

      const seconds = milliSeconds / 1000
      if (seconds < 60) return `방금 전`

      const minutes = seconds / 60
      if (minutes < 60) return `${Math.floor(minutes)}분 전`

      const hours = minutes / 60
      if (hours < 24) return `${Math.floor(hours)}시간 전`

      const days = hours / 24
      if (days < 7) return `${Math.floor(days)}일 전`

      const weeks = days / 7
      if (weeks < 5) return `${Math.floor(weeks)}주 전`

      const months = days / 30
      if (months < 12) return `${Math.floor(months)}개월 전`

      const years = days / 365
      return `${Math.floor(years)}년 전`

    },
    getSortedPostList: (posts) => {
      if(posts.length !== 0) {
        posts.sort((a, b) => b.markdownPost.date - a.markdownPost.date)
        postListStore.latest_index = posts[posts.length - 1].index
      }
      return posts
    }
  },
  components: {
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
      width: 70%;
      margin: 10px auto;
      min-height: 600px;
      background-color: $main-light-color;
      border-radius: 15px;
      border: 1.29px solid #e0dfdc;

      & .post-preview-header {
        padding: 20px 30px;
        display: flex;

        & .profile-image {
          display: inline-block;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          overflow: hidden;

          & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        & .author-info {
          padding: 0px 10px;
          width: 80%;


          & span {
            display: block;
            color: #6b6b6b;
            line-height: 18px;

            &.author-name {
              color: #2c3e50;
            }

            &.posting-date {
              font-size: .81rem;
            }
          }
        }
      }

      & .post-preview-body {
        display: flex;
        flex-direction: column;

        & .post-default-image {
          cursor: pointer;

          & .default-image-wrapper {
            display: flex;
            width: 100%;
            min-height: 300px;
            background-size: cover;
            background-position: center;
          }

          & .post-title-box {
            background-color: #cfe6f8;
            padding: 4px 15px;
            color: #2c3e50;

            & span {
              display: block;

              &.post-title {

              }

              &.post-path {
                font-size: .78rem;
              }
            }
          }
        }

        & .post-contents {
          margin: 0 15px;
          max-height: 11rem;
          overflow: hidden;
          font-size: .92rem;
          padding: 15px;

          & .content-text {

              display: block;
              font-family: inherit;
              white-space: normal;
              word-break: break-all;
              //overflow: hidden;
              //text-overflow: ellipsis;
              //display: -webkit-box;
              //$allowed-line: 4;
              //$default-line-height: 1.2em;
              //-webkit-line-clamp: $allowed-line;
              //-webkit-box-orient: vertical;
              //word-wrap: break-word;
              //line-height: $default-line-height;
              //height: $allowed-line * $default-line-height;
          }

        }
      }

      & .post-preview-footer {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(50%, auto));
        grid-template-rows: repeat(2, minmax(40px, auto));
        margin: 0px 15px;
        text-align: center;

        & .post-tag-area {
          padding: 7px;
          text-align: left;
          border-bottom: 1px $point-light-color solid;

          & span {
            margin:0px 2px;
            border-radius: 15px;
            background-color: #b7b4b4;
            font-size: .78rem;
            padding: 0px 10px;
            color: white;
            display: inline-block;

            &:before {
              content: '#';
            }

            &:hover {
              background-color: #2855ab;
              transition: 0.1s;
            }
          }

          &:nth-child(1) {
            grid-column: auto / span 2;
          };
        }


        & .footer-button {
          display: inline-block;
          padding: 20px 7.2px;
          width: 100%;
          color: #b2adad;
          transition: none;
          cursor: pointer;

          & svg {
            transition: none;

            & path {
              transition: none;

            }
          }
          & span {
            margin: 0px 7px;
            transition: none;
          }

          &:hover {
            color: #6b6b6b;
          }
        }
      }
      &.content-loader {
          display: none;
        &.active {
          //== content-loader ==//
          display: block;
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
  .main-body {

    & .main-container {

      & .post-card-wrapper {
        width: 100%;
        border-radius: 0px;

        & .post-preview-body {

          & .post-contents {
            border-top: 1px $point-light-color solid;
          }
        }
      }
    }
  }
}

@include tablet {

}
</style>
