<template>
  <!-- <div>
    <div>
      <div class="flex">
        <div>
          <p class="text-xs text-slate-400">วันที่</p>
          <n-date-picker v-model:value="timestamp" type="date" />
        </div>
        <div>
          <textinput />
        </div>
      </div>
    </div>
  </div> -->
  <h1 class="text-2xl">ข้อมูลการจอง</h1>
  <hr class="my-6">
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th v-for="header in headers">{{ header.label }}</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="car in cars">
          <th>{{ car.id }}</th>
          <td>{{ car.name }}</td>
          <td>{{ car.price }}</td>
          <td><div v-if="car.status" class="badge bg-[#ef1822] text-white text-xs">ติดจอง</div></td>
          <td>
            <div class="space-x-2">
              <button
                class="btn bg-[#099c3d] text-white text-xs btn-sm w-16 hover:bg-[#099c3d]"
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
import textinput from '@/components/TextInput/index.vue'
import { cars } from '@/constant/example-table'

const headers = [
  {
    key: '',
    label: 'id'
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
