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
            <td>{{ car.type }}</td>
            <td>{{ car.brand }}</td>
            <td>{{ car.licensePlate }}</td>
            <td>{{ car.mileage }}</td>
            <td>{{ car.lastChangeOil }}</td>
            <td>{{ car.lastChangeBrake }}</td>
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
    key: 'id',
    label: 'ไอดี'
  },
  {
    key: 'type',
    label: 'ประเภท'
  },
  {
    key: 'brand',
    label: 'แบรนด์'
  },
  {
    key: 'licensePlate',
    label: 'เลขทะเบียน'
  },
  {
    key: 'mileage',
    label: 'เลขไมล์'
  },
  {
    key: 'lastChangeOil',
    label: 'ถ่ายน้ำมันเครื่อง(ล่าสุด)'
  },
  {
    key: 'lastChangeBrake',
    label: 'ถ่ายน้ำมันเบรก(ล่าสุด)'
  },
  {
    key: 'action',
    label: ''
  }
]
</script>
