<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ payments: any[] }>(), {
  payments: () => []
})

const total = computed(() =>
  props.payments.reduce((acc, p) => acc + p.amount, 0)
)
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
    <div class="p-4 font-bold text-gray-800 dark:text-gray-100">
      Últimos Pagos
    </div>

    <table class="w-full text-sm">
      <tbody>
        <tr v-for="(p, i) in payments" :key="i" class="border-t dark:border-gray-700">
          <td class="px-4 py-2"><span class="block max-w-xs wrap-break-words whitespace-normal">{{ p.description
          }}</span>
          </td>
          <td class="px-4 py-2">{{ p.movementType }}</td>
          <td class="px-4 py-2">{{ p.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
