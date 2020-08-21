import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.token || '',
    adminId:'',
  },
  mutations: {
    setToken(state,token) {
      state.token = token
    },
    setadminId(state,adminId) {
      state.adminId = adminId
    }
  },
  actions: {
  },
  modules: {
  }
})
