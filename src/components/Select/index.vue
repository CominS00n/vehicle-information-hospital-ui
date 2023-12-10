<template>
  <div class="w-full">
    <p class="text-slate-500">{{ label }}</p>
    <Listbox v-model="selectMenu">
      <div class="relative">
        <ListboxButton
          class="relative w-full h-10 border border-slate-400 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span :class="`block truncate ${selectMenu === null ? 'text-slate-400' : ''}`">{{
            selectMenu || placeholder
          }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <Icon icon="heroicons-solid:chevron-up-down" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="overflow-auto absolute mt-1 max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-[999]"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="menuList in menuLists"
              :key="menuList"
              :value="menuList"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-[#cbf3d9] text-[#099c3d]' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4'
                ]"
              >
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                  menuList
                }}</span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-[#099c3d]"
                >
                  <Icon icon="heroicons-outline:check" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script>
import Icon from '@/components/Icon/index.vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

export default {
  components: {
    Icon,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption
  },
  data() {
    return {
      selectMenu: null
    }
  },
  props: {
    menuLists: {
      type: Array,
      default: []
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Label'
    }
  },
  methods: {
    emitSelection() {
      this.$emit('select', this.selectMenu)
    }
  },
  watch: {
    selectMenu() {
      this.emitSelection()
    }
  }
}
</script>
