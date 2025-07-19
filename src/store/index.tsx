import { createStore, useStore } from "vuex";

import authentication from "./modules/authentication";
import item from "./modules/item";

export const store = createStore({
  modules: {
    authentication,
    item,
  },
});

export const useAppStore = useStore(store);