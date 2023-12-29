import axios from 'axios'

import { ref } from 'vue'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

const api_path = ref('add_device_details')

export default function useEquipment() {
  const equipmentDetails = ref([])
  const equipmentDetail = ref([])
  const errors = ref([])

  const getEquipmentDetails = async () => {
    const response = await axios.get(api_path.value)
    equipmentDetails.value = response.data
  }

  const getEquipmentDetail = async (id) => {
    const response = await axios.get(`${api_path.value}/${id}`)
    equipmentDetail.value = response.data
  }

  const createEquipmentDetails = async (data) => {
    try {
      await axios({
        method: 'post',
        url: api_path.value,
        data: data
      })
      location.reload()
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const updateEquipmentDetails = async (id) => {
    try {
      await axios.put(`${api_path.value}/${id}`, equipmentDetail.value)
      location.reload()
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const deleteEquipmentDetails = async (id) => {
    await axios.delete(`${api_path.value}/${id}`)
    await getEquipmentDetails()
  }
  return {
    equipmentDetails,
    equipmentDetail,
    errors,
    getEquipmentDetails,
    getEquipmentDetail,
    createEquipmentDetails,
    updateEquipmentDetails,
    deleteEquipmentDetails
  }
}