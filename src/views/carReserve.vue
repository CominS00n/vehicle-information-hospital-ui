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
    <h1 class="text-2xl">ข้อมูลการจอง</h1>
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
            <td><div v-if="car.status" class="badge bg-[#ef1822] text-white">ติดจอง</div></td>
            <td>
              <div class="space-x-2">
                <button
                  class="btn bg-[#099c3d] text-white w-24 hover:bg-[#099c3d]"
                  :disabled="car.status"
                >
                  จอง
                </button>
                <!-- <button class="btn btn-primary btn-sm">Delete</button> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { cars } from '@/constant/example-table'
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
    key: 'status',
    label: 'Status'
  },
  {
    key: 'action',
    label: ''
  }
]

const timestamp = ref(new Date())
</script>

<style lang="scss">
.n-input-wrapper {
  @apply h-6 text-xs items-center;
}
</style>
