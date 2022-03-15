import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faBars, faHeart, faMessage, faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import router from './router'
import {setDirectoryMap} from "@/api/GithubAPI";

/* import specific icons */
library.add(faUserSecret, faBars, faHeart, faMessage, faFolder, faFolderOpen)
const app = createApp(App).use(router)

//== Initialize for Directories ==//

app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')

