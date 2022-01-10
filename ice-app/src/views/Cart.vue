<template>
	<div class="main-container">
		<h1>Your cart:</h1>
		<Dashboard />
	</div>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";
export default {
	name: "Cart",
	components: {
		Dashboard,
	},
};
</script>
