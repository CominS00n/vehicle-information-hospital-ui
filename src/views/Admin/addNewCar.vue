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
    <div class="">
      <h1 class="text-2xl">เพิ่มข้อมูลรถ</h1>
      <hr class="my-4 lg:my-6" />
      <div class="grid lg:grid-cols-3 gap-x-6 gap-y-7">
        <Select
          @select="handleSelectTypeCars"
          :menuLists="typeCars"
          placeholder="เลือกประเภทของรถ"
          label="ประเภทของรถ"
        />
        <Select
          @select="handleSelectBrand"
          :menuLists="brand"
          placeholder="เลือกแบรนด์ของรถ"
          label="แบรนด์ของรถ"
        />
        <textinput
          v-model="licensePlate"
          label="หมายเลขทะเบียนรถ"
          placeholder="กรอกหมายเลขทะเบียนรถ"
        />
        <textinput v-model="mileage" label="เลขไมล์ของรถ" placeholder="กรอกเลขไมล์ของรถ" />
        <textinput
          v-model="lastChangeOil"
          label="วันที่ถ่ายน้ำมันเครื่อง (ครั้งล่าสุด)"
          placeholder="วันที่ถ่ายน้ำมันเครื่อง"
        />
        <textinput
          v-model="lastChangeBrake"
          label="วันที่ถ่ายน้ำมันเบรก (ครั้งล่าสุด)"
          placeholder="วันที่ถ่ายน้ำมันเบรก"
        />
      </div>
      <div class="mt-12 grid gap-y-2 md:flex md:gap-x-4">
        <div class="md:w-52 w-full">
          <router-link to="admin-car" class="w-full"
            ><button class="btn btn-outline md:w-52 w-full font-normal">ยกเลิก</button></router-link
          >
        </div>
        <div class="w-full">
          <button @click="addCar" class="btn bg-[#099c3d] text-white hover:bg-[#099c3d] w-full font-normal">
            เพิ่มข้อมูล
          </button>
        </div>
      </div>

      <!-- !debug value -->
      <!-- <div class="grid">
      <p>selectTypeCars: {{ selectTypeCars }}</p>
      <p>selectBrand: {{ selectBrand }}</p>
      <p>licensePlate: {{ licensePlate }}</p>
      <p>mileage: {{ mileage }}</p>
      <p>lastChangeOil: {{ lastChangeOil }}</p>
      <p>lastChangeBrake: {{ lastChangeBrake }}</p>
    </div> -->
    </div>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import textinput from '@/components/textinput/index.vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import Select from '@/components/Select/index.vue'
import { TransitionRoot } from '@headlessui/vue'

const toast = useToast()

const typeCars = ref([
  'รถตู้',
  'รถพยาบาล',
  'รถกระบะ',
  'รถเอกซเรย์',
  'รถกอร์ฟ',
])

const brand = ref([
  'Honda',
  'Toyota',
  'Mazda',
  'Nissan',
  'Isuzu',
  'Ford',
  'Mercedes-Benz',
  'Suzuki',
  'Hyundai',
  'Subaru',
])

const selectTypeCars = ref('')
const selectBrand = ref('')
const licensePlate = ref('')
const mileage = ref('')
const lastChangeOil = ref('')
const lastChangeBrake = ref('')

function addCar() {
  toast.success('เพิ่มข้อมูลรถเรียบร้อยแล้ว', {
    timeout: 2000
  })
}

function handleSelectTypeCars(value) {
  selectTypeCars.value = value
}

function handleSelectBrand(value) {
  selectBrand.value = value
}
</script>
