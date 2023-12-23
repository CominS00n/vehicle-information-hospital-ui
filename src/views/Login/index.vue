<template>
  <div class="grid gap-y-5 lg:flex items-center h-screen lg:gap-x-5 justify-evenly container mx-auto">
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
      <div class="card lg:w-[400px] bg-base-100 shadow-xl border">
        <figure class="px-10 pt-10">
          <img
            src="https://img.freepik.com/free-vector/flat-customer-support-illustration_23-2148899113.jpg?w=740&t=st=1702239136~exp=1702239736~hmac=537da9a2cb0ca6a515f0171353556ade822472ebf7af3afc7dc6b2669eba9c26"
            alt="Shoes"
            class="rounded-xl h-[300px]"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">ผู้ดูแลระบบ</h2>
          <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
          <div class="card-actions">
            <router-link to="/login-admin"
              ><button class="btn bg-[#099c3d] hover:bg-[#099c3d] text-white w-32 font-normal">
                เข้าสู่ระบบ
              </button></router-link
            >
          </div>
        </div>
      </div>
    </TransitionRoot>

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
      <div class="card lg:w-[400px] bg-base-100 shadow-xl border">
        <figure class="px-10 pt-10">
          <img
            src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1702239425~exp=1702240025~hmac=74f2829ee44571098498b7d3076cad0d261f1d2f785a65633244a51b937f5f21"
            alt="Shoes"
            class="rounded-xl h-[300px]"
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">พนักงานทั่วไป</h2>
          <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
          <div class="card-actions">
            <router-link to="/login-employee"
              ><button class="btn bg-[#099c3d] hover:bg-[#099c3d] text-white w-32 font-normal">
                เข้าสู่ระบบ
              </button></router-link
            >
          </div>
        </div>
      </div>
    </TransitionRoot>

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
      <div class="card lg:w-[400px] bg-base-100 shadow-xl border">
        <figure class="px-10 pt-10">
          <img
            src="https://img.freepik.com/free-vector/driving-concept-illustration_114360-14312.jpg?w=740&t=st=1702239486~exp=1702240086~hmac=42cdef236f853886f51eeeec94842212089c4b25bc12c3e2e72cdc7e0b70b89f"
            alt="Shoes"
            class="rounded-xl h-[300px] "
          />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">พนักงานขับรถ</h2>
          <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
          <div class="card-actions">
            <router-link to="/login-driver"
              ><button class="btn bg-[#099c3d] hover:bg-[#099c3d] text-white w-32 font-normal">
                เข้าสู่ระบบ
              </button></router-link
            >
          </div>
        </div>
      </div>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { TransitionRoot } from '@headlessui/vue'
</script>
