import { reactive } from 'vue';
export const userInfoStore = reactive({
    name: '',
    blog: '',
    company: '',
    position: '',
    profile_image: ''
});
export const dirMapStore = reactive({
    base_path: '',
    directories: []
});
export const fileListStore = reactive({
    file_list: []
});
export const postListStore = reactive({
    postDataList: []
});
//# sourceMappingURL=store.js.map