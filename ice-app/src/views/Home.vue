<template>
	<div>
		<Banner />
		<div class="main-container">
			<h1>Find your icecreams</h1>
			<b-container class="flexcon">
				<b-card
					v-for="(shop, index) in shops"
					:key="index"
					:title="shop.shopName"
					img-src="https://www.mashed.com/img/gallery/popular-low-calorie-ice-creams-ranked-worst-to-best/l-intro-1601923515.jpg"
					img-alt="Image"
					img-top
					tag="article"
					style="max-width: 35rem"
					class="mb-2"
				>
					<b-card-text>
						{{ shop.city }} {{ shop.street }} {{ shop.number
						}}<br />
						{{ shop.description }}<br />

						<b-button
							v-b-modal="shop.providerId"
							@click="getOffer(shop.providerId)"
						>
							Zobacz smaki
						</b-button>
						<GmapMap
							:center="{ lat: shop.lat, lng: shop.lng }"
							:zoom="12"
							style="width: 100%; height: 400px"
						>
							<GmapMarker
								:position="{ lat: shop.lat, lng: shop.lng }"
								:clicable="true"
							></GmapMarker>
						</GmapMap>
						<b-modal
							size="xl"
							:id="shop.providerId"
							:title="shop.shopName"
							:hide-footer="true"
						>
							<h1>{{ shop.shopName }} ice cream flavours</h1>
							<b-table
								striped
								hover
								:items="flavours"
								:fields="fields"
							>
								<template #cell(kind)="scope">
									{{ getNumberOfKinds(scope.item) }}
								</template>
								<template
									#cell(action)="scope"
									v-if="!isDisabled(shop.providerId)"
								>
									<b-button
										variant="primary"
										@click="addKind(scope.item)"
									>
										Add kind
									</b-button>
									<b-button
										variant="danger"
										@click="removeKind(scope.item)"
									>
										Remove kind
									</b-button>
								</template>
								<template #cell(action)="" v-else>
									<span
										id="disabled-wrapper"
										class="d-inline-block"
										tabindex="0"
									>
										<b-button
											variant="primary"
											style="pointer-events: none"
											disabled
										>
											Add kind
										</b-button>
										<b-button
											variant="danger"
											style="pointer-events: none"
											disabled
										>
											Remove kind
										</b-button>
									</span>
									<b-tooltip target="disabled-wrapper"
										>Remove from cart other shop
										icecreams</b-tooltip
									>
								</template>
							</b-table>
						</b-modal>
					</b-card-text>
				</b-card>
			</b-container>
		</div>
	</div>
</template>

<script>
import Banner from "../components/Banner.vue";

export default {
	data() {
		return {
			shops: [],
			fields: ["iceTaste", "kindPrice", "kind", "action"],
			flavours: [],
			cart: [],
			price:null
		};
	},
	name: "Home",
	components: {
		Banner,
	},
	methods: {
		async getShops() {
			const result = await this.$shop.getShops();
			if (result.status === true) {
				this.shops = result.data.data;
			}
		},
		addToCart(item) {
			this.cart.push(item);
			localStorage.setItem("cart", JSON.stringify(this.cart));
		},
		async getOffer(providerId) {
			const result = await this.$icecream.getOffer(providerId);
			if (result.status === true) {
				this.flavours = result.data.data;
				console.log(this.flavours);
				console.log(providerId);
			}
		},
		getNumberOfKinds(item) {
			const kind = this.cart.find(
				(cartItem) =>
					cartItem.iceTaste === item.iceTaste &&
					cartItem.providerId === item.providerId,
			);
			return kind ? kind.kind : 0;
		},
		addKind(item) {
			const isInCart = this.cart.find(
				(cartItem) => cartItem.iceTaste === item.iceTaste,
			);
			if (isInCart) {
				isInCart.kind++;
			} else {
				item.kind = 1;
				this.cart.push(item);
			}
			localStorage.setItem("cart", JSON.stringify(this.cart));
		},
		removeKind(item) {
			const isInCart = this.cart.find(
				(cartItem) => cartItem.iceTaste === item.iceTaste,
			);
			if (isInCart.kind !== 0) {
				isInCart.kind--;
				if (isInCart.kind === 0) {
					this.cart.splice(item);
				}
			}
			localStorage.setItem("cart", JSON.stringify(this.cart));
		},
		isDisabled(id) {
			if (this.cart != "") {
				return id !== this.cart[0].providerId;
			}
		},
	},
	created() {
		this.getShops();
		const storedCart = JSON.parse(localStorage.getItem("cart"));
		if (storedCart) {
			this.cart = storedCart;
		}
	},
};
</script>
<style scoped>
.flexcon {
	padding-top: 50px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	row-gap: 40px;
}
</style>
