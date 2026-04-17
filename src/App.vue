<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from './stores/userStore';
import { useAuthStore } from './stores/authStore';

const userStore = useUserStore();
const authStore = useAuthStore()

const newUser = {
  name: "Laura",
  lastname: "Matos",
  phone: "8298527994",
  email: "laura1234@gmail.com",
  password: "$2b$10$UP69g4G350HioUehYS.YuOZ/jnBzLgSmq7vcIlaIPYJKcpTPkumfS",
  role: "Administrador",
  apartmentId: 6
}

const updateUser = {
  id: "aa6f3f1a-e8eb-4a00-b3d1-3654ded47e32",
  name: "Alexis",
  // lastname: "Matos",
  // phone: "5135135135",
  // email: "alexis1@gmail.com",
  // password: "$2b$10$UP69g4G350HioUehYS.YuOZ/jnBzLgSmq7vcIlaIPYJKcpTPkumfS",
  role: "Administrador",
  apartmentId: 5
}

const logins = {
  email: 'alexis1@gmail.com',
  password: '1234'
}

onMounted(async () => {
  await userStore.fetchUser();
});
</script>

<template>
  <div>

    <span v-bind="userStore.users">
      {{ userStore.users }}
    </span>

    <button @click.prevent="userStore.deleteUser({ id: '668ce6ee-1bf6-46bd-878e-866de074562a' })">delete User </button>
    <button @click.prevent="userStore.createUserS(newUser)"> create </button>
    <button @click.prevent="userStore.getOne({ id: 'aa6f3f1a-e8eb-4a00-b3d1-3654ded47e32' })">get One </button>
    <button @click.prevent="userStore.updateUser(updateUser)">update User </button>
    <button @click.prevent="authStore.login(logins)">login</button>
    <button @click.prevent="authStore.logout()">logout</button>

  </div>

</template>

<style scoped></style>
