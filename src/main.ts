import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";


import router from "./router";
import { store } from "./store";
import { setup } from "./helpers/interceptor";
import customComponents from "./helpers/customComponents";
import {createBootstrap} from 'bootstrap-vue-next'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'


import "./style.css";
import App from "./App.vue";
setup();


const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.use(store);
app.use(createBootstrap());

customComponents(app);
app.mount("#app");
