import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
// 计算设置rem的基准值，即html的font-size
import 'amfe-flexible'
import { Dialog, Field, CellGroup } from 'vant'
// vant
const app = createApp(App)

// 路由
app.use(router)

// veux
app.use(createPinia())

// 挂载
app.mount('#app')

app.use(Dialog)
app.use(Field)
app.use(CellGroup)
