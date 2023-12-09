<template>
  <div>
    <p class="text-slate-400">{{ label }}</p>
    <input
      :class="`border border-slate-400 h-9 rounded-md  p-2 shadow-md focus:outline-none focus:border-slate-600 text-slate-700 text-sm w-full`"
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
    placeholder: {
      type: String,
      default: ''
    },
  }
}
</script>
