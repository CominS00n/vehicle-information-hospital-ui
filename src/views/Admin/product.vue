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
    <h1 class="text-2xl">อุปกรณ์</h1>
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
            <!-- <td>{{ equipment.id }}</td> -->
            <td>{{ equipment.namedevice }}</td>
            <td>
              <span v-if="equipment.amount <= 0" class="badge bg-red-400 text-white"
                >Out of Stock</span
              >
              <span v-else> {{ equipment.amount }}</span>
            </td>
            <td>{{ equipment.group }}</td>
            <td>{{ equipment.detail }}</td>
            <td>
              <div class="flex gap-x-2">
                <button
                  @click="openEditModal(equipment.id)"
                  class="hover:bg-slate-300 p-2 rounded-full"
                >
                  <Icon icon="heroicons-outline:pencil" class="text-xl" />
                </button>
                <button
                  @click="deleteEquipment(equipment.id)"
                  class="hover:bg-slate-300 p-2 rounded-full"
                >
                  <Icon icon="heroicons-outline:trash" class="text-xl" />
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
      v-model:show="EditModal"
      class="custom-card rounded-lg"
      preset="card"
      style="width: 600px"
      title="เพิ่มจำนวนอุปกรณ์"
      :bordered="false"
      size="huge"
    >
      <div class="grid gap-3">
        <textinput v-model="equipmentDetail.namedevice" type="text" label="ชื่ออุปกรณ์" disabled />
        <textinput v-model="equipmentDetail.group" type="text" label="หมวดหมู่" disabled />
        <textinput
          v-model="equipmentDetail.amount"
          type="number"
          label="จำนวน"
          placeholder="กรอกจำนวน"
        />
        <textinput
          v-model="equipmentDetail.detail"
          type="text"
          label="รายละเอียด"
          placeholder="กรอกรายละเอียด"
        />
      </div>

      <template #footer>
        <div class="grid gap-y-2 lg:flex gap-x-2">
          <button @click="EditModal = !EditModal" class="btn btn-outline lg:w-32 font-normal">
            ยกเลิก
          </button>
          <div class="w-full">
            <button
              @click.passive="submit(equipmentDetail.id)"
              class="btn w-full bg-[#099c3d] text-white hover:bg-[#099c3d] font-normal"
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
// import { equipments } from '@/constant/example-table'
import { useToast } from 'vue-toastification'

import useEquipment from '@/componsable/equipment/equipment'
import textinput from '@/components/textinput/index.vue'
import Icon from '@/components/Icon/index.vue'
import Swal from 'sweetalert2'

const {
  getEquipmentDetails,
  equipmentDetails,
  deleteEquipmentDetails,
  updateEquipmentDetails,
  getEquipmentDetail,
  equipmentDetail
} = useEquipment()
const toast = useToast()
const EditModal = ref(false)
const data = reactive({
  id: '',
  namedevice: '',
  amount: '',
  group: '',
  detail: ''
})

onMounted(() => {
  getEquipmentDetails()
})

function openEditModal(id) {
  EditModal.value = true
  getEquipmentDetail(id)
  data.id = equipmentDetail.value.id
  data.namedevice = equipmentDetail.value.namedevice
  data.amount = equipmentDetail.value.amount
  data.group = equipmentDetail.value.group
  data.detail = equipmentDetail.value.detail
}
function submit(id) {
  EditModal.value = false
  if (
    !data.namedevice ||
    !data.amount ||
    !data.group ||
    !data.detail
  ) {
    toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', {
      timeout: 2000
    })
    return
  } else {
    updateEquipmentDetails(id)
    toast.success('เพิ่มอุปกรณ์สำเร็จ', {
      timeout: 2000
    })
    data.namedevice = ''
    data.amount = ''
    data.group = ''
    data.detail = ''
  }
}

function deleteEquipment(id) {
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
      deleteEquipmentDetails(id)
      toast.error('ลบข้อมูลสำเร็จ', {
        timeout: 2000
      })
    }
  })
}

const headers = [
  // {
  //   key: 'id',
  //   label: 'ไอดี'
  // },
  {
    key: 'name',
    label: 'ชื่ออุปกรณ์'
  },
  {
    key: 'amount',
    label: 'จำนวน'
  },
  {
    key: 'group',
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

const searchTerm = ref('')

const filteredEquipments = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return equipmentDetails.value.filter((equipment) => {
    return (
      equipment.namedevice.toLowerCase().includes(lowerCaseSearchTerm) ||
      equipment.group.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })
})

//pagination
const currentPage = ref(1)

const pageSize = 10

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
