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
    <div class="flex justify-end">
      <textinput
        label=""
        class="w-full md:w-64 mb-2"
        placeholder="Search..."
        icon="search"
        v-model="searchTerm"
      />
    </div>
    <div>
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
            <tr v-for="car in paginatedCars" class="hover:bg-slate-100 hover:shadow-md">
              <td>{{ car.id }}</td>
              <td>{{ car.type }}</td>
              <td>{{ car.brand }}</td>
              <td>{{ car.licensePlate }}</td>
              <td>{{ car.mileage }}</td>
              <td>
                <div v-if="car.status" class="badge bg-[#099c3d] text-white w-18 text-xs">จอง</div>
              </td>
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
          <tfoot>
            <tr>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex gap-x-3 justify-between lg:justify-end items-center">
        <button
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="border p-2 rounded-md hover:bg-gray-100"
        >
          <Icon icon="heroicons-outline:chevron-left" class="w-5 h-5" />
        </button>
        <span class="text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          class="border p-2 rounded-md hover:bg-gray-100"
        >
          <Icon icon="heroicons-outline:chevron-right" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </TransitionRoot>

  <!--? Modal -->
  <n-modal
    v-model:show="openReserveModal"
    class="custom-card rounded-lg"
    preset="card"
    style="width: 600px"
    title="จองรถ"
    :bordered="false"
    size="huge"
  >
    <div class="grid gap-4">
      <div>
        <textinput
          v-model="date"
          type="date"
          label="วันที่ต้องการจอง"
          placeholder="กรอกวันที่ต้องการจอง"
        />
      </div>
      <div>
        <Select
          @select="handleSelectDriver"
          :menuLists="drivers()"
          placeholder="เลือกคนขับรถ"
          label="คนขับรถ"
        />
      </div>
      <div>
        <textinput v-model="address" label="สถานที่" placeholder="กรอกสถานที่" />
      </div>
      <div>
        <Select
          @select="handleSelectTypeCars"
          :menuLists="typeCars"
          placeholder="เลือกประเภทของรถ"
          label="ประเภทของรถ"
        />
      </div>
      <div>
        <textinput
          v-model="licensePlate"
          label="หมายเลขทะเบียนรถ"
          placeholder="กรอกหมายเลขทะเบียนรถ"
        />
      </div>
      <div>
        <textinput v-model="mileage" label="เลขไมล์ของรถ" placeholder="กรอกเลขไมล์ของรถ (ล่าสุด)" />
      </div>
    </div>
    <template #footer>
      <div class="grid gap-y-2 lg:flex gap-x-2">
        <button
          @click="openReserveModal = !openReserveModal"
          class="btn btn-outline lg:w-32 font-normal"
        >
          ยกเลิก
        </button>
        <div class="w-full">
          <button
            @click="submit"
            class="btn w-full bg-[#099c3d] text-white hover:bg-[#099c3d] font-normal"
          >
            จอง
          </button>
        </div>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { cars } from '@/constant/example-table'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'

import textinput from '@/components/textinput/index.vue'
import Select from '@/components/Select/index.vue'
import Icon from '@/components/Icon/index.vue'

const toast = useToast()
const openReserveModal = ref(false)
const licensePlate = ref('')
const mileage = ref('')
const selectTypeCars = ref('')
const address = ref('')
const date = ref(new Date())
const selectDriver = ref('')

function handleSelectTypeCars(value) {
  selectTypeCars.value = value
}

function submit() {
  licensePlate.value = ''
  mileage.value = ''
  selectTypeCars.value = ''
  address.value = ''
  date.value = new Date()
  selectDriver.value = ''
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
    key: 'licensePlate',
    label: 'เลขทะเบียน'
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

const driver = [
  {
    id: 1,
    name: 'นาย สมชาย ใจดี'
  },
  {
    id: 2,
    name: 'นาย สมหญิง ใจร้าย'
  },
  {
    id: 3,
    name: 'นาย สมศรี ใจเย็น'
  }
]

const drivers = () => {
  return driver.map((item) => item.name)
}

function handleSelectDriver(value) {
  selectDriver.value = value
}

const searchTerm = ref('')

const filteredCars = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return cars.filter((car) => {
    return (
      car.type.toLowerCase().includes(lowerCaseSearchTerm) ||
      car.brand.toLowerCase().includes(lowerCaseSearchTerm) ||
      car.licensePlate.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })
})

//pagination
const currentPage = ref(1)

const pageSize = 3

const totalPages = computed(() => Math.ceil(filteredCars.value.length / pageSize))

const paginatedCars = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return filteredCars.value.slice(startIndex, endIndex)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function goToPreviousPage() {
  goToPage(currentPage.value - 1)
}

function goToNextPage() {
  goToPage(currentPage.value + 1)
}
</script>

<style lang="scss">
.n-input-wrapper {
  @apply h-6 text-xs items-center;
}
</style>
