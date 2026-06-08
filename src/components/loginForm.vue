<template>
  <div class="max-h-screen flex items-center justify-center">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>

      <form @submit.prevent="handlerLogin" class="space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-sm mb-1">Correo</label>
          <input
            v-model="credencials.email"
            type="email"
            placeholder="correo@ejemplo.com"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm mb-1">Contraseña</label>
          <input
            v-model="credencials.password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Error -->

        <p class="text-red-500 text-sm" v-if="authStore.message !== 'Access succeed'">
          {{ authStore.message }}
        </p>

        <!-- Button -->
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          <span>Entrar</span>
        </button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import type { login } from '@/typings/auth'
import { ref } from 'vue'

const credencials = ref<login>({
  email: '',
  password: '',
})

const authStore = useAuthStore()

const handlerLogin = async () => {
  await authStore.login(credencials.value)
  if (authStore.message === 'Access succeed') {
    router.push('/')
  }
}
</script>
<style></style>
