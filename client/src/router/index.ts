import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue"
import Todo from "@/views/Todo.vue";
import Login from '@/views/Login.vue';
import Register from "@/views/Register.vue"

const routes = [
	{ path: '/', name: "Home", component: Home },
	{ path: '/todo', name: "Todo", component: Todo },
	{ path: '/login', name: "Login", component: Login },
	{ path: '/register', name: "Register", component: Register }
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router