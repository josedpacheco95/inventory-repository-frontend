<template>
  <label v-if="label" :for="id" class="form-label">{{ label }}</label>
  <textarea
    :id="id"
    class="form-control textarea-styles"
    :class="{ 'is-invalid': validationCondition }"
    v-model="inputValue"
    @input="$emit('update:modelValue', inputValue)"
    :rows="rows"
  ></textarea>
  <div v-if="validationCondition" class="invalid-feedback">
    {{ validationMessage }}
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  validationCondition: {
    type: Boolean,
    required: true,
  },
  validationMessage: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: () => `textarea-${Math.random().toString(36).substr(2, 9)}`,
  },
  rows: {
    type: Number,
    default: 3, // Default number of rows for the textarea
  },
});

defineEmits(["update:modelValue"]);

const inputValue = ref("");

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.textarea-styles {
  border: 1px solid #069591 !important;
  border-radius: 2px !important;
  color: #ababab;
}
</style>
