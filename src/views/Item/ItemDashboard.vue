<template>
  <Sidebar>
    <template #body>
      <div class="container-fluid mt-2">
        <Card>
          <template #header>
            <h3 class="text-center"></h3>
          </template>
          <template #header-right>
            <CustomButton variant="secondary" @click="addItem">
              <i class="fas fa-plus"></i> Add Item
            </CustomButton>
          </template>
          <div class="d-flex flex-column align-items-center">
            <img alt="Item Dashboard" class="img-fluid mb-4" />
            <p class="text-center">
              Welcome to the Item Dashboard! Here you can manage your items,
              view statistics, and more.
            </p>
            <EasyDataTable :headers="headers" :items="items" />
          </div>
        </Card>
      </div>
    </template>
  </Sidebar>
  <AddItem ref="addItemRef" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AddItem from "../../components/Item/AddItem.vue";
const addItemRef = ref();
const headers = [
  { text: "Unique ID", value: "unique_id" },
  { text: "Name", value: "name" },
  { text: "Quantity", value: "quantiy" },
  { text: "Age", value: "age", sortable: true },
];

const items = [
  { name: "Curry", height: 178, weight: 77, age: 20 },
  { name: "James", height: 180, weight: 75, age: 21 },
  { name: "Jordan", height: 181, weight: 73, age: 22 },
];

const addItem = () => {
  console.log(addItemRef.value);
  addItemRef.value.show();
};
</script>
