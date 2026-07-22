<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from 'chart.js'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
)

interface Bill {
  id: number
  month: string
  gas_total: string
  gas_metric: string
}

const props = withDefaults(
  defineProps<{
    bills?: Bill[]
  }>(),
  {
    bills: () => [],
  },
)

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const renderChart = () => {
  if (!canvasRef.value) return

  if (chart) {
    chart.destroy()
    chart = null
  }

  const labels = props.bills.map((bill) => bill.month)

  // Cambia gas_total por gas_metric si ese es el dato que quieres mostrar
  const values = props.bills?.map((bill) => Number(bill.gas_metric))

  const isUp = values.length > 1 ? values[values.length - 1] >= values[values.length - 2] : true

  chart = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Gas',
          data: values,
          borderColor: isUp ? 'rgba(34,197,94,0.8)' : 'rgba(239,68,68,0.8)',
          backgroundColor: isUp ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.parsed.y} m³`,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#9ca3af',
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0,0,0,0.06)',
          },
          ticks: {
            color: '#9ca3af',
          },
        },
      },
    },
  })
}

watch(
  () => props.bills,
  () => {
    renderChart()
  },
  {
    deep: true,
    immediate: true,
  },
)

onMounted(renderChart)

onBeforeUnmount(() => {
  chart?.destroy()
})
</script>

<template>
  <div class="w-full h-90 bg-white dark:bg-gray-800 p-4 rounded-lg">
    <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
      Consumo mensual de gas
    </h2>

    <div class="relative w-full h-full">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>
