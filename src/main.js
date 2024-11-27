import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index.js'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import locale from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
const pinia = createPinia()
const persist = createPersistedState()
pinia.use(persist)
app.use(router)
app.use(ElementPlus, { locale })
app.use(pinia)
app.mount('#app')
