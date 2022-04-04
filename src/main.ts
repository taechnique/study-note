import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faUserSecret,
    faBars,
    faHeart,
    faMessage,
    faFolder,
    faFolderOpen, faGlobe, faHelmetSafety
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import router from './router'
import { setDirectories, setFileList } from "@/components/header/settingUtils";

/* import specific icons */
library.add(faUserSecret, faBars, faHeart, faMessage, faFolder, faFolderOpen, faGlobe, faHelmetSafety)
const app = createApp(App).use(router)

//== Initialize for Directories ==//

//== 디렉토리 셋팅 ==//
setDirectories()

//== 파일 셋팅 ==//
setFileList()

app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')

