import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarOpen: false,
    token: localStorage.getItem('token'),
  },
  getters: {
    sideBarOpen: (state) => {
      return state.sideBarOpen;
    },
    getToken: (state) => state.token,
  },
  mutations: {
    toggleSidebar(state) {
      state.sideBarOpen = !state.sideBarOpen;
    },
  },
  actions: {
    toggleSidebar(context) {
      context.commit("toggleSidebar");
    },
    setToken({ commit }, token) {
      commit("setToken", token);
    },
  },
});
