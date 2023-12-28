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
            <tr v-for="(car, i) in paginatedCars" class="hover:bg-slate-100 hover:shadow-md">
              <td>{{ i + 1 }}</td>
              <td>{{ car.typecar }}</td>
              <td>{{ car.brand }}</td>
              <td>{{ car.license_plate }}</td>
              <td>{{ car.mileage }}</td>
              <td>
                <div
                  v-if="car.status === 'Reserve'"
                  class="badge bg-[#099c3d] text-white w-18 text-xs"
                >
                  จอง
                </div>
              </td>
              <td>
                <div class="space-x-2">
                  <button
                    class="btn bg-[#099c3d] text-white w-24 hover:bg-[#099c3d] font-normal btn-sm"
                    :disabled="car.status === 'Reserve'"
                    @click="openReserveModal(car.id)"
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
    v-model:show="reserveModal"
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
          v-model="data.booking_date"
          type="date"
          label="วันที่ต้องการจอง"
          placeholder="กรอกวันที่ต้องการจอง"
        />
      </div>
      <div>
        <textinput
          v-model="data.time"
          type="time"
          label="เวลาต้องการจอง"
          placeholder="กรอกเวลาต้องการจอง"
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
        <textinput v-model="data.location" label="สถานที่" placeholder="กรอกสถานที่" />
      </div>
      <div>
        <textinput
          v-model="carDetail.typecar"
          label="ประเภทของรถ"
          placeholder="กรอกประเภทของรถ"
          disabled
        />
      </div>
      <div>
        <textinput
          v-model="carDetail.license_plate"
          label="หมายเลขทะเบียนรถ"
          placeholder="กรอกหมายเลขทะเบียนรถ"
          disabled
        />
      </div>
      <div>
        <textinput
          v-model="carDetail.mileage"
          label="เลขไมล์ของรถ"
          placeholder="กรอกเลขไมล์ของรถ (ล่าสุด)"
          disabled
        />
      </div>
    </div>
    <template #footer>
      <div class="grid gap-y-2 lg:flex gap-x-2">
        <button @click="reserveModal = !reserveModal" class="btn btn-outline lg:w-32 font-normal">
          ยกเลิก
        </button>
        <div class="w-full">
          <button
            @click="submit(carDetail.id)"
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
import { ref, computed, onMounted, reactive } from 'vue'
// import { cars } from '@/constant/example-table'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'
import { getUserInfo } from '@/constant/accountLogin'

import useCar from '@/componsable/car/cars'
import useDriver from '@/componsable/user/driver'
import useReserve from '@/componsable/reserve/reserve'
import textinput from '@/components/textinput/index.vue'
import Select from '@/components/Select/index.vue'
import Icon from '@/components/Icon/index.vue'

const toast = useToast()
const { carDetails, getCarDetails, carDetail, getCarDetail, updateCar } = useCar()
const { getDriverDetails, driverDetails } = useDriver()
const { createReserveCarDetail } = useReserve()
const reserveModal = ref(false)
const account = getUserInfo()

const data = reactive({
  booking_date: '',
  namedriver: '',
  location: '',
  type_car: '',
  license_plate: '',
  mileage: '',
  nameuser: account.firstname + ' ' + account.lastname,
  time: ''
})

onMounted(() => {
  getCarDetails()
  getDriverDetails()
})

function openReserveModal(id) {
  reserveModal.value = true
  getCarDetail(id).then(() => {
    data.type_car = carDetail.value.typecar
    data.license_plate = carDetail.value.license_plate
    data.mileage = carDetail.value.mileage
  })
}

function submit(id) {
  if (!data.booking_date || !data.time || !data.namedriver || !data.location) {
    toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', {
      timeout: 2000
    })
    return
  } else {
    carDetail.value.status = 'Reserve'
    updateCar(id)
    console.log(data)
    createReserveCarDetail(data)
    toast.success('จองรถสำเร็จ', {
      timeout: 2000
    })
    reserveModal.value = !reserveModal.value
  }
}

const headers = [
  {
    key: 'id',
    label: 'ลำดับ'
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


const drivers = () => {
  return driverDetails.value.map((item) => item.first_name + ' ' + item.last_name)
}

function handleSelectDriver(value) {
  data.namedriver = value
}

const searchTerm = ref('')

const filteredCars = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return carDetails.value.filter((car) => {
    return (
      car.typecar.toLowerCase().includes(lowerCaseSearchTerm) ||
      car.brand.toLowerCase().includes(lowerCaseSearchTerm) ||
      car.license_plate.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })
})

//pagination
const currentPage = ref(1)

const pageSize = 10

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
