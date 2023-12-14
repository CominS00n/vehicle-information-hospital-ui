<template>
  <div>
    <div class="flex gap-x-6 mt-6">
      <div class="w-full">
        <textinput v-model="name" placeholder="กรอกชื่อ" label="ชื่อ" classtext="w-full" />
      </div>
      <div class="w-full">
        <textinput
          v-model="lastname"
          placeholder="กรอกนามสกุล"
          label="นามสกุล"
          classtext="w-full"
        />
      </div>
    </div>
    <div class="flex gap-x-6 mt-6">
      <div class="w-full">
        <textinput
          v-model="position"
          placeholder="กรอกตำแหน่ง"
          label="ตำแหน่ง"
          classtext="w-full"
        />
      </div>
      <div class="w-full">
        <textinput
          v-model="department"
          placeholder="กรอกแผนก /ฝ่าย"
          label="แผนก /ฝ่าย"
          classtext="w-full"
        />
      </div>
    </div>
    <div class="flex gap-x-6 mt-6">
      <div class="w-full">
        <textinput v-model="address" placeholder="กรอกที่อยู่" label="ที่อยู่" classtext="w-full" />
      </div>
    </div>

    <!-- ? user & passsword -->
    <div class="flex gap-x-6 mt-6">
      <div class="w-full">
        <textinput v-model="phone" placeholder="กรอกเบอร์โทร" label="เบอร์โทร" classtext="w-full" />
      </div>
      <div class="w-full">
        <textinput
          v-model="email"
          placeholder="กรอกอีเมล"
          type="email"
          label="อีเมล"
          classtext="w-full"
        />
      </div>
    </div>
    <div class="flex flex-col gap-y-6 mt-6">
      <div class="w-full">
        <textinput
          v-model="username"
          placeholder="กรอกชื่อผู้ใช้งาน"
          label="ชื่อผู้ใช้งาน"
          classtext="w-full"
        />
      </div>
      <div class="w-full">
        <textinput
          v-model="password"
          placeholder="กรอกหรัสผ่าน"
          type="password"
          label="Password"
          classtext="w-full"
          password
        />
      </div>
      <div class="w-full">
        <textinput
          v-model="confirmpassword"
          placeholder="ยืนยันรหัสผ่าน"
          type="password"
          label="Confirm Password"
          classtext="w-full"
          password
        />
      </div>
    </div>
  </div>

  <!-- ? button -->
  <div class="mt-6 grid gap-y-2 md:flex md:gap-x-4">
    <div class="md:w-52 w-full">
      <router-link to="" class="w-full"
        ><button @click="cancel" class="btn btn-outline md:w-52 w-full font-normal">ยกเลิก</button></router-link
      >
    </div>
    <div class="w-full">
      <button
        @click="submit"
        class="btn bg-[#099c3d] text-white hover:bg-[#099c3d] w-full font-normal"
      >
      สมัครสมาชิก
      </button>
    </div>
  </div>
</template>

<script>
import textinput from '@/components/textinput/index.vue'
import { useToast } from 'vue-toastification'

export default {
  components: {
    textinput
  },
  data() {
    return {
      name: '',
      lastname: '',
      position: '',
      department: '',
      address: '',
      phone: '',
      email: '',
      username: '',
      password: '',
      confirmpassword: '',
      toast: useToast()
    }
  },
  props: {
    textAlert: {
      type: String,
      default: ''
    }
  },
  methods: {
    submit() {
      if (
        this.name === '' ||
        this.lastname === '' ||
        this.position === '' ||
        this.department === '' ||
        this.address === '' ||
        this.phone === '' ||
        this.email === '' ||
        this.username === '' ||
        this.password === '' ||
        this.confirmpassword === ''
      ) {
        this.toast.error('กรุณากรอกข้อมูลให้ครบ', {
          timeout: 2000
        })
      } else if (this.password !== this.confirmpassword) {
        this.toast.error('รหัสผ่านไม่ตรงกัน', {
          timeout: 2000
        })
        this.password = ''
        this.confirmpassword = ''
      } else {
        this.toast.success(`สมัครสมาชิก ${this.textAlert} เรียบร้อยแล้ว`, {
          timeout: 2000
        })
      }
    },
    cancel() {
      this.name = ''
      this.lastname = ''
      this.position = ''
      this.department = ''
      this.address = ''
      this.phone = ''
      this.email = ''
      this.username = ''
      this.password = ''
      this.confirmpassword = ''
    }
  }
}
</script>
