<template>
  <div>
    <p class="text-xs text-slate-400">{{ label }}</p>
    <input
      :class="`border border-slate-400 h-6 rounded-md  p-2 shadow-md focus:outline-none focus:border-slate-600 text-slate-700 text-xs w-full {{ classtext }}`"
      type="text"
      :placeholder="placeholder"
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
    classtext: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
  }
}
</script>
