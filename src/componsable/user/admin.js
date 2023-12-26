import axios from 'axios'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

export default function useAdmin() {
  const adminDetails = ref([])
  const adminDetail = ref([])
  const errors = ref([])
  const router = useRouter()

  const getAdminDetails = async () => {
    const response = await axios.get('admin_details')
    adminDetails.value = response.data
  }

  const getAdminDetail = async (id) => {
    const response = await axios.get(`admin_details/${id}`)
    adminDetail.value = response.data
  }

  const createAdminDetail = async (data) => {
    try {
      await axios({
        method: 'post',
        url: 'admin_details',
        data: data
      })
      await router.push({ name: 'admin-register' })
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const updateAdminDetail = async (id) => {
    try {
      await axios.put(`admin_details/${id}`, adminDetail.value)
      await router.push({ name: 'admin-register' })
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const deleteAdminDetail = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      return
    }
    await axios.delete(`admin_details/${id}`)
    await getAdminDetails()
  }
  return {
    adminDetails,
    adminDetail,
    errors,
    getAdminDetails,
    getAdminDetail,
    createAdminDetail,
    updateAdminDetail,
    deleteAdminDetail
  }
}
