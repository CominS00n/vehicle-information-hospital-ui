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
    <h1 class="text-2xl">ข้อมูลรถ</h1>
    <hr class="my-4 lg:my-6" />
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
          <tr v-for="car in cars" class="hover:bg-slate-100 hover:shadow-md">
            <th>{{ car.id }}</th>
            <td>{{ car.name }}</td>
            <td>{{ car.price }}</td>
            <td><Icon icon="heroicons-outline:pencil-square" class="text-xl" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </TransitionRoot>
</template>

<script setup>
import textinput from '@/components/textinput/index.vue'
import { cars } from '@/constant/example-table'
import Icon from '@/components/Icon/index.vue'
import { TransitionRoot } from '@headlessui/vue'

const headers = [
  {
    key: '',
    label: 'ID'
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'price',
    label: 'Price'
  },
  {
    key: 'action',
    label: ''
  }
]
</script>
