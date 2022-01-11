<template>
	<div class="box">
		<el-form
			:model="regForm"
			status-icon
			:rules="rules"
			ref="regForm"
			label-width="120px"
			class="demo-ruleForm"
		>
			<el-form-item label="Login" prop="login">
				<el-input
					type="login"
					v-model="regForm.login"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="Email" prop="email">
				<el-input
					type="email"
					v-model="regForm.email"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item label="Hasło" prop="password">
				<el-input
					type="password"
					v-model="regForm.password"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="Potwierdź hasło" prop="checkPass">
				<el-input
					type="password"
					v-model="regForm.checkPass"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="Imię" prop="name">
				<el-input
					type="name"
					v-model="regForm.name"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="Numer telefonu" prop="phone_number">
				<el-input
					type="phone_number"
					v-model="regForm.phone_number"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('regForm')"
					>Submit</el-button
				>
				<el-button @click="resetForm('regForm')">Reset</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		var validateEmail = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Proszę wprowadzić email"));
			} else {
				callback();
			}
		};
		var validatePass = (rule, value, callback) => {
			if (value === "" || value.length < 4) {
				callback(new Error("Proszę wprowadzić hasło"));
			} else {
				if (this.regForm.checkPass !== "") {
					this.$refs.regForm.validateField("checkPass");
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Proszę wprowadzić hasło ponownie"));
			} else if (value !== this.regForm.password) {
				callback(new Error("Hasła są różne!"));
			} else {
				callback();
			}
		};
		var validateName = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Proszę wprowadzić imię"));
			} else {
				callback();
			}
		};
		var validateLogin = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Proszę wprowadzić nazwisko"));
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Proszę wprowadzić numer telefonu"));
			} else {
				callback();
			}
		};
		return {
			regForm: {
				email: "",
				password: "",
				name: "",
				lastname: "",
				phone_number: "",
			},
			rules: {
				email: [{ validator: validateEmail, trigger: "blur" }],
				password: [{ validator: validatePass, trigger: "blur" }],
				checkPass: [{ validator: validatePass2, trigger: "blur" }],
				name: [{ validator: validateName, trigger: "blur" }],
				login: [{ validator: validateLogin, trigger: "blur" }],
				phone_number: [{ validator: validatePhone, trigger: "blur" }],
			},
		};
	},
	methods: {
		async submitForm() {
			let isValidForm = await this.$refs.regForm.validate();
			if (isValidForm) {
				const result = await this.$auth.register({
					email: this.regForm.email,
					password: this.regForm.password,
					name: this.regForm.name,
					login: this.regForm.login,
					phone: this.regForm.phone_number,
				});
				if (result.status === true) {
					alert("Rejestracja przebiegła pomyślnie");
					this.$router.push({ name: "manageShop" });
				}
			}
		},
		resetForm(regForm) {
			this.$refs[regForm].resetFields();
		},
	},
};
</script>

<style>
.box {
	display: flex;
	justify-content: center;
	padding-top: 100px;
	min-height: 700px;
}
</style>
