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

