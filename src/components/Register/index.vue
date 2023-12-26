<template>
  <div>
    <div class="flex gap-x-6 mt-6">
      <div class="w-full">
        <textinput
          v-model="value.first_name"
          placeholder="กรอกชื่อ"
          label="ชื่อ"
          classtext="w-full"
        />
      </div>
      <div class="w-full">
        <textinput
          v-model="value.last_name"
          placeholder="กรอกนามสกุล"
          label="นามสกุล"
          classtext="w-full"
        />
      </div>
    </div>
    <div class="flex gap-x-6 mt-6">
      <div class="w-full">
        <textinput
          v-model="value.position"
          placeholder="กรอกตำแหน่ง"
          label="ตำแหน่ง"
          classtext="w-full"
        />
      </div>
      <div class="w-full">
        <textinput
          v-model="value.department"
          placeholder="กรอกแผนก /ฝ่าย"
          label="แผนก /ฝ่าย"
          classtext="w-full"
        />
      </div>
    </div>
    <div class="flex gap-x-6 mt-6">
      <div class="w-full">
        <textinput
          v-model="value.address"
          placeholder="กรอกที่อยู่"
          label="ที่อยู่"
          classtext="w-full"
        />
      </div>
    </div>

    <!-- ? user & passsword -->
    <div class="flex gap-x-6 mt-6">
      <div class="w-full">
        <textinput
          v-model="value.phone_number"
          placeholder="กรอกเบอร์โทร"
          label="เบอร์โทร"
          classtext="w-full"
        />
      </div>
      <div class="w-full">
        <textinput
          v-model="value.email"
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
          v-model="value.username"
          placeholder="กรอกชื่อผู้ใช้งาน"
          label="ชื่อผู้ใช้งาน"
          classtext="w-full"
        />
      </div>
      <div class="w-full">
        <textinput
          v-model="value.password"
          placeholder="กรอกหรัสผ่าน"
          type="password"
          label="Password"
          classtext="w-full"
          password
        />
      </div>
      <div class="w-full">
        <textinput
          v-model="value.confirmPassword"
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
        ><button @click="cancel" class="btn btn-outline md:w-52 w-full font-normal">
          ยกเลิก
        </button></router-link
      >
    </div>
    <div class="w-full">
      <button
        @click="submit(value)"
        class="btn bg-[#099c3d] text-white hover:bg-[#099c3d] w-full font-normal"
      >
        สมัครสมาชิก
      </button>
    </div>
  </div>
</template>

<script>
import textinput from '@/components/textinput/index.vue'
import useAdmin from '@/componsable/user/admin'
import useEmployee from '@/componsable/user/employee'
import useDriver from '@/componsable/user/driver'

import { useToast } from 'vue-toastification'
import { reactive } from 'vue'

export default {
  components: {
    textinput
  },
  data() {
    const { createAdminDetail } = useAdmin()
    const { createUserDetail } = useEmployee()
    const { createDriverDetail } = useDriver()
    const value = reactive({
      first_name: '',
      last_name: '',
      position: '',
      department: '',
      address: '',
      phone_number: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    })
    return {
      toast: useToast(),
      createAdminDetail,
      createUserDetail,
      createDriverDetail,
      value
    }
  },
  props: {
    textAlert: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.createAdminDetail()
  },
  methods: {
    submit(value) {
      if (
        this.value.first_name === '' ||
        this.value.last_name === '' ||
        this.value.position === '' ||
        this.value.department === '' ||
        this.value.address === '' ||
        this.value.phone_number === '' ||
        this.value.email === '' ||
        this.value.username === '' ||
        this.value.password === '' ||
        this.value.confirmPassword === ''
      ) {
        this.toast.error('กรุณากรอกข้อมูลให้ครบ', {
          timeout: 2000
        })
      } else if (this.value.password !== this.value.confirmPassword) {
        this.toast.error('รหัสผ่านไม่ตรงกัน', {
          timeout: 2000
        })
        this.value.password = ''
        this.value.confirmPassword = ''
      } else {
        if (this.textAlert === 'ผู้ดูแลระบบ') {
          this.createAdminDetail(value)
          this.toast.success(`สมัครสมาชิก ${this.textAlert} เรียบร้อยแล้ว`, {
            timeout: 2000
          })
          this.cancel()
        } else if (this.textAlert === 'พนักงาน') {
          this.createUserDetail(value)
          this.toast.success(`สมัครสมาชิก ${this.textAlert} เรียบร้อยแล้ว`, {
            timeout: 2000
          })
          this.cancel()
        } else if (this.textAlert === 'พนักงานขับรถ') {
          this.createUserDetail(value)
          this.toast.success(`สมัครสมาชิก ${this.textAlert} เรียบร้อยแล้ว`, {
            timeout: 2000
          })
          this.cancel()
        }
      }
    },
    cancel() {
      this.value.first_name = ''
      this.value.last_name = ''
      this.value.position = ''
      this.value.department = ''
      this.value.address = ''
      this.value.phone_number = ''
      this.value.email = ''
      this.value.username = ''
      this.value.password = ''
      this.value.confirmPassword = ''
    }
  }
}
</script>
