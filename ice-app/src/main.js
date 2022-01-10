import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import App from "./App.vue";
import router from "./router";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
