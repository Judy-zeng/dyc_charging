import axios from 'axios'
import { getToken } from '@/network/utils'

const service = axios.create({
    timeout: 30000
})

// 发起请求前的处理
service.interceptors.request.use(config => {
    // 在请求头中添加 Authorization
    if (getToken()) {
        config.headers.Authorization = 'Bearer ' + getToken();
    }
    config.headers['Cache-Control'] = 'no-cache'
    return config
}, error => {
    // console.error(' [REQ ERR] : ', error);
    return Promise.reject(error)
})

// 收到响应的处理
service.interceptors.response.use(response => {
    if (response.headers['content-disposition']) {
        return response
    }
    return response.data
}, error => {
    console.log(error)
    let errMsg = error.errmsg

    return Promise.reject(new Error(errMsg))
})

export default service
