import { reactive } from 'vue'
import {DocumentData, UserData} from "@/api/GithubData";

export const userInfoStore = reactive<UserData>({
    name: '',
    blog: '',
    company: '',
    position: '',
    profile_image: ''
})

export const directoryMapStore = reactive<DocumentData[]>([{
    directory_name: '',
    files: []
}])

