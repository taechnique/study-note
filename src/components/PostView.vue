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
import { excludeForPostData, spinner } from "@/components/header/settingUtils";
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
        html: true,
        xhtmlOut: true,
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
              const body = postData.markdownPost.body


              this.post_content = postData
              this.post_body = parseBody(body)

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
    word-break: break-word;

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
    color: black;

    .post-content-wrapper {
      margin: 40px auto;
      max-width: 786px;

      .post-content {
        min-height: 400px;
        padding: 30px 15px;
        word-break: break-word;
        font-size: 0.9375em;
        line-height: 1.6;
        font-family: Noto Sans KR, "Apple SD Gothic Neo";
        font-weight: 400;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #666;

        & table {
          border-collapse: collapse;
          width: 100%;
          tr {
            border-top: 1px solid #d0d7de;
          }

          th {

          }

          th, td {
            border: 1px solid #d0d7de;
            box-sizing: border-box;
            padding: 3px 5px;
          }
        }

        & p {
          margin: 7px 0px;
          line-height: 30px;
        }

        & ul,ol {
          padding: 0 20px;
          margin-bottom: 20px;


          li {
            line-height: 25px;
          }
        }

        & h1, h2, h3, h4 {
          margin: 60px 0px 20px;
          padding: 10px 0px;
          border-bottom: 1.22px solid $point-light-color;
        }

        h4 {
          font-size: 1em;
        }
        & img {
          width: 100%;
        }
        & pre {
          overflow: auto;
          border: 1px #e0dfdc solid;
          border-radius: 15px;
          padding: 7px 5px;
          background-color: white;
          margin: 20px 0;

          &::-webkit-scrollbar {
            height: 9px;
          }
          &::-webkit-scrollbar-track {
            background-color: transparent;
          }
          //== Java ==//
          code {
            border: none;
            font-family: SFMonoLight,Menlo,Consolas,Liberation Mono,monospace;
            background-color: white;
            line-height: 1.8;
            font-size: .84rem;

            .hljs-meta {
              color: #0550ae;
            }

            .hljs-comment {
              color: #969696;
            }
            //.class_ {
            //  color: crimson;
            //}
            //.hljs-built_in {
            //  color: #9560dc;
            //}
            //.hljs-type {
            //  color: blue;
            //}

            .function_ {
              color: #8250df;
            }

            .hljs-keyword {
              color: #cf222e;
            }

            .hljs-string {
              color: #0b5b29;
            }
          }
          code[class^=language-] {
            padding:0;
          }
        }
        code {
          background-color: rgba(175,184,193,0.2);
          border-radius: 6px;
          padding: 0.2em 0.4em;
          font-size: .97rem;
          word-break: break-word;
        }
        hr {
          margin: 30px 0;
        }
        .array {
          margin: 20px 0;

          span {
            width: 25px;
            height: 25px;
            color: #666;
            display: inline-block;
            text-align: center;
            border: 1px solid #e6e6e6;

            &.over {
              background-color: lightgray;
            }

            &.current {
              background-color: pink;
            }

            &.target {
              background-color: green;
              color: white;
            }
          }
        }

      }

      .post-tag {
        margin: 30px 0px;
        display: flex;
        flex-wrap: wrap;

        & .tag {
          display: block;
          background-color: #b7b4b4;
          border-radius: 15px;
          padding: 3px 12px;
          color: white;
          margin:4px 6px;
          box-sizing: border-box;

          &:before {
            content: '#';
          }

          &:hover, :active {
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
      max-width: 80%;
      margin: 40px auto;
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

    .post-area {

      .post-content-wrapper {

        .post-content {
          font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
          code {
            padding: 5px 3px;
          }
        }
      }
    }
  }
}

</style>