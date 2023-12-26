import axios from 'axios'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

export default function useEmployee() {
  const userDetails = ref([])
  const userDetail = ref([])
  const errors = ref([])
  const router = useRouter()

  const getUserDetails = async () => {
    const response = await axios.get('user_details')
    userDetails.value = response.data
  }

  const getUserDetail = async (id) => {
    const response = await axios.get(`user_details/${id}`)
    userDetail.value = response.data
  }

  const createUserDetail = async (data) => {
    try {
      await axios.post('user_details', data)
      await router.push({ name: 'admin-register' })
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const updateUserDetail = async (id) => {
    try {
      await axios.put(`user_details/${id}`, userDetail.value)
      await router.push({ name: 'admin-register' })
    } catch (err) {
      errors.value = err.response.data.errors
    }
  }

  const deleteUserDetail = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      return
    }
    await axios.delete(`user_details/${id}`)
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
