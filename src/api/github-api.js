import { Octokit } from 'octokit';
import { GithubData } from "@/api/GithubData";

const octokit = new Octokit({
    auth: process.env.GITHUB_API_KEY,

    baseUrl: 'https://api.github.com',

    log: {
        debug: () => {},
        info: () => {},
        warn: console.warn,
        error: console.error
    }
});




//== User data ==//
export const getUserInfo = async () => {
    try {

        return octokit.request('GET /user')
    }catch(err) {
        console.error(err.message)
        return undefined;
    }
}

export const getAllPosts = async () => {
    try {

        const githubData = new GithubData('Dev-Phantom', 'study-note')
        var allPosts = new Array()

        octokit.request('GET /repos/{owner}/{repo}/contents/src/docs', {
            owner: githubData.owner,
            repo: githubData.repo
        }).then(response => {
            response.data.filter(file => file.type === 'dir').map(el => {
                octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
                    owner: githubData.owner,
                    repo: githubData.repo,
                    tree_sha: el.sha
                }).then(res => {
                    allPosts.push(res.data)
                    console.log('allPosts: ', allPosts)
                    return allPosts
                })
            })
        })
    } catch (err) {
        console.error(err.message)
        return undefined
    }

}

export const getAllDirectories = async () => {

    const githubData = new GithubData('Dev-Phantom', 'study-note')

    return octokit.request('GET /repos/{owner}/{repo}/contents/src/docs', {
        owner: githubData.owner,
        repo: githubData.repo
    })

}