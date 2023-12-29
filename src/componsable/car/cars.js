import axios from 'axios'

import { ref } from 'vue'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

const api_path = ref('add_car_details')

export default function useCar() {
  const carDetails = ref([])
  const carDetail = ref([])
  const errors = ref([])

  const getCarDetails = async () => {
    const response = await axios.get('add_car_details')
    carDetails.value = response.data
  }

  const getCarDetail = async (id) => {
    const response = await axios.get(`add_car_details/${id}`)
    carDetail.value = response.data
  }

  const addCarDetail = async (data) => {
    try {
      await axios({
        method: 'post',
        url: 'add_car_details',
        data: data
      })
      location.reload()
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
      }
    }
  }

  const updateCar = async (id) => {
    try {
      await axios.put(`${api_path.value}/${id}`, carDetail.value)
      location.reload()
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const removeCar = async (id) => {
    await axios.delete(`add_car_details/${id}`)
    await getCarDetails()
  }
  return {
    carDetails,
    carDetail,
    errors,
    getCarDetails,
    getCarDetail,
    addCarDetail,
    updateCar,
    removeCar
  }
}
