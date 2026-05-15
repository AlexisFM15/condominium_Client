<script setup lang="ts">
import ClosePollsView from './closePolls.vue'
import { ref } from 'vue'

const polls = ref([
  {
    id: '1',
    description: '¿Instalar cámaras de seguridad?',
    expires_at: '2026-04-30',
    status: 'ACTIVE',
    poll_result: 12
  },
  {
    id: '2',
    description: '¿Pintar el edificio?',
    expires_at: '2026-03-20',
    status: 'CLOSED',
    poll_result: -3
  }
])
</script>

<template>
  <ClosePollsView :polls="polls" />
</template>
