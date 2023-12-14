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
    <h1 class="text-2xl">อุปกรณ์</h1>
    <hr class="my-4 lg:my-6" />
    ว่างเปล่า
  </TransitionRoot>
</template>

<script setup>
import { TransitionRoot } from '@headlessui/vue'
</script>
