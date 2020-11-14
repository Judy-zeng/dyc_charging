import router from './index'
import Cookie from 'js-cookie'

router.beforeEach(async (to, from, next) => {
    if (to.meta.title) document.title = to.meta.title
    if (to.query.appId) {
       Cookie.set('COURSE_APPID', to.query.appId)
    }
    next()
})
