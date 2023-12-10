<template>
  <div class="grid gap-y-5  lg:flex items-center h-screen lg:gap-x-5 justify-evenly">
    <div class="card lg:w-[400px] bg-base-100 shadow-xl border">
      <figure class="px-10 pt-10">
        <img
          src="https://images.pexels.com/photos/2409566/pexels-photo-2409566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">User</h2>
        <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
        <div class="card-actions">
          <router-link to="/login-user"
            ><button class="btn bg-[#099c3d] hover:bg-[#099c3d] text-white w-32">เข้าสู่ระบบ</button></router-link
          >
        </div>
      </div>
    </div>

    <div class="card lg:w-[400px] bg-base-100 shadow-xl border">
      <figure class="px-10 pt-10">
        <img
          src="https://images.pexels.com/photos/9180717/pexels-photo-9180717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">Admin</h2>
        <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
        <div class="card-actions">
          <router-link to="/login-admin"
            ><button class="btn bg-[#099c3d] hover:bg-[#099c3d] text-white w-32">เข้าสู่ระบบ</button></router-link
          >
        </div>
      </div>
    </div>

    <div class="card lg:w-[400px] bg-base-100 shadow-xl border">
      <figure class="px-10 pt-10">
        <img
          src="https://images.pexels.com/photos/104836/speed-car-vehicle-drive-104836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">Other</h2>
        <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
        <div class="card-actions">
          <router-link to="/login-other"
            ><button class="btn bg-[#099c3d] hover:bg-[#099c3d] text-white w-32">เข้าสู่ระบบ</button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
