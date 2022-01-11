<template>
	<b-jumbotron
		bg-variant="primary"
		text-variant="white"
		border-variant="dark"
		style="min-height: 650px; padding-top: 50px"
	>
		<template #header>Manage your shop</template>
		<template #lead>
			<div class="flexbox">
				You can change your shop details and add ice cream flavours
			</div>
			<hr class="my-4" />
			<div class="flexbox" style="margin-top: 50px">
				<b-form>
					<h1>Details:</h1>
					<div class="flexbox" style="margin-top: 50px">
						<b-form-input
							v-model="name"
							placeholder="Enter your shop name"
						/>
						<b-form-input
							v-model="city"
							placeholder="Enter your city"
						/>
						<b-form-input
							v-model="street"
							placeholder="Enter your street"
						/>
						<b-form-input
							v-model="number"
							placeholder="Enter your phone number"
						/>
						<b-form-input
							v-model="description"
							placeholder="Enter your description"
						/>
					</div>
					<div class="flexbox" style="margin-top: 50px">
						<b-button type="submit" variant="info">Submit</b-button>
						<b-button type="reset" variant="danger">Reset</b-button>
					</div>
				</b-form>
			</div>
			<hr class="my-4" />
			<div class="table" style="margin-top: 50px">
				<h1>Flavours:</h1>
				<b-table striped hover :items="icecreams"></b-table>
			</div>
		</template>
	</b-jumbotron>
</template>

<script>
export default {
	data() {
		return {
			icecreams: [
				{ Flavours: "Vanilla", Price: "1$" },
				{ Flavours: "Bubblegum", Price: "1.20$" },
				{ Flavours: "Chocolate", Price: "1$" },
				{ Flavours: "Coco", Price: "1.20$" },
			],
		};
	},
};
</script>

<style>
.table {
	width: 75%;
	margin: auto;
}
</style>
