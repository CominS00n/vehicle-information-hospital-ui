<template>
  <div class="flex justify-center container h-screen items-center mx-auto">
    <div class="card lg:card-side bg-base-100 shadow-xl w-[500px] border">
      <div class="card-body">
        <h5 class="card-title">Admin Login</h5>
        <textinput label="Username" classtext="w-full" />
        <textinput label="Password" />
        <div class="flex flex-col lg:flex-row mt-5 gap-4">
          <router-link to="/" class="w-full"
            ><button class="btn btn-outline w-full">Cancel</button></router-link
          >
          <router-link to="/app" class="w-full"
            ><button @click="login" class="btn btn-primary w-full">Login</button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import textinput from '@/components/textinput/index.vue'
import { useToast } from "vue-toastification"

const toast = useToast()

function login() {
  toast.success("เข้าสู่ระบบเรียบร้อยแล้ว",{
    timeout: 2000
  })
} 
</script>
