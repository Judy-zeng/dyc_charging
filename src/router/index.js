import Vue from 'vue'
import Router from 'vue-router'

import Layout from "@/components/Layout";
import NotFound from "@/components/NotFound";
import Index from "@/pages/Index";
import Person from "@/pages/Person";

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

export default router
