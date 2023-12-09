<template>
  <!-- <div class="flex justify-around">
    <textinput label="Hello world" placeholder="Enter text" />
    <textinput label="Hello world" placeholder="" />
    <textinput label="Hello world" placeholder="" />
  </div> -->
  <h1 class="text-2xl">ข้อมูลรถ</h1>
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
          <td><Icon icon="heroicons-outline:pencil-square" /></td>
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
    key: 'action',
    label: ''
  }
]
</script>
