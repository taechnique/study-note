import axios from "axios"
import {directoryMapStore, userInfoStore} from "@/store";
import {Base64} from "js-base64";
import {DocumentData, FileData} from "@/api/GithubData";
const repo: string = 'study-note'

export const setAuthAPI = () => {
    const endPoint: string = '/user'
    console.debug('Github token: ', process.env.VUE_APP_GITHUB_API_KEY)
    console.debug('-----------------------------------------')
    console.time('GET '+endPoint)
    axios.get(endPoint, {
        baseURL: 'https://api.github.com',
        headers: {
            'Authorization': process.env.VUE_APP_GITHUB_API_KEY
        }
    }).then(res => {
        console.debug(res.data)
        userInfoStore.name = res.data.login
        userInfoStore.profile_image = res.data.avatar_url
        userInfoStore.company = res.data.company
        userInfoStore.position = res.data.bio
        userInfoStore.blog = res.data.blog
        console.timeEnd('GET '+endPoint)
        console.debug('-----------------------------------------')
        setDirectoryMap()
    }).catch(err => {
        console.error(err.message)
        console.debug('-----------------------------------------')
    })
}

export const setDirectoryMap = () => {
    const endPoint: string = `/repos/${userInfoStore.name}/${repo}/contents/src/docs/directory-map.json?ref=main`
    console.debug('-----------------------------------------')
    console.time('GET '+endPoint)
    axios.get(endPoint, {
        baseURL: 'https://api.github.com',
        headers: {
            'Content-Type': 'application/x-www-form-unlencoded; charset=UTF-8'
        }
    }).then(res => {
        const result = JSON.parse(Base64.decode(res.data.content))

        const documentData: Array<DocumentData> = []
        result.docs.forEach((dir: any) => {
            const fileData: Array<FileData> = []

            dir.files.forEach((file: any) => {
                fileData.push(new FileData(file.file_path, file.file_title))
            })
            console.debug('fileData: ',fileData!)
            documentData.push(new DocumentData(dir.directory_name, fileData!))
        })


        console.timeEnd('GET '+endPoint)
        console.debug('-----------------------------------------')

    }).catch(err => {
        console.error(err.message)
        console.debug('-----------------------------------------')
    })
}

