import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";


import router from "./router";
import { store } from "./store";
import { setup } from "./helpers/interceptor";
import customComponents from "./helpers/customComponents";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";

import "./style.css";
import App from "./App.vue";
setup();


const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.use(store);
app.component('EasyDataTable', Vue3EasyDataTable);


customComponents(app);
app.mount("#app");
