import { createApp } from 'vue'
import VueTelegram from 'vue-tg'
import './style.css'
import App from './app.vue'
import router from './router'


createApp(App)
    .use(VueTelegram)
    .use(router)
    .mount('#app')
