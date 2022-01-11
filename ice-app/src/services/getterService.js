import requestSender from "../helpers/requestSender.js";

export default function (Vue) {
	Vue.user = {
		async getShops() {
			const result = await requestSender.send({
				method: "put",
				url: `https://localhost:44385/GetShops`,
			});
			return result;
		},
	};

	Object.defineProperties(Vue.prototype, {
		$user: {
			get: () => Vue.user,
		},
	});
}
