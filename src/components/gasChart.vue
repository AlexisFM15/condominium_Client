<!-- <script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
} from 'chart.js'

// registrar lo necesario
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler)

// props opcionales
const props = defineProps<{
  endpoint?: string // default: /metrics/gas
  title?: string
}>()

const endpoint = props.endpoint ?? '/metrics/gas'
const title = props.title ?? 'Consumo de Gas (mensual)'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

// formatea YYYY-MM-01 -> "Ene 2026"
const formatMonth = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleDateString('es-DO', { month: 'short', year: 'numeric' })
}

const loadData = async () => {
  const res = await fetch(endpoint)
  const json = await res.json()

  // espera: [{ mes: '2026-01-01', total: 123 }, ...]
  const labels = json.map((d: any) => formatMonth(d.mes))
  const values = json.map((d: any) => Number(d.total))

  if (!canvasRef.value) return

  // destruir instancia previa (hot-reload / cambios)
  if (chart) {
    chart.destroy()
    chart = null
  }

  chart = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Gas',
          data: values,
          borderColor: '#8470ff',
          backgroundColor: 'rgba(132,112,255,0.08)',
          tension: 0.4,        // curva suave
          fill: true,          // leve área (opcional)
          pointRadius: 0,      // sin puntos visibles (look “trading”)
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} m³`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#9ca3af' }
        },
        y: {
          grid: { color: 'rgba(0,0,0,0.06)' },
          ticks: {
            color: '#9ca3af',
            callback: (v) => `${v}`
          }
        }
      }
    }
  })
}

onMounted(loadData)
onBeforeUnmount(() => {
  if (chart) chart.destroy()
})
</script>

<template>
  <div class="w-full h-80 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
    <div class="flex items-center justify-between mb-2">
      <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-200">
        {{ title }}
      </h2>
    </div>

    <div class="relative w-full h-full">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template> -->


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler)

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

// 🔥 genera meses + valores tipo “mercado”
const generateMockData = () => {
  const months: string[] = []
  const values: number[] = []

  let current = 100 // valor base

  for (let i = 0; i < 12; i++) {
    const date = new Date()
    date.setMonth(date.getMonth() - (11 - i))

    const label = date.toLocaleDateString('es-DO', {
      month: 'short'
    })

    // variación aleatoria tipo gráfica cripto
    const change = (Math.random() - 0.5) * 20
    current = Math.max(20, current + change)

    months.push(label)
    values.push(Number(current.toFixed(2)))
  }

  return { months, values }
}

const renderChart = () => {
  if (!canvasRef.value) return

  const { months, values } = generateMockData()

  if (chart) {
    chart.destroy()
    chart = null
  }
  const isUp = values[values.length - 1] > values[values.length - 2]
  chart = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Gas',
          data: values,
          borderColor: isUp
            ? 'rgba(239,68,68,0.8)'   // verde
            : 'rgba(34,197,94,0.8)',  // rojo
          backgroundColor: isUp
            ? 'rgba(239,68,68,0.1)'
            : 'rgba(34,197,94,0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y} m³`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#9ca3af' }
        },
        y: {
          grid: { color: 'rgba(0,0,0,0.06)' },
          ticks: { color: '#9ca3af' }
        }
      }
    }
  })
}

onMounted(renderChart)

onBeforeUnmount(() => {
  if (chart) chart.destroy()
})
</script>

<template>
  <div class="w-full h-90 bg-white dark:bg-gray-800  p-4 ">
    <h2 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
      Gas mensual (mock)
    </h2>

    <div class="relative w-full h-full">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>
