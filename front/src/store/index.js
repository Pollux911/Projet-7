import { createStore } from 'vuex'
import { auth } from './auth.module'

export default createStore({
  state: {
    userLocalStorage: JSON.parse(localStorage.user).userId
  },
  getters: {
  },
  mutations: {
  },
  actions: {

  },
  modules: {
    auth
  }
})
