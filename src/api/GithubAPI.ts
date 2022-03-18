import axios from "axios"
import { fileListStore, postListStore, userInfoStore } from "@/store";
import { MarkDownPost, PostData } from "@/api/GithubData";
import { Base64 } from "js-base64";
import { parse } from "jekyll-markdown-parser";



const owner: string = 'Dev-Phantom'
const repo: string = 'study-note'
const baseURL = 'https://api.github.com'

export const setAuthAPI = () => {
    const endPoint: string = '/user'
    axios.get(endPoint, {
        baseURL: baseURL,
        headers: {
            'Authorization': process.env.VUE_APP_GITHUB_API_KEY
        }
    }).then(res => {
        userInfoStore.name = res.data.login
        userInfoStore.profile_image = res.data.avatar_url
        userInfoStore.company = res.data.company
        userInfoStore.position = res.data.bio
        userInfoStore.blog = res.data.blog

    }).catch(err => {
        console.debug('Github token: ', process.env.VUE_APP_GITHUB_API_KEY)
        console.error('-----------------------------------------')
        console.error(err.message)
    })
    // const endPoint: string = `/repos/${userInfoStore.name}/${repo}/contents/src/docs/directory-map.json?ref=main`
}

export const callPostList = (latest_index: number | null) => {

    const callable = latest_index === null
    const start: number = callable ? 0 : latest_index
    if(callable && postListStore.postDataList.length === 0) {

        fileListStore.file_list.slice(start, start + 2).forEach((e, i,) => {
            console.debug('조회한 포스트의 인덱스: ', i)
            const endPoint: string = `/repos/${owner}/${repo}/contents${e.file_path}?ref=main`
            axios.get(endPoint, {
                baseURL: baseURL
            }).then(res => {
                console.debug('-----------------------------------------')
                const result = res.data
                console.debug(`GET ${res.status} ${res.statusText} ${endPoint}`)

                const decodedContent: string = Base64.decode(result.content)

                const md = parse(decodedContent)
                const header = md.parsedYaml
                const contentRegex = /(?:((.|\n)*)(<!--[\s]{0,}more[\s]{0,}-->)((.|\n)*))/g

                const executed: string[] | null = contentRegex.exec(md.markdown)
                postListStore.postDataList.push(
                    new PostData(i, result.sha, decodedContent,
                        new MarkDownPost(
                            //== author ==//
                            header.profile_image,
                            header.current_company,
                            header.current_position,

                            //== post ==//
                            header.thumbnail,
                            header.categories,
                            header.tags,
                            header.date,
                            header.hide,
                            header.excerpt_separator,
                            header.layout,
                            executed![1],
                            header.title, executed![4])))

            }).catch(error => {
                console.error(error.message)
            })
        })
    } else {
        console.debug('초기화용 호출이기에 더이상 호출하지 않음.')
    }


}

