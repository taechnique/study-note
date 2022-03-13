import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faBars, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import router from './router'
import { getAPI } from "@/api/github-api";


/* import specific icons */
library.add(faUserSecret, faBars, faHeart, faMessage)
const app = createApp(App).use(router)
const owner = 'Dev-Phantom'
const repo = 'study-note'

//== Initialize for Directories ==//
getAPI('/repos/'+owner+'/'+repo+'/contents/src/docs')





app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')

