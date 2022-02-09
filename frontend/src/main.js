import Vue from 'vue'
import App from './App.vue'
import {VueMasonryPlugin} from 'vue-masonry'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueSilentbox from 'vue-silentbox'
import WOW from 'wow.js/dist/wow.js'
import VueMeta from 'vue-meta'

Vue.use(VueMasonryPlugin)
Vue.use(VueSilentbox)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.config.productionSourceMap = false
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
})

import VueScrollReveal from 'vue-scroll-reveal';
Vue.use(VueScrollReveal);

import VueSessionStorage from 'vue-sessionstorage';
Vue.use(VueSessionStorage);

import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

import { routes } from './router/index'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'animate.css/animate.min.css'
import 'slick-carousel/slick/slick.css'

import ProgressBar from 'vuejs-progress-bar'
Vue.use(ProgressBar)

Vue.store= Vue.prototype.store = 'https://insytdev.com';
// Vue.store= Vue.prototype.store = 'http://localhost:3000';

const router = new VueRouter({
    routes,
    mode: 'history'
})

new Vue({
    render: h => h(App),
    router,
    mounted(){
        new WOW().init();
    }
}).$mount('#app')