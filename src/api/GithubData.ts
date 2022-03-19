import {parse} from "date-format-parse";

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

export class DirectoryData {

    directory_name: string
    icon: string = 'folder'
    is_opened: boolean = false
    files: FileData[]

    constructor(directory_name: string, files: FileData[]) {
        this.directory_name = directory_name
        this.files = files
    }

}

export class FileData {
    file_index: number = 0
    file_path: string
    file_title: string
    create_time: Date

    constructor(file_path: string, file_title: string, create_time: Date) {
        this.file_path = file_path
        this.file_title = file_title
        this.create_time = create_time
    }
}

export class WrapperData {

    base_path: string = '/src/docs'
    directories: DirectoryData[] = []

    constructor(directories: DirectoryData[] ) {
        this.directories = directories
    }
}

export class FileListData {
    file_list: FileData[] = []

    constructor() {
    }
}

export class PostData {
    index: number
    sha: string
    content: string
    markdownPost: MarkDownPost | null

    constructor(index: number, sha: string, content: string, markdownPost: MarkDownPost | null) {
        this.index = index
        this.sha = sha
        this.content = content
        this.markdownPost = markdownPost
    }
}

export class PostListWrapper {
    latest_index: number = 0
    postDataList: PostData [] = []

    constructor(postDataList: PostData[]) {
        this.postDataList = postDataList
    }

}

export class MarkDownPost {

    profile_image: string
    current_company: string
    current_position: string

    thumbnail: string
    categories: string []
    tags: string []
    date: Date
    is_hide: boolean
    excerpt_separator: string
    layout: string
    description: string
    title: string
    body: string

    constructor(profile_image: string, current_company: string, current_position: string, thumbnail: string, categories: string [], tags: string [], date: string, is_hide: boolean, excerpt_separator: string, layout: string, description: string, title: string, body: string) {
        this.profile_image = profile_image
        this.current_company = current_company
        this.current_position = current_position
        this.thumbnail = thumbnail
        this.categories = categories
        this.tags = tags
        this.date = parse(date, 'YYYY-MM-DD HH:mm:ss ZZ')
        this.is_hide = is_hide
        this.excerpt_separator = excerpt_separator
        this.layout = layout
        this.description = description
        this.title = title
        this.body = body
    }

}

