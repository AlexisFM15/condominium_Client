<script setup lang="ts">
const props = defineProps<{
  label: string
  value: string | number
  subtext?: string
}>()
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 h-full flex flex-col justify-between shadow-sm">

    <!-- LABEL -->
    <p class="text-xs text-gray-500">
      {{ label }}
    </p>

    <!-- NÚMERO GRANDE -->
    <div class="flex items-center justify-center flex-1">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
        {{ value }}
      </h2>
    </div>

    <!-- OPCIONAL -->
    <p v-if="subtext" class="text-xs text-center text-gray-400">
      {{ subtext }}
    </p>

  </div>
</template>
