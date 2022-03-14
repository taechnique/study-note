import { reactive } from 'vue'
import { UserData } from "@/api/GithubData";

export const userInfoStore = reactive({
    userData: UserData,

})