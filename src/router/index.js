import Vue from 'vue'
import Router from 'vue-router'

import Layout from "@/components/Layout";
import NotFound from "@/components/NotFound";
import Index from "@/pages/Index";
import Person from "@/pages/Person";
import ChargeTiming from "@/pages/ChargeTiming";
import ChargeInterface from "@/pages/ChargeInterface";
import ChargeDetail from "@/pages/ChargeDetail";
import AccountBalance from "@/pages/AccountBalance";
import BalanceRecharge from "@/pages/BalanceRecharge";
import BillRecord from "@/pages/BillRecord";
import ChargeRecord from "@/pages/ChargeRecord";
import DeviceRepair from "@/pages/DeviceRepair";

Vue.use(Router)

const routes = [
    {
        path: '/',
        redirect: 'index',
        component: Layout,
        children: [
            {
                path: '/index',
                name: 'index',
                component: Index
            },
            {
                path: '/person',
                name: 'person',
                component: Person
            }
        ]
    },
    {
        path: '/charge-timing',
        name: 'charge-timing',
        meta: {title: '选择时长套餐'},
        component: ChargeTiming
    },
    {
        path: '/charge-interface',
        name: 'charge-interface',
        meta: {title: '选择充电接口'},
        component: ChargeInterface
    },
    {
        path: '/charge-detail',
        name: 'charge-detail',
        meta: {title: '充电详情'},
        component: ChargeDetail
    },
    {
        path: '/account-balance',
        name: 'account-balance',
        meta: {title: '账户余额'},
        component: AccountBalance
    },
    {
        path: '/balance-charge',
        name: 'balance-charge',
        meta: {title: '余额充值'},
        component: BalanceRecharge
    },
    {
        path: '/bill-record',
        name: 'bill-record',
        meta: {title: '账单记录'},
        component: BillRecord
    },
    {
        path: '/charge-record',
        name: 'charge-record',
        meta: {title: '充电记录'},
        component: ChargeRecord
    },
    {
        path: '/device-repair',
        name: 'device-repair',
        meta: {title: '设备报修'},
        component: DeviceRepair
    },
    {
        path: '*',
        name: '404',
        component: NotFound
    }
]

const router = new Router({
    mode: 'history',
    base: '/',
    routes
})


const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export default router
