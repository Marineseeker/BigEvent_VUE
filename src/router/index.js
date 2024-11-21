import { createRouter,createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue';

const routes = [
    { path: '/', redirect: '/login' }, // 添加重定向规则
    { path: '/login', component: Login },
    { path: '/layout', component: Layout } // 修改路径以避免冲突
];

const router = createRouter({
    history:createWebHistory(),
    routes:routes,
})

export default router;