import axios from "axios"
import { fileListStore, postCallStore, postListStore, userInfoStore } from "@/store";
import { excludeForPostData } from "@/components/header/settingUtils";


export const owner: string = 'taechnique'
const repo: string = 'study-note'
const baseURL = 'https://api.github.com'

export const setAuthAPI = () => {
    const endPoint: string = '/user'
    axios.get(endPoint, {
        baseURL: baseURL,
        headers: {
            'Authorization': process.env.VUE_APP_SECRET_USER_KEY
        }
    }).then(res => {
        userInfoStore.name = res.data.login
        userInfoStore.profile_image = res.data.avatar_url
        userInfoStore.company = res.data.company
        userInfoStore.position = res.data.bio
        userInfoStore.blog = res.data.blog

    }).catch(err => {
        console.debug('Github token: ', process.env.VUE_APP_SECRET_USER_KEY)
        console.error('-----------------------------------------')
        console.error(err.message)
    })
}

export const callPostList = (latest_index: number | null) => {
    const contentsPerCall: number = 4
    const callable: boolean = latest_index === null
    const lastIndex: number = fileListStore.file_list.length === 0 ? 0 : fileListStore.file_list.length - 1
    const start: number = callable ? 0 : latest_index!
    const end = lastIndex < start + contentsPerCall ? lastIndex + 1 : start+ contentsPerCall
    let expectedCount: number = end - start

    //== 최초 호출 이거나 스크롤 호출이거나 ==//
    if((callable && postListStore.latest_index === 0) || !callable && !(start === end)) {


        fileListStore.file_list.slice(start, end).forEach(e => {
            const endPoint: string = `/repos/${owner}/${repo}/contents/src/docs/${e.file_path}.md?ref=main`
            axios.get(endPoint, {
                baseURL: baseURL
            }).then(res => {
                const result = res.data

                postListStore.postDataList.push(excludeForPostData(result, e.file_index))
                expectedCount--
                if(expectedCount == 0) {
                    postCallStore.is_calling = false
                }

            }).catch(error => {
                console.debug('%c-----------------------------------------', 'color: Green')
                console.error(error.message)
            })
        })
    }
}

export const callPostDetail = (filePath: string)  => {
    const endPoint: string = `/repos/${owner}/${repo}/contents/src/docs/${filePath}.md?ref=main`

    return axios.get(endPoint,{
        baseURL: baseURL
    })
}

export const callIssueList = () => {
    const endPoint: string = `/repos/${owner}/${repo}/issues`

    axios.get(endPoint, {
        baseURL: baseURL
    }).then(res => {
        const issues = res.data
        //== 이슈 번호 할당 ==//
        fileListStore.file_list.forEach(file => {
            const path = `docs/${file.file_path}`
            issues.forEach((issue: any) => {
                if(path == issue.title) {
                    file.issueNum = issue.number
                    return false
                }
            })
        })
    }).catch(err => {
        console.debug('%c-----------------------------------------', 'color: Green')
        console.error(err.message)
    })

}

export const callCommentList = (index: number) => {
    const endPoint = `/repos/${owner}/${repo}/issues/${index}/comments`

    return axios.get(endPoint, {
        baseURL: baseURL
    })
}
