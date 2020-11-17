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
