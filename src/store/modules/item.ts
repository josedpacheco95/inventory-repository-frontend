import axios from "axios";
import config from "../../config";
import type {
  StateItem,
  ItemType,
  ItemGetParams,
  ItemBody,
} from "../../types/store/itemType";

const state: StateItem = {
  items: [],
  item: null,
  total_items: 0,
};

const mutations = {
  setItems(state: StateItem, items: ItemType[]) {
    state.items = items;
  },
  setItem(state: StateItem, item: ItemType | null) {
    state.item = item;
  },
  setTotalItems(state: StateItem, total_items: number) {
    state.total_items = total_items;
  },
  setDeleteItem(state: StateItem, id: string) {
    const items = [...state.items].filter((item) => item.unique_id != id);
    state.items = items;
    state.total_items = state.total_items - 1;
  },
};

const actions = {
  async getItem({ commit }: any, id: string) {
    try {
      const response = await axios({
        baseURL: `${config.backendUrl}/item?unique_id=${id}`,
        method: "GET",
      });

      commit("setItem", response.data.item);
      return response.data;
    } catch (err) {
      console.log(err);
      return { errorObject: err, error: true };
    }
  },
  async getItems({ commit }: any, params?: ItemGetParams) {
    const querys = params
      ? `?page=${params.pagination?.page}&limit=${
          params.pagination?.limit
        }${params.search ? `&search=${params.search}` : ""}`
      : "";
    try {
      const response = await axios({
        baseURL: `${config.backendUrl}/item${querys}`,
        method: "GET",
      });
      console.log(response);
      commit("setItems", response.data.data);
      commit("setTotalItems", response.data.total);
      return response.data;
    } catch (err) {
      console.log(err);
      return { errorObject: err, error: true };
    }
  },
  async addItem({ commit }: any, data: ItemBody) {
    try {
      const response = await axios({
        baseURL: `${config.backendUrl}/item`,
        method: "POST",
        data,
      });
      commit("setItems", response.data.data);

      return response.data;
    } catch (err) {
      console.log(err);
      return { errorObject: err, error: true };
    }
  },
  async deleteItem({ commit }: any, id: string) {
    try {
      await axios({
        baseURL: `${config.backendUrl}/item?item_id=${id}`,
        method: "DELETE",
      });
      commit("setDeleteItem", id);
    } catch (err) {
      console.log(err);
      return { errorObject: err, error: true };
    }
  },
  async updateItem(
    { commit }: any,
    { data, id }: { data: ItemBody; id: string }
  ) {
    try {
      const response = await axios({
        baseURL: `${config.backendUrl}/item?item_id=${id}`,
        method: "PUT",
        data,
      });
      //   commit("setItem", response.data.data);
      console.log(response.data);
      commit("setItem", response.data.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return { errorObject: err, error: true };
    }
  },
};

const getters = {
  getItems: (state: StateItem) => state.items,
  getItem: (state: StateItem) => state.item,
  getTotalItems: (state: StateItem) => state.total_items,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
