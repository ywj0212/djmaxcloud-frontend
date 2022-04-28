import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Markdown from 'vue3-markdown-it';
import './index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(Markdown)
app.mount("#app")
