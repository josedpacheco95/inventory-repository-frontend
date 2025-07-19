
import type { StateItem, ItemType} from "../../types/store/itemType";

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

}

const getters = {
    getItems: (state: StateItem) => state.items,
    getItem: (state: StateItem) => state.item,
}

export default {
    state,
    mutations,
    actions,
    getters,
};