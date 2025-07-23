<template>
    <div
      class="card"
      :id="id"
      :class="class"
      :style="style"
      @click="$emit('click', $event)"
      @drop="$emit('drop', $event)"
      @dragenter="$emit('dragenter', $event)"
      @dragover="$emit('dragover', $event)"
      @mouseover="$emit('mouseover', $event)"
      @mouseleave="$emit('mouseleave', $event)"
    >
      <div
        v-if="hasSlot('header')"
        class="card-header d-flex"
        :class="headerClass"
        :style="headerStyle"
      >
        <div class="card-header-title">
          <slot name="header" />
        </div>
        <div v-if="hasSlot('header-right')" class="card-header-right">
          <slot name="header-right" />
        </div>
      </div>
      <div
        v-if="hasSlot('default') && !noBody"
        class="card-body"
        :class="bodyClass"
        :style="bodyStyle"
      >
        <slot />
      </div>
      <slot v-else />
      <div
        v-if="hasSlot('footer')"
        class="card-footer"
        :class="footerClass"
        :style="footerStyle"
      >
        <slot name="footer" />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits, useSlots } from "vue";
  
  defineProps({
    noBody: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String],
      default: "",
    },
    bodyClass: {
      type: [String, Object],
      default: null,
    },
    headerClass: {
      type: [String, Object],
      default: null,
    },
    footerClass: {
      type: [String, Object],
      default: null,
    },
    class: {
      type: [String, Object],
      default: null,
    },
    bodyStyle: {
      type: [String, Object],
      default: null,
    },
    headerStyle: {
      type: [String, Object],
      default: null,
    },
    footerStyle: {
      type: [String, Object],
      default: null,
    },
    style: {
      type: [String, Object],
      default: null,
    },
  });
  
  defineEmits([
    "click",
    "drop",
    "dragenter",
    "dragover",
    "mouseover",
    "mouseleave",
  ]);
  
  const slots = useSlots();
  const hasSlot = (name: string) => !!slots[name];
  </script>
  
  <style lang="scss" scoped>
   :deep(.card-header) {

   }
  .card-header-title {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  .card-header-right {
    display: inline-flex;
    text-align: right;
    font-size: 12px;
    margin-right: -10px;
    margin-top: -6px;
    min-height: 24px;
  
    :deep(.dropdown-menu .dropdown-item) {
      line-height: 12px;
    }
  }
  
  .full-height-card {
    height: calc(100vh - 50px);
    padding-bottom: 0px;
  }
  </style>