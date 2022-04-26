import { createApp } from 'vue';
import TicTacTo from './TicTacTo.vue'
import store from './store.js'

createApp(TicTacTo).use(store).mount('#root')
// new Vue().$mount('#root');