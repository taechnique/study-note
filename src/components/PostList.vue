<template>
  <div class="main-body">
    <div class="main-container">
      <div class="post-card-wrapper" v-for="(post, index) in getSortedPostList(this.postListStore.postDataList)" v-bind:key="post.sha">
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
          <router-link v-bind:to="`/docs/${fileListStore.file_list[post.index].file_path}`">
            <div class="post-default-image">
              <div class="default-image-wrapper">
                <img :src="changeDefaultIfNull(post.markdownPost.thumbnail)" />
              </div>
              <div class="post-title-box">
                  <span class="post-title">{{ post.markdownPost.title }}</span>
                  <span class="post-path">taech.io</span>
              </div>
            </div>
          </router-link>
        </div>
        <div class="post-preview-footer">
          <div class="post-tag-area">
            <span v-for="tag in post.markdownPost.tags" v-bind:key="tag" >{{ tag }}</span>
          </div>
          <div v-bind:class="[`post-comment-list${index}`,{ 'hide' : mobileNaviStore.isActive }]" class="message-box" ></div>
          <div class="footer-button button-recommend" v-on:click="recommendPost(index)">
            <font-awesome-icon icon="heart" />
            <span>추천</span>
            <div class="tooltip-bubble">
              <div class="tooltip-content"><span>준비중 입니다.</span></div>
              <div class="arrow"></div>
            </div>
          </div>
          <div class="footer-button button-comment" @click="getCommentList(index)">
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
import { callPostList, callCommentList, owner } from "@/api/GithubAPI";
import { postListStore, postCallStore, userInfoStore, fileListStore, mobileNaviStore } from "@/store";
import { spinner, calPostDate } from "@/components/header/settingUtils";

export default {
  data() {
    callPostList(null)

    return {
      postListStore,
      userInfoStore,
      fileListStore,
      postCallStore,
      mobileNaviStore,
      calPostDate,
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
    getSortedPostList: (posts) => {
      if(posts.length !== 0) {
        posts.sort((a, b) => b.markdownPost.date - a.markdownPost.date)
        postListStore.latest_index = posts[posts.length - 1].index
      }
      return posts
    },
    getCommentList: (index) => {
      spinner(true)
      const issueNum = fileListStore.file_list[index]._issue_number
      const commentArea = document.querySelector(`.post-comment-list${index}`)
      if(commentArea.style.display === 'flex') {
        commentArea.style.display = 'none'
        spinner(false)
        return false
      }

      if(issueNum !== 0) {
        callCommentList(issueNum).then(res => {
          const result = res.data
          commentArea.innerHTML = ''
          if(result.length !== 0) {
            result.forEach((e) => {
              const author = e.user.login
              const text = e.body
              const message = `<p class="${author === owner ? 'from-me' : 'from-them'}">${text}</p>`
              commentArea.innerHTML += message
            })
          }

          commentArea.style.display = 'flex'
          spinner(false)
        }).catch(err => {
          console.debug('%c-----------------------------------------', 'color: Green')
          console.error(err.message)
        })
      } else {
        commentArea.innerHTML = '<div class="no-comment"><span>작성된 댓글이 없어요. 🧐</span></div>'
        commentArea.style.display = 'flex'
        spinner(false)

      }
    },
    recommendPost: (index) => {
      console.debug('clicked index: ', index)
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
  margin: 60px auto 20px;


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
            min-height: 200px;

            img {
              width: 100%;
            }
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

            &:hover,:active {
              background-color: #2855ab;
              transition: 0.1s;
            }
          }

          &:nth-child(1) {
            grid-column: auto / span 2;
          };
        }

        & div[class^="post-comment-list"] {
          border-bottom: 1px $point-light-color solid;
          grid-column: 1 / -1;
          overflow: hidden;
          display: none;
          width: 100%;


          &.message-box {
            flex-direction: column;
            font-size: .92rem;
            margin: 0 auto 1rem;
            max-width: 600px;

            &.hide {
              display: none !important;
            }

            & p {
              border-radius: 1.15rem;
              line-height: 1.25;
              max-width: 75%;
              padding: 0.5rem .875rem;
              position: relative;
              word-wrap: break-word;

              &::before,::after {
                bottom: -0.1rem;
                content: "";
                height: 1rem;
                position: absolute;
              }

              &.from-me {
                align-self: flex-end;
                right: 7px;
                background-color: #248bf5;
                color: #fff;

                &::before {
                  border-bottom-left-radius: 0.8rem 0.7rem;
                  border-right: 1rem solid #248bf5;
                  right: -0.35rem;
                  transform: translate(0, -0.1rem);
                }

                &::after {
                  content: "";
                  position: absolute;
                  z-index: 1;
                  bottom: -2px;
                  right: -42px;
                  width: 12px;
                  height: 20px;
                  background: $main-light-color;
                  border-bottom-left-radius: 10px;
                  -webkit-transform: translate(-30px, -2px);
                  transform: translate(-30px, -2px);
                }
              }

              &[class^="from-"] {
                margin: 0.5rem 0;
                width: fit-content;
              }

              &.from-them {
                align-items: flex-start;
                background-color: #e5e5ea;
                color: #000;
                text-align: left;
                left: 7px;

                &:before {
                  border-bottom-right-radius: 0.8rem 0.7rem;
                  border-left: 1rem solid #e5e5ea;
                  left: -0.35rem;
                  transform: translate(0, -0.1rem);
                }

                &::after {
                  content: "";
                  position: absolute;
                  z-index: 3;
                  bottom: -2px;
                  left: 4px;
                  width: 26px;
                  height: 20px;
                  background: white;
                  border-bottom-right-radius: 10px;
                  -webkit-transform: translate(-30px, -2px);
                  transform: translate(-30px, -2px);
                }
              }


            }
            & .no-comment {
              width: 80%;
              padding: 10px 5px;
              margin: 10px auto;
              background-color: $point-light-color;
              border-radius: 15px;
            }
          }
        }



        & .footer-button {
          display: inline-block;
          padding: 20px 7.2px;
          width: 100%;
          color: #b2adad;
          transition: none;
          cursor: pointer;

          //== 둘다 해줘야 transition 적용 ==//
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

          &:hover,:active {
            color: #6b6b6b;
          }

          &.button-recommend {

            & .tooltip-bubble {
              opacity: 0;
              transition: .6s;
              position: relative;
              height: 0px;
              top: -55px;
              margin: 0 auto;
              font-size: .82rem;
              width: 150px;

              & .tooltip-content {
                width: 60%;
                margin: 0 auto;
                background-color: black;
                color: white;
                padding: 4px 3px;
                border-radius: 15px;

              }

              & .arrow {
                height: 0px;

                &:before {
                  content: "";
                  border-style: solid;
                  border-color: transparent;
                  position: relative;
                  top: 5px;
                  border-width: 0.4rem 0.4rem 0;
                  border-top-color:black;
                }
              }
            }

            &:active, &:hover {

              & path {
                color: #f85f5b;
              }

              & .tooltip-bubble {
                opacity: 1;

              }
            }
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


@include mobile {
  .main-body {
    margin-top: 40px;

    & .main-container {

      & .post-card-wrapper {
        width: 100%;
        min-height: 400px;
        border-radius: 0px;

        & .post-preview-body {

          & .post-contents {
            border-top: 1px $point-light-color solid;
          }

          & .post-default-image {

            & .default-image-wrapper {

              img {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}

@include tablet {

}
</style>
