import axios from "axios";

export function setup() {
    axios.interceptors.request.use(
        config => {
          const token = localStorage.getItem("token_user") || sessionStorage.getItem("token_user");
      
          if (token) {
            config.headers['x-access-tokens'] = token;
          }
          return config;
        },
      
        error => Promise.reject(error)
      );
      

}