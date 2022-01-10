<template>
	<div>
		<Banner />
		<div class="main-container">
			<h1>Find your icecreams</h1>
			<h2>Choose your city:</h2>
		</div>
	</div>
</template>

<script>
import Banner from "../components/Banner.vue";
export default {
	name: "Home",
	components: {
		Banner,
	},
};
</script>
