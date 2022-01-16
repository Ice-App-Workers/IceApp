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
				<b-card tag="article" style="width: 100rem" class="mb-2">
					<b-card-text>
						<h1>Shop details:</h1>
						<b-form v-if="editShow">
							<div>
								<div style="margin-top: 50px">
									<label for="name"> Shop name </label>
									<b-form-input
										id="name"
										v-model="name"
										placeholder="Enter your shop name"
									/>
									<label for="city"> City </label>
									<b-form-input
										id="city"
										v-model="city"
										placeholder="Enter your city"
									/>
									<label for="street"> Street </label>
									<b-form-input
										id="street"
										v-model="street"
										placeholder="Enter your street"
									/>
									<label for="number"> Local number </label>
									<b-form-input
										id="number"
										v-model="number"
										placeholder="Enter your phone number"
									/>
									<label for="description">
										Shop description
									</label>
									<b-form-input
										id="description"
										v-model="description"
										placeholder="Enter your description"
									/>

									<div style="margin-top: 50px">
										<b-button
											type="submit"
											variant="primary"
											>Submit</b-button
										>
										<b-button type="reset" variant="danger"
											>Reset</b-button
										>
										<b-button
											variant="info"
											@click="hide()"
										>
											Close
										</b-button>
									</div>
								</div>
							</div>
						</b-form>
					</b-card-text>
					<div v-if="!editShow">
						<h2>Shop name: {{ provider[0].shopName }}</h2>
						<h2>City:{{ provider[0].city }}</h2>
						<h2>Street:{{ provider[0].street }}</h2>
						<h2>Local number:{{ provider[0].number }}</h2>
						<h2>Shop description:{{ provider[0].description }}</h2>
						<b-button
							variant="primary"
							@click="show()"
							v-show="!editShow"
						>
							Edit your data
						</b-button>
					</div>

					<div style="width: 25%; margin: auto">
						<h1>Add Taste:</h1>
						<b-form-input
							v-model="newTaste"
							style="margin: auto; margin-bottom: 25px"
							placeholder="Put new taste name"
						></b-form-input>
						<b-button
							variant="primary"
							style="margin-bottom: 25px"
							@click="addTaste()"
						>
							Add new taste
						</b-button>
						<h1>Add taste to your offer:</h1>
						<b-form-select
							v-model="newOfferTaste"
							:options="tastes"
							style="width: 100%"
							placeholder="Select taste to add"
						></b-form-select>
						<b-form-input
							type="number"
							step="0.01"
							min-value="0.00"
							v-model="kindPrice"
							style="margin: auto; margin-bottom: 25px"
						></b-form-input>
						<b-button
							variant="primary"
							style="margin-bottom: 25px"
							@click="addToOffer()"
						>
							Add new taste to offer
						</b-button>
					</div>
					<h1>Your offer:</h1>
					<b-table striped hover :items="offer" :fields="offerFields">
						<template #cell(action)="scope">
							<b-button
								@click="removeFromOffer(scope.item.iceTaste)"
								>Remove taste from offer</b-button
							>
						</template>
					</b-table>
				</b-card>
			</div>
		</template>
	</b-jumbotron>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			tastes: [],
			offer: [],
			offerFields: [
				{
					key: "iceTaste",
					sortable: true,
					label: "Taste",
				},
				{
					key: "kindPrice",
					sortable: false,
					label: "Price",
				},
				{
					key: "action",
					label: "Akcja",
					sortable: false,
				},
			],
			provider: [],
			editShow: false,
			newTaste: "",
			newOfferTaste: "",
			kindPrice: null,
		};
	},
	computed: {
		...mapGetters(["providerId"]),
	},
	methods: {
		show() {
			this.editShow = true;
		},
		hide() {
			this.editShow = false;
		},
		async getProvider() {
			console.log("dupa");
			const result = await this.$shop.getShop(this.providerId);
			if (result.status === true) {
				this.provider = result.data.data;
				console.log(this.provider);
			}
		},
		async addTaste() {
			const result = await this.$icecream.addTaste(this.newTaste);
			if (result.status === true) {
				alert("Taste added successfully");
			}
			this.getTastes();
		},
		async getTastes() {
			const result = await this.$icecream.getTastes();
			if (result.status === true) {
				this.tastes = result.data.data.map((x) => x.iceTaste);
				console.log(this.tastes);
			}
		},
		async getOffer() {
			const result = await this.$icecream.getOffer(this.providerId);
			if (result.status === true) {
				this.offer = result.data.data;
				console.log(this.offer);
			}
		},
		async addToOffer() {
			const result = await this.$icecream.addToOffer(
				this.providerId,
				this.newOfferTaste,
				this.kindPrice,
			);
			if (result.status === true) {
				alert("Taste added to offer successfully");
			}
			this.getOffer();
		},
		async removeFromOffer(tasteName) {
			const result = await this.$icecream.removeFromOffer(
				this.providerId,
				tasteName,
			);
			if (result.status === true) {
				alert("Taste removed from offer successfully");
			}
			this.getOffer();
		},
	},
	mounted() {
		this.getProvider();
		this.getTastes();
		this.getOffer();
	},
};
</script>

<style>
h2 {
	color: black;
}
label {
	color: black;
}
.table {
	width: 75%;
	margin: auto;
}
</style>
