import { reactive } from 'vue'
import {FileListData, PostData, PostListWrapper, UserData, WrapperData} from "@/api/GithubData";

export const userInfoStore = reactive<UserData>({
    name: 'taechnique',
    blog: 'https://taech.io',
    company: 'Herit Corporation',
    position: 'Backend Server Developer',
    profile_image: 'https://avatars.githubusercontent.com/u/65699391?v=4'
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

export const postCallStore = reactive({
    is_calling: true
})

export const searchInputStore = reactive({
    input_text: '',
    result_list: []
})

export const spinnerStore = reactive({
    isOn: false
})

export const mobileNaviStore = reactive({
    isActive: false
})