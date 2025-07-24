<template>
  <div class="row mb-2">
    <div class="col-lg-2">
      <span style="padding: 3px; padding-right: 8px">
        {{ label }}
      </span>
    </div>
    <div class="col">
      <template v-if="!isEdit">
        <div class="detail-info">
          {{ modelValue }}
        </div>
      </template>
      <template v-if="isEdit">
        <TextInput v-model="localModelValue" v-if="isText" />
        <NumberInput v-model="localModelValue" v-if="isNumber" />
        <TextAreaInput v-model="localModelValue" v-if="isArea" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted, watch } from "vue";
import TextInput from "../TextInput.vue";
import NumberInput from "../NumberInput.vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
  },
  isText: {
    type: Boolean,
    default: false,
  },
  isNumber: {
    type: Boolean,
    default: false,
  },
  isArea: {
    type: Boolean,
    default: false,
  },
});
const localModelValue = ref<any>(props.modelValue);
const emit = defineEmits(["update:modelValue"]);
onMounted(() => {
  localModelValue.value = props.modelValue;
});
watch(
  () => props.modelValue,
  (newValue) => {
    console.log(newValue);
    localModelValue.value = newValue;
    emit("update:modelValue", newValue);
  },
  { immediate: true }
);
watch(localModelValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<style lang="scss" scoped>
.detail-info {
  border-radius: 12px;
  background: #515b65;
  padding: 5px;
  min-height: 30px;
}
</style>
