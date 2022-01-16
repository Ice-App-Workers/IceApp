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
			<el-form-item label="Email" prop="email">
				<el-input
					type="email"
					v-model="regForm.email"
					autocomplete="off"
				></el-input>
			</el-form-item>

			<el-form-item label="Paossword" prop="password">
				<el-input
					type="password"
					v-model="regForm.password"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="Repeat password" prop="checkPass">
				<el-input
					type="password"
					v-model="regForm.checkPass"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="Shop name" prop="name">
				<el-input
					type="name"
					v-model="regForm.name"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="Phone number" prop="phone_number">
				<el-input
					type="phone_number"
					v-model="regForm.phone_number"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="City" prop="city">
				<el-input
					type="city"
					v-model="regForm.city"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="Street" prop="street">
				<el-input
					type="street"
					v-model="regForm.street"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="Local number" prop="number">
				<el-input
					type="number"
					v-model="regForm.number"
					autocomplete="off"
				></el-input>
			</el-form-item>
			<el-form-item label="Postal code" prop="code">
				<el-input
					type="code"
					v-model="regForm.code"
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
				callback(new Error("Please input email"));
			} else {
				callback();
			}
		};
		var validatePass = (rule, value, callback) => {
			if (value === "" || value.length < 4) {
				callback(
					new Error("Please input password longer than 4 characters"),
				);
			} else {
				if (this.regForm.checkPass !== "") {
					this.$refs.regForm.validateField("checkPass");
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Please input password again"));
			} else if (value !== this.regForm.password) {
				callback(new Error("Passwords are different!"));
			} else {
				callback();
			}
		};
		var validateName = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Please input shop name"));
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Please input phone number"));
			} else {
				callback();
			}
		};
		var validateCity = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Please input the city"));
			} else {
				callback();
			}
		};
		var validateStreet = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Please input the street"));
			} else {
				callback();
			}
		};
		var validateNumber = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Please input the local number"));
			} else {
				callback();
			}
		};
		var validatePostal = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("Please input the postal code"));
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
				city: "",
				street: "",
				number: "",
				code: "",
			},
			rules: {
				email: [{ validator: validateEmail, trigger: "blur" }],
				password: [{ validator: validatePass, trigger: "blur" }],
				checkPass: [{ validator: validatePass2, trigger: "blur" }],
				name: [{ validator: validateName, trigger: "blur" }],
				phone_number: [{ validator: validatePhone, trigger: "blur" }],
				city: [{ validator: validateCity, trigger: "blur" }],
				street: [{ validator: validateStreet, trigger: "blur" }],
				number: [{ validator: validateNumber, trigger: "blur" }],
				code: [{ validator: validatePostal, trigger: "blur" }],
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
					city: this.regForm.city,
					street: this.regForm.street,
					number: this.regForm.number,
					postalcode: this.regForm.code,
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
