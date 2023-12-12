<template>
  <n-tabs type="line" size="medium" animated>
    <n-tab-pane name="admin" tab="ผู้ดูแลระบบ">
      <registerAdmin />
    </n-tab-pane>
    <n-tab-pane name="employee" tab="พนักงาน">
      <registerEmployee />
    </n-tab-pane>
    <n-tab-pane name="driver" tab="พนักงานขับรถ">
      <registerDriver />
    </n-tab-pane>
  </n-tabs>
</template>

<script setup>
import registerAdmin from '@/components/Register/admin.vue'
import registerEmployee from '@/components/Register/employee.vue'
import registerDriver from '@/components/Register/driver.vue'
</script>
