import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { inject } from '@vercel/analytics'

import './assets/main.css'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
inject()
