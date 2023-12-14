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
    <h1 class="text-2xl">ลงทะเบียนผู้ใช้งาน</h1>
    <hr class="my-4 lg:my-6" />
    <n-tabs type="line" size="medium" animated>
      <n-tab-pane name="admin" tab="ผู้ดูแลระบบ">
        <register textAlert="ผู้ดูแลระบบ" />
      </n-tab-pane>
      <n-tab-pane name="employee" tab="พนักงาน">
        <register textAlert="พนักงาน" />
      </n-tab-pane>
      <n-tab-pane name="driver" tab="พนักงานขับรถ">
        <register textAlert="พนักงานขับรถ" />
      </n-tab-pane>
    </n-tabs>
  </TransitionRoot>
</template>

<script setup>
import register from '@/components/Register/index.vue'
import { TransitionRoot } from '@headlessui/vue'
</script>
