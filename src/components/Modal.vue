<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="modelValue"
        class="modal d-block"
        tabindex="-1"
        style="background-color: rgba(0, 0, 0, 0.5)"
        @click.self="backdropClick"
      >
        <div
          class="modal-dialog"
          :class="containerClass"
          :style="maxWidthStyle"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ header }}</h5>
              <button
                v-if="closeable"
                type="button"
                class="btn-close"
                aria-label="Close"
                @click="$emit('update:modelValue', false)"
              >X</button>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer" v-if="!notFooter">
              <slot name="footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="$emit('update:modelValue', false)"
                >
                  Close
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
  closeable: {
    type: Boolean,
    required: false,
    default: true,
  },
  header: {
    type: String,
    required: false,
    default: "Modal Title",
  },
  container: {
    type: String,
    required: false,
    default: null,
  },
  maxwidth: {
    type: String,
    required: false,
    default: null,
  },
  notFooter: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const backdropClick = (event: any) => {
  if (event.target.classList.contains("modal")) {
    emit("update:modelValue", false);
  }
};

const containerClass = computed(() =>
  props.container ? `modal-${props.container}` : ""
);

const maxWidthStyle = computed(() =>
  props.maxwidth ? `max-width: ${props.maxwidth}` : null
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
