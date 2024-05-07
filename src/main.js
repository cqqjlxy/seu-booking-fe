import { createApp } from 'vue'
import App from './App.vue'
import './assets/base.css'
import { createPinia } from 'pinia'
import router from './router.js'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import DayJsAdapter from '@date-io/dayjs'
import '@mdi/font/css/materialdesignicons.css'
import { useAuthStore } from "./stores/auth.js";
const pinia = createPinia();
const vuetify = createVuetify({

    components,

    directives,
    icons: {
        defaultSet: 'mdi',
        aliases: {
            AlipayRound
        },
        // sets: {
        //     mdi,
        // },
    },
    date: {
        adapter: DayJsAdapter,
    },
})

const app = createApp(App).use(vuetify)
app.use(pinia)
app.use(router)
app.mount('#app')

const authStore = useAuthStore()
authStore.initializeAuth()