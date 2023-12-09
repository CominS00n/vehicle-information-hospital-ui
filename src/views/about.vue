<template>
  <div class="">
    <h1 class="text-2xl">เพิ่มข้อมูลรถ</h1>
    <hr class="my-6">
    <div class="grid grid-cols-3 gap-x-6 gap-y-7">
      <div class="w-full space-y-6">
        <textinput label="ทะเบียนรถ" />
      </div>
      <div class="w-full space-y-6">
        <textinput label="ประเภทของรถ" />
      </div>
      <div class="w-full space-y-6">
        <textinput label="เลขไมล์ของรถ" />
      </div>
      <div class="w-full space-y-6">
        <textinput label="วันที่ถ่ายน้ำมันเครื่อง(ครั้งล่าสุด)" />
      </div>
      <div class="w-full space-y-6">
        <textinput label="วันที่ถ่ายน้ำมันเบรก(ครั้งล่าสุด)" />
      </div>
    </div>
    <div class="mt-12 flex gap-x-4">
      <div>
        <button class="btn btn-outline w-52">ยกเลิก</button>
      </div>
      <div class="w-full">
        <button class="btn bg-[#099c3d] text-white hover:bg-[#099c3d] w-full">เพิ่มข้อมูล</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import textinput from '@/components/textinput/index.vue'
</script>
