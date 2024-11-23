import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index.js'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
