<template>
	<div>
		<b-jumbotron
			bg-variant="primary"
			text-variant="white"
			border-variant="dark"
			style="min-height: 650px; padding-top: 50px"
		>
			<template #header>Welcome in Manager Panel</template>
			<template #lead>
				<div class="flexbox">
					You can register or manage your company
				</div>
				<hr class="my-4" />
				<div class="flexbox" style="margin-top: 50px">
					<b-button variant="dark" size="lg" to="/register-shop">
						Register your shop
					</b-button>
					<b-button
						variant="dark"
						size="lg"
						to="/login-to-shop"
						v-if="!isLogged"
					>
						Login to your shop
					</b-button>
					<b-button variant="dark" size="lg" to="/manage-shop" v-else>
						Manage your shop
					</b-button>
				</div>
			</template>
		</b-jumbotron>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters(["isLogged"]),
	},
};
</script>

<style>
.flexbox {
	display: flex;
	justify-content: center;
	gap: 6rem;
}
</style>
