import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Layout from '../views/Layout.vue';

const ArticleCategory = () => import('@/views/article/ArticleCategory.vue');
const ArticleManage = () => import('@/views/article/ArticleManage.vue');
const UserAvatar = () => import('@/views/user/UserAvatar.vue');
const UserInfo = () => import('@/views/user/UserInfo.vue');
const UserResetPassword = () => import('@/views/user/UserResetPassword.vue');

const routes = [
    { path: '/', redirect: '/login' }, // 添加重定向规则
    { path: '/login', component: Login },
    { path: '/layout', component: Layout, redirect:"layout/article/manage", children: [
        { path: 'article/category', component: ArticleCategory },
        { path: 'article/manage', component: ArticleManage },
        { path: 'user/info', component: UserInfo },
        { path: 'user/avatar', component: UserAvatar },
        { path: 'user/reset-password', component: UserResetPassword },
    ]}
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;