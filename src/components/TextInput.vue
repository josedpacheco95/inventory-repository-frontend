<template>
  <label v-if="label" :for="id" class="form-label">{{ label }}</label>
  <input
    :bind="$attrs"
    :id="id"
    :type="type"
    class="form-control input-styles"
    :class="{ 'is-invalid': validationCondition }"
    v-model="inputValue"
    @input="$emit('update:modelValue', inputValue)"
  />
  <div v-if="validationCondition" class="invalid-feedback">
    {{ validationMessage }}
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  validationCondition: {
    type: Boolean,
    required: false,
  },
  validationMessage: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: "text",
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
});

defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);
onMounted(() => {
  inputValue.value = props.modelValue;
});
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
}, { immediate: true });
</script>

<style lang="scss" scoped>
.input-styles {
  border: 1px solid #069591 !important;
  border-radius: 2px !important;
  color: #ababab;
}
</style>
