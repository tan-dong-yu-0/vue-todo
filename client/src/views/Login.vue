<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Ref } from 'vue';

const email: Ref<string | null> = ref("");
const password: Ref<string | null> = ref("");

const url = "http://localhost:5000";

const router = useRouter();

async function handleLogin(e: Event) {
	e.preventDefault();
	await fetch(`${url}/login`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: email.value,
			password: password.value
		})
	})
		.then((res) => {
			if (res.status === 404) {
				alert("Email Does Not Exists!");
			}

			if (res.status === 401) {
				alert("Password Is Incorrect!");
			}

			if (res.status === 200) {
				alert("Login Successful!");
				router.push("/todo")
				return res.json();
			}
		})
		.then(() => {
			email.value ? email : "";
			password.value = "";
		})
		.catch((err) => {
			console.log("Error!", err);
		});
}

</script>

<template>
	<p class="text-h5 font-weight-bold text-center mt-12">
		Login
	</p>
	<div class="d-flex align-center justify-center">
		<v-form class="form-input" @submit.prevent="handleLogin">
			<v-text-field v-model="email" placeholder="Enter Your Email" label="Email"></v-text-field>
			<v-text-field v-model="password" type="password" placeholder="Enter Your Password" label="Password"></v-text-field>
			<v-btn class="submit-button" type="submit">Login</v-btn>
		</v-form>
	</div>
</template>

<style scoped>
.form-input {
	width: 400px;
}

.submit-button {
	width: 400px;
	padding: 10px;
	background-color: #1976d2;
	color: white;
	cursor: pointer;
}
</style>