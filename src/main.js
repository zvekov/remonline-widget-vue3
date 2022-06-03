import { createApp } from 'vue'
import App from './App.vue'
import './assets/app.scss'
import Maska from 'maska'

createApp(App)
    .use(Maska)
    .mount('#app')
