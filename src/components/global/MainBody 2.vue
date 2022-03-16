<template>
  <div class="main-body">
    <div class="main-container">
      <div class="post-card-wrapper" v-for="post in this.posts" v-bind:key="post.id">
        <div class="post-preview-header">
          <div class="profile-image">
            <img :src="this.profile.image" />
          </div>
          <div class="author-info">
            <span class="author-name">{{ this.profile.name }}</span>
            <span class="author-work-at">{{ this.profile.career }}, {{ this.profile.work_at }}</span>
            <span class="posting-date">{{ post.contents.posting_date }}</span>
          </div>
        </div>
        <div class="post-preview-body">
          <div class="post-contents">
            <span class="content-text">{{ convertPost(post.contents.description_text) }}</span>
          </div>
          <a href="/">
            <div class="post-default-image">
              <div class="default-image-wrapper" v-bind:style="{ backgroundImage: 'url(' + post.contents.default_image + ')' }">
              </div>
              <div class="post-title-box">
                  <span class="post-title">{{ post.contents.post_title }}</span>
                  <span class="post-path">{{ post.contents.post_path }}</span>
              </div>
            </div>
          </a>
        </div>
        <div class="post-preview-footer">
          <div class="post-tag-area">
            <span v-for="tag in post.contents.tags" v-bind:key="tag" >{{ tag }}</span>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {

    return {
      profile: {
        name: 'Dev-Phantom',
        work_at: 'Herit Corperation',
        career: 'Server Developer',
        image: 'https://github.com/Dev-Phantom/study-node/blob/main/src/assets/images/profile.png?raw=true'
      },
      posts: [
        {
          id:1,
          contents: {
            post_title: 'Spring Boot의 AOP는 CGLIB으로만 생성된다 ?!',
            post_path: 'phantom-dev.io',
            default_image: 'https://media.vlpt.us/images/kyjna0312/post/933dfcfa-a12b-403a-aa29-07530c07660c/img.jpg',
            description_text: '스프링 프레임워크의 장점중하나인 AOP는 Proxy 패턴을 통해 확장하거나 DI 할수 있는 좋은 기능입니다.\n 하지만 스프링 AOP는 JDK Dynamic Proxy또는 CGLIB을 이용해 AOP를 사용합니다.\n하지만 이 기능을 Spring Boot에서는 CGLIB만을 이용해 사용하는데요, 간단하게 Proxy Pattern이 어떤것인지 알아보고 왜 Spring Boot에서는 CGLIB으로만 AOP를 사용하는지 알아봅니다.',
            posting_date: '1시간',
            tags: [
              'Spring',
              'AOP',
              'SpringBoot',
              '스프링부트 AOP',
              '아 진짜 몰랐음',
              'CGLIB'
            ]
          }
        }
      ]
    }
  },
  mounted() {


  },
  methods: {
    convertPost: (content) => {
      const pattern = new RegExp('(?:(.[^\\\\]+)(\\\\n)?)','g')
      const contentRegex = /(?:(.[^\\\\]+)(\\\\n)?)/g;
      pattern.exec('스프링 프레임워크의 장점중하나인 AOP는 Proxy 패턴을 통해 확장하거나 DI 할수 있는 좋은 기능입니다.\n 하지만 스프링 AOP는 JDK Dynamic Proxy또는 CGLIB을 이용해 AOP를 사용합니다.\n하지만 이 기능을 Spring Boot에서는 CGLIB만을 이용해 사용하는데요, 간단하게 Proxy Pattern이 어떤것인지 알아보고 왜 Spring Boot에서는 CGLIB으로만 AOP를 사용하는지 알아봅니다.')
      content.match(contentRegex)

      return content
    }
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
      width: 60%;
      margin: 20px auto;
      min-height: 600px;
      background-color: $main-light-color;
      border-radius: 15px;

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
