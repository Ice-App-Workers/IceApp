<template>
	<div id="nav">
		<router-link id="logo-url" to="/">
			<img src="@/assets/icecream.png" :alt="alt" id="logo" />
		</router-link>
		<router-link to="/owner-panel" v-if="!isLogged">
			Are you an Ice Cream Shop Manager?
		</router-link>
		<div v-else>
			<router-link to="/manage-shop"> Manager Panel </router-link>
			<b-button
				variant="link"
				style="color: orange; text-decoration: none"
				@click="destroySession"
			>
				Logout
			</b-button>
		</div>
		<router-link to="/">Home</router-link>
		<router-link to="/cart" v-if="!isLogged">Cart</router-link>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	computed: {
		...mapGetters(["isLogged"]),
	},
	name: "Navbar",
	props: ["logo", "alt"],
	methods: {
		...mapActions(["destroySession"]),
	},
};
</script>

<style scoped>
#nav {
	background-color: #222;
	border-bottom: 4px solid #111;
	padding: 1.3rem 2rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
#nav #logo-url {
	margin: auto;
	margin-left: 0;
}
#logo {
	width: 2rem;
	height: 3rem;
}
#nav a {
	color: #fcba03;
	text-decoration: none;
	margin: 0.8rem;
	transition: 0.5s;
}
#nav a:hover {
	color: #fff;
}
@media (max-width: 768px) {
	#nav {
		width: 100%;
	}
}
</style>
