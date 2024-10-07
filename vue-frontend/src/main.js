import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHandshake } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import './assets/index.css'

library.add(faHandshake)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')