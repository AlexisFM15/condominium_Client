<script setup lang="ts">
import { computed, onMounted } from 'vue'
import GasChart from '@/components/gasChart.vue'
import CurrencyFormater from '@/components/currencyFormater.vue'
import ActivityWidget from '@/components/ActivityWidget.vue'
import BigNumber from '@/components/BigNumber.vue'
import { useUserStore } from '@/stores/userStore'

const useUser = useUserStore()

const incidents = []

computed(() => console.log(useUser.dashboard))

onMounted(async () => {
  await useUser.getDashboard()
})
console.log(useUser.dashboard)
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
    <!-- MAIN -->
    <main class="flex-1 p-4">
      <div class="grid grid-cols-12 gap-4 auto-rows-[120px] p-4">
        <!-- stats -->
        <div class="col-span-12 sm:col-span-6 lg:col-span-3 row-span-1 bg-white rounded-xl">
          <BigNumber label="Edificio" :value="useUser.dashboard?.building.name!" />
        </div>

        <div class="col-span-12 sm:col-span-6 lg:col-span-3 row-span-1 bg-white rounded-xl">
          <BigNumber label="Apartamento" :value="useUser.dashboard?.apartment.number" />
        </div>

        <div class="col-span-12 sm:col-span-6 lg:col-span-3 row-span-1 bg-white rounded-xl">
          <CurrencyFormater
            :amount="3500"
            title="Última Factura"
            status="overdue"
            date="Marzo 2026"
            :changePercent="-1"
            :bills="useUser.dashboard?.bills"
          />
        </div>

        <div class="col-span-12 sm:col-span-6 lg:col-span-3 row-span-1 bg-white rounded-xl">
          <BigNumber label="Balance" :value="useUser.dashboard?.user.balance" />
        </div>

        <!-- chart grande -->
        <div class="col-span-16 lg:col-span-8 row-span-3 bg-white rounded-xl p-2">
          <GasChart :bills="useUser.dashboard?.bills"></GasChart>
        </div>

        <!-- widget lateral -->
        <div class="col-span-12 lg:col-span-4 row-span-3 bg-white rounded-xl">
          <ActivityWidget :incidents="incidents" :agendas="useUser.dashboard?.reservations" />
        </div>
      </div>
    </main>
  </div>
</template>
