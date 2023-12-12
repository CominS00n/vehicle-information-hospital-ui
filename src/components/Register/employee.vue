<template>
  <div>
    <div class="flex gap-x-6 mt-6">
      <div class="w-full">
        <textinput label="ชื่อ" classtext="w-full" />
      </div>
      <div class="w-full">
        <textinput label="นามสกุล" classtext="w-full" />
      </div>
    </div>
    <div class="flex gap-x-6 mt-6">
      <div class="w-full">
        <textinput label="ตำแหน่ง" classtext="w-full" />
      </div>
      <div class="w-full">
        <textinput label="แผนก /ฝ่าย" classtext="w-full" />
      </div>
    </div>
    <div class="flex gap-x-6 mt-6">
      <div class="w-full">
        <textinput label="ที่อยู่" classtext="w-full" />
      </div>
    </div>

    <!-- ? user & passsword -->
    <div class="flex gap-x-6 mt-6">
      <div class="w-full">
        <textinput label="เบอร์โทร" classtext="w-full" />
      </div>
      <div class="w-full">
        <textinput type="email" label="Email" classtext="w-full" />
      </div>
    </div>
    <div class="flex flex-col gap-y-6 mt-6">
      <div class="w-full">
        <textinput label="ชื่อผู้ใช้งาน" classtext="w-full" />
      </div>
      <div class="w-full">
        <textinput type="password" label="Password" classtext="w-full" />
      </div>
      <div class="w-full">
        <textinput type="password" label="Confirm Password" classtext="w-full" />
      </div>
    </div>
  </div>

  <!-- ? button -->
  <div class="grid gap-y-2 lg:flex gap-x-2 mt-6 ">
    <div class="lg:w-48 w-full">
      <button class="btn btn-outline lg:w-48 w-full font-normal">ยกเลิก</button>
    </div>
    <div class="w-full">
      <button
        @click="submit"
        class="btn bg-[#099c3d] hover:bg-[#099c3d] text-white w-full font-normal"
      >
        สมัครสมาชิก
      </button>
    </div>
  </div>
</template>

<script setup>
import textinput from '@/components/textinput/index.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

async function submit() {
  toast.success('สมัครสมาชิก "พนักงาน" เรียบร้อยแล้ว', {
    timeout: 2000
  })
}
</script>
