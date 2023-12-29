import axios from 'axios'

import { ref } from 'vue'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

const api_path = ref('CarUsageStone')

export default function useCarUse() {
  const carUseDetails = ref([])
  const errors = ref([])

  const getCarUseDetails = async () => {
    const response = await axios.get('ShowCarUsage')
    carUseDetails.value = response.data
  }

  const createCarUse = async (data) => {
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

  return {
    carUseDetails,
    errors,
    createCarUse,
    getCarUseDetails
  }
}
