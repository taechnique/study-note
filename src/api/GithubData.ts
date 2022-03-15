
export class GithubDirectory {

    name: string
    sha: string
    url: string
    icon: string = 'folder'
    files: string[]
    is_opened: boolean = false

    constructor (name: string, sha: string, url: string) {
        this.name = name
        this.sha = sha
        this.url = url
        this.files = []
    }
}

export class UserData {

    name: string
    profile_image: string
    position: string

    constructor(private login: string, private avatar_url: string, private bio: string, private blog: string, private company: string) {
        this.name = login
        this.profile_image = avatar_url
        this.position = bio
        this.blog = blog
        this.company = company
    }

}
