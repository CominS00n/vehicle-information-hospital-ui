import axios from 'axios'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

export default function useCar() {
  const carDetails = ref([])
  const carDetail = ref([])
  const errors = ref([])
  const router = useRouter()

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
      // await axios.post("http://127.0.0.1:8000/api/add_car_details", value);
      await axios({
        method: 'post',
        url: 'add_car_details',
        data: data
      })
      await router.push({ name: 'admin-add-car' })
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
      }
    }
  }

  const updateCar = async (id) => {
      try
      {
          await axios.put(`add_car_details/${id}`, carDetail.value);
          await router.push({ name: "admin-add-car" });
      } catch (err) {
          errors.value = err.response.data.errors;
      }
  }

  const removeCar = async (id) => {
    // if (window.confirm('Are you sure you want to delete this user?')) {
    //   return
    // }
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
