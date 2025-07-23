import axios from "axios";
import config from "../../config";
import type {
  AuthenticationState,
  RegisterBody,
  LoginBody,
} from "../../types/store/authType";
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

const actions = {
  async register({ commit }: any, data: RegisterBody) {
    try {
      const response = await axios({
        baseURL: `${config.backendUrl}/auth/signup/`,
        method: "POST",
        data,
      });
      return response.data.data;
    } catch (err) {
      console.log(err);
      return { errorObject: err, error: true };
    }
  },
  async login({ commit }: any, data: LoginBody) {
    try {
      const response = await axios({
        baseURL: `${config.backendUrl}/login/`,
        method: "POST",
        data,
      });
      return response.data.data;
    } catch (err) {
      console.log(err);
      return { errorObject: err, error: true };
    }
  },
};

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
