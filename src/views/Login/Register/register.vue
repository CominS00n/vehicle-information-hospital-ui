<template>
  <n-tabs type="line" size="medium" animated>
    <n-tab-pane name="admin" tab="ผู้ดูแลระบบ">
      <register textAlert="ผู้ดูแลระบบ" />
    </n-tab-pane>
    <n-tab-pane name="employee" tab="พนักงาน">
      <register textAlert="พนักงาน" />
    </n-tab-pane>
    <n-tab-pane name="driver" tab="พนักงานขับรถ">
      <register textAlert="พนักงานขับรถ"/>
    </n-tab-pane>
  </n-tabs>
</template>

<script setup>
import register from '@/components/Register/index.vue'

</script>
