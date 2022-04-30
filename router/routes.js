import Vue from 'vue';
import VueRouter from 'vue-router';
import lotto from '../lotto/';
//import Rock from '../가위바위보'

export default new VueRouter({
  routes: [
    // { 
    //     path: 'rock-scissors-paper',
    //     component: Rock
    // },
    { 
        path: 'lotto',
        component: lotto
    }
  ]
});