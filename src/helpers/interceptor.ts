import axios from "axios";

export function setup() {
    axios.interceptors.request.use(
        config => {
          const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      
          if (token) {
            config.headers['x-access-tokens'] = token;
          }
          return config;
        },
      
        error => Promise.reject(error)
      );
      

}