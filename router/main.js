import { createApp } from 'vue';
import Router from './Router.vue';
import router from './routes.js';

createApp(Router).use(router).mount('#root')