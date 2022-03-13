import axios from "axios"


export const getAPI = (endPoint) => {
    console.debug('-----------------------------------------')
    console.time('GET '+endPoint)
    axios.get(endPoint, {
        baseURL: 'https://api.github.com'
    }).then(res => {
        console.debug(res.data)
        console.timeEnd('GET '+endPoint)
        console.debug('-----------------------------------------')
    }).catch(err => {
        console.error(err.message)
        console.debug('-----------------------------------------')
    })
}