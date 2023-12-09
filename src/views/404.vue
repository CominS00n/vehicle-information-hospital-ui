<template>
  <div class="flex justify-center container h-screen items-center mx-auto">
    <div class="card lg:card-side bg-base-100 shadow-xl w-[420px] border">
      <div class="card-body items-center">
        <h1 class="card-title justify-center">404</h1>
        <p class="card-sub-title flex justify-center">Page Not Found</p>
        <p class="content">Sorry, We couldn't find what you are looking for!</p>
        <div class="flex justify-center mt-3">
          <router-link to="/" 
            >
            <button class="btn btn-primary btn-md"><Icon icon="heroicons-outline:arrow-long-left" />Go Home</button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon/index.vue'
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
  font-size: 10px;
  font-weight: 400;
}
</style>
