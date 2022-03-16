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
    console.debug('Github token: ', process.env.VUE_APP_GITHUB_API_KEY)
    axios.get(endPoint, {
        baseURL: baseURL,
        headers: {
            'Authorization': process.env.VUE_APP_GITHUB_API_KEY
        }
    }).then(res => {
        console.debug('-----------------------------------------')

        userInfoStore.name = res.data.login
        userInfoStore.profile_image = res.data.avatar_url
        userInfoStore.company = res.data.company
        userInfoStore.position = res.data.bio
        userInfoStore.blog = res.data.blog

        console.debug(`GET ${res.status} ${res.statusText} ${endPoint}`)
    }).catch(err => {
        console.error(err.message)
    })
    // const endPoint: string = `/repos/${userInfoStore.name}/${repo}/contents/src/docs/directory-map.json?ref=main`
}

export const callPostList = (latest_index: number | null) => {

    const start: number = latest_index === null ? 0 : latest_index
    const postList: Array<PostData> = new Array<PostData>()

    fileListStore.file_list.slice(start, start + 5).forEach((e, i,) => {

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
            postListStore.postDataList.push(new PostData(result.sha, decodedContent, new MarkDownPost(header.categories, header.tags, header.date, header.hide, header.excerpt_separator, header.layout, executed![1], header.title, executed![4])))

        }).catch(error => {
            console.error(error.message)
        })
    })


}

