<template>
  <div class="flex justify-center items-center h-screen gap-x-5">
    <div class="card w-64 bg-base-100 shadow-xl">
      <figure class="px-10 pt-10">
        <img
          src="../../image/user.jpg"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">User</h2>
        <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
        <div class="card-actions">
          <router-link to="/login-user"
            ><button class="btn btn-primary btn-sm">Login</button></router-link
          >
        </div>
      </div>
    </div>

    <div class="card w-64 bg-base-100 shadow-xl">
      <figure class="px-10 pt-10">
        <img
          src="../../image/admin-text.jpg"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">Admin</h2>
        <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
        <div class="card-actions">
          <router-link to="/login-admin"
            ><button class="btn btn-primary btn-sm">Login</button></router-link
          >
        </div>
      </div>
    </div>

    <div class="card w-64 bg-base-100 shadow-xl">
      <figure class="px-10 pt-10">
        <img
          src="../../image/car.jpg"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">Other</h2>
        <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
        <div class="card-actions">
          <router-link to="/login-other"
            ><button class="btn btn-primary btn-sm">Login</button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
