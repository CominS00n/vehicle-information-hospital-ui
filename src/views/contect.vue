<template>
  <!-- <div class="flex justify-around">
    <textinput label="Hello world" placeholder="Enter text" />
    <textinput label="Hello world" placeholder="" />
    <textinput label="Hello world" placeholder="" />
  </div> -->
  <h1 class="text-2xl">ข้อมูลรถ</h1>
  <hr class="my-4 lg:my-6">
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
</template>

<script setup>
import textinput from '@/components/textinput/index.vue'
import { cars } from '@/constant/example-table'
import Icon from '@/components/Icon/index.vue'

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
