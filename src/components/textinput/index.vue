<template>
  <div>
    <p class="text-slate-500" :style="labelFont">{{ label }}</p>
    <input
      :class="`border border-slate-400 h-10 rounded-md  p-2 shadow-md focus:outline-none focus:border-[#099c3d] text-slate-700 text-sm w-full`"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>

<script>
export default {
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
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
