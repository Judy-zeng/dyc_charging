import service from "./service";

/**
 * 首页
 */
export const indexList = (params) => service.get('/api/index', { params })

/**
 * 选择时长套餐
 */
export const timingList = (params) => service.get('/api/choose/time', { params })

/**
 * 选择时长套餐
 */
export const interfaceList = (params) => service.get('/api/choose/port', { params })


/**
 * 下单-微信支付、钱包支付、钱包充值
 * return {
 *     device_number*: 设备号
 *     consume_type*: 消费类型,1、会员充值，2、充电付款、3退款
 *     pay_type*: 支付类型，1，微信支付，2钱包支付
 *     giving_money: 赠送金额，会员充值的时候才会用到
 *     charge_time: 充电时长
 *     port: 端口号，充电付款才会用到
 *     money*: 支付金额
 * }
 */
export const orderPay = (params) => service.post('/api/order/pay', params)

/**
 * 微信支付成功
 */
export const paySuccess = (params) => service.post('/api/order/pay_success', params)

/**
 * 充电详情
 */
export const chargeDetail = (params) => service.get('/api/charge/detail', { params })


/**
 * 结束充电
 */
export const chargeOver = (params) => service.get('/api/charge/finish', { params })

/**
 * 设备报修
 */
export const deviceRepair = (params) => service.post('/api/device/repair',  params)

/**
 * 个人中心
 */
export const userCenter = (params) => service.get('/api/member/info', { params })

/**
 * 账户余额
 */
export const accountBalance = (params) => service.get('/api/account/balance', { params })

/**
 * 余额充值页面
 */
export const balanceCharge = (params) => service.get('/api/balance/detail', {params})

/**
 * 充电记录
 */
export const chargeRecord = (params) => service.get('/api/recharge/record', {params})

/**
 * 历史账单
 */
export const billRecord = (params) => service.get('/api/bill/record', {params})

/**
 * 微信签名
 */
export const wechatSign = (params) => service.get(`/api/wechat/sign?${params}`)
