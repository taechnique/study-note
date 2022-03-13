import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faBars, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import router from './router'
import { getAllDirectories } from "@/api/github-api";


/* import specific icons */
library.add(faUserSecret, faBars, faHeart, faMessage)
const app = createApp(App).use(router)

console.log('Hi')

//== Initialize for Directories ==//
getAllDirectories().then(res => {
    const dirs = res.data.filter(e => e.type === 'dir')
    console.log('dirs: ',dirs)
})







app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')

