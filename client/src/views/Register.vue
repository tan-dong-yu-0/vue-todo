<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';

const email: Ref<string | null> = ref("");
const password: Ref<string | null> = ref("");

const url = "http://localhost:5000";

const router = useRouter();

async function handleRegister(e: Event) {
	e.preventDefault();
	await fetch(`${url}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: email.value,
			password: password.value
		})
	})
		.then((res) => {
			if (res.status === 409) {
				alert("Email already exists!");
			}
			return res.json();
		})
		.then(() => {
			router.push("/")
			email.value = "";
			password.value = "";
		})
		.catch((err) => {
			console.log("Error!", err);
		});
}

</script>

<template>
	<p class="text-h5 font-weight-bold text-center mt-12">
		Register
	</p>
	<div class="d-flex align-center justify-center">
		<v-form class="form-input" @submit.prevent="handleRegister">
			<v-text-field v-model="email" placeholder="Enter Your Email" label="Email"></v-text-field>
			<v-text-field v-model="password" placeholder="Enter Your Password" label="Password"></v-text-field>
			<v-btn class="submit-button" type="submit">Register</v-btn>
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