<template>
    <button
      :typeButton="typeButton"
      class="btn"
      :class="[variantClass, sizeClass]"
      :disabled="disabled"
      :style="style"
      @click="$emit('click', $event)"
    >
      <slot />
    </button>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits, computed } from "vue";
  
  const props = defineProps({
    typeButton: {
      type: String,
      default: "button", // Can be "button", "submit", or "reset"
    },
    variant: {
      type: String,
      default: "btn-primary", // Bootstrap variants like "primary", "secondary", "danger", etc.
    },
    size: {
      type: String,
      default: null, // Can be "sm" or "lg" for small or large buttons
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    class: {
      type: [String, Object],
      default: null,
    },
    style: {
      type: [String, Object],
      default: null,
    },
  });
  
  
  defineEmits(["click"]);
  
  const variantClass = computed(() => `btn-${props.variant}`)
  const sizeClass = computed(() => props.size ? `btn-${props.size}` : "");
  </script>
  
