import {createApp} from "vue";
import './style.css'
import App from "./App.vue";

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

createApp(App)
    .mount("#app");
