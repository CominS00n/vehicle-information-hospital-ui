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
          <thead>
            <tr>
              <th v-for="(header, i) in headers" :key="i" class="text-base">{{ header.title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(car, i) in paginatedCars" :key="i" :class="`${i % 2 !== 0? 'bg-gray-100' : ''} hover:bg-slate-100 hover:shadow-md`">
              <td>{{ i + 1 }}</td>
              <td>{{ car.booking_date }}</td>
              <td>{{ car.time }}</td>
              <td>{{ car.nameuser }}</td>
              <td>{{ car.namedriver }}</td>
              <td>{{ car.location }}</td>
              <td>{{ car.type_car }}</td>
              <td>{{ car.license_plate }}</td>
              <td>
                <button
                  @click="deleteCarReserve(car.id, car.license_plate)"
                  :class="`p-2 rounded-full ${car.status === 'Unreserve' ? '': 'hover:bg-slate-300'}`"
                  :disabled="car.status === 'Unreserve'"
                >
                  <Icon icon="heroicons-outline:trash" :class="car.status === 'Unreserve' ? 'text-xl text-slate-400' : 'text-xl text-[#ef1822]'" />
                </button>
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'

import useReserve from '@/componsable/reserve/reserve'
import useCar from '@/componsable/car/cars'
import Icon from '@/components/Icon/index.vue'
import textinput from '@/components/textinput/index.vue'
import Swal from 'sweetalert2'

const { getReserveCarDetails, reserveCarDetails, deleteReserveCarDetail } = useReserve()
const { updateCar, carDetail, getCarDetail, carDetails, getCarDetails } = useCar()

onMounted(() => {
  getReserveCarDetails()
  getCarDetails()
})

const toast = useToast()

const headers = [
  {
    key: 'id',
    title: 'ลำดับ'
  },
  {
    key: 'dateReserve',
    title: 'วันที่จอง'
  },
  {
    key: 'timeReserve',
    title: 'เวลา'
  },
  {
    key: 'nameReserve',
    title: 'ชื่อผู้จอง'
  },
  {
    key: 'nameDriver',
    title: 'ชื่อผู้ขับ'
  },
  {
    key: 'location',
    title: 'สถานที่'
  },
  {
    key: 'carType',
    title: 'ประเภทรถ'
  },
  {
    key: 'licensePlate',
    title: 'หมายเลขทะเบียนรถ'
  },
  {
    key: 'action',
    title: ''
  }
]

async function deleteCarReserve(id, licensePlate) {
  const upDateID = () => {
    return carDetails.value.find((car) => car.license_plate === licensePlate)
  }
  const carID = upDateID().id
  console.log(carID)
  getCarDetail(carID).then(() => {
    carDetail.value.status = 'Unreserve'
  })
  Swal.fire({
    title: 'คุณต้องการลบข้อมูลนี้หรือไม่?',
    text: 'หากต้องการลบ คุณจะไม่สามารถกู้คืนข้อมูลได้!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#099c3d',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ใช่, ลบเลย!',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteReserveCarDetail(id)
      updateCar(carID)
      toast.error('ลบข้อมูลสำเร็จ', {
        timeout: 2000
      })
    }
  })
}

const searchTerm = ref('')

const filteredCars = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return reserveCarDetails.value.filter((car) => {
    return (
      car.type_car.toLowerCase().includes(lowerCaseSearchTerm) ||
      car.namedriver.toLowerCase().includes(lowerCaseSearchTerm) ||
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
