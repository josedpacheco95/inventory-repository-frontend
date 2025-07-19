import type { AuthenticationState } from "../../types/store/authType";
const localstorage_session_key =
  import.meta.env.session_key || "inventory_session";
const token_key = import.meta.env.token_key || "inventory_token";

const state: AuthenticationState = {
  session: localStorage.getItem(localstorage_session_key)
    ? JSON.parse(localStorage.getItem(localstorage_session_key) as string)
    : null,
  token: localStorage.getItem(token_key) || null,
};

const mutations = {};

const actions = {};

const getters = {
  isLoggedIn: (state: AuthenticationState) =>
    state.token && localStorage.getItem(token_key),
};

export default {
  state,
  mutations,
  getters,
  actions,
};
