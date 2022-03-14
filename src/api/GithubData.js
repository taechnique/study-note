export class GithubData {

    constructor(owner, repo) {
        this.owner = owner
        this.repo = repo
    }
}

export class GithubDirectory {

    constructor(name, sha, url) {
        this.name = name
        this.sha = sha
        this.url = url
        this.files = []
    }
}

export class UserData {

    constructor(login, avatar_url, bio, blog, company) {
        this.name = login
        this.profile_image = avatar_url
        this.position = bio
        this.blog = blog
        this.company = company
    }

}