import axios from 'axios'

import { ref } from 'vue'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

const api_path = ref('admin_details')

export default function useAdmin() {
  const adminDetails = ref([])
  const adminDetail = ref([])
  const errors = ref([])

  const getAdminDetails = async () => {
    const response = await axios.get(api_path.value)
    adminDetails.value = response.data
  }

  const getAdminDetail = async (id) => {
    const response = await axios.get(`${api_path.value}/${id}`)
    adminDetail.value = response.data
  }

  const createAdminDetail = async (data) => {
    try {
      await axios({
        method: 'post',
        url: api_path.value,
        data: data
      })
      location.reload()
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
      }
    }
  }

  const updateAdminDetail = async (id) => {
    try {
      await axios.put(`${api_path.value}/${id}`, adminDetail.value)
      location.reload()
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const deleteAdminDetail = async (id) => {
    await axios.delete(`${api_path.value}/${id}`)
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
