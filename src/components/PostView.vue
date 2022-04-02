<template>
  <div class="post-container">
    <div class="post post-explorer">
      <span>docs</span>
      <span>{{ this.post_info.dirName }}</span>
      <span>{{ this.post_info.post }}</span>
    </div>
    <div class="not-found" v-if="this.post_content === null">
      <NotFound />
    </div>
    <div class="post-area" v-if="this.post_content">
      <div class="post-content-wrapper">
        <div class="post-intro">
          <span class="title">{{ this.post_content.markdownPost.title }}</span>
          <span class="reported-date">{{ parseDate(this.post_content.markdownPost.date) }}</span>
        </div>
        <div class="post-tag">
          <span class="tag" v-for="(tag, idx) in this.post_content.markdownPost.tags" v-bind:key="idx">{{ tag }}</span>
        </div>
        <div class="post-content" v-html="post_body" />

        <vue-utterances repo="taechnique/study-note" crossorigin="anonymous" theme="github-light" issue-term="pathname" async/>
      </div>
    </div>
  </div>
</template>

<script>
import { callPostDetail } from "@/api/GithubAPI";
import {excludeForPostData, spinner} from "@/components/header/settingUtils";
import { fileListStore } from "@/store";
import * as DateParser from 'date-format-parse'
import NotFound from "@/components/global/NotFound";
import VueUtterances from 'vue-utterances';
import hljs from 'highlight.js'


export default {
  components: {
    NotFound,
    VueUtterances
  },
  data() {
    spinner(true)

    const parseBody = (body) => {
      const md = require('markdown-it')({
        highlight: (str, lang) => {
          if(lang && hljs.getLanguage(lang)) {
            return hljs.highlight(str, { language: lang }).value
          }

          return '';
        }
      })
      const parsed =  md.render(body)

      return parsed
    }

    const settingPost = () => {
      const dirName = this.$route.params.dir
      const postName = this.$route.params.post

      const filePath =  `${dirName}/${postName}`
      let foundPath = ''
      let isExist = false

      fileListStore.file_list.forEach(e => {
        if(e.file_path.toLowerCase() === filePath.toLowerCase()) {
          isExist = true
          foundPath = e.file_path
          return false
        }
      })


      if(isExist) {

        callPostDetail(foundPath)
            .then(req => {
              const result = req.data

              const postData = excludeForPostData(result, 0)

              this.post_content = postData
              this.post_body = parseBody(postData.markdownPost.body)

              hljs.highlightAll()
              spinner(false)

            }).catch(err => {
            console.error(err.message)

            })
      }

    }
    setTimeout(()=> {
      spinner(false)
      if(this.post_content === undefined) {

        this.post_content = null
      }
    },5000)
    return {
      settingPost,
      parseBody,
      post_info: {
        dirName: this.$route.params.dir,
        post: this.$route.params.post.replace('_', ' ')
      },
      post_content: undefined,
      page: {

      },
      post_body: ''
    }
  },
  mounted() {
    this.settingPost()
  },
  methods: {
    parseDate: (date) => {
      return DateParser.format(date, 'YY년 MM월 DD일 HH:mm')
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';



.post-container {
  padding: 20px 0px;
  min-height: 700px;

  .post-explorer {
    padding: 5px 3px;
    color: #2c3e50;
    font-size: 1.4rem;
    margin: 40px auto;
    max-width: 786px;

    & span {

      &:nth-child(n+2):before {
        content: '>';
        margin: 0px 30px;
      }
    }
  }
  .post-area {
    width: 97%;
    background-color: #fcfcfc;
    border: 1.29px solid #e0dfdc;
    margin: 0 auto;
    border-radius: 15px;

    .post-content-wrapper {
      margin: 40px auto;
      max-width: 786px;

      .post-content {
        min-height: 400px;
        padding: 30px 15px;

        & p {
          margin: 7px 0px;
          line-height: 30px;
        }

        & ul {
          padding: 0 20px;
        }

        & h1, h2, h3, h4 {
          margin: 120px 0px 20px;
          padding: 10px 0px;
          border-bottom: 1.22px solid $point-light-color;
        }

        & pre {
          overflow-x: scroll;
          background-color: white;
          border: 1px #e0dfdc solid;
          border-radius: 5px;
          padding: 7px 5px;

          &::-webkit-scrollbar-track {
            background-color: inherit;
          }
          //== Java ==//
          code {
            border: none;
            color: $main-font-color;
            font-family: "AppleSDGothicNeoL";
          }
        }
        code {
          background-color: $main-light-color;
          border: 1px #e0dfdc solid;
          border-radius: 5px;
          padding: 0 5px;
          color: #FF605C;
          font-size: 1.01rem;
        }

      }

      .post-tag {
        margin: 30px 0px;

        & .tag {
          background-color: #b7b4b4;
          border-radius: 15px;
          padding: 3px 12px;
          color: white;
          margin:0px 6px;

          &:before {
            content: '#';
          }

          &:hover {
            background-color: #2855ab;
            transition: 0.1s;
          }
        }
      }

      .post-intro {
        padding: 30px 7px 0px;

        span {
          display: block;
        }

        .title {
          font-size: 1.77rem;
        }
        .reported-date {
          text-align: right;
          width: 90%;
          margin: 60px auto 10px;
          font-size: .92rem;
        }
      }
    }
  }
}

@include tablet {
  .post-container {

    .post {
      padding: 20px 0;
      max-width: 80%;
      margin: 0 auto;
    }
  }
}

@include mobile {
  .post-container {

    .post {
      padding: 60px 0 20px;
      max-width: 90%;
      margin: 0px auto;
      font-size: 1.1rem;

      span:nth-child(n+2) {

        &:before {
          margin: 0px 10px;
        }
      }
    }
  }
}

</style>