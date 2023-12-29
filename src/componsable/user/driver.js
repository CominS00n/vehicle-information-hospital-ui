import axios from 'axios'

import { ref } from 'vue'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

const api_path = ref('driver_details')

export default function useDriver() {
  const driverDetails = ref([])
  const driverDetail = ref([])
  const errors = ref([])

  const getDriverDetails = async () => {
    const response = await axios.get(api_path.value)
    driverDetails.value = response.data
  }

  const getDriverDetail = async (id) => {
    const response = await axios.get(`${api_path.value}/${id}`)
    driverDetail.value = response.data
  }

  const createDriverDetail = async (data) => {
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

  const updateDriverDetail = async (id) => {
    try {
      await axios.put(`${api_path.value}/${id}`, driverDetail.value)
      location.reload()
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const deleteDriverDetail = async (id) => {
    await axios.delete(`${api_path.value}/${id}`)
    await getDriverDetails()
  }
  return {
    driverDetails,
    driverDetail,
    errors,
    getDriverDetails,
    getDriverDetail,
    createDriverDetail,
    updateDriverDetail,
    deleteDriverDetail
  }
}
