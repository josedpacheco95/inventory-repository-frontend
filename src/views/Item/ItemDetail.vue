<template>
  <Sidebar>
    <template #body>
      <div class="container-fluid mt-2">
        <Card>
          <template #header>
            <h3 class="text-center">Item Details</h3>
          </template>
          <template #header-right>
            <BDropdown text="Actions" class="me-2" v-if="!isEdit">
              <BDropdownItem @click="handleEdit" class="py-2"
                >Edit</BDropdownItem
              >
              <BDropdownItem class="py-2" @click="handleDelete()">
                Delete
              </BDropdownItem>
            </BDropdown>
            <div v-if="isEdit" class="d-flex">
              <BButton class="mr-2" @click="updateItem"> Update </BButton>
              <BButton @click="cancelEdit"> Cancel </BButton>
            </div>
          </template>
          <div class="d-flex flex-column">
            <ItemDetail
              v-model="uniqueId"
              :isEdit="isEdit"
              label="SKUU"
              isText
            />
            <ItemDetail v-model="name" :isEdit="isEdit" label="Name" isText />
            <ItemDetail
              v-model="location"
              :isEdit="isEdit"
              label="Location"
              isText
            />
            <ItemDetail
              v-model="quantity"
              :isEdit="isEdit"
              label="Quantity"
              isNumber
            />
            <ItemDetail
              v-model="description"
              :isEdit="isEdit"
              label="Description"
              isArea
            />
          </div>
        </Card>
      </div>
    </template>
  </Sidebar>
  <DeleteItem ref="deleteItemRef" :uniqueId="selectedDeleteItemId" detailItem />
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed, watch, onMounted } from "vue";
import { store } from "../../store";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { BDropdownItem } from "bootstrap-vue-next";
import DeleteItem from "../../components/Item/DeleteItem.vue";
import ItemDetail from "../../components/Item/ItemDetail.vue";
const route = useRoute();
const router = useRouter();

const deleteItemRef = ref();
const isEdit = ref(false);
const name = ref("");
const description = ref("");
const location = ref("");
const quantity = ref(0);
const uniqueId = ref("");
const getItem = computed(() => store.getters.getItem);
const selectedDeleteItemId = computed(() => route.params.id || "");
onBeforeMount(() => {
  store.dispatch("getItem", selectedDeleteItemId.value);
});

onMounted(() => {
  if (getItem.value) {
    name.value = getItem.value.name || "";
    description.value = getItem.value.description
      ? getItem.value.description == "None"
        ? ""
        : getItem.value.description
      : "";
    location.value = getItem.value.location || "";
    quantity.value = getItem.value.quantity || 0;
    uniqueId.value = getItem.value.unique_id || "";
  }
});

const handleDelete = () => {
  deleteItemRef.value.show();
};

const handleEdit = () => {
  isEdit.value = !isEdit.value;
};
const cancelEdit = () => {
  isEdit.value = false;
  name.value = getItem.value.name || "";
  description.value = getItem.value.description
    ? getItem.value.description == "None"
      ? ""
      : getItem.value.description
    : "";
  location.value = getItem.value.location || "";
  quantity.value = getItem.value.quantity || 0;
  uniqueId.value = getItem.value.unique_id || "";
};

const updateItem = async () => {
  const response = await store.dispatch("updateItem", {
    data: {
      unique_id: uniqueId.value,
      name: name.value,
      location: location.value,
      quantity: quantity.value,
      description: description.value,
    },
    id: selectedDeleteItemId.value,
  });
  if (response.error) {
    console.log(response);
  } else {
    isEdit.value = false;
    router.replace(`/item_detail/${uniqueId.value}`);
  }
};

watch(
  () => getItem.value,
  (value) => {
    if (value) {
      name.value = value.name || "";
      (description.value = value.description
        ? value.description == "None"
          ? ""
          : value.description
        : ""),
        (location.value = value.location || "");
      quantity.value = value.quantity || 0;
      uniqueId.value = value.unique_id || "";
    }
  },
  {
    deep: true,
  }
);
</script>
