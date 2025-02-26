import './assets/main.css'
// import instance from './axios.ts'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

// app.config.globalProperties.axios = instance;

app.mount('#app')
