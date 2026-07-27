<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const password = ref('')
const confirmPassword = ref('')

const loading = ref(false)

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const passwordRules = computed(() => ({
  length: password.value.length >= 8,
  upper: /[A-Z]/.test(password.value),
  lower: /[a-z]/.test(password.value),
  number: /\d/.test(password.value),
}))

const passwordsMatch = computed(() => {
  return (
    password.value.length > 0 &&
    password.value === confirmPassword.value
  )
})

const valid = computed(() => {
  return (
    passwordRules.value.length &&
    passwordRules.value.upper &&
    passwordRules.value.lower &&
    passwordRules.value.number &&
    passwordsMatch.value
  )
})

const changePassword = async () => {
  if (!valid.value) return

  loading.value = true

  try {
   // await authStore.changeDefaultPassword(password.value)
  } finally {
    loading.value = false
  }
}
</script>

<template>
<div
v-if="userStore.showWelcomeModal"
class="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">

<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-8">

<h1 class="text-3xl font-bold text-center">
Bienvenido
</h1>

<p class="text-center mt-4 text-gray-600 dark:text-gray-300">
Esta cuenta fue creada con una contraseña temporal.
</p>

<p class="text-center mb-8 text-gray-600 dark:text-gray-300">
Por seguridad debes cambiarla antes de continuar.
</p>

<input
v-model="password"
:type="showPassword ? 'text':'password'"
placeholder="Nueva contraseña"
class="w-full border rounded-xl p-3 mb-4"
/>

<input
v-model="confirmPassword"
:type="showConfirmPassword ? 'text':'password'"
placeholder="Confirmar contraseña"
class="w-full border rounded-xl p-3"
/>

<div class="mt-6 text-sm">

<p :class="passwordRules.length ? 'text-green-600':'text-gray-500'">
✓ 8 caracteres
</p>

<p :class="passwordRules.upper ? 'text-green-600':'text-gray-500'">
✓ Una mayúscula
</p>

<p :class="passwordRules.lower ? 'text-green-600':'text-gray-500'">
✓ Una minúscula
</p>

<p :class="passwordRules.number ? 'text-green-600':'text-gray-500'">
✓ Un número
</p>

<p :class="passwordsMatch ? 'text-green-600':'text-red-500'">
✓ Las contraseñas coinciden
</p>

</div>

<button
@click="changePassword"
:disabled="!valid || loading"
class="mt-8 w-full bg-blue-600 text-white rounded-xl py-3 disabled:bg-gray-400">

Cambiar contraseña

</button>

</div>

</div>
</template>
