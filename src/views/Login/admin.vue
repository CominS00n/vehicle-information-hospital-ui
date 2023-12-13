<template>
  <TransitionRoot
    appear
    :show="true"
    enter="ease-out duration-300"
    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    enter-to="opacity-100 translate-y-0 sm:scale-100"
    leave="ease-in duration-200"
    leave-from="opacity-100 translate-y-0 sm:scale-100"
    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  >
    <div class="flex justify-center container h-screen items-center mx-auto">
      <div class="card lg:card-side bg-base-100 shadow-xl w-[500px] border">
        <div class="card-body">
          <h5 class="card-title">เข้าสู่ระบบด้วยบัญชีผู้ดูแล</h5>
          <textinput
            v-model="username"
            value="User 1"
            label="ชื่อผู้ใช้งาน"
            placeholder="กรอกชื่อผู้ใช้งาน"
          />
          <textinput
            v-model="password"
            value="123456"
            type="password"
            label="รหัสผ่าน"
            placeholder="กรอกรหัสผ่าน"
          />
          <div class="flex flex-col lg:flex-row mt-5 gap-4">
            <router-link to="/" class="w-full"
              ><button class="btn btn-outline w-full font-normal">ยกเลิก</button></router-link
            >
            <router-link :to="isLoggedIn ? '/admin' : '/login-admin'" class="w-full"
              ><button
                @click="login"
                class="btn bg-[#099c3d] hover:bg-[#099c3d] text-white w-full font-normal"
              >
                เข้าสู่ระบบ
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { TransitionRoot } from '@headlessui/vue'
import { Admin } from '@/constant/user'
import { saveUserInfo } from '@/constant/accountLogin'

import textinput from '@/components/textinput/index.vue'

const toast = useToast()

const username = ref('ComingS00n')
const password = ref('2sas0fsc0')
const isLoggedIn = ref(false)

const account = ref({
  username: username,
  password: password
})

function login() {
  const foundAdmin = Admin.find(
    (item) => item.Username === username.value && item.Password === password.value
  )

  if (foundAdmin) {
    account.value = foundAdmin
    isLoggedIn.value = true
    saveUserInfo({
      username: username.value,
      firstname: foundAdmin.Fristname,
      lastname: foundAdmin.Lastname
    })
    toast.success('เข้าสู่ระบบเรียบร้อยแล้ว', { timeout: 2000 })
  } else {
    username.value = ''
    password.value = ''
    toast.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', { timeout: 2000 })
  }
}
</script>
