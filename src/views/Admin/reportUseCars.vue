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
    <h1 class="text-2xl">รายงานการใช้รถ</h1>
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
    <!-- ? Table mobile  -->
    <div class="xl:hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr class="text-base text-center text-black">
              <th>วันที่</th>
              <th>เวลาเข้า</th>
              <th>เวลาออก</th>
              <th>รายละเอียด</th>
              <th>เลขไมล์เข้า</th>
              <th>เลขไมล์ออก</th>
              <th>ผู้ขับ</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="report in paginatedReport" class="hover:bg-slate-100 hover:shadow-md">
              <td>{{ report.date }}</td>
              <td class="text-center">{{ report.time_in }}</td>
              <td class="text-center">{{ report.time_out }}</td>
              <td>{{ report.description }}</td>
              <td class="text-center">{{ report.mileage_in }}</td>
              <td class="text-center">{{ report.mileage_out }}</td>
              <td>{{ report.driver }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th></th>
            </tr>
          </tfoot>
        </table>
       
        
      </div>
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex gap-x-3 justify-between md:justify-end items-center">
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

    <!-- ? Table full screen  -->
    <div class="hidden xl:inline">
      <table class="table">
          <!-- head -->
          <thead>
            <tr class="text-center text-sm text-black">
              <th>วันที่</th>
              <th class="grid grid-cols-2 gap-x-2">
                <th class="col-span-2 p-1">เวลา</th>
                <th class="p-1">เวลาเข้า</th>
                <th class="p-1 ">เวลาออก</th>
              </th>
              <th>รายละเอียด</th>
              <th class="grid grid-cols-2 gap-x-2">
                <th class="col-span-2 p-1">เลขไมล์</th>
                <th class="p-1">เลขไมล์เข้า</th>
                <th class="p-1">เลขไมล์ออก</th>
              </th>
              <th>ผู้ขับ</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="report in paginatedReport" class="hover:bg-slate-100 hover:shadow-md">
              <td>{{ report.date }}</td>
              <td class="grid grid-cols-2 gap-x-2 text-center">
                <td class="p-0">{{ report.time_in }}</td>
                <td class="p-0">{{ report.time_out }}</td>
              </td>
              <td>{{ report.description }}</td>
              <td class="grid grid-cols-2 text-center gap-x-2">
                <td class="p-0">{{ report.mileage_in }}</td>
                <td class="p-0">{{ report.mileage_out }}</td>
              </td>
              <td>{{ report.driver }}</td>
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
import { reports } from '@/constant/example-table'

import textinput from '@/components/textinput/index.vue'
import Icon from '@/components/Icon/index.vue'


//Search function
const searchTerm = ref('')

const filteredReports = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return reports.filter((report) => {
    return (
      report.date.toLowerCase().includes(lowerCaseSearchTerm) ||
      report.driver.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })
})

//pagination
const currentPage = ref(1)

const pageSize = 8

const totalPages = computed(() => Math.ceil(filteredReports.value.length / pageSize))

const paginatedReport = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return filteredReports.value.slice(startIndex, endIndex)
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
