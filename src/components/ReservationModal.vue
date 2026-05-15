<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
  date: Date | null
}>()

const emit = defineEmits(['close', 'confirm'])

const start = ref('')
const end = ref('')

// reset cada vez que abre
watch(() => props.open, (val) => {
  if (val) {
    start.value = ''
    end.value = ''
  }
})

const confirm = () => {
  if (!start.value || !end.value) return
  emit('confirm', {
    start_time: start.value,
    end_time: end.value
  })
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl w-80 space-y-4">

      <h2 class="font-semibold text-lg">
        Reservar {{ date?.toLocaleDateString() }}
      </h2>

      <div class="flex flex-col gap-2">
        <label>Hora inicio</label>
        <input type="time" v-model="start" class="border p-2 rounded" />

        <label>Hora fin</label>
        <input type="time" v-model="end" class="border p-2 rounded" />
      </div>

      <div class="flex justify-end gap-2">
        <button @click="$emit('close')" class="px-3 py-1">Cancelar</button>
        <button @click="confirm" class="px-3 py-1 bg-violet-500 text-white rounded">
          Reservar
        </button>
      </div>

    </div>
  </div>
</template>
