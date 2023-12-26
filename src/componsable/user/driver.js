import axios from 'axios'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

export default function useDriver() {
  const driverDetails = ref([])
  const driverDetail = ref([])
  const errors = ref([])
  const router = useRouter()

  const getDriverDetails = async () => {
    const response = await axios.get('driver_details')
    driverDetails.value = response.data
  }

  const getDriverDetail = async (id) => {
    const response = await axios.get(`driver_details/${id}`)
    driverDetail.value = response.data
  }

  const createDriverDetail = async (data) => {
    try {
      await axios({
        method: 'post',
        url: 'driver_details',
        data: data
      })
      await router.push({ name: 'admin-register' })
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const updateAdminDetail = async (id) => {
    try {
      await axios.put(`driver_details/${id}`, driverDetail.value)
      await router.push({ name: 'admin-register' })
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const deleteAdminDetail = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      return
    }
    await axios.delete(`driver_details/${id}`)
    await getDriverDetails()
  }
  return {
    driverDetails,
    driverDetail,
    errors,
    getDriverDetails,
    getDriverDetail,
    createDriverDetail,
    updateAdminDetail,
    deleteAdminDetail
  }
}
