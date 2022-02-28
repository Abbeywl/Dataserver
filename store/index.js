import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        userInfo: {
			name:"大便超人"
		},
    },
    mutations: {
		
    },
    actions: {}
})

export default store