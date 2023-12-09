<template>
  <!-- <nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" class="-mx-2 space-y-1">
          <li v-for="item in navigation" :key="item.name">
            <RouterLink :to="item.href">
              <a
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-50 text-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                ]"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                    'h-6 w-6 shrink-0'
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </a>
            </RouterLink>
          </li>
        </ul>
      </li>
      <li class="-mx-6 mt-auto">
        <a
          href="#"
          class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
        >
          <img
            class="h-8 w-8 rounded-full bg-gray-50"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <span class="sr-only">Your profile</span>
          <span aria-hidden="true">Tom Cook</span>
        </a>
      </li>
    </ul>
    {{ items }}
  </nav> -->
  <ul>
    <li
      v-for="(item, i) in items"
      :key="i"
      class="text-gray-700 hover:text-[#ef1822] hover:bg-gray-50 h-7"
      :class="`${this.$route.name === item.link ? 'menu-item-active' : ''}`"
    >
      <router-link :to="`${item.link}`" class="menu-link flex items-center gap-2">
        <span class="menu-icon" v-show="item.icon">
          <Icon :icon="item.icon" />
        </span>
        <div class="text-box" v-if="item.title">
          {{ item.title }}
        </div>
      </router-link>
    </li>
  </ul>
  <div class="flex items-end h-full mb-2">
    <div class="dropdown dropdown-top hover:bg-gray-50 ">
      <div tabindex="0" role="button">
        <div class="flex items-center gap-x-4 text-sm font-semibold leading-6 text-gray-900">
          <div class="w-8 rounded-full">
            <img
              class="h-8 w-8 rounded-full bg-gray-50"
              alt="Tailwind CSS Navbar component"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          </div>
          <span class="sr-only">Your profile</span>
          <span aria-hidden="true">Tom Cook</span>
        </div>
      </div>
      <ul
        tabindex="0"
        class="mb-1 z-[1] p-2 shadow-md menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <router-link to="/" class="w-full"
            ><Icon icon="heroicons-outline:arrow-left-on-rectangle" />Logout</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon/index.vue'

export default {
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
    childrenLinks: { type: Array, default: null }
  }
}
</script>

<style lang="scss">
.menu-item-active {
  @apply h-auto;
  .menu-link {
    @apply bg-gray-100 text-[#ef1822] rounded-md h-7 px-2;
    .icon-box,
    .menu-icon,
    .text-box {
      @apply text-[#ef1822];
    }
  }
}
</style>
