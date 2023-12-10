<template>
  <div class="">
    <h1 class="text-2xl">เพิ่มข้อมูลรถ</h1>
    <hr class="my-4 lg:my-6" />
    <div class="grid lg:grid-cols-3 gap-x-6 gap-y-7">
      <Select @select="handleSelectTypeCars" :menuLists="typeCars" placeholder="เลือกประเภทของรถ" label="ประเภทของรถ" />
      <Select @select="handleSelectBrand" :menuLists="brand" placeholder="เลือกแบรนด์ของรถ" label="แบรนด์ของรถ" />
      <textinput label="หมายเลขทะเบียนรถ" placeholder="กรอกหมายเลขทะเบียนรถ" />
      <textinput label="เลขไมล์ของรถ" placeholder="กรอกเลขไมล์ของรถ" />
      <textinput label="วันที่ถ่ายน้ำมันเครื่อง (ครั้งล่าสุด)" placeholder="วันที่ถ่ายน้ำมันเครื่อง" />
      <textinput label="วันที่ถ่ายน้ำมันเบรก (ครั้งล่าสุด)" placeholder="วันที่ถ่ายน้ำมันเบรก" />
    </div>
    <div class="mt-12 grid gap-y-2 md:flex md:gap-x-4">
      <div class="md:w-52 w-full">
        <router-link to="car" class="w-full"
          ><button class="btn btn-outline md:w-52 w-full">ยกเลิก</button></router-link
        >
      </div>
      <div class="w-full">
        <button @click="addCar" class="btn bg-[#099c3d] text-white hover:bg-[#099c3d] w-full">
          เพิ่มข้อมูล
        </button>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import textinput from '@/components/textinput/index.vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import Select from '@/components/Select/index.vue'
const toast = useToast()

function addCar() {
  toast.success('เพิ่มข้อมูลรถเรียบร้อยแล้ว', {
    timeout: 2000
  })
}

const typeCars = ref([
  'รถยนต์',
  'รถจักรยานยนต์',
  'รถบรรทุก',
  'รถตู้',
  'รถบัส',
  'รถเก๋ง',
  'รถตู้ทัวร์'
])

const brand = ref([
  'Honda',
  'Toyota',
  'Mazda',
  'Nissan',
  'Mitsubishi',
  'Isuzu',
  'Ford',
  'Chevrolet',
  'Mercedes-Benz',
  'BMW',
  'Audi',
  'Volkswagen',
  'Volvo',
  'Suzuki',
  'MG',
  'Mini',
  'Porsche',
  'Lexus',
  'KIA',
  'Hyundai',
  'Jeep',
  'Land Rover',
  'Jaguar',
  'Peugeot',
  'Subaru',
  'Ferrari',
  'Lamborghini',
  'Rolls-Royce',
])

const selectTypeCars = ref('')
const selectBrand = ref('')

function handleSelectTypeCars(value) {
  selectTypeCars.value = value
}

function handleSelectBrand(value) {
  selectBrand.value = value
}

</script>
