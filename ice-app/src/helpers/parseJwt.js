export default function parseJwt(token) {
	const tokenPayload = token.split(".")[1];
	const base64 = tokenPayload.replace(/-/g, "+").replace(/_/g, "/");
	const content = decodeURIComponent(
		Array.prototype.map
			.call(
				atob(base64),
				(c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`,
			)
			.join(""),
	);
	return JSON.parse(content);
}
