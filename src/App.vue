<script setup lang="ts">
import { onMounted, ref } from 'vue';
import './charts/ChartjsConfig';
import { useAuthStore } from './stores/authStore';


const authStore = useAuthStore()
// const sidebarOpen = ref(false)
// const sidebarExpanded = ref(false)
// import { onMounted } from 'vue';
// import { useUserStore } from './stores/userStore';
// import { useAuthStore } from './stores/authStore';
// import LoginForm from './components/loginForm.vue';


// const userStore = useUserStore();
// const authStore = useAuthStore()

// const newUser = {
//   name: "Laura",
//   lastname: "Matos",
//   phone: "8298527994",
//   email: "laura1234@gmail.com",
//   password: "$2b$10$UP69g4G350HioUehYS.YuOZ/jnBzLgSmq7vcIlaIPYJKcpTPkumfS",
//   role: "Administrador",
//   apartmentId: 6
// }

// const updateUser = {
//   id: "aa6f3f1a-e8eb-4a00-b3d1-3654ded47e32",
//   name: "Alexis",
//   // lastname: "Matos",
//   // phone: "5135135135",
//   // email: "alexis1@gmail.com",
//   // password: "$2b$10$UP69g4G350HioUehYS.YuOZ/jnBzLgSmq7vcIlaIPYJKcpTPkumfS",
//   role: "Administrador",
//   apartmentId: 5
// }

// const logins = {
//   email: 'alexis1@gmail.com',
//   password: '1234'
// }

onMounted(async () => {
  await authStore.getMe();
});
</script>

<template>
  <router-view />


</template>

<style scoped></style>
