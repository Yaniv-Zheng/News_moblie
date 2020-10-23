import Vue from 'vue'
import Vuex from 'vuex'
import { storage } from '@/utils/storage'

Vue.use(Vuex)

var USER_NAME = 'user'
export default new Vuex.Store({
  state: {
    user:storage(USER_NAME)
  },
  mutations: {
    setUsers(state,data){
      state.user = data
      storage(USER_NAME,data)
    }
  },
  actions: {
  },
  modules: {
  }
})
