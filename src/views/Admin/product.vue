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
          <tr v-for="equipment in filteredEquipments" class="hover:bg-slate-100 hover:shadow-md">
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
    </div>
  </TransitionRoot>
</template>

<script setup>
import { ref, computed } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import { equipments } from '@/constant/example-table'

import textinput from '@/components/textinput/index.vue'

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
</script>
