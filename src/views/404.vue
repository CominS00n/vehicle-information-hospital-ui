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
    <!-- <div class="flex justify-center container h-screen items-center mx-auto">
      <div class="card lg:card-side bg-base-100 shadow-xl w-[420px] border">
        <div class="card-body items-center">
          <h1 class="card-title justify-center">404</h1>
          <p class="card-sub-title flex justify-center">Page Not Found</p>
          <p class="content">Sorry, We couldn't find what you are looking for!</p>
          <div class="flex justify-center mt-3">
            <router-link to="/">
              <button class="btn bg-[#099c3d] btn-md hover:bg-[#099c3d] text-white font-normal">
                <Icon icon="heroicons-outline:arrow-left" />Go Home
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div> -->

    <div class="grid justify-center text-center items-center h-screen">
      <div class="grid gap-y-10 border px-28 py-20 rounded-lg shadow-lg">
        <div>
          <h1 class="text-7xl font-bold mb-3">404</h1>
          <p class="font-semibold text-3xl">Page Not Found</p>
          <p class="text-xl">Sorry, We couldn't find what you are looking for!</p>
        </div>
        <router-link to="/">
          <button class="btn bg-[#099c3d] btn-md hover:bg-[#099c3d] text-white font-normal">
            <Icon icon="heroicons-outline:arrow-left" />Go Home
          </button></router-link
        >
      </div>
    </div>
  </TransitionRoot>
</template>

<script setup>
import Icon from '@/components/Icon/index.vue'
import { TransitionRoot } from '@headlessui/vue'
</script>

<style scoped>
.card-title {
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.card-sub-title {
  font-size: 1.5rem;
  font-weight: 500;
}

.content {
  font-size: 16px;
  font-weight: 400;
}
</style>
