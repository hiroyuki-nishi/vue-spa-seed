import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import {Notify, Quasar} from "quasar";
import './assets/main.css'

const app = createApp(App);

app.use(router);
app.use(Quasar, {
    plugins: {
        Notify
    },
    config: {
        notify: { /* look at QuasarConfOptions from the API card */}
    }
})

app.mount('#app')
