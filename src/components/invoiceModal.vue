<script setup lang="ts">
import type { BillDTO } from '@/typings/bill'
import jsPDF from 'jspdf'



type Bill = {
  amount?: number
  status?: string
  due_date?: Date
  year?: string
  month?: string
  gas_pic?: string
  apartmentId?: number
  gas_metric: number
  latefee: number
  lateFeeStatus: boolean
}

const props = defineProps<{
  bill?: BillDTO | null
  show: boolean
}>()


const emit = defineEmits(['close'])

const close = () => emit('close')

const downloadPDF = () => {
  if (!props.bill) return

  const doc = new jsPDF()

  const b = props.bill

  doc.setFontSize(16)
  doc.text('Factura', 10, 10)

  doc.setFontSize(12)

  doc.text(`Monto: $${b.amount ?? 0}`, 10, 20)
  doc.text(`Estado: ${b.status ?? 'N/A'}`, 10, 30)
  doc.text(
    `Fecha límite: ${b.due_date ? new Date(b.due_date).toLocaleDateString() : 'N/A'
    }`,
    10,
    40
  )

  doc.text(`Periodo: ${b.month} / ${b.year}`, 10, 50)
  doc.text(`Apartamento: #${b.apartmentId ?? 'N/A'}`, 10, 60)
  doc.text(`Consumo Gas: ${b.gas_metric}`, 10, 70)
  doc.text(`Mora: $${b.latefee}`, 10, 80)
  doc.text(
    `Mora activa: ${b.lateFeeStatus ? 'Sí' : 'No'}`,
    10,
    90
  )

  doc.save(`factura-${b.apartmentId}-${b.month}-${b.year}.pdf`)
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

    <!-- Modal -->
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg p-6 relative">

      <!-- Close -->
      <button @click="close" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
        ✕
      </button>

      <!-- Title -->
      <h2 class="text-xl font-bold mb-4">Factura</h2>

      <div v-if="bill" class="space-y-3 text-sm">

        <div class="flex justify-between">
          <span class="text-gray-500">Monto:</span>
          <span class="font-semibold">${{ bill.amount ?? 0 }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-500">Estado:</span>
          <span class="font-semibold">{{ bill.status ?? 'N/A' }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-500">Fecha límite:</span>
          <span>{{ bill.due_date ? new Date(bill.due_date).toLocaleDateString() : 'N/A' }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-500">Periodo:</span>
          <span>{{ bill.month }} / {{ bill.year }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-500">Apartamento:</span>
          <span>#{{ bill.apartment.number ?? 'N/A' }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-500">Consumo Gas:</span>
          <span>{{ bill.gas_metric }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-500">Mora:</span>
          <span>${{ bill.latefee }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-500">Mora activa:</span>
          <span :class="bill.lateFeeStatus ? 'text-red-500' : 'text-green-500'">
            {{ bill.lateFeeStatus ? 'Sí' : 'No' }}
          </span>
        </div>

        <!-- Imagen -->
        <div v-if="bill.gas_pic" class="mt-4">
          <p class="text-gray-500 mb-2">Foto del medidor:</p>
          <img :src="bill.gas_pic" class="rounded-xl border max-h-48 object-cover" />
        </div>

      </div>

      <!-- Footer -->
      <div class="mt-6 flex justify-between">
        <!-- <button @click="downloadPDF" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl">
          Descargar PDF
        </button> -->

        <button @click="close" class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-xl">
          Cerrar
        </button>
      </div>

    </div>
  </div>
</template>
