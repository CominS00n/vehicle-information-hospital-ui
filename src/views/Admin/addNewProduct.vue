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
    <h1 class="text-2xl">เพิ่มอุปกรณ์</h1>
    <hr class="my-4 lg:my-6" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
      <div>
        <textinput v-model="data.namedevice" label="ชื่ออุปกรณ์" placeholder="ชื่ออุปกรณ์" />
      </div>
      <div>
        <textinput v-model="data.amount" label="จำนวน" placeholder="จำนวน" type="number" />
      </div>
      <div>
        <Select
          @select="handleSelectCategory"
          :menuLists="category"
          placeholder="หมวดหมู่"
          label="หมวดหมู่"
        />
      </div>
      <div>
        <textinput v-model="data.detail" label="รายละเอียด" placeholder="รายละเอียด" />
      </div>
    </div>

    <div class="mt-12 grid gap-y-2 md:flex md:gap-x-4">
      <div class="md:w-52 w-full">
        <router-link to="admin-car" class="w-full"
          ><button class="btn btn-outline md:w-52 w-full font-normal">ยกเลิก</button></router-link
        >
      </div>
      <div class="w-full">
        <button
          @click.prevent="submit(data)"
          class="btn bg-[#099c3d] text-white hover:bg-[#099c3d] w-full font-normal"
        >
          เพิ่มอุปกรณ์
        </button>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'

import useEquipment from '@/componsable/equipment/equipment'
import textinput from '@/components/textinput/index.vue'
import Select from '@/components/Select/index.vue'

const toast = useToast()
// const selectCategory = ref('')
const { createEquipmentDetails } = useEquipment()

onMounted(() => {
  createEquipmentDetails()
})

const category = ref(['อุปกรณ์ทางการแพทย์', 'อุปกรณ์ล้างรถ', 'อุปกรณ์อื่นๆ'])

const data = reactive({
  namedevice: '',
  amount: '',
  group: '',
  detail: ''
})

const submit = (data) => {
  if (
    !data.namedevice ||
    !data.amount ||
    !data.group ||
    !data.detail
  ) {
    toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', {
      timeout: 2000
    })
    return
  } else {
    createEquipmentDetails(data)
    toast.success('เพิ่มอุปกรณ์สำเร็จ', {
      timeout: 2000
    })
    data.namedevice = ''
    data.amount = ''
    data.group = ''
    data.detail = ''
    handleSelectCategory('')
  }
}

function handleSelectCategory(value) {
  data.group = value
}
</script>
