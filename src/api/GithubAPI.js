import axios from "axios";
import { fileListStore, postListStore, userInfoStore } from "@/store";
import { PostData } from "@/api/GithubData";
import { Base64 } from "js-base64";
const owner = 'Dev-Phantom';
const repo = 'study-note';
const baseURL = 'https://api.github.com';
export const setAuthAPI = () => {
    const endPoint = '/user';
    console.debug('Github token: ', process.env.VUE_APP_GITHUB_API_KEY);
    console.debug('-----------------------------------------');
    console.time('GET ' + endPoint);
    axios.get(endPoint, {
        baseURL: baseURL,
        headers: {
            'Authorization': process.env.VUE_APP_GITHUB_API_KEY
        }
    }).then(res => {
        console.debug(res.data);
        userInfoStore.name = res.data.login;
        userInfoStore.profile_image = res.data.avatar_url;
        userInfoStore.company = res.data.company;
        userInfoStore.position = res.data.bio;
        userInfoStore.blog = res.data.blog;
        console.timeEnd('GET ' + endPoint);
        console.debug('-----------------------------------------');
    }).catch(err => {
        console.error(err.message);
        console.debug('-----------------------------------------');
    });
    // const endPoint: string = `/repos/${userInfoStore.name}/${repo}/contents/src/docs/directory-map.json?ref=main`
};
export const callPostList = (latest_index) => {
    const start = latest_index === null ? 0 : latest_index;
    const postList = new Array();
    console.debug('---------------Get File list Start-----------------');
    fileListStore.file_list.slice(start, start + 5).forEach((e, i) => {
        console.log('file_list index: %d', i);
        const endPoint = `/repos/${owner}/${repo}/contents${e.file_path}?ref=main`;
        console.debug('GET ' + endPoint);
        axios.get(endPoint, {
            baseURL: baseURL
        }).then(res => {
            const result = res.data;
            console.debug('result: ', result);
            postListStore.postDataList.push(new PostData(result.sha, Base64.decode(result.content)));
            console.debug('-----------------------------------------');
        }).catch(error => {
            console.error(error.message);
            console.debug('-----------------------------------------');
        });
    });
};
//# sourceMappingURL=GithubAPI.js.map