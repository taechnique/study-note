import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */


library.add(faUserSecret, faBars)
const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')

