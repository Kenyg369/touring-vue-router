import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'nprogress/nprogress.css'


createApp(App)
    .use(router)
    //this allows us to set a value in one component and get access to that data
    .mount("#app");
