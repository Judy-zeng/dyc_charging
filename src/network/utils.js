import Cookie from 'js-cookie'
const TOKEN_KEY = 'etk1_'

export function getToken () {
    let appId = Cookie.get('COURSE_APPID')
    let _token = Cookie.get(TOKEN_KEY + appId) // 从 cookie 中获取 token
    if (_token) {
        return _token // 解码
    }
    return null
}

export function getParams() {
    let _val = Cookie.get('QUERY_PARAMS')
    if (_val) return JSON.parse(_val)
    return {}
}

export function setParams(val) {
    let obj = Cookie.get('QUERY_PARAMS')
    let params = obj ? JSON.parse(obj) : {}
    for (let key in val) {
        params[key] = val[key]
    }
    console.log(params)
    Cookie.set('QUERY_PARAMS', params)
}
