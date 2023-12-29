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
    <h1 class="text-2xl">ข้อมูลผู้ใช้งาน</h1>
    <hr class="my-4 lg:my-6" />
    <n-tabs type="line" size="medium" animated>
      <n-tab-pane name="admin" tab="ผู้ดูแลระบบ">
        <tableAdmin />
      </n-tab-pane>
      <n-tab-pane name="employee" tab="พนักงาน">
        <tableEmployee />
      </n-tab-pane>
      <n-tab-pane name="driver" tab="พนักงานขับรถ">
        <tableDriver />
      </n-tab-pane>
    </n-tabs>
  </TransitionRoot>
</template>

<script setup>
import { TransitionRoot } from '@headlessui/vue'

import tableAdmin from './table/admin.vue'
import tableEmployee from './table/employee.vue'
import tableDriver from './table/driver.vue'
</script>