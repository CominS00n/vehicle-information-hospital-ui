<template>
  <h1 class="text-2xl hidden lg:block">ข้อมูลการจอง</h1>
  <hr class="my-6 hidden lg:block">
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
        <tr v-for="car in cars"  class="hover:bg-slate-100 hover:shadow-md">
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
</template>

<script setup>
import { ref } from 'vue'
import textinput from '@/components/textinput/index.vue'
import { cars } from '@/constant/example-table'

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
