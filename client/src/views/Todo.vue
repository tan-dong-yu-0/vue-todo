<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'

interface Todo {
  _id: string
  title: string
  description: string
  userEmail: string
}

const todos: Ref<Todo[]> = ref([])
const title: Ref<string | null> = ref("")
const description: Ref<string | null> = ref("")
const userEmail: Ref<string | null> = ref("")

const url = "http://localhost:5000"

const router = useRouter();

onMounted(async () => {
  await fetch(`${url}/todo`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((data) => {
      todos.value = data.TodoList
      userEmail.value = data.userEmail
    })
    .catch((err) => {
      console.log("Error!", err)
    })
})


async function addTodo(e: Event) {
  e.preventDefault()
  await fetch(`${url}/todo`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title.value,
      description: description.value,
      userEmail: userEmail.value
    })
  })
    .then((res) => res.json())
    .then((data) => {
      todos.value.unshift(data)
      title.value = ""
      description.value = ""
    })
    .catch((err) => {
      console.log("Error!", err)
    })
}

async function removeTodo(item: any, i: number) {
  await fetch(`${url}/todo/${item._id}`, {
    method: "DELETE"
  }).then(() => {
    todos.value.splice(i, 1)
  })
    .catch((err) => {
      console.log("Error!", err)
    })
}

async function signOut() {
  await fetch(`${url}/signout`, {
    method: "GET",
    credentials: "include"
  })
    .then((res) => {
      if (res.status === 200) {
        // window.location.reload();
        alert("Logout Successful!");
        router.push("/");
      }
    })
    .catch((err) => {
      console.log("Error!", err);
    });
}

</script>

<template>
  <div class="d-flex justify-center">
    <v-btn @click="signOut">Sign Out</v-btn>
  </div>
  <div class="main">
    <h3>Todo List</h3>

    <v-form @submit.prevent>
      <v-text-field v-model="title" label="Enter Title">
      </v-text-field>
      <v-text-field v-model="description" label="Enter Description">
      </v-text-field>
      <v-btn class="submit-button" @click="addTodo">Add Todo</v-btn>
    </v-form>
    <div class="todo-container">
      <h3>{{ userEmail }}</h3>
      <ul>
        <li v-for="(todo, index) in todos" :key="todo._id">
          <div class="todo">
            <span>{{ index }}</span>
            <span>{{ todo.userEmail }}</span>
            <span class="todo-name">{{ todo.title }}</span>
            <span class="todo-description">{{ todo.description }}</span>
          </div>
          <button class="delete-btn" @click="removeTodo(todo, index)">DELETE TODO</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.main {
  margin: auto;
  margin-top: 3rem;
  max-width: 400px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.input {
  width: 100%;
  padding: 10px;
}

.submit-button {
  width: 400px;
  padding: 10px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
}

.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.todo-container ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.todo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  max-width: 250px;
}

.todo-name {
  font-size: 18px;
  font-weight: bold;
}

.todo-description {
  max-width: 70%;
  font-size: 14px;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
}
</style>
