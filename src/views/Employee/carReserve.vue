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
    <h1 class="text-2xl">ข้อมูลการจอง</h1>
    <hr class="my-4 lg:my-6" />
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
            <td>{{ car.type }}</td>
            <td>{{ car.brand }}</td>
            <td>{{ car.mileage }}</td>
            <td><div v-if="car.status" class="badge bg-[#099c3d] text-white w-18 text-xs">จอง</div></td>
            <td>
              <div class="space-x-2">
                <button
                  class="btn bg-[#099c3d] text-white w-24 hover:bg-[#099c3d] font-normal btn-sm"
                  :disabled="car.status"
                  @click="openReserveModal = true"
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
  </TransitionRoot>

  <!--? Modal -->
  <n-modal
    v-model:show="openReserveModal"
    class="custom-card rounded-lg"
    preset="card"
    style="width: 600px;"
    title="จองรถ"
    :bordered="false"
    size="huge"
  >
    <div class="grid gap-4">
      <textinput v-model="date" label="วันที่ต้องการจอง" placeholder="กรอกวันที่ต้องการจอง" />
      <textinput v-model="address" label="สถานที่" placeholder="กรอกสถานที่" />
      <Select
        @select="handleSelectTypeCars"
        :menuLists="typeCars"
        placeholder="เลือกประเภทของรถ"
        label="ประเภทของรถ"
      />
      <textinput
        v-model="licensePlate"
        label="หมายเลขทะเบียนรถ"
        placeholder="กรอกหมายเลขทะเบียนรถ"
      />
      <textinput v-model="mileage" label="เลขไมล์ของรถ" placeholder="กรอกเลขไมล์ของรถ (ล่าสุด)" />
    </div>
    <template #footer>
      <div class="flex gap-x-2">
        <button @click="openReserveModal = !openReserveModal" class="btn btn-outline w-32 font-normal">
          ยกเลิก
        </button>
        <div class="w-full">
          <button @click="submit" class="btn w-full bg-[#099c3d] text-white hover:bg-[#099c3d] font-normal">
            จอง
          </button>
        </div>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue'
import { cars } from '@/constant/example-table'
import { TransitionRoot } from '@headlessui/vue'
import textinput from '@/components/textinput/index.vue'
import Select from '@/components/Select/index.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const openReserveModal = ref(false)
const licensePlate = ref('')
const mileage = ref('')
const selectTypeCars = ref('')
const address = ref('')
const date = ref('')

function handleSelectTypeCars(value) {
  selectTypeCars.value = value
}

function submit() {
  toast.success('จองเรียบร้อยแล้ว', {
    timeout: 2000
  })
  openReserveModal.value = !openReserveModal.value
}


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
    key: 'mileage',
    label: 'เลขไมล์'
  },
  {
    key: 'status',
    label: 'สถานะ'
  },
  {
    key: 'action',
    label: ''
  }
]

const typeCars = ref([
  'รถยนต์',
  'รถจักรยานยนต์',
  'รถบรรทุก',
  'รถตู้',
  'รถบัส',
  'รถเก๋ง',
  'รถตู้ทัวร์'
])
</script>

<style lang="scss">
.n-input-wrapper {
  @apply h-6 text-xs items-center;
}
</style>
