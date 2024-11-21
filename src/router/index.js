import { createRouter,createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue';

const routes = [
    {path:"/login", component:Login},
    {path:"/", component:Layout}
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes,
})

export default router;