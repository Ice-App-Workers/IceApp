<template>
	<div id="main-banner">
		<h1>Buy your icecream</h1>
	</div>
</template>

<script>
export default {
	name: "Banner",
};
</script>

<style scoped>
#main-banner {
	background: url("../assets/icecream.jpg") center / cover;
	background-position: 0 -250px;
	/*background-size: cover;*/
	height: 500px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
#main-banner h1 {
	color: #fff;
	text-align: center;
	background-color: #222;
	font-size: 3rem;
	padding: 0.5rem 0.8rem;
}
</style>
