import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: function () {
            return import('../views/Home.vue')
        }
    },
    {
        path: '/projects',
        name: 'projects',
        component: function () {
            return import('../views/projects/Index.vue')
        },
    },
    {
        path: '/projects/:id',
        name: 'project_id',
        component: function () {
            return import('../views/projects/_Id.vue')
        },
        props: true,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
