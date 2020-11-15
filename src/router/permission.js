import router from './index'

let toURL = null
router.beforeEach(async (to, from, next) => {
    // if (toURL === to.path) {
    //     next()
    // }
    // if (to.path !== from.path) {
    //     toURL = to.path
    //     next({ ...to })
    //     // next()
    // }
    next()
})
