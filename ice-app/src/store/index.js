import Vue from "vue";
import Vuex from "vuex";
import cookieHelper from "../helpers/cookieHelper";
import parseJwt from "../helpers/parseJwt";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
	},
	getters: {
		user: (state) => state.user,
		isLogged: (state) => !!state.user,
		name: (state) => state.user.name,
	},
	mutations: {
		storeUser(state, user) {
			state.user = user;
		},
	},
	actions: {
		setSession({ commit }, token) {
			commit("storeUser", parseJwt(token));
			cookieHelper.setSessionCookie(token);
		},
		restoreSession({ dispatch, state }) {
			if (cookieHelper.hasSessionCookie() && state.user === null) {
				dispatch("setSession", cookieHelper.getSessionCookie());
			}
		},
		destroySession({ commit }) {
			commit("storeUser", null);
			cookieHelper.deleteSessionCookie();
			this.$router.go("/");
		},
	},
});
