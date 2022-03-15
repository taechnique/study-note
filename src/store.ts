import { reactive } from 'vue'
import {GithubDirectory, UserData} from "@/api/GithubData";

export const userInfoStore = reactive({
    userData: UserData,

})

export const directoryStore = reactive({
    directories: GithubDirectory
})