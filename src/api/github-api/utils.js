import { Octokit } from 'octokit';

const octokit = new Octokit({
    auth: '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',

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

        const allDocsFiles = octokit.request('GET /repos/{owner}/{repo}/contents/src/docs')

        allDocsFiles.filter(file => file.type === 'dir').map(el => {

        })


    } catch (err) {
        console.error(err.message)
        return undefined
    }

}
