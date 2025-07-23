<template>
  <label v-if="label" :for="id" class="form-label">{{ label }}</label>
  <input
    :id="id"
    type="text"
    class="form-control input-styles"
    :class="{ 'is-invalid': validationCondition }"
    v-model="inputValue"
    @input="onInput"
  />
  <div v-if="validationCondition" class="invalid-feedback">
    {{ validationMessage }}
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
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
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const filteredValue = target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
  inputValue.value = filteredValue;
  emit("update:modelValue", filteredValue);
};
</script>

<style lang="scss" scoped>
.input-styles {
  border: 1px solid #069591 !important;
  border-radius: 2px !important;
  color: #ababab;
}
</style>
