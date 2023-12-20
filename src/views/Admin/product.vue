<template>
  <TransitionRoot
    appear
    :show="true"
    enter="ease-out duration-300"
    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    enter-to="opacity-100 translate-y-0 sm:scale-100"
    leave="ease-in duration-200"
    leave-from="opacity-100 translate-y-0 sm:scale-100"
    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  >
    <h1 class="text-2xl">อุปกรณ์</h1>
    <hr class="my-4 lg:my-6" />
    <div class="flex justify-end">
      <textinput
        label=""
        class="w-full md:w-64 mb-2"
        placeholder="Search..."
        icon="search"
        v-model="searchTerm"
      />
    </div>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th v-for="header in headers" class="text-base">{{ header.label }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="equipment in paginatedEquipments" class="hover:bg-slate-100 hover:shadow-md">
            <td>{{ equipment.id }}</td>
            <td>{{ equipment.name }}</td>
            <td>{{ equipment.amount }}</td>
            <td>{{ equipment.category }}</td>
            <td>{{ equipment.detail }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th></th>
          </tr>
        </tfoot>
      </table>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex gap-x-3 justify-end items-center">
        <button
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="border p-2 rounded-md hover:bg-gray-100"
        >
          <Icon icon="heroicons-outline:chevron-left" class="w-5 h-5" />
        </button>
        <span class="text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          class="border p-2 rounded-md hover:bg-gray-100"
        >
          <Icon icon="heroicons-outline:chevron-right" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { ref, computed } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import { equipments } from '@/constant/example-table'

import textinput from '@/components/textinput/index.vue'
import Icon from '@/components/Icon/index.vue'

const headers = [
  {
    key: 'id',
    label: 'ไอดี'
  },
  {
    key: 'name',
    label: 'ชื่ออุปกรณ์'
  },
  {
    key: 'amount',
    label: 'จำนวน'
  },
  {
    key: 'category',
    label: 'หมวดหมู่'
  },
  {
    key: 'detail',
    label: 'รายละเอียด'
  }
]

const searchTerm = ref('')

const filteredEquipments = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return equipments.filter((car) => {
    return (
      car.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      car.category.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })
})

//pagination
const currentPage = ref(1)

const pageSize = 2

const totalPages = computed(() => Math.ceil(filteredEquipments.value.length / pageSize))

const paginatedEquipments = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return filteredEquipments.value.slice(startIndex, endIndex)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function goToPreviousPage() {
  goToPage(currentPage.value - 1)
}

function goToNextPage() {
  goToPage(currentPage.value + 1)
}
</script>
