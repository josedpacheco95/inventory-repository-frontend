<template>
  <Modal v-model="showModal" header="Add Item" notFooter>
    <TextInput label="name" v-model="name" />
    <TextInput label="location" v-model="location" />
    <NumberInput label="quantity" v-model="quantity" />
    <TextAreaInput label="description" v-model="description" />
    <div class="mt-2 d-flex">
        <Button class="mr-auto">
            Cancel
        </Button>
        <Button @click="saveItem">
            Save
        </Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";
import { store } from "../../store";
const name = ref("");
const location = ref("");
const quantity = ref("");
const description = ref("");
const showModal = ref(false);
const show = () => {
  showModal.value = true;
};
const hide = () => {
  name.value = "";
  location.value = "";
  quantity.value = "";
  description.value = "";
  showModal.value = false;
};
const saveItem = async () => {
  if (name.value && location.value && quantity.value) {
    await store.dispatch("addItem", {
      name: name.value,
      location: location.value,
      quantity: quantity.value,
      description: description.value,
    });
    hide();
  } else {
    alert("Please fill in all required fields.");
  }
};
defineExpose({
  show,
  hide,
});
</script>
