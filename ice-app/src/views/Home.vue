<template>
	<div>
		<Banner />
		<div class="main-container">
			<h1>Find your icecreams</h1>
			<h2>Choose your city:</h2>
			{{ shops.data }}
		</div>
	</div>
</template>

<script>
import Banner from "../components/Banner.vue";
export default {
	data() {
		return {
			shops: [],
		};
	},
	name: "Home",
	components: {
		Banner,
	},
	methods: {
		async getShops() {
			const result = await this.$user.getShops();
			if (result.status === true) {
				this.shops = result.data;
				console.log(this.shops.data.name);
			}
		},
	},
	mounted() {
		this.getShops();
	},
};
</script>
