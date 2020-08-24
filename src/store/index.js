import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.token || '',
    adminId:''
  },
  mutations: {
    setToken(state,token) {
      state.token = token
    },
    setAdminId(state,adminId) {
      state.adminId = adminId
    },
  },
  getters : {
    getToken(state) {
      return state.token
    },
    getAdminId(state) {
      return state.adminId
    }
  },
  actions: {
  },
  modules: {
  }
})
