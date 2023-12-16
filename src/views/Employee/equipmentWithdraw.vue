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
    <h1 class="text-2xl">เบิกอุปกรณ์</h1>
    <hr class="my-4 lg:my-6" />
    <div class="grid grid-cols-2 gap-4">
      <div>
        <textinput label="ผู้เบิกอุปกรณ์" placeholder="กรอกผู้เบิกอุปกรณ์" />
      </div>
      <!-- <div>
        <Select
          @select="handleSelectCategory"
          :menuLists="category"
          placeholder="หมวดหมู่"
          label="หมวดหมู่"
        />
      </div> -->
      <div>
        <Select
          @select="handleSelectEquipment"
          :menuLists="equipmentList"
          :placeholder="'เลือกอุปกรณ์'"
          label="อุปกรณ์"
        />
      </div>
      <div>
        <textinput label="จำนวน" placeholder="จำนวน" type="number" />
      </div>
      <div>
        <textinput
          v-model="dateSelect"
          type="datetime-local"
          label="วันที่เบิกอุปกรณ์"
          placeholder=""
          disabled
        />
      </div>
    </div>
    <div class="mt-12 grid gap-y-2 md:flex md:gap-x-4">
      <div class="md:w-52 w-full">
        <router-link to="employee-car" class="w-full"
          ><button class="btn btn-outline md:w-52 w-full font-normal">ยกเลิก</button></router-link
        >
      </div>
      <div class="w-full">
        <button
          @click="submit"
          class="btn bg-[#099c3d] text-white hover:bg-[#099c3d] w-full font-normal"
        >
         บันทึก
        </button>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'

import Select from '@/components/Select/index.vue'
import textinput from '@/components/textinput/index.vue'

const selectCategory = ref('')
const selectEquipment = ref('')
const dateSelect = ref(new Date().toISOString().slice(0, 16))
const equipmentList = ref(['แปรงล้างรถ', 'น้ำยาล้างรถ', 'ผ้าเช็ดรถ'])
// const category = ref(['อุปกรณ์ทางการแพทย์', 'อุปกรณ์ล้างรถ'])
const toast = useToast()

const submit = () => {
  if (selectCategory.value === '' || selectEquipment.value === '') {
    toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', {
      timeout: 2000
    })
  } else {
    toast.success('บันทึกข้อมูลสำเร็จ', {
      timeout: 2000
    })
  }
}

// function handleSelectCategory(value) {
//   selectCategory.value = value
// }

function handleSelectEquipment(value) {
  selectEquipment.value = value
}

// function equipmentList() {
//   if (selectCategory.value === 'อุปกรณ์ทางการแพทย์') {
//     return ['เครื่องวัดความดัน', 'เครื่องวัดอุณหภูมิ', 'เครื่องวัดอัตราการเต้นของหัวใจ']
//   } else if (selectCategory.value === 'อุปกรณ์ล้างรถ') {
//     return ['แปรงล้างรถ', 'น้ำยาล้างรถ', 'ผ้าเช็ดรถ']
//   }
// }
</script>
