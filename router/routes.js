import { createWebHistory, createRouter } from 'vue-router';
import Lotto from './Rock.vue';


const routes = [
    { 
        path: '/lotto',
        name: 'Lotto',
        component: Lotto
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default  router;