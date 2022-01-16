import requestSender from "../helpers/requestSender.js";

export default function (Vue) {
	Vue.shop = {
		async getShops() {
			const result = await requestSender.send({
				method: "put",
				url: `https://localhost:44385/GetShops`,
			});
			return result;
		},
		async getShop(id) {
			const result = await requestSender.send({
				method: "put",
				url: `https://localhost:44385/GetShopsById?providerId=${id}`,
			});
			return result;
		},
	};
	Object.defineProperties(Vue.prototype, {
		$shop: {
			get: () => Vue.shop,
		},
	});
}
