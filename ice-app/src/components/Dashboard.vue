<template>
	<div id="icecream-table"></div>
</template>

<script>
export default {
	name: "Dashboard",
	data() {
		return {
			icecreams: null,
			icecream_id: null,
			status: [],
			msg: null,
		};
	},
};
</script>

<style scoped>
#icecream-table {
	max-width: 90rem;
	min-height: 600px;
	margin: 0 auto;
}
#icecream-table-heading,
#icecream-table-rows,
.icecream-table-row {
	display: flex;
	flex-wrap: wrap;
}
#icecream-table-heading {
	font-weight: bold;
	padding: 1.5rem;
	border-bottom: 3px solid #333;
}
#icecream-table-heading div,
.icecream-table-row div {
	width: 19%;
}
.icecream-table-row {
	width: 100%;
	padding: 1rem;
	border: 1px solid #ccc;
}
#icecream-table-heading .order-id,
.icecream-table-row .order-number {
	width: 5%;
}
select {
	padding: 0.8rem 0.4rem;
}
.delete-btn {
	background-color: #222;
	color: #fcba03;
	font-weight: bold;
	border: 2px solid #222;
	padding: 0.8rem;
	font-size: 0.9rem;
	margin: 0 auto;
	cursor: pointer;
	transition: 0.5s;
}
.delete-btn:hover {
	background-color: transparent;
	color: #222;
}
</style>
