import { DirectoryData, FileData, FileListData, WrapperData } from "@/api/GithubData";
import { directoryMap } from "@/docs/directory-map";
import {dirMapStore, fileListStore, postListStore} from "@/store";
import {parse} from "date-format-parse";


export const setDirectories = () => {
    const directoryData: Array<DirectoryData> = []

    directoryMap.docs.forEach(dir => {
        const fileData: Array<FileData> = []

        dir.files.forEach(file => {
            fileData.push(new FileData(file.file_path, file.file_title, parse(file.create_time, 'YYYY-MM-DD HH:mm:ss ZZ')))
        })

        directoryData.push(new DirectoryData(dir.directory_name, fileData!))
    })

    const wrapperData: WrapperData = new WrapperData(directoryData)
    dirMapStore.base_path = wrapperData.base_path
    dirMapStore.directories = wrapperData.directories

}

export const setFileList = () => {

    const fileListData: FileListData = new FileListData()
    //== 각 디렉토리별 파일담기 ==//
    dirMapStore.directories.forEach((dir: DirectoryData) => {

        dir.files.forEach((file: FileData) => {

            fileListData.file_list.push(file)
        })
    })
    //== 포스트 최신순 및 인덱싱 ==//
    fileListData.file_list.sort((a: FileData, b: FileData): number => {
        return +b.create_time - +a.create_time
    }).forEach((f: FileData, index: number) => {
        f.file_index = index
    })


    fileListStore.file_list = fileListData.file_list
}

export const setPostContent = (content: string) => {


}
