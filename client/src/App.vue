<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>

<template>
  <v-app>
    <v-main>
      <!-- <Navbar /> -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>