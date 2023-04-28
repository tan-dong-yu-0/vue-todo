<script setup lang="ts">
import { ref } from 'vue';

// const LoginOrRegister = ref("Login")

// function handleClick() {
// 	if (LoginOrRegister.value === "Login") {
// 		LoginOrRegister.value = "Todo"
// 	} else {
// 		LoginOrRegister.value = "Login"
// 	}
// }

</script>
<template>
	<div class="d-flex justify-space-evenly">
		<router-link class="router-link" to="/">
			<v-btn>Home</v-btn>
		</router-link>
		<router-link class="router-link" to="/todo">
			<v-btn>Todo</v-btn>
		</router-link>
		<router-link class="router-link" to="/login">
			<v-btn>Login</v-btn>
		</router-link>
		<router-link class="router-link" to="/register">
			<v-btn>Register</v-btn>
		</router-link>
	</div>
</template>

<style scoped>
.router-link {
	text-decoration: none;
}
</style>