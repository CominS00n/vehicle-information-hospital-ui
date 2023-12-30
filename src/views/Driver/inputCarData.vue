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
    <div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th v-for="header in headers" class="text-base">{{ header.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(car, i) in paginatedCarReservation"
              class="hover:bg-slate-100 hover:shadow-md"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ car.booking_date }}</td>
              <td>{{ car.time }}</td>
              <td>{{ car.nameuser }}</td>
              <td>{{ car.namedriver }}</td>
              <td>{{ car.location }}</td>
              <td>{{ car.type_car }}</td>
              <td>{{ car.license_plate }}</td>
              <td>
                <div class="space-x-2">
                  <button
                    class="btn bg-[#099c3d] text-white hover:bg-[#099c3d] font-normal"
                    @click="openReportModal(car.id)"
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
        <textinput v-model="reserveCarDetail.booking_date" label="วันที่" disabled />
        <textinput v-model="reserveCarDetail.namedriver" label="คนขับ" disabled />
        <textinput v-model="reserveCarDetail.license_plate" label="เลขทะเบียนรถ" disabled />
        <textinput
          v-model="data.details"
          label="รายละเอียด"
          placeholder="กรอกรายละเอียดการใช้งาน"
        />
        <div>
          <div class="divider text-slate-500">เวลา</div>
          <div class="grid gap-y-2 lg:flex gap-x-2">
            <textinput
              v-model="data.time_out"
              label="ออก"
              type="time"
              class="w-full"
              :disabled="data.time_out !== ''"
            />
            <textinput v-model="data.time_in" label="เข้า" type="time" class="w-full" />
          </div>
        </div>
        <div>
          <div class="divider text-slate-500">เลขไมล์</div>
          <div class="grid gap-y-2 lg:flex gap-x-2">
            <textinput
              v-model="reserveCarDetail.mileage"
              label="ออก"
              type="number"
              class="w-full"
              disabled
            />
            <textinput
              v-model="data.in_mileage"
              label="เข้า"
              type="number"
              class="w-full"
              placeholder="กรอกเลขไมล์หลังใช้งาน"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <div class="grid gap-y-2 lg:flex gap-x-2">
          <button @click="openModal = !openModal" class="btn btn-outline lg:w-32 font-normal">
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
import { ref, computed, onMounted, reactive } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
// import { carReservations } from '@/constant/example-table'
import { useToast } from 'vue-toastification'

import useReserve from '@/componsable/reserve/reserve'
import useCarUse from '@/componsable/car/carUse'
import useCar from '@/componsable/car/cars'
import textinput from '@/components/textinput/index.vue'
import Icon from '@/components/Icon/index.vue'

const {
  getReserveCarDetails,
  reserveCarDetails,
  getReserveCarDetail,
  reserveCarDetail,
  updateReserveCarDetail
} = useReserve()
const { createCarUse } = useCarUse()
const { carDetails, updateCar, getCarDetails, carDetail, getCarDetail } = useCar()

onMounted(() => {
  getReserveCarDetails()
  getCarDetails()
})

const openModal = ref(false)
// const inputDate = ref('')
const updateID = ref('')

const data = reactive({
  date: '',
  name_driver: '',
  license_plate: '',
  time_out: '',
  time_in: '',
  out_mileage: '',
  in_mileage: '',
  details: ''
})

const toast = useToast()

function openReportModal(id) {
  openModal.value = true
  updateID.value = id
  getReserveCarDetail(id).then(() => {
    data.date = reserveCarDetail.value.booking_date
    data.name_driver = reserveCarDetail.value.namedriver
    data.license_plate = reserveCarDetail.value.license_plate
    data.out_mileage = reserveCarDetail.value.mileage
    console.log(data)
  })
}

function submit() {
  if (
    data.date === '' ||
    data.name_driver === '' ||
    data.license_plate === '' ||
    data.time_out === '' ||
    data.time_in === '' ||
    data.in_mileage === '' ||
    data.out_mileage === ''
  ) {
    toast.error('กรุณากรอกข้อมูลให้ครบ', {
      timeout: 2000
    })
  } else {
    const updateCarID = () => {
      return carDetails.value.find(
        (car) => car.license_plate === reserveCarDetail.value.license_plate
      )
    }
    const carID = updateCarID().id
    getCarDetail(carID).then(() => {
      console.log(carDetail.value)
      carDetail.value.status = 'Unreserve'
      carDetail.value.in_mileage = data.in_mileage
      updateCar(carID)
      console.log(carDetail.value)
    })
    reserveCarDetail.value.status = 'Unreserve'
    updateReserveCarDetail(updateID.value)
    createCarUse(data)
    toast.success('บันทึกข้อมูลสำเร็จ', {
      timeout: 2000
    })
    openModal.value = false
  }
}

const headers = [
  {
    key: 'id',
    label: 'ลำดับ'
  },
  {
    key: 'date',
    label: 'วันที่จอง'
  },
  {
    key: 'time',
    label: 'เวลาที่จอง'
  },
  {
    key: 'nameReserve',
    label: 'ชื่อผู้จอง'
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
  return reserveCarDetails.value.filter((carReservation) => {
    return (
      (carReservation.namedriver.toLowerCase().includes(lowerCaseSearchTerm) ||
        carReservation.type_car.toLowerCase().includes(lowerCaseSearchTerm) ||
        carReservation.license_plate.toLowerCase().includes(lowerCaseSearchTerm) ||
        carReservation.nameuser.toLowerCase().includes(lowerCaseSearchTerm)) &&
      carReservation.status === 'Reserve'
    )
  })
})

//pagination
const currentPage = ref(1)

const pageSize = 10

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
