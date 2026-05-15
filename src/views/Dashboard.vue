<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GasChart from '@/components/gasChart.vue';
import CurrencyFormater from '@/components/currencyFormater.vue';
import ActivityWidget from '@/components/ActivityWidget.vue';
import BigNumber from '@/components/BigNumber.vue';
import { useUserStore } from '@/stores/userStore';

const sidebarOpen = ref(true)

const useUser = useUserStore()
const dashboard = ref()

const incidents = [
  {
    id: 1,
    title: 'Fuga de gas',
    createdAt: '2026-04-24T02:00:00',
    status: 'open'
  }
]

const agendas = [
  {
    id: 1,
    title: 'Reserva área BBQ',
    reservation_date: '2026-04-25',
    start_time: '14:00',
    end_time: '18:00',
    status: 'confirmada'
  }
]

onMounted(async () => {
  dashboard.value = await useUser.getDashboard()
})

</script>

<template>
  <div class="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">


    <!-- MAIN -->
    <main class="flex-1 p-4 ">
      <div class="grid grid-cols-12 gap-4 auto-rows-[120px] p-4">

        <!-- stats -->
        <div class="col-span-12 sm:col-span-6 lg:col-span-3 row-span-1 bg-white rounded-xl ">
          <BigNumber label="Edificio" :value='useUser.dashboard?.building.name' />
        </div>

        <div class="col-span-12 sm:col-span-6 lg:col-span-3 row-span-1 bg-white rounded-xl ">
          <BigNumber label="Apartamento" :value="useUser.dashboard?.apartment.number" />

        </div>

        <div class="col-span-12 sm:col-span-6 lg:col-span-3 row-span-1 bg-white rounded-xl ">
          <CurrencyFormater :amount="3500" title="Última Factura" status="overdue" date="Marzo 2026" :changePercent="-1"
            :bills="useUser.dashboard?.bills" />
        </div>

        <div class="col-span-12 sm:col-span-6 lg:col-span-3 row-span-1 bg-white rounded-xl p-4">
          Alertas
        </div>

        <!-- chart grande -->
        <div class="col-span-16 lg:col-span-8 row-span-3 bg-white rounded-xl p-2">
          <GasChart></GasChart>
        </div>

        <!-- widget lateral -->
        <div class="col-span-12 lg:col-span-4 row-span-3 bg-white rounded-xl">
          <ActivityWidget :incidents="incidents" :agendas="useUser.dashboard?.reservations" />
        </div>

      </div>

    </main>

  </div>
</template>
