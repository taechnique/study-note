import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faBars, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import PostView from "@/components/PostView"

/* import specific icons */


const MainBody = { template: MainBody }
const PostView = { template: PostView }

const routes = [
    { path: '/', component: MainBody },
    { path: '/post', component: PostView }
]


const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})


library.add(faUserSecret, faBars, faHeart, faMessage)
const app = createApp(App)

app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')

