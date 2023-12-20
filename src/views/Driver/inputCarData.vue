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
    <h1 class="text-2xl">กรอกข้อมูลการใช้รถ</h1>
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
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th v-for="header in headers" class="text-base">{{ header.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in paginatedCarReservation" class="hover:bg-slate-100 hover:shadow-md">
            <td>{{ car.date }}</td>
            <td>{{ car.driver }}</td>
            <td>{{ car.address }}</td>
            <td>{{ car.typeCar }}</td>
            <td>{{ car.licensePlate }}</td>
            <td>
              <div class="space-x-2">
                <button
                  class="btn bg-[#099c3d] text-white w-32 hover:bg-[#099c3d] font-normal btn-sm"
                  @click="openReportModal(car.id, car.date, car.driver, car.licensePlate)"
                >
                  กรอกข้อมูล
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
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex gap-x-3 justify-end items-center">
        <button
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="border p-2 rounded-md hover:bg-gray-100"
        >
          <Icon icon="heroicons-outline:chevron-left" class="w-5 h-5" />
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          class="border p-2 rounded-md hover:bg-gray-100"
        >
          <Icon icon="heroicons-outline:chevron-right" class="w-5 h-5" />
        </button>
      </div>
    </div>
    <!--? Modal -->
    <n-modal
      v-model:show="openModal"
      class="custom-card rounded-lg"
      preset="card"
      style="width: 600px"
      title="กรอกข้อมูล"
      :bordered="false"
      size="huge"
    >
      <div class="grid gap-y-3">
        <textinput v-model="dateSelect" label="วันที่" disabled />
        <textinput v-model="driverSelect" label="คนขับ" disabled />
        <textinput v-model="licensePlateSelect" label="เลขทะเบียนรถ" disabled />
        <div>
          <div class="divider text-slate-500">เวลา</div>
          <div class="flex gap-x-2">
            <textinput v-model="time_in" label="ออก" class="w-full" />
            <textinput v-model="time_out" label="เข้า" class="w-full" />
          </div>
        </div>
        <div>
          <div class="divider text-slate-500">เลขไมล์</div>
          <div class="flex gap-x-2">
            <textinput v-model="mileage_in" label="ออก" class="w-full" />
            <textinput v-model="mileage_out" label="เข้า" class="w-full" />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex gap-x-2">
          <button @click="openModal = !openModal" class="btn btn-outline w-32 font-normal">
            ยกเลิก
          </button>
          <div class="w-full">
            <button
              class="btn w-full bg-[#099c3d] text-white hover:bg-[#099c3d] font-normal"
              @click="submit"
            >
              บันทึก
            </button>
          </div>
        </div>
      </template>
    </n-modal>
  </TransitionRoot>
</template>

<script setup>
import { ref, computed } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import { carReservations } from '@/constant/example-table'
import { useToast } from 'vue-toastification'

import textinput from '@/components/textinput/index.vue'
// import Select from '@/components/Select/index.vue'
import Icon from '@/components/Icon/index.vue'

// function handleSelectTypeCars(value) {
//   selectTypeCars.value = value
// }
const openModal = ref(false)
const dateSelect = ref('')
const driverSelect = ref('')
const licensePlateSelect = ref('')
const mileage_in = ref('')
const mileage_out = ref('')
const time_in = ref('')
const time_out = ref('')
const toast = useToast()

function openReportModal(id, date, driver, licensePlate) {
  openModal.value = true
  dateSelect.value = date
  driverSelect.value = driver
  licensePlateSelect.value = licensePlate
}

function submit() {
  if (
    time_in.value === '' ||
    time_out.value === '' ||
    mileage_in.value === '' ||
    mileage_out.value === ''
  ) {
    toast.error('กรุณากรอกข้อมูลให้ครบ', {
      timeout: 2000
    })
  } else {
    toast.success('บันทึกข้อมูลสำเร็จ', {
      timeout: 2000
    })
    openModal.value = false
    dateSelect.value = ''
    driverSelect.value = ''
    licensePlateSelect.value = ''
    mileage_in.value = ''
    mileage_out.value = ''
    time_in.value = ''
    time_out.value = ''
  }
}

const headers = [
  {
    key: 'date',
    label: 'วันที่จอง'
  },
  {
    key: 'driver',
    label: 'ผู้ขับ'
  },
  {
    key: 'address',
    label: 'สถานที่ไป'
  },
  {
    key: 'typeCar',
    label: 'ประเภทรถ'
  },
  {
    key: 'licensePlate',
    label: 'เลขทะเบียนรถ'
  },
  {
    key: 'action',
    label: ''
  }
]

const searchTerm = ref('')

const filteredCarReservations = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return carReservations.filter((carReservation) => {
    return (
      carReservation.driver.toLowerCase().includes(lowerCaseSearchTerm) ||
      carReservation.typeCar.toLowerCase().includes(lowerCaseSearchTerm) ||
      carReservation.licensePlate.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })
})

//pagination
const currentPage = ref(1)

const pageSize = 5

const totalPages = computed(() => Math.ceil(filteredCarReservations.value.length / pageSize))

const paginatedCarReservation = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return filteredCarReservations.value.slice(startIndex, endIndex)
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
