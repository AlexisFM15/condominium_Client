<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import './charts/ChartjsConfig';
import { useAuthStore } from './stores/authStore';


const authStore = useAuthStore()
computed(() => { console.log(authStore.user) })
onMounted(async () => {
  await authStore.getMe();
});
</script>

<template>
  <router-view />


</template>

<style scoped></style>
