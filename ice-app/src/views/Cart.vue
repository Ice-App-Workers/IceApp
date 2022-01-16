<template>
	<div class="main-container">
		<h1>Your cart:</h1>
		<b-table striped hover :items="cartItems" :fields="fields"> </b-table>
		<b-button>Send you order</b-button>
		<Dashboard />
	</div>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";
export default {
	data() {
		return {
			cartItems: [],
			fields: [
				{
					key: "iceTaste",
					sortable: false,
					label: "Taste",
				},
				{
					key: "kind",
					sortable: false,
					label: "Kinds",
				},
				{
					key: "kindPrice",
					label: "Price",
					sortable: false,
				},
			],
		};
	},
	name: "Cart",
	components: {
		Dashboard,
	},
	methods: {
		getCart() {
			this.cartItems = JSON.parse(localStorage.getItem("cart"));
		},
	},
	mounted() {
		this.getCart();
	},
};
</script>
