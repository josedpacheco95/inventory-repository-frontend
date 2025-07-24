<template>
  <Modal v-model="showModal" header="Delete Item" notFooter>
    <h3>Are you sure you want to delete this item from inventory?</h3>
    <div class="mt-2 d-flex">
      <BButton @click="hide" class="mr-auto"> Cancel </BButton>
      <BButton @click="handleConfirm"> Confirm </BButton>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";
import { store } from "../../store";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  uniqueId: {
    type: String,
  },
  detailItem: {
    type: Boolean,
    default: false,
  }
});
const showModal = ref(false);
const show = () => {
  showModal.value = true;
};
const hide = () => {
  showModal.value = false;
};
const handleConfirm = async () => {
  await store.dispatch("deleteItem", props.uniqueId);
  if (props.detailItem) {
    router.push('/')
  }
  hide();
};
defineExpose({
  show,
  hide,
});
</script>
