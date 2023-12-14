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
    <h1 class="text-2xl">ตารางการใช้รถ</h1>
    <hr class="my-4 lg:my-6" />
    ยังคิดไม่ออกว่าจะใส่อะไร
  </TransitionRoot>

  
  <!--? Modal -->
  <n-modal
    v-model:show="openDetailModal"
    class="custom-card rounded-lg"
    preset="card"
    style="width: 600px"
    title="ข้อมูลรถ"
    :bordered="false"
    size="huge"
  >
    <div class="grid gap-4">
      <textinput />
      <textinput />
      <textinput />
      <textinput />
    </div>
    <template #footer>
      <div class="flex gap-x-2">
        <button @click="openDetailModal = !openDetailModal" class="btn btn-outline w-32 font-normal">
          ยกเลิก
        </button>
        <div class="w-full">
          <button @click="submit" class="btn w-full bg-[#099c3d] text-white hover:bg-[#099c3d] font-normal">
            บันทึก
          </button>
        </div>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue'
import textinput from '@/components/textinput/index.vue'
import { cars } from '@/constant/example-table'
import Icon from '@/components/Icon/index.vue'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const openDetailModal = ref(false)

const headers = [
  {
    key: 'id',
    label: 'ไอดี'
  },
  {
    key: 'type',
    label: 'ประเภท'
  },
  {
    key: 'brand',
    label: 'แบรนด์'
  },
  {
    key: 'licensePlate',
    label: 'เลขทะเบียน'
  },
  {
    key: 'mileage',
    label: 'เลขไมล์'
  },
  {
    key: 'lastChangeOil',
    label: 'ถ่ายน้ำมันเครื่อง(ล่าสุด)'
  },
  {
    key: 'lastChangeBrake',
    label: 'ถ่ายน้ำมันเบรก(ล่าสุด)'
  },
  {
    key: 'action',
    label: ''
  }
]

async function submit() {
  toast.success('บันทึกข้อมูลสำเร็จ', {
    timeout: 2000
  })
  openDetailModal.value = !openDetailModal.value
}
</script>
