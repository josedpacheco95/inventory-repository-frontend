<template>
  <div class="d-flex" style="align-items: center; width: 100%; gap: 12px">
    <div style="width: 200px">
      <NumberInput label="Quantity" v-model="quantity" />
    </div>
    <div class="d-flex flex-column">
      <span>Search</span>
      <TextInput
        v-model="search"
        placeholder="Search by SKUU or Name or Description"
      />
    </div>
    <div class="ml-auto">
      <BButton class="mx-3" @click="clearSearch"> Clear </BButton>
      <BButton @click="handleSearch"> Search </BButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TextInput from "../TextInput.vue";
import { BButton } from "bootstrap-vue-next";
import { store } from "../../store";
const props = defineProps({
  limit: {
    type: Number,
    default: 10,
  },
});
const emits = defineEmits(["search", "clear"]);

const quantity = ref<any>("");
const search = ref("");
const handleSearch = async () => {
  const paramsObj: any = {
    pagination: {
      page: 1,
      limit: props.limit,
    },
  };
  if (quantity.value) {
    paramsObj.quantity = quantity.value;
  }
  if (search.value) {
    paramsObj.search = search.value;
  }
  await store.dispatch("getItems", paramsObj);
  emits("search" , {
    quantity: quantity.value,
    search: search.value,
  });
};
const clearSearch = async () => {
  quantity.value = "";
  search.value = "";
  await store.dispatch("getItems", {
    pagination: {
      page: 1,
      limit: props.limit,
    },
  });
  emits("clear");
};
</script>
