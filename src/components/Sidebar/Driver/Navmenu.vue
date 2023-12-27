<template>
  <ul>
    <li
      v-for="(item, i) in items"
      :key="i"
      class="text-gray-700 hover:text-[#ef1822] hover:bg-gray-50 h-12 items-center flex"
      :class="`${this.$route.name === item.link ? 'menu-item-active' : ''}`"
    >
      <router-link :to="`${item.link}`" class="menu-link flex items-center gap-2">
        <span class="menu-icon" v-show="item.icon">
          <Icon :icon="item.icon" />
        </span>
        <div class="text-box text-lg" v-if="item.title">
          {{ item.title }}
        </div>
      </router-link>
    </li>
  </ul>
  <div class="flex items-end h-full mb-2">
    <div class="dropdown dropdown-top hover:bg-gray-50" v-show="disable">
      <div tabindex="0" role="button">
        <div class="flex items-center gap-x-4 text-sm font-semibold leading-6 text-gray-900">
          <!-- <div class="w-8 rounded-full">
            <img
              class="h-8 w-8 rounded-full bg-gray-50"
              alt="Tailwind CSS Navbar component"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          </div> -->
          <div
            class="h-8 w-8 rounded-full bg-[#099c3d] text-white flex justify-center items-center"
          >
            {{ account.firstname[0] }}{{ account.lastname[0] }}
          </div>
          <span class="sr-only">Your profile</span>
          <!-- <span aria-hidden="true">Tom Cook</span> -->
          <span aria-hidden="true">{{ account.firstname }} {{ account.lastname }}</span>
        </div>
      </div>
      <ul
        tabindex="0"
        class="mb-1 z-[1] p-2 shadow-md menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <button class="w-full" @click="logout">
            <Icon icon="heroicons-outline:arrow-left-on-rectangle" />ออกจากระบบ
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon/index.vue'
import { getUserInfo, removeUserInfo } from '@/constant/accountLogin'

export default {
  data() {
    return {
      account: getUserInfo()
    }
  },
  components: {
    Icon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    items: { type: Array, required: true },
    childrenLinks: { type: Array, default: null },
    disable: { type: Boolean, default: true }
  },
  methods: {
    logout() {
      removeUserInfo()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.menu-item-active {
  @apply h-auto;
  .menu-link {
    @apply bg-gray-100 text-[#ef1822] rounded-md px-2 h-12 items-center flex w-full shadow-md;
    .icon-box,
    .menu-icon,
    .text-box {
      @apply text-[#ef1822];
    }
  }
}
</style>
