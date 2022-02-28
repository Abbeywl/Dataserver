import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from './store'
import Common from './static/js/common.js'
import Config from './static/js/config.js'
import { VueJsonp } from 'vue-jsonp/dist';
import $app from "./common/common.js";

import queue from './common/queue'
import getCode from './components/get-code'

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/js/http.interceptor.js'
// 小视频开始
Vue.component('getCode', getCode);
//全局注入w-loading组件
import wLoading from "@/components/w-loading.vue";
Vue.component('w-loading',wLoading)

import profile from './pages/main/profile.vue'
Vue.component('profile',profile)

import home from './pages/main/home.vue'
Vue.component('home',home)

import shipin from './pages/main/shipin.vue'
Vue.component('shipin',shipin)

import discover from './pages/main/discover.vue'
Vue.component('discover',discover)

import notifications from './pages/main/notifications.vue'
Vue.component('notifications',notifications)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
// 小视频结束
Vue.use(uView);
Vue.use(VueJsonp);
Vue.use(httpInterceptor, app);
Vue.config.productionTip = false;
Vue.prototype.app=$app;
Vue.prototype.$Common = Common
Vue.prototype.$Config = Config
Vue.prototype.$store = store
Vue.prototype.$queue = queue

App.mpType = 'app'
/*格式化颜色*/
Vue.filter('formatColor', (time, data, type) => {
    if (type == "时间进度" || type == "系数进度") {
        return Config.COLOR[3];
    } else {
        if (Number(data) >= 100) {
            return Config.COLOR[2];
        } else if (Number(data) <= Number(time)) {
            return Config.COLOR[0];
        } else {
            return Config.COLOR[1];
        }
		
    }
})

const app = new Vue({
    ...App
})

app.$mount()
