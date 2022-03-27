import {DirectoryData, FileData, FileListData, MarkDownPost, PostData, WrapperData} from "@/api/GithubData";
import { directoryMap } from "@/docs/directory-map";
import { dirMapStore, fileListStore } from "@/store";
import * as Parser from 'jekyll-markdown-parser';
import * as DateParser from 'date-format-parse'

import { Base64 } from "js-base64";


export const setDirectories = () => {
    const directoryData: Array<DirectoryData> = []

    directoryMap.docs.forEach(dir => {
        const fileData: Array<FileData> = []

        dir.files.forEach(file => {
            fileData.push(new FileData(file.file_path, file.file_title, DateParser.parse(file.create_time, 'YYYY-MM-DD HH:mm:ss ZZ')))
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

export const excludeForPostData = (result: any, index: number): PostData => {
    const decodedContent = Base64.decode(result.content)
    const md = Parser.parse(decodedContent)
    const header = md.parsedYaml
    const contentRegex = /(?:((.|\n)*)(<!--[\s]{0,}more[\s]{0,}-->)((.|\n)*))/g
    const executed: string[] | null = contentRegex.exec(md.markdown)

    return new PostData(index, result.sha, decodedContent,
        new MarkDownPost(
            //== author ==//
            header.profile_image,
            header.current_company,
            header.current_position,

            //== post ==//
            header.thumbnail,
            header.categories,
            header.tags,
            header.date,
            header.hide,
            header.excerpt_separator,
            header.layout,
            executed![1],
            header.title, executed![4]))

}

export const calPostDate = (date: string): string => {
    const timeValue = Date.parse(date)
    const milliSeconds = +new Date() - timeValue

    const seconds = milliSeconds / 1000
    if (seconds < 60) return `방금 전`

    const minutes = seconds / 60
    if (minutes < 60) return `${Math.floor(minutes)}분 전`

    const hours = minutes / 60
    if (hours < 24) return `${Math.floor(hours)}시간 전`

    const days = hours / 24
    if (days < 7) return `${Math.floor(days)}일 전`

    const weeks = days / 7
    if (weeks < 5) return `${Math.floor(weeks)}주 전`

    const months = days / 30
    if (months < 12) return `${Math.floor(months)}개월 전`

    const years = days / 365
    return `${Math.floor(years)}년 전`

}
