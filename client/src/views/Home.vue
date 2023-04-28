<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';

interface User {
	_id: string;
	email: string;
	password: string;
}

// const emails = ref("");

const users: Ref<User[]> = ref([]);

const url = "http://localhost:5000";

const router = useRouter();

onMounted(async () => {
	await fetch(`${url}/`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then((res) => res.json())
		.then((data) => {
			users.value = data
			console.log("data", data)
			// console.log("User Email frontend", data.email)
		})
		.catch((err) => console.log(err));
})

async function signOut() {
	await fetch(`${url}/signout`, {
		method: "GET",
		credentials: "include"
	})
		.then((res) => {
			if (res.status === 200) {
				// window.location.reload();
				alert("Logout Successful!");
				router.push("/login");
			}
		})
		.catch((err) => {
			console.log("Error!", err);
		});
}

</script>

<template>
	<div>
		<h3 class="text-center mt-10 mb-10">
			Home Page!
		</h3>
		<div class="d-flex justify-space-evenly">

			<router-link class="router-link" to="/login">
				<v-btn>Login</v-btn>
			</router-link>
			<router-link class="router-link" to="/register">
				<v-btn>Register</v-btn>
			</router-link>
		</div>
	</div>
</template>

<style scoped>
.submit-button {
	display: flex;
	justify-content: center;
	/* align-items: center; */
}

.router-link {
	text-decoration: none;
}
</style>