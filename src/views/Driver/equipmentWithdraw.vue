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
    <h1 class="text-2xl">เบิกอุปกรณ์</h1>
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
        <!-- head -->
        <thead>
          <tr>
            <th v-for="header in headers" class="text-base">{{ header.label }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="equipment in paginatedEquipments" class="hover:bg-slate-100 hover:shadow-md">
            <td>{{ equipment.id }}</td>
            <td>{{ equipment.name }}</td>
            <td>
              <span v-if="equipment.amount <= 0" class="badge bg-red-400 text-white"
                >Out of Stock</span
              >
              <span v-else> {{ equipment.amount }}</span>
            </td>
            <td>{{ equipment.category }}</td>
            <td>{{ equipment.detail }}</td>
            <td>
              <div class="flex gap-x-2">
                <button
                  @click="Modal = true"
                  class="btn bg-[#099c3d] text-white hover:bg-[#099c3d] font-normal"
                >
                  เบิกอุปกรณ์
                </button>
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

    <!--? Modal -->
    <n-modal
      v-model:show="Modal"
      class="custom-card rounded-lg"
      preset="card"
      style="width: 600px"
      title="เพิ่มจำนวนอุปกรณ์"
      :bordered="false"
      size="huge"
    >
      <div class="grid gap-4">
        <div>
          <textinput label="ผู้เบิกอุปกรณ์" placeholder="กรอกผู้เบิกอุปกรณ์" />
        </div>
        <div>
          <Select
            @select="handleSelectEquipment"
            :menuLists="equipmentList"
            :placeholder="'เลือกอุปกรณ์'"
            label="อุปกรณ์"
          />
        </div>
        <div>
          <textinput label="จำนวน" placeholder="จำนวน" type="number" />
        </div>
        <div>
          <textinput
            v-model="dateSelect"
            type="date"
            label="วันที่เบิกอุปกรณ์"
            placeholder=""
            disabled
          />
        </div>
      </div>
      <div class="mt-12 grid gap-y-2 md:flex md:gap-x-4">
        <div class="md:w-52 w-full">
          <router-link to="driver-car" class="w-full"
            ><button class="btn btn-outline md:w-52 w-full font-normal">ยกเลิก</button></router-link
          >
        </div>
        <div class="w-full">
          <button
            @click="submit"
            class="btn bg-[#099c3d] text-white hover:bg-[#099c3d] w-full font-normal"
          >
            บันทึก
          </button>
        </div>
      </div>
    </n-modal>
  </TransitionRoot>
</template>

<script setup>
import { ref, computed } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'
import { equipments } from '@/constant/example-table'

import Select from '@/components/Select/index.vue'
import textinput from '@/components/textinput/index.vue'
import Icon from '@/components/Icon/index.vue'

const selectEquipment = ref('')
const dateSelect = ref(new Date().toISOString().substr(0, 10))
const equipmentList = ref(['แปรงล้างรถ', 'น้ำยาล้างรถ', 'ผ้าเช็ดรถ'])

const toast = useToast()

const Modal = ref(false)

const headers = [
  {
    key: 'id',
    label: 'ไอดี'
  },
  {
    key: 'name',
    label: 'ชื่ออุปกรณ์'
  },
  {
    key: 'amount',
    label: 'จำนวน'
  },
  {
    key: 'category',
    label: 'หมวดหมู่'
  },
  {
    key: 'detail',
    label: 'รายละเอียด'
  },
  {
    key: 'action',
    label: ''
  }
]

const submit = () => {
  toast.success('บันทึกข้อมูลการเบิกเรียบร้อยแล้ว', {
    timeout: 2000
  })
  Modal.value = false
}

function handleSelectEquipment(value) {
  selectEquipment.value = value
}

const searchTerm = ref('')

const filteredEquipments = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return equipments.filter((car) => {
    return (
      car.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      car.category.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })
})

//pagination
const currentPage = ref(1)

const pageSize = 2

const totalPages = computed(() => Math.ceil(filteredEquipments.value.length / pageSize))

const paginatedEquipments = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize
  const endIndex = startIndex + pageSize
  return filteredEquipments.value.slice(startIndex, endIndex)
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
