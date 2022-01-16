import Vue from "vue";
import Vuex from "vuex";
import cookieHelper from "../helpers/cookieHelper";
import parseJwt from "../helpers/parseJwt";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
		icecreams: [],
		cart: [],
	},
	getters: {
		user: (state) => state.user,
		isLogged: (state) => !!state.user,
		cart: (state) => state.cart,
		providerId: (state) => state.user.providerId,
	},
	mutations: {
		storeUser(state, user) {
			state.user = user;
		},
		ADD_Item(state, data) {
			state.cart.push(data);
		},
		REMOVE_Item(state, index) {
			state.cart.splice(index, 1);
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
			this.$router.push({ name: "Home" });
		},
		addItem({ commit }, data) {
			commit("ADD_Item", data);
			console.log(this.state.cart);
		},
		removeItem({ commit }, id) {
			commit("REMOVE_Item", id);
		},
	},
});
