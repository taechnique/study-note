import { reactive } from 'vue'
import {FileListData, PostData, PostListWrapper, UserData, WrapperData} from "@/api/GithubData";

export const userInfoStore = reactive<UserData>({
    name: '',
    blog: '',
    company: '',
    position: '',
    profile_image: ''
})

export const dirMapStore = reactive<WrapperData>({
    base_path: '',
    directories: []
})


export const fileListStore = reactive<FileListData>({
    file_list: []
})

export const postListStore = reactive<PostListWrapper>({
    latest_index: 0,
    postDataList: []
})

export const scrollStore = reactive({
    scroll: 0
})