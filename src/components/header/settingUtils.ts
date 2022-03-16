import { DirectoryData, FileData, FileListData, WrapperData } from "@/api/GithubData";
import { directoryMap } from "@/docs/directory-map";
import { dirMapStore, fileListStore } from "@/store";


export const setDirectories = () => {
    console.debug("----Call Directory List (Setting)----")
    const directoryData: Array<DirectoryData> = []

    directoryMap.docs.forEach(dir => {
        const fileData: Array<FileData> = []

        dir.files.forEach(file => {
            fileData.push(new FileData(file.file_path, file.file_title))
        })
        console.debug('fileData: ',fileData!)
        directoryData.push(new DirectoryData(dir.directory_name, fileData!))
    })

    const wrapperData: WrapperData = new WrapperData(directoryData)
    dirMapStore.base_path = wrapperData.base_path
    dirMapStore.directories = wrapperData.directories

}

export const setFileList = () => {
    console.debug("----Call File List (Setting)----")
    let index: number = 0
    const fileListData: FileListData = new FileListData()
    dirMapStore.directories.forEach((dir: DirectoryData) => {
        dir.files.forEach((file: FileData) => {
            fileListData.file_list.push(file)
            file.file_index = index
            index++
        })
    })

    fileListStore.file_list = fileListData.file_list
}