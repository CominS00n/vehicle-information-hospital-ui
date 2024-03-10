<template>
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
          <tr v-for="(user, i) in paginatedCars" :key="i" :class="`${i % 2 !== 0? 'bg-gray-100' : ''} hover:bg-slate-100 hover:shadow-md`">
            <td>{{ i + 1 }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.position }}</td>
            <td>{{ user.department }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.phone_number }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="deleteUserAdmin(user.id)" :class="account.id === user.id ? '' :'hover:bg-slate-300 p-2 rounded-full'" :disabled="account.id === user.id">
                <Icon icon="heroicons-outline:trash" :class="account.id === user.id ? 'text-xl text-slate-400' : 'text-xl text-[#ef1822]'" />
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { getUserInfo } from '@/constant/accountLogin'

import userAdmin from '@/componsable/user/admin'
import Icon from '@/components/Icon/index.vue'
import textinput from '@/components/textinput/index.vue'
import Swal from 'sweetalert2'

const { adminDetails, getAdminDetails, deleteAdminDetail } = userAdmin()
const account = getUserInfo()

onMounted(() => {
  getAdminDetails()
})

const toast = useToast()

const headers = [
  {
    key: 'id',
    title: 'ลำดับ'
  },
  {
    key: 'firstname',
    title: 'ชื่อ'
  },
  {
    key: 'lastname',
    title: 'นามสกุล'
  },
  {
    key: 'position',
    title: 'ตำแหน่ง'
  },
  {
    key: 'department',
    title: 'แผนก'
  },
  {
    key: 'address',
    title: 'ที่อยู่'
  },
  {
    key: 'phoneNumber',
    title: 'เบอร์โทร'
  },
  {
    key: 'email',
    title: 'อีเมล'
  },
  {
    key: 'action',
    title: ''
  }
]

async function deleteUserAdmin(id) {
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
      deleteAdminDetail(id)
      toast.error('ลบข้อมูลสำเร็จ', {
        timeout: 2000
      })
    }
  })
}

const searchTerm = ref('')

const filteredCars = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return adminDetails.value.filter((user) => {
    return (
      user.first_name.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.last_name.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.position.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.department.toLowerCase().includes(lowerCaseSearchTerm)
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
