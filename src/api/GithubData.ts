export class UserData {

    name: string
    profile_image: string
    position: string
    blog: string
    company: string

    constructor(login: string, profile_image: string, position: string, blog: string, company: string) {
        this.name = login
        this.profile_image = profile_image
        this.position = position
        this.blog = blog
        this.company = company
    }

}

export class DocumentData {

    directory_name: string
    files: FileData[]

    constructor(directory_name: string, files: FileData[]) {
        this.directory_name = directory_name
        this.files = files
    }

}

export class FileData {

    file_path: string
    file_title: string

    constructor(file_path: string, file_title: string) {
        this.file_path = file_path
        this.file_title = file_title
    }
}
