<template>
  <div>
    <p class="text-slate-500" :style="labelFont">{{ label }}</p>
    <div class="relative flex items-center">
      <input
        class="border h-10 rounded-md p-2 shadow-md focus:outline-none focus:border-[#099c3d] text-slate-700 text-sm w-full"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue"
        :disabled="disabled"
      />
      <div v-if="password" class="absolute z-10 right-4">
        <button v-if="type === 'password'">
          <Icon @click="type = 'text'" icon="heroicons-solid:eye-slash" />
        </button>
        <button v-if="type === 'text'">
          <Icon @click="type = 'password'" icon="heroicons-solid:eye" />
        </button>
      </div>
      <div v-if="icon !== ''" class="absolute z-10 right-4">
        <Icon @click="type = 'text'" :icon="`heroicons-solid:${icon}`" />
      </div>
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
    label: {
      type: String,
      default: 'Label'
    },
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    },
    labelFont: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    password: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
