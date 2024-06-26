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
    <h1 class="text-2xl">ข้อมูลรถ</h1>
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
              <td>{{ car.lastChangeOil }}</td>
              <td>{{ car.lastChangeBrake }}</td>
              <td>
                <!-- <button @click="openDetailModal = !openDetailModal">
                  <Icon icon="heroicons-outline:pencil-square" class="text-xl" />
                </button> -->
                <button @click="deleteCar" class="hover:bg-slate-300 p-2 rounded-full">
                  <Icon icon="heroicons-outline:trash" class="text-xl" />
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
        <button
          @click="openDetailModal = !openDetailModal"
          class="btn btn-outline w-32 font-normal"
        >
          ยกเลิก
        </button>
        <div class="w-full">
          <button
            @click="submit"
            class="btn w-full bg-[#099c3d] text-white hover:bg-[#099c3d] font-normal"
          >
            บันทึก
          </button>
        </div>
      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, computed } from 'vue'
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

async function deleteCar() {
  toast.error('ลบข้อมูลสำเร็จ', {
    timeout: 2000
  })
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
