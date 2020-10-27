import Vue from 'vue'
import Vuex from 'vuex'
import { setStorage,getStorage } from '@/utils/storage'

Vue.use(Vuex)

var USER_NAME = 'user'
export default new Vuex.Store({
  state: {
    user:getStorage(USER_NAME),
    cachePages:['LayoutIndex']
  },
  mutations: {
    setUsers(state,data){
      state.user = data
      setStorage(USER_NAME,data)
    },
    setCachePages(state,page){
      if(!state.cachePages.includes(page)){
        state.cachePages.push(page)
      }
    },
    removeCachePages(state,name){
      const index = state.cachePages.indexOf(name)
      if(index!==-1){
        state.cachePages.splice(index,1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
