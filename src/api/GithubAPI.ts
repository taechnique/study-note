import axios from "axios"
import { userInfoStore, directoryStore } from "@/store";
import { GithubDirectory, UserData } from "@/api/GithubData";

const repo: string = 'study-note'

export const getAPI = (endPoint) => {
    console.debug('-----------------------------------------')
    console.time('GET '+endPoint)
    axios.get(endPoint, {
        baseURL: 'https://api.github.com'
    }).then(res => {
        console.timeEnd('GET '+endPoint)
        console.debug('-----------------------------------------')
        return res.data
    }).catch(err => {
        console.error(err.message)
        console.debug('-----------------------------------------')
    })
}

export const setDirectoriesAPI = () => {
    const endPoint = `/repos/${userInfoStore.userData.name}/${repo}/contents/src/docs`
    console.debug('-----------------------------------------')
    console.time(`GET ${endPoint}`)
    axios.get(endPoint, {
        baseURL: 'https://api.github.com'
    }).then(res => {
        console.timeEnd('GET '+endPoint)
        console.debug('-----------------------------------------')
        let directories: GithubDirectory[] = new Array<GithubDirectory>();
        const result = res.data
        result.filter(e => e.type === 'dir').forEach(e => {
            directories.push(new GithubDirectory(e.name, e.sha, e.url))
        })
        console.debug('directories: ', directories)
        directoryStore.directories = directories
    }).catch(err => {
        console.error(err.message)
        console.debug('-----------------------------------------')
    })
}

export const setFilesAPI = () => {
    directoryStore.directories.forEach(dir => {
        const endPoint = `/repos/${userInfoStore.userData.name}/${repo}/git/trees/${dir.sha}`
        console.debug('-----------------------------------------')
        console.time(`GET ${endPoint}`)
        axios.get(endPoint, {
            baseURL: 'https://api.github.com'
        }).then(res => {
            console.timeEnd('GET '+endPoint)
            console.debug('-----------------------------------------')

            const result = res.data
            result.tree.forEach(file => {

            })
        }).catch(err => {
            console.error(err.message)
            console.debug('-----------------------------------------')
        })
    })
}

export const getAuthAPI = (endPoint) => {
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
        userInfoStore.userData = new UserData(res.data.login, res.data.avatar_url, res.data.bio, res.data.blog, res.data.company)
        console.timeEnd('GET '+endPoint)
        console.debug('-----------------------------------------')
    }).catch(err => {
        console.error(err.message)
        console.debug('-----------------------------------------')
    })
}