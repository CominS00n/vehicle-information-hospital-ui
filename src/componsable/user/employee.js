import axios from 'axios'

import { ref } from 'vue'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

const api_path = ref('user_details')

export default function useEmployee() {
  const userDetails = ref([])
  const userDetail = ref([])
  const errors = ref([])

  const getUserDetails = async () => {
    const response = await axios.get(api_path.value)
    userDetails.value = response.data
  }

  const getUserDetail = async (id) => {
    const response = await axios.get(`${api_path.value}/${id}`)
    userDetail.value = response.data
  }

  const createUserDetail = async (data) => {
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

  const updateUserDetail = async (id) => {
    try {
      await axios.put(`${api_path.value}/${id}`, userDetail.value)
      location.reload()
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const deleteUserDetail = async (id) => {
    await axios.delete(`${api_path.value}/${id}`)
    await getUserDetails()
  }
  return {
    userDetails,
    userDetail,
    errors,
    getUserDetails,
    getUserDetail,
    createUserDetail,
    updateUserDetail,
    deleteUserDetail
  }
}
