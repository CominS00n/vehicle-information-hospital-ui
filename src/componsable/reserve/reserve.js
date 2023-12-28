import axios from 'axios'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

const api_path = ref('booking_car_details')

export default function useReserve() {
  const reserveCarDetails = ref([])
  const reserveCarDetail = ref([])
  const errors = ref([])
  const router = useRouter()

  const getReserveCarDetails = async () => {
    const response = await axios.get(api_path.value)
    reserveCarDetails.value = response.data
  }

  const getReserveCarDetail = async (id) => {
    const response = await axios.get(`${api_path.value}/${id}`)
    reserveCarDetail.value = response.data
  }

  const createReserveCarDetail = async (data) => {
    try {
      await axios({
        method: 'post',
        url: api_path.value,
        data: data
      })
      await router.push({ name: 'admin-reserve' })
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
      }
    }
  }

  const updateReserveCarDetail = async (id) => {
    try {
      await axios.put(`${api_path.value}/${id}`, reserveCarDetail.value)
      await router.push({ name: 'admin-reserve' })
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const deleteReserveCarDetail = async (id) => {
    await axios.delete(`${api_path.value}/${id}`)
    await getReserveCarDetails()
  }
  return {
    reserveCarDetails,
    reserveCarDetail,
    errors,
    getReserveCarDetails,
    getReserveCarDetail,
    createReserveCarDetail,
    updateReserveCarDetail,
    deleteReserveCarDetail
  }
}
