import VueRouter from "vue-router";
import store from "../store";
import Cart from "../views/Cart.vue";
import Home from "../views/Home.vue";
import loginToShop from "../views/loginToShop.vue";
import manageShop from "../views/manageShop.vue";
import ownerPanel from "../views/ownerPanel.vue";
import registerShop from "../views/registerShop.vue";
const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/cart",
		name: "Cart",
		component: Cart,
	},
	{
		path: "/owner-panel",
		name: "ownerPanel",
		component: ownerPanel,
	},
	{
		path: "/manage-shop",
		name: "manageShop",
		component: manageShop,
	},
	{
		path: "/login-to-shop",
		name: "loginToShop",
		component: loginToShop,
	},
	{
		path: "/register-shop",
		name: "registerShop",
		component: registerShop,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});
router.beforeEach((to, from, next) => {
	store.dispatch("restoreSession");

	next();
});
export default router;
