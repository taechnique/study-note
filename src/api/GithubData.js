export class UserData {
    name;
    profile_image;
    position;
    blog;
    company;
    constructor(login, profile_image, position, blog, company) {
        this.name = login;
        this.profile_image = profile_image;
        this.position = position;
        this.blog = blog;
        this.company = company;
    }
}
export class DirectoryData {
    directory_name;
    icon = 'folder';
    is_opened = false;
    files;
    constructor(directory_name, files) {
        this.directory_name = directory_name;
        this.files = files;
    }
}
export class FileData {
    file_index = 0;
    file_path;
    file_title;
    constructor(file_path, file_title) {
        this.file_path = file_path;
        this.file_title = file_title;
    }
}
export class WrapperData {
    base_path = '/src/docs';
    directories = [];
    constructor(directories) {
        this.directories = directories;
    }
}
export class FileListData {
    file_list = [];
    constructor() {
    }
}
export class PostData {
    sha;
    content;
    constructor(sha, content) {
        this.sha = sha;
        this.content = content;
    }
}
export class PostListWrapper {
    postDataList = [];
    constructor(postDataList) {
        this.postDataList = postDataList;
    }
}
//# sourceMappingURL=GithubData.js.map