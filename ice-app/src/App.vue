<template>
	<div>
		<Navbar :logo="logo_src" :alt="app_name" />
		<router-view />
		<Footer />
	</div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { mapGetters, mapActions } from "vuex";
import cookieHelper from "./helpers/cookieHelper";

export default {
	components: {
		Navbar,
		Footer,
	},
	data() {
		return {
			logo_src: "./assets/icecream.png",
			app_name: "Buy your iceream",
		};
	},
	computed: {
		...mapGetters(["isLogged"]),
		hasToken() {
			return cookieHelper.hasSessionCookie();
		},
	},
	methods: {
		...mapActions(["destroySession"]),
		restoreSession() {
			this.$router.push();
		},
	},
	watch: {
		user(newVal) {
			if (newVal !== null) {
				this.restoreSession(newVal);
				console.log(newVal);
			} else {
				this.$router.push({ name: "Login" });
			}
		},
		hasToken(newVal) {
			if (!newVal) this.destroySession();
		},
	},
};
</script>

<style>
* {
	font-family: Helvetica;
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
.main-container {
	margin: 2rem;
	min-height: 15rem;
}
h1 {
	text-align: center;
	font-size: 2rem;
	margin-bottom: 1.2rem;
	color: #222;
}
</style>
