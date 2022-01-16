import axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import ElementUI from "element-ui";
import elementLocale from "element-ui/lib/locale/lang/en";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
import VueRouter from "vue-router";
import App from "./App.vue";
import cookieHelper from "./helpers/cookieHelper";
import router from "./router";
import authorizationService from "./services/authorizationService";
import icecreamsService from "./services/icecreamsService";
import shopService from "./services/shopService";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(authorizationService);
Vue.use(VueCookies);
Vue.use(ElementUI, { locale: elementLocale });
Vue.use(shopService);
Vue.use(icecreamsService);
Vue.use(VueGoogleMaps, {
	load: {
		key: "AIzaSyDWuh1lZP1loT8uTBwG1pdzzQbf03dKj4c",
		libraries: "places",
	},
});

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

Vue.axios.interceptors.request.use(
	(config) => {
		const token = cookieHelper.getSessionCookie();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

Vue.axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		let errorResponse = error.response;
		if (!errorResponse) {
			router.push({
				name: "Login",
			});
			errorResponse = {
				data: {
					success: false,
					message: "Connection error",
				},
			};
		}
		Vue.prototype.$notify({
			message: error.response.data.Message,
			timeout: 3000,
			icon: "now-ui-icons ui-1_bell-53",
			horizontalAlign: "right",
			verticalAlign: "top",
			type: "danger",
		});
		return Promise.reject(errorResponse);
	},
);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
