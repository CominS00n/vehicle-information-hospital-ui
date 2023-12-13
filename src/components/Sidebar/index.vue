<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <!-- !Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <div class="flex h-16 shrink-0 items-center">
                  <img
                    class="h-8 bg-gray-50"
                    alt="Tailwind CSS Navbar component"
                    src="../../image/Logo.jpeg"
                  />
                </div>
                <nav class="flex flex-1 flex-col">
                  <Navmenu :items="menuItems" :disable="false" />
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6"
      >
        <div class="flex h-16 shrink-0 items-center">
          <img class="h-[50px] w-auto mt-5" src="../../image/Logo.jpeg" alt="Your Company" />
        </div>
        <Navmenu :items="menuItems" />
      </div>
    </div>

    <div
      class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden"
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-gray-900"></div>

      <div class="dropdown dropdown-end hover:bg-gray-50">
        <div tabindex="0" role="button">
          <!-- <div class="flex items-center gap-x-4 text-sm font-semibold leading-6 text-gray-900"> -->
            <!-- ? Avatars -->
            <!-- <div class="w-8 rounded-full">
              <img
                class="h-8 w-8 rounded-full bg-gray-50"
                alt="Tailwind CSS Navbar component"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            </div> -->
            <n-avatar round class="bg-[#099c3d]">
              {{ account.firstname[0] }}{{ account.lastname[0] }}
            </n-avatar>
          <!-- </div>  -->
        </div>
        <ul
          tabindex="0"
          class="mt-1 z-[1] p-2 shadow-md menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <router-link to="/" class="w-full"
              ><Icon icon="heroicons-outline:arrow-left-on-rectangle" />ออกจากระบบ</router-link
            >
          </li>
        </ul>
      </div>
    </div>

    <main class="py-4 lg:py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { menuItems } from '@/constant/data.js'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { getStoredUsername } from '@/constant/accountLogin'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

import Navmenu from './Navmenu.vue'
import Icon from '@/components/Icon/index.vue'

const sidebarOpen = ref(false)
const account = getStoredUsername()
</script>
