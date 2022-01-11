<template>
	<div class="box">
		<el-form
			:model="loginForm"
			status-icon
			:rules="rules"
			ref="loginForm"
			label-width="120px"
			class="demo-ruleForm"
		>
			<el-form-item label="Email" prop="email">
				<el-input
					type="email"
					v-model="loginForm.email"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="Password" prop="password">
				<el-input
					type="password"
					v-model="loginForm.password"
					autocomplete="off"
				>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('loginForm')">
					Sign in
				</el-button>
				<el-button @click="resetForm('loginForm')"> Reset </el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		var validateEmail = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Please input the e-mail"));
			} else {
				callback();
			}
		};
		var validatePassword = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Please input the password"));
			} else {
				callback();
			}
		};
		return {
			loginForm: {
				email: "",
				password: "",
			},
			rules: {
				email: [{ validator: validateEmail, trigger: "blur" }],
				password: [{ validator: validatePassword, trigger: "blur" }],
			},
		};
	},
	methods: {
		async submitForm() {
			await this.$auth.logIn({
				email: this.loginForm.email,
				password: this.loginForm.password,
			});
			this.$router.push({ name: "mainPage" });
		},
		resetForm(loginForm) {
			this.$refs[loginForm].resetFields();
		},
	},
};
</script>

<style>
.box {
	display: flex;
	justify-content: center;
	padding-top: 250px;
	min-height: 700px;
}
</style>
