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
            <SearchForm
              :limit="limit"
              @clear="handleClear"
              @search="handleSearch"
            />
            <BTable :fields="fields" :items="getItems" hover>
              <template #cell(action)="row">
                <div class="d-flex">
                  <FontAwesomeIcon
                    @click="handleDelete(row)"
                    :icon="faTrash"
                    class="mr-2"
                    style="cursor: pointer"
                  />
                  <BTooltip>
                    <template #target>
                      <FontAwesomeIcon
                        @click="handleSelectDetail(row)"
                        :icon="faEye"
                        style="cursor: pointer"
                      />
                    </template>
                    View Item Detail
                  </BTooltip>
                </div>
              </template>
            </BTable>
            <BPagination
              v-model="page"
              :total-rows="getTotalItems"
              :per-page="limit"
            />
            <BFormSelect v-model="limit" :options="limitOptions" />
          </div>
        </Card>
      </div>
    </template>
  </Sidebar>
  <AddItem ref="addItemRef" @addItem="addingItem" />
  <DeleteItem ref="deleteItemRef" :uniqueId="selectedDeleteItemId" />
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { store } from "../../store";
import AddItem from "../../components/Item/AddItem.vue";
import SearchForm from "../../components/Item/SearchForm.vue";
import DeleteItem from "../../components/Item/DeleteItem.vue";
import { faE, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";
import { BFormSelect, BTooltip } from "bootstrap-vue-next";
const router = useRouter();
const addItemRef = ref();
const deleteItemRef = ref();
const page = ref(1);
const limit = ref(10);
const search = ref("");
const quantity = ref<any>("");
const getItems = computed(() => store.getters.getItems);
const getTotalItems = computed(() => store.getters.getTotalItems);
const selectedDeleteItemId = ref("");
onBeforeMount(() => {
  store.dispatch("getItems", {
    pagination: {
      page: page.value,
      limit: limit.value,
    },
  });
});
const fields = [
  {
    key: "unique_id",
    label: "SKU",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "quantity",
    label: "Quantity",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "action",
    label: "Action",
  },
];

const limitOptions = [
  {
    value: 1,
    text: "1",
  },
  {
    value: 1,
    text: "5",
  },
  {
    value: 10,
    text: "10",
  },
  {
    value: 25,
    text: "25",
  },
];

const handleDelete = (row: any) => {
  selectedDeleteItemId.value = row.item.unique_id;
  deleteItemRef.value.show();
};

const handleSelectDetail = (row: any) => {
  window.open(`item_detail/${row.item.unique_id}`, "_blank");
  // router.push(`item/${row.item.unique_id}`);
};

const handleClear = () => {
  page.value = 1;
  search.value = "";
  quantity.value = "";
};
const handleSearch = (item: any) => {
  search.value = item.search;
  quantity.value = item.quantity;
  page.value = 1;
};

const addItem = () => {
  addItemRef.value.show();
};
const addingItem = () => {
    const paramsQuery: any = {
        pagination: {
          limit: limit.value,
          page: page.value,
        },
      };
      if (search.value) {
        paramsQuery.search = search.value;
      }
      if (quantity.value !== "") {
        paramsQuery.quantity = quantity.value;
      }
      store.dispatch("getItems", paramsQuery);
}
watch(
  () => page.value,
  (page) => {
    if (page) {
      const paramsQuery: any = {
        pagination: {
          limit: limit.value,
          page,
        },
      };
      if (search.value) {
        paramsQuery.search = search.value;
      }
      if (quantity.value !== "") {
        paramsQuery.quantity = quantity.value;
      }
      store.dispatch("getItems", paramsQuery);
    }
  }
);
watch(
  () => limit.value,
  (limit) => {
    if (limit) {
      const paramsQuery: any = {
        pagination: {
          limit,
          page: page.value,
        },
      };
      if (search.value) {
        paramsQuery.search = search.value;
      }
      if (quantity.value !== "") {
        paramsQuery.quantity = quantity.value;
      }
      store.dispatch("getItems", paramsQuery);
    }
  }
);
</script>
