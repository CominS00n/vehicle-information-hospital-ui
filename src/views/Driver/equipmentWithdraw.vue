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
          <tr
            v-for="(equipment, i) in paginatedEquipments"
            class="hover:bg-slate-100 hover:shadow-md"
          >
            <td>{{ i + 1 }}</td>
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
                  @click="openModal(equipment.id)"
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
      title="เบิกอุปกรณ์"
      :bordered="false"
      size="huge"
    >
      <div class="grid gap-4">
        <div>
          <textinput
            v-model="data.name"
            label="ผู้เบิกอุปกรณ์"
            placeholder="กรอกผู้เบิกอุปกรณ์"
          />
        </div>
        <div>
          <textinput
            v-model="equipmentDetail.namedevice"
            label="อุปกรณ์"
            placeholder="อุปกรณ์"
            disabled
          />
        </div>
        <div>
          <textinput
            v-model="quantity"
            label="จำนวน"
            :placeholder="`จำนวนทั้งหมดที่มี ${data.amount} ชิ้น`"
            type="number"
            :max="data.amount"
            min="0"
          />
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
            @click="submit(equipmentDetail.id)"
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
import { ref, computed, onMounted, reactive } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import { useToast } from 'vue-toastification'
import { getUserInfo } from '@/constant/accountLogin'

import useEquipment from '@/componsable/equipment/equipment'
import useEquipmentWithdraw from '@/componsable/equipment/equipmentWithdraw'
import textinput from '@/components/textinput/index.vue'
import Icon from '@/components/Icon/index.vue'

const {
  getEquipmentDetails,
  equipmentDetails,
  updateEquipmentDetails,
  getEquipmentDetail,
  equipmentDetail
} = useEquipment()
const { createEquipmentWithdraws } = useEquipmentWithdraw()

const account = getUserInfo()

onMounted(() => {
  getEquipmentDetails()
})

const dateSelect = ref(new Date().toISOString().substr(0, 10))
const data = reactive({
  name: account.firstname + ' ' + account.lastname,
  namedevice: '',
  amount: '',
  date: dateSelect.value
})

const quantity = ref()

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

const submit = (id) => {
  if (!data.name || !data.namedevice || !data.amount || !data.date || !quantity.value) {
    toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', {
      timeout: 2000
    })
    quantity.value = ''
  } else {
    if (quantity.value > data.amount) {
      toast.error('จำนวนไม่พอสำหรับเบิก', {
        timeout: 2000
      })
      quantity.value = ''
    } else {
      data.amount = data.amount - quantity.value
      equipmentDetail.value.amount = data.amount
      console.log(equipmentDetail.value.amount)
      updateEquipmentDetails(id)
      data.amount = quantity.value
      console.log(data)
      createEquipmentWithdraws(data)
      quantity.value = ''
      toast.success('บันทึกข้อมูลการเบิกเรียบร้อยแล้ว', {
        timeout: 2000
      })
      Modal.value = false
    }
  }
}

function openModal(id) {
  Modal.value = true
  getEquipmentDetail(id).then(() => {
    data.namedevice = equipmentDetail.value.group
    data.amount = equipmentDetail.value.amount
  })
}


const searchTerm = ref('')

const filteredEquipments = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return equipmentDetails.value.filter((car) => {
    return (
      car.namedevice.toLowerCase().includes(lowerCaseSearchTerm) ||
      car.group.toLowerCase().includes(lowerCaseSearchTerm)
    )
  })
})

// //pagination
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
