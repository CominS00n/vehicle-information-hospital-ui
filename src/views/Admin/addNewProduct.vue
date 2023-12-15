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
        <textinput label="ชื่ออุปกรณ์" placeholder="ชื่ออุปกรณ์" />
      </div>
      <div>
        <textinput label="จำนวน" placeholder="จำนวน" type="number" />
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
        <textinput label="รายละเอียด" placeholder="รายละเอียด" />
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
          @click="submit"
          class="btn bg-[#099c3d] text-white hover:bg-[#099c3d] w-full font-normal"
        >
          เพิ่มอุปกรณ์
        </button>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'

import textinput from '@/components/textinput/index.vue'
import Select from '@/components/Select/index.vue'

const toast = useToast()
const selectCategory = ref('')

const category = ref([
  'อุปกรณ์ทางการแพทย์',
  'อุปกรณ์ล้างรถ',
])
const submit = () => {
  toast.success('เพิ่มอุปกรณ์สำเร็จ', {
    timeout: 2000,
  })
}

function handleSelectCategory(value) {
  selectCategory.value = value
}
</script>
