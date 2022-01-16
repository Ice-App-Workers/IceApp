import requestSender from "../helpers/requestSender.js";

export default function (Vue) {
	Vue.icecream = {
		async addTaste(name) {
			console.log("dupa");
			const result = await requestSender.send({
				method: "put",
				url: `https://localhost:44385/AddTaste?tasteName=${name}`,
			});
			return result;
		},
		async addToOffer(id, name, price) {
			const result = await requestSender.send({
				method: "put",
				url: `https://localhost:44385/AddToOffer?providerId=${id}&tasteName=${name}&kindPrice=${price}`,
			});
			return result;
		},
		async removeFromOffer(id, name) {
			const result = await requestSender.send({
				method: "put",
				url: `https://localhost:44385/RemoveFromOffer?providerId=${id}&tasteName=${name}`,
			});
			return result;
		},
		async getOffer(id) {
			const result = await requestSender.send({
				method: "put",
				url: `https://localhost:44385/GetOffer?providerId=${id}`,
			});
			return result;
		},
		async getTastes() {
			const result = await requestSender.send({
				method: "put",
				url: `https://localhost:44385/GetTastes`,
			});
			return result;
		},
	};

	Object.defineProperties(Vue.prototype, {
		$icecream: {
			get: () => Vue.icecream,
		},
	});
}
