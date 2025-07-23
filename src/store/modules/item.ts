import axios from "axios";
import config from "../../config";
import type {
  StateItem,
  ItemType,
  ItemGetParams,
  ItemBody
} from "../../types/store/itemType";

const state: StateItem = {
  items: [],
  item: null,
};

const mutations = {
  setItems(state: StateItem, items: ItemType[]) {
    state.items = items;
  },
  setItem(state: StateItem, item: ItemType | null) {
    state.item = item;
  },
};

const actions = {
  async getItems({ commit }: any, params?: ItemGetParams) {
    const querys = params
      ? `?currentPage=${params.pagination?.currentPage}&limit=${
          params.pagination?.limit
        }${params.search ? `&search=${params.search}` : ""}`
      : "";
    try {
      const response = await axios({
        baseURL: `${config.backendUrl}/item${querys}`,
        method: "GET",
      });
      console.log(response)
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
      commit("setItem", response.data.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return { errorObject: err, error: true };
    }
  }
};

const getters = {
  getItems: (state: StateItem) => state.items,
  getItem: (state: StateItem) => state.item,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
