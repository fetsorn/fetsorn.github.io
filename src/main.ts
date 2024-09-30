import { createApp } from "vue";
import VueTelegram from "vue-tg";
import "./style.css";
import App from "./app.vue";
import router from "./router";
import VueMaplibreGl from "@indoorequal/vue-maplibre-gl";

createApp(App).use(VueTelegram).use(VueMaplibreGl).use(router).mount("#app");
