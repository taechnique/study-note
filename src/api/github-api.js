import axios from "axios"
import { userInfoStore } from "@/store";
import {UserData} from "@/api/GithubData";

export const getAPI = (endPoint) => {
    console.debug('-----------------------------------------')
    console.time('GET '+endPoint)
    axios.get(endPoint, {
        baseURL: 'https://api.github.com'
    }).then(res => {
        console.debug(res.data)
        console.timeEnd('GET '+endPoint)
        console.debug('-----------------------------------------')
    }).catch(err => {
        console.error(err.message)
        console.debug('-----------------------------------------')
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