import axios from 'axios'

import { ref } from 'vue'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

const api_path = ref('ShowEquipment')

export default function useEquipmentWithdraw() {
  const equipmentWithdraws = ref([])
  const equipmentWithdraw = ref([])
  const errors = ref([])

  const getEquipmentWithdraws = async () => {
    const response = await axios.get(api_path.value)
    equipmentWithdraws.value = response.data
  }

  const getEquipmentWithdraw = async (id) => {
    const response = await axios.get(`${api_path.value}/${id}`)
    equipmentWithdraw.value = response.data
  }

  const createEquipmentWithdraws = async (data) => {
    try {
      await axios({
        method: 'post',
        url: 'EquipmentStone',
        data: data
      })
      location.reload()
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const updateEquipmentWithdraws = async (id) => {
    try {
      await axios.put(`${api_path.value}/${id}`, equipmentWithdraw.value)
      location.reload()
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const deleteEquipmentWithdraws = async (id) => {
    await axios.delete(`${api_path.value}/${id}`)
    await getEquipmentWithdraws()
  }
  return {
    equipmentWithdraws,
    equipmentWithdraw,
    errors,
    getEquipmentWithdraws,
    getEquipmentWithdraw,
    createEquipmentWithdraws,
    updateEquipmentWithdraws,
    deleteEquipmentWithdraws
  }
}
