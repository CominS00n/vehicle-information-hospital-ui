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
          <h5 class="card-title">User Login</h5>
          <textinput label="Username" classtext="w-full" />
          <textinput label="Password" />
          <div class="flex flex-col lg:flex-row mt-5 gap-4">
            <router-link to="/" class="w-full"
              ><button class="btn btn-outline w-full font-normal">ยกเลิก</button></router-link
            >
            <router-link to="/app" class="w-full"
              ><button @click="login" class="btn bg-[#099c3d] hover:bg-[#099c3d] text-white w-full font-normal">
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
import textinput from '@/components/textinput/index.vue'
import { useToast } from 'vue-toastification'
import { TransitionRoot } from '@headlessui/vue'

const toast = useToast()

function login() {
  toast.success('เข้าสู่ระบบเรียบร้อยแล้ว', {
    timeout: 2000
  })
}
</script>
